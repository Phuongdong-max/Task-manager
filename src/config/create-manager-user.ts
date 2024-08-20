import bcrypt from "bcryptjs";
import { User } from "../models";

export const createManagerUser = async () => {
  try {
    const existingUser = await User.findOne({ where: { username: "manager" } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("password", 10);

      await User.create({
        username: "manager",
        email: "manager@example.com",
        password: hashedPassword,
        role: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("Manager user created successfully!");
    } else {
      console.log("Manager user already exists.");
    }
  } catch (error) {
    console.error("Error creating manager user:", error);
  }
};
