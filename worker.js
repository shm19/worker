// ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
const { workerData, parentPort } = require("node:worker_threads");
const { spawn } = require("node:child_process");
const path = require("node:path");

const { fileName } = workerData;
const inputPath = path.join(__dirname, "input", fileName);
const outputPath = path.join(__dirname, "output", fileName);

const ffmpeg = spawn("ffmpeg", [
  "-i",
  inputPath,
  "-vcodec",
  "libx265",
  "-crf",
  "28",
  outputPath,
]);

ffmpeg.stderr.on("data", (data) => {
  parentPort.postMessage(data.toString());
  if (data.toString().match(/already exists/)) ffmpeg.kill();
});
