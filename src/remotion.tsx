import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {VideoComposition} from './composition/VideoComposition';
import { VIDEO_CONFIG, DEFAULT_COMPOSITION_PROPS } from './config/constants';

const RemotionVideo: React.FC = () => (
  <Composition
    id="VideoComposition"
    component={VideoComposition}
    durationInFrames={VIDEO_CONFIG.fps * 60}
    fps={VIDEO_CONFIG.fps}
    width={VIDEO_CONFIG.width}
    height={VIDEO_CONFIG.height}
    defaultProps={DEFAULT_COMPOSITION_PROPS as any}
    calculateMetadata={({ props }: any) => {
      const durationSeconds =
        props.timing?.totalDuration ?? VIDEO_CONFIG.defaultDurationSeconds;
      return {
        durationInFrames: Math.max(
          1,
          Math.ceil(durationSeconds * VIDEO_CONFIG.fps)
        ),
      };
    }}
  />
);

registerRoot(RemotionVideo);
