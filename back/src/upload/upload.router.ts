import express from 'express';
import multer from 'multer';
import fs from 'fs';

const uploadDir = './uploads';
fs.mkdirSync(uploadDir, {recursive: true});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log('file: ', file);
    cb(null, file.originalname);
  },
});

const app = express.Router();

app.post('/', multer({storage}).single('file'), (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);
  console.log('req.baseUrl: ', req.baseUrl);
  res.status(201).json({url: req.baseUrl + '/' + req.file?.filename});
});

app.use(express.static(uploadDir));

export const upload = app;
