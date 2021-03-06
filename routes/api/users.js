const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   Post api/users
//  @desc   User Registration
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is Required.').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check(
      'password',
      'Please enter a Password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if User already Exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already Exist with Email' }] });
      }

      // Get User Gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // Encrypt UserPAssword - Using Bcrypt
      user = new User({ name, email, avatar, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JWT for the user
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get('jwt-secret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
