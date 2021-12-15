import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    console.log('file: ', file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  },
});

const app = express.Router();

app.post('/', multer({storage}).single('file'), (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);
  res.status(201).json({ok: true});
});

export const upload = app;
