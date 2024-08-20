"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = await user_1.default.findOne({ where: { email } });
    if (user) {
        return res.status(401).json({ error: "Have account " });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        const user = await user_1.default.create({
            username,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, "token", {
            expiresIn: "1h",
        });
        res.status(200).json({ token, role: user.role });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
const getUsers = async (req, res) => {
    try {
        const users = await user_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(error, req, res);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getUsers = getUsers;
