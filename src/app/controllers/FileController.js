import File from '../models/File';

class FileController {
  async store(req, res) {
    // req.file is due to multer as it inserts this variable with some file info
    const { originalname: name, filename: path } = req.file;

    // inserting the entries in the table
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
