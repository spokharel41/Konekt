const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // Optional for CSS, images, etc.

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  const { facebook, instagram, twitter } = req.query;
  res.render('profile', {
    facebook: decodeURIComponent(facebook || ''),
    instagram: decodeURIComponent(instagram || ''),
    twitter: decodeURIComponent(twitter || '')
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
