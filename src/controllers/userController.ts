import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(401).json({ error: "Have account " });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, "token", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error, req, res);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
