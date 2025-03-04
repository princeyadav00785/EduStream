import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Register a new user
export const registerUser: RequestHandler = async (req, res) => {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        imageLink,
        dateOfBirth,
        address,
    } = req.body;
    
    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return; // End the function after sending the response
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
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
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
export const loginUser: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return; // End the function after sending the response
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return; // End the function after sending the response
        }

        const token = jwt.sign({ id: user.id ,role :user.role}, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// status api
export const apiStatus:RequestHandler =(req,res)=>{
    res.status(200).json({message:'Auth api is running'});
}