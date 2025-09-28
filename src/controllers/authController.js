import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import Company from "../models/Company.js";

export const registerEmployee = async (req, res) => {
  try {
    const { username, password, companyCode } = req.body;

    const company = await Company.findOne({ companyCode });
    if (!company) return res.status(404).json({ error: "Company not found" });

    const user = new User({
      username,
      password,
      role: "employee",
      companyCode: companyCode,
      companyId: company._id,
    });
    await user.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { username, password, companyCode } = req.body;

    const company = await Company.findOne({ companyCode });
    if (!company) return res.status(404).json({ error: "Company not found" });

    const user = new User({
      username,
      password,
      role: "admin",
      companyId: company._id,
    });
    await user.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password, companyCode } = req.body;

    const company = await Company.findOne({ companyCode });
    if (!company) return res.status(404).json({ error: "Company not found" });

    const user = await User.findOne({
      username,
      companyId: company._id,
    }).populate("companyId");
    if (!user)
      return res.status(404).json({ error: "User not found in this company" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        companyId: company._id,
        companyCode,
        time_start: company.time_start,
        time_end: company.time_end,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      company: {
        code: company.companyCode,
        name: company.name,
      },
      working_hours: {
        start: company.time_start,
        end: company.time_end,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const users = await User.find({ companyId }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
