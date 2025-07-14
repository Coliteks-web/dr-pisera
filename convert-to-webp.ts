// convert-to-webp.ts

import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join(process.cwd(), "public/images/jpg");
const outputDir = path.join(process.cwd(), "public/images/webp");

// Tworzy folder /webp jeśli nie istnieje
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("❌ Błąd czytania folderu:", err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") {
      const inputPath = path.join(inputDir, file);
      const outputFileName = file.replace(/\.(jpe?g)$/i, ".webp");
      const outputPath = path.join(outputDir, outputFileName);

      sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath)
        .then(() => {
          console.log(`✅ ${file} ➜ ${outputFileName}`);
        })
        .catch((err) => {
          console.error(`❌ Błąd konwersji ${file}:`, err);
        });
    }
  });
});
