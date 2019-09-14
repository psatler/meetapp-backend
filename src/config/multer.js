import multer from 'multer';
import crypto from 'crypto'; // nodejs lib
import { extname, resolve } from 'path'; // nodejs lib

// exporting a configuration object
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      // try to hash the file name
      crypto.randomBytes(16, (err, res) => {
        if (err) {
          callback(err);
        }

        // console.log('req', req);
        console.log('file', file);

        const fileName = res.toString('hex') + extname(file.originalname);
        return callback(null, fileName);
      });
    },
  }),
};
