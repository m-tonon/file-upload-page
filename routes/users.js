const express = require('express');
const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); // cb - call back function ('potential error','destination path')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
    // 'Date.now()' returns the number of milliseconds elapsed since January 1
  },
});

const upload = multer({ storage: storageConfig }); // how storage will be handled by multer

const router = express.Router();

router.get('/', function (req, res) {
  res.render('profiles');
});

router.get('/new-user', function (req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), function (req, res) {
  // the upload middleware allows access to the file ('name tag of the form'); => multer package
  const uploadedImageFile = req.file;
  const userData = req.body;

  console.log(uploadedImageFile);
  console.log(userData);

  res.redirect('/');
});

module.exports = router;
