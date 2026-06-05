import { renderMedia } from "@remotion/renderer";
import path from "path";
import type { VideoConfig } from "remotion/no-react";
import { VIDEO_CONFIG, COMPOSITION_CONFIG } from "../config/constants";

export async function renderVideo(input: any) {
  const composition: VideoConfig = {
    width: VIDEO_CONFIG.width,
    height: VIDEO_CONFIG.height,
    fps: VIDEO_CONFIG.fps,
    durationInFrames: Math.round(input.timing.totalDuration * VIDEO_CONFIG.fps),
    id: COMPOSITION_CONFIG.id,
    defaultProps: {},
    props: {},
    defaultCodec: null,
    defaultOutName: null,
    defaultVideoImageFormat: null,
    defaultPixelFormat: null,
    defaultProResProfile: null,
    defaultSampleRate: null,
  };

  await renderMedia({
    composition,
    codec: VIDEO_CONFIG.codecDefault as any,
    outputLocation: path.resolve("output/output.mp4"),
    inputProps: input,
    serveUrl: COMPOSITION_CONFIG.serveUrl,
  });
}
