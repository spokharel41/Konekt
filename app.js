const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index'); // show form
});

app.post('/profile', (req, res) => {
  // Extract form data
  const username = req.body.username || "User";

  // Build links object with keys matching Font Awesome icon names
  // We'll only include non-empty values
  const links = {};
  if (req.body.facebook) links.facebook = req.body.facebook;
  if (req.body.instagram) links.instagram = req.body.instagram;
  if (req.body.twitter) links.twitter = req.body.twitter;
  if (req.body.youtube) links.youtube = req.body.youtube;
  if (req.body.tiktok) links.tiktok = req.body.tiktok;
  if (req.body.snapchat) links.snapchat = req.body.snapchat;
  if (req.body.threads) links.threads = req.body.threads;

  res.render('profile', { username, links });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
