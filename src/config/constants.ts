// Video rendering configuration constants
export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  defaultDurationSeconds: 10,
  musicVolume: 0.15,
  codecDefault: "h264",
} as const;

// Composition settings
export const COMPOSITION_CONFIG = {
  id: "VideoComposition",
  serveUrl: "http://localhost:3000",
} as const;

// Default composition props for preview
export const DEFAULT_COMPOSITION_PROPS = {
  images: ["image1.jpg", "image2.jpg", "image3.jpg"],
  voice: "voice.mp3",
  music: "music.mp3",
  timing: {
    durations: [3.33, 3.33, 3.34],
    offsets: [0, 3.17, 6.34],
    totalDuration: 10,
  },
  captions: [
    { start: 0, end: 3, text: "Welcome to the video" },
    { start: 3, end: 6, text: "This is the second scene" },
    { start: 6, end: 10, text: "Thanks for watching" },
  ],
} as const;
