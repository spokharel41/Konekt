const express = require('express');
const qrcode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for profiles
const profiles = {};

app.get('/', (req, res) => {
  res.render('index');
});

// Form submission route
app.post('/create-profile', async (req, res) => {
  const { username, facebook, instagram, twitter, youtube, tiktok, snapchat, threads } = req.body;

  const profileId = uuidv4();

  // Save profile data in-memory
  profiles[profileId] = {
    username: username || 'User',
    links: { facebook, instagram, twitter, youtube, tiktok, snapchat, threads }
  };

  // Generate URL for profile
  const profileUrl = `${req.protocol}://${req.get('host')}/connect/${profileId}`;

  // Generate QR code image for that URL
  try {
    const qrCodeDataUrl = await qrcode.toDataURL(profileUrl);

    res.render('profile-created', {
      username,
      profileUrl,
      qrCodeDataUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate QR code');
  }
});

// Connect page — shown when scanning QR code
app.get('/connect/:profileId', (req, res) => {
  const profileId = req.params.profileId;
  const profile = profiles[profileId];

  if (!profile) {
    return res.status(404).send('Profile not found');
  }

  res.render('connect', {
    username: profile.username,
    links: profile.links
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
