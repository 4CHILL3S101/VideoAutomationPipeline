import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  useCurrentFrame,
} from "remotion";

import { ImageLayer } from "../layers/ImageLayer";
import { CaptionOverlay } from "./CaptionComposition";
import type { TransitionMode, VideoCompositionProps } from "../types/video";

export const VideoComposition = ({
  images,
  voice,
  music,
  timing,
  captions,
  transitionMode = "fade",
}: VideoCompositionProps) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {images.map((img, i) => (
        <Sequence
          key={i}
          from={Math.round(timing.offsets[i] * 30)}
          durationInFrames={Math.round(timing.durations[i] * 30)}
        >
          <ImageLayer
            src={staticFile(img)}
            duration={Math.round(timing.durations[i] * 30)}
            mode={transitionMode}
          />
        </Sequence>
      ))}

      <Audio src={staticFile(voice)} />
      <Audio src={staticFile(music)} volume={0.15} loop />

      <CaptionOverlay captions={captions} currentFrame={frame} />
    </AbsoluteFill>
  );
};