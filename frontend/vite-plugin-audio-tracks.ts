import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Scans `public/audio/` at build time and exposes the files it finds as a
 * virtual module, so the music player never hard-codes a playlist. Add or
 * remove MP3s and rebuild — the player adapts to whatever is in the folder.
 *
 * Exposes `virtual:audio-tracks`, which default-exports nothing and
 * named-exports `tracks: AudioTrack[]`.
 */

const VIRTUAL_ID = 'virtual:audio-tracks';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const AUDIO_EXTENSIONS = new Set(['.mp3', '.m4a', '.aac', '.ogg', '.wav', '.flac']);
const HEADER_BYTES = 256 * 1024;

/** ID3v2 stores sizes as seven bits per byte. */
function synchsafe(b0: number, b1: number, b2: number, b3: number): number {
  return ((b0 & 0x7f) << 21) | ((b1 & 0x7f) << 14) | ((b2 & 0x7f) << 7) | (b3 & 0x7f);
}

/** Decode an ID3 text frame body, honouring its leading encoding byte. */
function decodeTextFrame(body: Buffer): string {
  const encoding = body[0] ?? 0;
  const payload = body.subarray(1);
  let label = 'utf-8';
  let data = payload;
  if (encoding === 0) {
    label = 'iso-8859-1';
  } else if (encoding === 1 || encoding === 2) {
    if (payload[0] === 0xff && payload[1] === 0xfe) {
      label = 'utf-16le';
      data = payload.subarray(2);
    } else if (payload[0] === 0xfe && payload[1] === 0xff) {
      label = 'utf-16be';
      data = payload.subarray(2);
    } else {
      label = encoding === 1 ? 'utf-16le' : 'utf-16be';
    }
  }
  try {
    return new TextDecoder(label).decode(data).replace(/\0+$/, '').trim();
  } catch {
    return '';
  }
}

interface Tags {
  title?: string;
  artist?: string;
}

/** Best-effort ID3v2 read. Any malformed input falls back to `{}`. */
function readTags(filePath: string): Tags {
  const tags: Tags = {};
  let fd: number;
  try {
    fd = fs.openSync(filePath, 'r');
  } catch {
    return tags;
  }
  try {
    const buf = Buffer.alloc(HEADER_BYTES);
    const read = fs.readSync(fd, buf, 0, HEADER_BYTES, 0);
    if (read < 10 || buf.toString('latin1', 0, 3) !== 'ID3') return tags;
    const major = buf[3];
    const end = Math.min(read, 10 + synchsafe(buf[6], buf[7], buf[8], buf[9]));
    const idSize = major <= 2 ? 3 : 4;
    const headerSize = major <= 2 ? 6 : 10;
    const titleId = major <= 2 ? 'TT2' : 'TIT2';
    const artistId = major <= 2 ? 'TP1' : 'TPE1';
    let offset = 10;
    while (offset + headerSize <= end) {
      const id = buf.toString('latin1', offset, offset + idSize);
      if (!/^[A-Z0-9]+$/.test(id)) break; // padding or corruption
      const size =
        major <= 2
          ? (buf[offset + 3] << 16) | (buf[offset + 4] << 8) | buf[offset + 5]
          : major >= 4
            ? synchsafe(buf[offset + 4], buf[offset + 5], buf[offset + 6], buf[offset + 7])
            : ((buf[offset + 4] << 24) | (buf[offset + 5] << 16) | (buf[offset + 6] << 8) | buf[offset + 7]) >>> 0;
      const start = offset + headerSize;
      const stop = Math.min(start + size, end);
      if (id === titleId && tags.title === undefined) tags.title = decodeTextFrame(buf.subarray(start, stop));
      else if (id === artistId && tags.artist === undefined) tags.artist = decodeTextFrame(buf.subarray(start, stop));
      if (tags.title && tags.artist) break;
      offset = start + size;
    }
  } catch {
    // Leave `tags` partially filled; the caller falls back to the filename.
  } finally {
    fs.closeSync(fd);
  }
  return tags;
}

/** `01 - Intro Song.mp3` → `Intro Song`. */
function prettify(fileName: string): string {
  const base = fileName
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+\s*[-._)]\s*/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return fileName;
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function discover(audioDir: string) {
  let entries: string[];
  try {
    entries = fs.readdirSync(audioDir);
  } catch {
    return [];
  }
  return entries
    .filter((name) => !name.startsWith('.') && AUDIO_EXTENSIONS.has(path.extname(name).toLowerCase()))
    // Numeric collation so `track-2` sorts before `track-10`.
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((name) => {
      const tags = readTags(path.join(audioDir, name));
      return {
        file: name,
        title: tags.title || prettify(name),
        artist: tags.artist || null,
      };
    });
}

export function audioTracksPlugin(audioDir = path.resolve(process.cwd(), 'public/audio')): Plugin {
  const dir = path.resolve(audioDir);
  return {
    name: 'portfolio:audio-tracks',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const tracks = discover(dir);
      for (const track of tracks) this.addWatchFile(path.join(dir, track.file));
      return `export const tracks = ${JSON.stringify(tracks, null, 2)};\n`;
    },
    // During `npm run dev`, reloading when the folder changes keeps the playlist live.
    configureServer(server) {
      server.watcher.add(dir);
      const reload = (file: string) => {
        if (path.resolve(file).startsWith(dir)) server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', reload);
      server.watcher.on('unlink', reload);
    },
  };
}