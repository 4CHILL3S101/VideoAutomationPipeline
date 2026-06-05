type TimingInput = {
  imageCount: number;
  voiceDuration: number;
  crossfade: number;
};

type TimingOutput = {
  durations: number[];
  offsets: number[];
  totalDuration: number;
};

export function buildTiming({
  imageCount,
  voiceDuration,
  crossfade,
}: TimingInput): TimingOutput {
  const overlapCount = imageCount - 1;

  // distribute duration including overlap compensation
  const imageDuration =
    (voiceDuration + overlapCount * crossfade) / imageCount;

  const durations = Array(imageCount).fill(imageDuration);

  const offsets: number[] = [];

  let current = 0;

  for (let i = 0; i < imageCount; i++) {
    offsets.push(current);

    // next start = current + duration - crossfade
    current += imageDuration - crossfade;
  }

  return {
    durations,
    offsets,
    totalDuration: voiceDuration,
  };
}