import { dirname, resolve } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export function getDestinationFolder(folder, folderName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const destination = resolve(
    __dirname,
    "..",
    "..",
    `./${folder}/${folderName}`
  );

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  return destination;
}
