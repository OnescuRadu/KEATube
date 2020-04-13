const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('videos'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

const navbarPage = fs.readFileSync('./public/navbar/navbar.html', 'utf8');
const footerPage = fs.readFileSync('./public/footer/footer.html', 'utf8');
const frontpagePage = fs.readFileSync(
  './public/frontpage/frontpage.html',
  'utf8'
);
const playerPage = fs.readFileSync('./public/player/player.html', 'utf8');
const uploadPage = fs.readFileSync('./public/upload/upload.html', 'utf8');

app.get('/', (req, res) => {
  return res.send(navbarPage + frontpagePage + footerPage);
});

app.get('/player/:videoid', (req, res) => {
  return res.send(navbarPage + playerPage + footerPage);
});

app.get('/upload', (req, res) => {
  return res.send(navbarPage + uploadPage + footerPage);
});



// Import Routes
const videosRoute = require('./routes/videos');
// Setup Routes
app.use(videosRoute);

app.listen(process.env.PORT ? process.env.PORT : 3001, error => {
  if (error) {
    console.error(error);
  } else console.log(`Server running on port ${process.env.PORT}...`);
});
