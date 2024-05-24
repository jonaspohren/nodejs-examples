import sharp from "sharp";
import { readFile } from "fs/promises";

async function resize() {
  const imageAsBuffer = await readFile("sample/pup.jpg");

  await sharp(imageAsBuffer)
    .resize({ width: 100, height: 100, fit: "cover", kernel: "lanczos3" })
    .toFormat("jpg", { quality: 95 })
    .toFile("output/pup_100x100.jpg");
}

resize().catch(err => console.log(err));
