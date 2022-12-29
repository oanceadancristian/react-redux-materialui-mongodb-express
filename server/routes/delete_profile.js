const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.delete('/:userId', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(401).send({ message: 'Invalid Email or Password!' });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid Email or Password!' });
    }
    await User.findByIdAndDelete({ _id: req.params.userId });
    res.status(201).send({
      message: 'Account deleted successfully!',
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error!' });
  }
});

module.exports = router;
