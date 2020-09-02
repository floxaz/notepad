const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { promisify } = require('util');

const signToken = userID => jwt.sign({ id: userID }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRATION
});

exports.signup = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201);
    res.json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400);
    if (err.code === 11000) {
      res.json({
        status: 'failure',
        message: 'This email is already in use'
      });
    } else {
      res.json({
        status: 'failure',
        message: err
      });
    }
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return res.json({
      status: "failure",
      message: `Please provide email and password`,
    });
  }

  const currentUser = await User.findOne({ email }).select("+password");
  if (!currentUser || !(await currentUser.correctPassword(password, currentUser.password))) {
    res.status(401);
    return res.json({
      status: "failure",
      message: "Incorrect email or password",
    });
  }

  const token = signToken(currentUser._id);

  res.json({
    status: "success",
    token,
    data: {
      user: {
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email
      },
    },
  });
};

exports.protect = async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    return res.json({
      status: "failure",
      message: "You are not logged in! Please login to get access!",
    });
  }

  let decoded = {};

  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    return res.json({
      status: "failure",
      message: err.message,
    });
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401);
    return res.json({
      status: "failure",
      message: "The user belonging to this token does not exist",
    });
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    res.status(401);
    return res.json({
      status: 'failure',
      message: 'User recently has changed the password, pleas login again'
    });
  }

  req.user = currentUser;
  next();
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = User.findOne({ email });
  if (!user) {
    throw new AppError('There is no user with that email address!', 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
}
