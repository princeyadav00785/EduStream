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

    const enrolledUsers = JSON.parse(typeof course.enrolledUsers === "string" ? course.enrolledUsers : "[]");
    res.json({ studentsCount: enrolledUsers.length });
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
