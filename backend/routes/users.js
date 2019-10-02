const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async (req, res) => {
  try {
    const foundUser = await User.find();
    res.send(foundUser);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/add', async (req, res) => {
  const username = req.body.username;

  try {
    const newUser = new User({ username });

    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
