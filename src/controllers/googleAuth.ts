import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcryptjs";
import { User } from "../models";
import jwt from "jsonwebtoken";

export const ggAuth = async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log(token);

  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code: token,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:4000/login",
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );

    const { id: password, name: username, email } = userInfo.data;

    const user = await User.findOne({ where: { email } });

    // Register
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = "employee";
      try {
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
          role,
        });
        const token = jwt.sign({ id: user.id, role: user.role }, "token", {
          expiresIn: "1h",
        });
        res.status(200).json({ token, role: user.role });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      //Login
      try {
        const token = jwt.sign({ id: user.id, role: user.role }, "token", {
          expiresIn: "1h",
        });
        res.status(200).json({ token, role: user.role });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error: any) {
    if (error) {
      console.error("Google API error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from Google API", error.request);
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
};
