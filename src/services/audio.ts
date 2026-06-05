import { exec } from "child_process";

export function getAudioDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const cmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(error);

      const duration = parseFloat(stdout.trim());

      if (isNaN(duration)) {
        return reject(new Error("Failed to parse ffprobe duration"));
      }

      resolve(duration);
    });
  });
}
