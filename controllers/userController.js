const User = require("../models/User");

// @desc     Create User
// @route    POST /api/v1/users
// @access   Public
exports.addUser = async (req, res, next) => {
    try {
      const { name, email, cell, age } = req.body;
    // Create User
    const user = await User.create({
      name,
      email,
      cell,
      age,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // mongoose duplicate key
    if (error.code === 11000) {
      const message = `User already exists with this email`;
        res.status(400).json({
          success: false,
          data: message
        });
        next()
      }
    
    // mongoose validation error
    if (error.name === "ValidationError") {
      //getting error messages when we leave a field empty which are inside error array
      const message = Object.values(error.errors).map((val) => val.message);
      res.status(error.statusCode || 500).json({ success: false, error: message || "Server Error" });
    }
}
}
  

// @desc     Get All Users
// @route    GET /api/v1/users
// @access   Public
exports.getUsers = async (req, res, next) => {
  try {
    const reqQuery = req.query;
    const users = await User.find(reqQuery);
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    if (error.name === "CastError") {
      const message = `User not found with id of ${error.value}`;
      res.status(404).json({
        success: false,
        data: message,
      });
    }
  }
}
