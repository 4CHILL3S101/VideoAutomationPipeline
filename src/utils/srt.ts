import type { Caption } from "../types/video";

export function parseSRT(srt: string): Caption[] {
  const blocks = srt.trim().split("\n\n");

  return blocks.map((block) => {
    const [, time, ...text] = block.split("\n");

    const [start, end] = time
      .split(" --> ")
      .map(convertTime);

    return {
      start,
      end,
      text: text.join(" "),
    };
  });
}

function convertTime(t: string) {
  const [h, m, s] = t.replace(",", ".").split(":");
  return (
    parseInt(h) * 3600 +
    parseInt(m) * 60 +
    parseFloat(s)
  );
}