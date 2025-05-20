const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Form page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission and generate QR code
app.post('/create-profile', async (req, res) => {
  const data = req.body;

  // Build the profile URL with query params
  const baseUrl = 'https://konekt.onrender.com/profile';
  const params = new URLSearchParams(data).toString();
  const profileUrl = `${baseUrl}?${params}`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(profileUrl);
    res.render('qrcode', { qrCodeDataUrl, profileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate QR code');
  }
});

// Profile page that shows user info from URL params
app.get('/profile', (req, res) => {
  const data = req.query;
  res.render('profile', { ...data }); // ✅ Spread data for direct access in EJS
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});