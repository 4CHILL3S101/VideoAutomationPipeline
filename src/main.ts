import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { getAudioDuration } from "./services/audio";
import { buildTiming } from "./utils/timing";
import { parseSRT } from "./utils/srt";
import type { TransitionMode } from "./types/video";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const assets = path.join(__dirname, "../assets");

  const images = fs
    .readdirSync(assets)
    .filter((f: string) => f.endsWith(".jpg"))
    .sort();

  const imageFiles = images;
  const voice = "voice.mp3";
  const music = "music.mp3";
  const captionsFile = path.join(assets, "captions.srt");
  const voiceDuration = await getAudioDuration(path.join(assets, voice));
  const fps = 30;
  const durationInFrames = Math.ceil(voiceDuration * fps);


  const timing = buildTiming({
    imageCount: images.length,
    voiceDuration,
    crossfade: 0.5,
  });

  const captions = parseSRT(
    fs.readFileSync(captionsFile, "utf-8")
  );

  //NOTE: Logging for debugging purposes
  console.log("images length :", images.length);
  console.log("voice duration :", voiceDuration);
  console.log("duration in frames :", durationInFrames);
  console.log("captions length :", captions.length);

  const input = {
    images: imageFiles,
    voice,
    music,
    captions,
    timing,
    durationInFrames,
    transitionMode: "fade" as TransitionMode,
  };

  const propsDir = path.join(__dirname, "../output", "remotion-props");
  fs.mkdirSync(propsDir, { recursive: true });
  const propsPath = path.join(propsDir, "props.json");
  fs.writeFileSync(propsPath, JSON.stringify(input, null, 2));

  execSync(
    `npx remotion render ./src/remotion.tsx VideoComposition ./output/output.mp4 --props ${propsPath} --public-dir assets --duration ${durationInFrames} --overwrite`,
    {
      stdio: "inherit",
      cwd: path.join(__dirname, "../"),
    }
  );

  console.log("DONE - output/output.mp4");
}

main().catch(console.error);