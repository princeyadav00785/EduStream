import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  getCourseStudentCount,
  createCourse,
  enrollUserInCourse
} from "../controllers/courseControllers";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/:id/students-count", getCourseStudentCount);
router.post("/", createCourse);
router.post("/enroll", enrollUserInCourse);


export default router;
