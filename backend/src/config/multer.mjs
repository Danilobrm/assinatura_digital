import crypto from 'crypto';
import multer from 'multer';

import { getFolderName } from '../middlewares/getFolderName.mjs';
import { getDestinationFolder } from './getDestinationFolder.mjs';

export default {
  upload(folder) {
    return {
      storage: multer.diskStorage({
        destination: async (req, file, callback) => {
          console.log(folder)
          console.log("patient_id")
          const { patient_id } = req.body;
          const folderName = getFolderName(patient_id);

          const destination = getDestinationFolder(folder, folderName);

          callback(null, destination);
        },
        filename: (req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
      fileFilter: (
        req,
        file,
        callback,
      ) => {
        if (
          file.mimetype == 'application/pdf'
        ) {
          return callback(null, true);
        }

        callback(null, false);
        return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
      },
    };
  },
};
