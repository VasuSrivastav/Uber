const User = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListedToken = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password, fullname } = req.body;
  try {
    // hashPassword method is a static method of the User model created in the user.model.js file
    const hashedPassword = await User.hashPassword(password);
    // here we are using the userService to create a user as there db operations are handled in the service
    //
    const user = await userService.createUser({
      email,
      password: hashedPassword,
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    });
    // generateAuthToken method is an instance method of the User model created in the user.model.js file
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    console.log("registerUser error", error);
    res.status(500).json({ message: error });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // comparePassword method is an instance method of the User model created in the user.model.js file
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // generateAuthToken method is an instance method of the User model created in the user.model.js file
    const token = user.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        });


    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    // authUser middleware is used to get the user from the token
    // therefore we can access the user from the req object
    // const user = await User.findById(req.user._id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    // console.log("getUserProfile", req.user);
    res.status(200).json(req.user);
  } catch (error) {
    console.log("getUserprofile error", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListedToken.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};