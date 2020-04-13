const router = require('express').Router();

const crypto = require('crypto');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos');
  },
  filename: (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'video') {
      const extension = file.mimetype.split('/').pop();
      cb(null, crypto.randomBytes(30).toString('hex') + '.' + extension);
    } else {
      cb('Not a video error. Mimetype: ' + file.mimetype);
    }
  }
});
const upload = multer({ storage });

const videos = [];

const videosPerPage = 10;

router.get('/videos', (req, res) => {
  const page = Number(req.query.page) ? Number(req.query.page) : 1;
  const start = (page - 1) * videosPerPage;
  const end = start + videosPerPage;

  return res.send({ response: videos.slice(start, end) });
});

router.get('/videos/:videoId', (req, res) => {
  const video = videos.find(video => video.fileName === req.params.videoId);
  return res.send({ response: video });
});

router.post('/upload', upload.single('video'), (req, res) => {
  const { title, description, category, tags } = req.body;
  const video = req.file;
  let tagArray = [];
  let errors = [];

  if (!(title && description && category && tags && video)) {
    errors.push('Invalid data!');
  }

  if (title.length < 8 || title.length > 64) {
    errors.push('Invalid title length!');
  }

  if (description.length > 2048) {
    errors.push("'Invalid description length!'");
  }

  if (errors.length > 0) {
    return res.send({ response: errors });
  }

  tagArray = tags.split(/\s*[,\s]\s*/);

  const newVideo = {
    title: title,
    description: description,
    fileName: video.filename,
    thumbnail: 'https://i.picsum.photos/id/520/300/300.jpg',
    category: category,
    tags: tagArray,
    uploadDate: new Date()
  };

  videos.push(newVideo);
  return res.redirect(`/player/${newVideo.fileName}`);
});
module.exports = router;
