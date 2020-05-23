const User = require('../models/userModel');

exports.signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm
    });
    res.status(201);
    res.json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400);
    res.json({
      status: 'failure',
      error: err
    });
  }
}

exports.login = () => {}
