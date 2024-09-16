import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs'

export function getFolderName(patient_id) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Define the directory where patient folders are located
  const baseDir = path.join(__dirname, "../");

  // Get the folder name based on patient ID
  const folderName = `${patient_id}`;
  const folderPath = path.join(baseDir, folderName);

  // Check if the folder exists
  if (fs.existsSync(folderPath)) {
    console.log(`Folder for patient ID ${patient_id} found: ${folderPath}`);
    return folderPath;
  } else {
    console.log(`Folder for patient ID ${patient_id} does not exist`);
    return null;
  }
}
