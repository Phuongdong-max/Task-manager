"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const task_1 = __importDefault(require("./routes/task"));
const auth_1 = __importDefault(require("./routes/auth"));
const cv_1 = __importDefault(require("./routes/cv"));
const database_1 = require("./config/database");
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(body_parser_1.default.json());
app.use("/api/users", user_1.default);
app.use("/api/tasks", task_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/cv", cv_1.default);
const PORT = process.env.PORT || 5000;
database_1.sequelize
    .sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
