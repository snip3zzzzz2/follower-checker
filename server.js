const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// CHANGE THIS to the UserId you want players to follow
const DEV_USERID = 21260004;

app.get('/', (req, res) => {
  res.send('Follower Checker is running!');
});

app.post('/check-following', async (req, res) => {
  const { playerUserId } = req.body;
  if (!playerUserId) return res.status(400).json({ error: "Missing playerUserId" });
  try {
    // Get the latest 100 followers of the dev account
    const response = await axios.get(`https://users.roproxy.com/v1/users/${DEV_USERID}/followers?limit=100`);
    const isFollowing = response.data.data.some(follower => follower.id == playerUserId);
    res.json({ isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error contacting RoProxy.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
