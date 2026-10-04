/**
 * Generated at build time by `vite-plugin-audio-tracks.ts`, which scans
 * `public/audio/`. The playlist therefore follows the folder contents.
 */
declare module 'virtual:audio-tracks' {
  /** One playable file discovered in `public/audio/`. */
  export interface AudioTrack {
    /** ID3 title when the file has one, otherwise a prettified filename. */
    title: string;
    /** ID3 artist when the file has one, otherwise `null`. */
    artist: string | null;
    /** Bare filename inside `public/audio/`, for example `track-1.mp3`. */
    file: string;
  }
  export const tracks: AudioTrack[];
}