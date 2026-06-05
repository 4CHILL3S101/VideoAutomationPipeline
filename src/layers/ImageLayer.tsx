import React from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { getTransitionStyle } from "../utils/transition";
import type { TransitionMode } from "../types/video";

type Props = {
  src: string;
  duration: number;
  mode: TransitionMode;
};

export const ImageLayer = ({ src, duration, mode }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, scale } = getTransitionStyle(
    mode,
    frame,
    duration,
    fps
  );

  return (
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};
