import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  getCourseStudentCount,
  createCourse,
  enrollUserInCourse
} from "../controllers/courseControllers";
import { authMiddleware, isProfessor } from "../middlewares/isInstructor";
import express from "express";

const router = Router();
router.post("/enroll", enrollUserInCourse);
router.get("/",authMiddleware as unknown as express.RequestHandler ,getAllCourses);
router.get("/:id/students-count", authMiddleware as unknown as express.RequestHandler ,getCourseStudentCount);
router.get("/:id",authMiddleware as unknown as express.RequestHandler , getCourseById);
router.post("/",authMiddleware as unknown as express.RequestHandler ,isProfessor, createCourse);



export default router;
