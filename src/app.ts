import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messange";
import cvRoutes from "./routes/cv";
import { sequelize } from "./config/database";
import "dotenv/config";

import { createManagerUser } from "./config/create-manager-user";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/message", messageRoutes);

createManagerUser();

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
