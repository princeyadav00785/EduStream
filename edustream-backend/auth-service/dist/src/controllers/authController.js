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
exports.getUserProfile = exports.enrollUserInCourse = exports.apiStatus = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName, email, phoneNumber, imageLink, dateOfBirth, address, } = req.body;
    try {
        if (!username || !password || !firstName || !lastName || !email) {
            res.status(400).json({ message: "All required fields must be filled" });
            return;
        }
        // Check if user exists
        const existingUser = yield prisma.user.findUnique({
            where: { username },
        });
        // console.log(existingUser);
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
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
                coursePurchaseDates: [],
            },
        });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const userdata = {
            id: user.id,
            role: user.role,
            username: user.username,
        };
        // console.log(`userdata is :${userdata}`);
        res.json({ token, userdata });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
// status api
const apiStatus = (req, res) => {
    res.status(200).json({ message: "Auth api is running" });
};
exports.apiStatus = apiStatus;
const enrollUserInCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = req.body;
        //  console.log(userId,courseId);
        if (!userId || !courseId) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        // Ensure userId is a number
        const numericUserId = Number(userId);
        if (isNaN(numericUserId)) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }
        // Fetch the user from DB
        const user = yield prisma.user.findUnique({
            where: { id: numericUserId },
        });
        // console.log(user);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const enrolledCourses = Array.isArray(user.enrolledCourses)
            ? user.enrolledCourses.filter((course) => typeof course === "string")
            : [];
        const coursePurchaseDates = user.coursePurchaseDates && typeof user.coursePurchaseDates === "object"
            ? Object.entries(user.coursePurchaseDates).reduce((acc, [key, value]) => {
                if (typeof value === "string") {
                    acc[key] = value;
                }
                return acc;
            }, {})
            : {};
        if (!enrolledCourses.includes(courseId)) {
            enrolledCourses.push(courseId);
        }
        coursePurchaseDates[courseId] = new Date().toISOString();
        yield prisma.user.update({
            where: { id: numericUserId },
            data: {
                enrolledCourses,
                coursePurchaseDates,
                updatedAt: new Date(),
            },
        });
        res.status(200).json({ message: "User enrollment updated successfully" });
        return;
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.enrollUserInCourse = enrollUserInCourse;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // console.log("inside profile controller");
        // console.log(userId);
        const numericUserId = Number(userId);
        if (isNaN(numericUserId)) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }
        const user = yield prisma.user.findUnique({
            where: { id: numericUserId },
            select: {
                id: true,
                username: true,
                email: true,
                phoneNumber: true,
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                address: true,
                profileCompletion: true,
                role: true,
                accountStatus: true,
                lastLogin: true,
                imageLink: true,
                enrolledCourses: true,
                coursePurchaseDates: true,
                createdAt: true,
                updatedAt: true
            },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
        return;
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getUserProfile = getUserProfile;
