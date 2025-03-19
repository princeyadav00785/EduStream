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

router.get("/",authMiddleware as unknown as express.RequestHandler ,getAllCourses);
router.get("/:id",authMiddleware as unknown as express.RequestHandler , getCourseById);
router.get("/:id/students-count", authMiddleware as unknown as express.RequestHandler ,getCourseStudentCount);
router.post("/",authMiddleware as unknown as express.RequestHandler ,isProfessor, createCourse);
router.post("/enroll", enrollUserInCourse);


export default router;
