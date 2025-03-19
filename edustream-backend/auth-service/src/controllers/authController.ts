import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

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
    if (!username || !password || !firstName || !lastName || !email) {
      res.status(400).json({ message: "All required fields must be filled" });
      return;
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    // console.log(existingUser);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
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
        coursePurchaseDates: [],
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    const userdata = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    // console.log(`userdata is :${userdata}`);

    res.json({ token, userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// status api
export const apiStatus: RequestHandler = (req, res) => {
  res.status(200).json({ message: "Auth api is running" });
};

export const enrollUserInCourse: RequestHandler = async (
  req: Request,
  res: Response
) => {
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
    const user = await prisma.user.findUnique({
      where: { id: numericUserId },
    });
    // console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const enrolledCourses: string[] = Array.isArray(user.enrolledCourses)
      ? user.enrolledCourses.filter((course) => typeof course === "string")
      : [];

    const coursePurchaseDates: Record<string, string> =
      user.coursePurchaseDates && typeof user.coursePurchaseDates === "object"
        ? Object.entries(user.coursePurchaseDates).reduce(
            (acc, [key, value]) => {
              if (typeof value === "string") {
                acc[key] = value;
              }
              return acc;
            },
            {} as Record<string, string>
          )
        : {};


    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId);
    }
    coursePurchaseDates[courseId] = new Date().toISOString(); 

    await prisma.user.update({
      where: { id: numericUserId },
      data: {
        enrolledCourses,
        coursePurchaseDates,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({ message: "User enrollment updated successfully" });
    return;
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getUserProfile: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        // console.log("inside profile controller");
        // console.log(userId);

        const numericUserId = Number(userId);
        if (isNaN(numericUserId)) {
             res.status(400).json({ message: "Invalid userId" });
             return;
        }
        const user = await prisma.user.findUnique({
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

    } catch (error) {
        console.error("Error fetching user profile:", error);
         res.status(500).json({ message: "Internal server error" });
         return;
    }
};
