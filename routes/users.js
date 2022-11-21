const express = require('express');
const multer = require('multer');

const db = require('../data/database');

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

router.get('/', async function (req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', { users: users });
});

router.get('/new-user', function (req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function (req, res) {
  // the upload middleware allows access to the file ('name tag of the form'); => multer package
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path
  })

  res.redirect('/');
});

module.exports = router;
