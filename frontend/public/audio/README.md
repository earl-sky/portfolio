# Audio assets (music player)

Drop any number of MP3 files in this folder. The player discovers them at build
time — there is no playlist to maintain and no code to edit.

## How it works

`../vite-plugin-audio-tracks.ts` scans this folder during `npm run build` and
generates the module `virtual:audio-tracks`, which `src/components/MusicPlayer.tsx`
consumes. Adding or removing files changes the playlist on the next build.

- **Ordering** is natural filename order, so `track-2.mp3` comes before
  `track-10.mp3`. Numbering with a prefix such as `01 - Intro.mp3` also works.
- **Titles** come from each file's ID3 tag when it has one. Otherwise the
  filename is used, with a leading number prefix and separators tidied up
  (`05 - My Song.mp3` displays as `My Song`).
- **Extensions** recognised: `.mp3`, `.m4a`, `.aac`, `.ogg`, `.wav`, `.flac`.
  Dotfiles (such as `.DS_Store`) are ignored.
- Anything in `public/` is served from the Vite base path, so `public/audio/track-1.mp3`
  is available at `/portfolio/audio/track-1.mp3` in the production build and during
  `npm run dev`. Filenames are URL-encoded automatically, so spaces and non-ASCII
  characters are safe.

## Rebuilding

In Docker, the folder is copied into the image at build time, so run:

```bash
docker compose build frontend && docker compose up -d frontend
```

During `npm run dev` the page reloads by itself when files are added or removed.

Tips
- Keep files reasonably small (e.g. 96–192 kbps mono/stereo) so they load quickly.
- If a file is missing or unreadable, the player shows "Audio unavailable"
  instead of breaking.
