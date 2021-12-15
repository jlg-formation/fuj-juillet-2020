import express from 'express';
import multer from 'multer';

const uploadDir = './uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
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
  res.status(201).json({url: req.file?.filename});
});

app.use(express.static(uploadDir));

export const upload = app;
