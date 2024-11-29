const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListedToken = require("../models/blacklistToken.model");

const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password, fullname, vehicle } = req.body;
  try {
    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exist" });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token });
  } catch (error) {
    console.log("registerCaptain error", error);
    res.status(500).json({ message: error });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = captain.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ captain, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    // const captain = await captainModel.findById(req.user._id);
    // if (!captain) {
    //   return res.status(404).json({ message: "Captain not found" });
    // }
    res.status(200).json({ captain: req.captain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // if (!token) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    await blackListedToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};