export type TransitionMode = "none" | "fade" | "cinematic";

export type Caption = {
  start: number;
  end: number;
  text: string;
};

export type TimingOutput = {
  durations: number[];
  offsets: number[];
  totalDuration: number;
};

export type VideoCompositionProps = {
  images: string[];
  voice: string;
  music: string;
  timing: {
    durations: number[];
    offsets: number[];
    totalDuration?: number;
  };
  captions: Caption[];
  transitionMode?: TransitionMode;
};
