# Audio assets (music player)

Drop the three MP3 files for the on-site music player in this folder.

The player expects these filenames (edit `src/components/MusicPlayer.tsx` to change
titles or filenames):

- `track-1.mp3` (currently "Magnetic" — 아일릿 ILLIT)
- `track-2.mp3` (currently "Ditto" — NewJeans)
- `track-3.mp3` (currently "Super Shy" — NewJeans)

Anything in `public/` is served from the Vite base path, so `public/audio/track-1.mp3`
is available at `/portfolio/audio/track-1.mp3` in the production build and during
`npm run dev`.

Tips
- Keep files reasonably small (e.g. 96–192 kbps mono/stereo) so they load quickly.
- You can reorder or rename freely — just keep the `tracks` list in
  `src/components/MusicPlayer.tsx` in sync.
- If a file is missing, the player shows "Audio unavailable" instead of breaking.
