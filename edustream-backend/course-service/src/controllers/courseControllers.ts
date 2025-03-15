import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createCourse = async (req: Request, res: Response) => {
    try {
      const { title, description, instructorId, ratings, price, type } = req.body;
  
      const newCourse = await prisma.course.create({
        data: {
          title,
          description,
          instructorId, 
          enrolledUsers: [],
          purchaseDates: {}, 
          ratings,
          price,
          type,
        },
      });
  
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: "Failed to create course" });
    }
  };

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.json(course);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};


export const getCourseStudentCount = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.id);
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const enrolledUsers = Array.isArray(course.enrolledUsers) ? course.enrolledUsers : [];
    res.json({ studentsCount: enrolledUsers.length });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};


export const enrollUserInCourse = async (req: Request, res: Response) => {
  const { courseId, userId, username } = req.body;

  if (!courseId || !userId || !username) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    
    if (!course) {
      throw new Error("Course not found");
    }
    
    const enrolledUsersArray = Array.isArray(course.enrolledUsers)
      ? course.enrolledUsers
      : [];
    
    const purchaseDatesArray = Array.isArray(course.purchaseDates)
      ? course.purchaseDates
      : [];
    
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        enrolledUsers: [
          ...enrolledUsersArray,
          userId, 
        ],
        purchaseDates: [
          ...purchaseDatesArray,
          {
            username: username,
            date: new Date(),
          },
        ],
      },
    });
    

    res.status(200).json({
      message: "User enrolled successfully",
      course,
    });
    return;
  } catch (err) {
    console.error("Error enrolling user:", err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

