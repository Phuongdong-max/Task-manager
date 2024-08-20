"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ggAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ggAuth = async (req, res) => {
    const { token } = req.body;
    try {
        const response = await axios_1.default.post("https://oauth2.googleapis.com/token", {
            code: token,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: "http://localhost:4000/login",
            grant_type: "authorization_code",
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const { access_token } = response.data;
        const userInfo = await axios_1.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`);
        const { id: password, name: username, email } = userInfo.data;
        const user = await models_1.User.findOne({ where: { email } });
        // Register
        if (!user) {
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const role = "employee";
            try {
                const user = await models_1.User.create({
                    username,
                    email,
                    password: hashedPassword,
                    role,
                });
                const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, "token", {
                    expiresIn: "1h",
                });
                res.status(200).json({ token, role: user.role });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        }
        else {
            //Login
            try {
                const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, "token", {
                    expiresIn: "1h",
                });
                res.status(200).json({ token, role: user.role });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    catch (error) {
        if (error) {
            console.error("Google API error:", error.response.data);
        }
        else if (error.request) {
            console.error("No response received from Google API", error.request);
        }
        else {
            console.error("Unexpected error:", error.message);
        }
    }
};
exports.ggAuth = ggAuth;
