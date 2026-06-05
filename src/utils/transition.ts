import { interpolate } from "remotion";
import type { TransitionMode } from "../types/video";

export function getTransitionStyle(
  mode: TransitionMode,
  frame: number,
  duration: number,
  fps: number
) {
  if (mode === "none") {
    return { opacity: 1, scale: 1 };
  }

  const fade = Math.round(0.5 * fps);

  const opacity = interpolate(
    frame,
    [0, fade, duration - fade, duration],
    [0, 1, 1, 0]
  );

  const scale =
    mode === "cinematic"
      ? interpolate(frame, [0, duration], [1, 1.1])
      : 1;

  return { opacity, scale };
}