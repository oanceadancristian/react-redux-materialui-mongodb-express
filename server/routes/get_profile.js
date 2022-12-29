const router = require('express').Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error!' });
  }
});

module.exports = router;
