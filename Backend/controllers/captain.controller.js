const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blacklistedTokenModel = require("../models/blacklistedToken.model");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const captainAlreadyExists = await captainModel.findOne({ email });

  if (captainAlreadyExists) {
    return res
      .status(400)
      .json({ message: "Captain with this email already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordCorrect = await captain.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

module.exports.getProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistedTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Logged out successfully" });
};
