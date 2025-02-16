"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName, email, phoneNumber, imageLink, dateOfBirth, address, } = req.body;
    try {
        // Check if user exists
        const existingUser = yield prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return; // End the function after sending the response
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                phoneNumber,
                imageLink,
                dateOfBirth,
                address,
                coursePurchaseDates: [], // Provide an empty array for coursePurchaseDates
            },
        });
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return; // End the function after sending the response
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return; // End the function after sending the response
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
