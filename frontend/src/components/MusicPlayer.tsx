import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { tracks } from 'virtual:audio-tracks';

// ── Music source ─────────────────────────────────────────────────────────────
// `tracks` is generated at build time by `vite-plugin-audio-tracks.ts`, which
// scans `frontend/public/audio/`. Drop any number of MP3s into that folder and
// rebuild; the playlist follows the folder, so this file never needs editing.
// `import.meta.env.BASE_URL` resolves to the Vite base ("/portfolio/"), so the
// same paths work in `npm run dev` and in the production build.

const total = tracks.length;

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const total = Math.floor(value);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unavailable, setUnavailable] = useState(false);

  const track = tracks[trackIndex];
  // Encode the filename so spaces and non-ASCII characters stay URL-safe.
  const src = track ? `${import.meta.env.BASE_URL}audio/${encodeURIComponent(track.file)}` : undefined;
  const label = total === 0 ? 'No audio files' : unavailable ? 'Audio unavailable' : track?.title ?? '';
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  // With one track there is nothing to step to; with none, ignore entirely.
  const step = useCallback((delta: number) => {
    if (total < 2) return;
    setTrackIndex((index) => (index + delta + total) % total);
  }, [total]);

  // With a single track, `step` cannot change the index, so replay it instead.
  const restart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      setPlaying(false);
      setUnavailable(true);
    });
  }, []);

  const seek = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }, []);

  // Reset the readout whenever the selected track changes.
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setUnavailable(false);
  }, [trackIndex]);

  // Drive the media element from the `playing` flag and the current track.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (!playing) {
      audio.pause();
      return;
    }
    void audio.play().catch(() => {
      setPlaying(false);
      setUnavailable(true);
    });
  }, [playing, trackIndex, src]);

  // Keep the element's mute state in sync.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  return (
    <div className="music-player no-print" role="region" aria-label="Background music player">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => (total > 1 ? step(1) : restart())}
        onError={() => {
          setPlaying(false);
          setUnavailable(true);
        }}
      />
      <div className="music-player-top">
        <button type="button" className="music-player-btn" onClick={() => step(-1)} disabled={total < 2} aria-label="Previous track"><SkipBack size={14} aria-hidden="true" /></button>
        <button type="button" className="music-player-btn music-player-play" onClick={() => setPlaying((value) => !value)} disabled={total === 0} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing}>{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}</button>
        <button type="button" className="music-player-btn" onClick={() => step(1)} disabled={total < 2} aria-label="Next track"><SkipForward size={14} aria-hidden="true" /></button>
        <span className="music-player-title"><Music size={12} aria-hidden="true" /><span className="music-player-title-text">{label}</span></span>
        <span className="music-player-time">{total > 0 ? `${trackIndex + 1} / ${total}` : '0 / 0'}</span>
        <button type="button" className="music-player-btn" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>{muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}</button>
      </div>
      <div className="music-player-bottom">
        <span className="music-player-time">{formatTime(currentTime)}</span>
        <button type="button" className="music-player-track" onClick={seek} aria-label="Seek"><span className="music-player-fill" style={{ width: `${progress}%` }} /></button>
        <span className="music-player-time">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
