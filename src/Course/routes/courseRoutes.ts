import { Router } from "express";
import { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, deleteLogicalCourse } from "../controllers/courseController";
import { authMiddleware } from "../../shared/middlewares/auth";

const courseRoutes: Router = Router();

courseRoutes.get('/', authMiddleware, getAllCourses);
courseRoutes.get('/:id', authMiddleware, getCourseById);
courseRoutes.post('/', createCourse);
courseRoutes.put('/:id', authMiddleware, updateCourse);
courseRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalCourse);
courseRoutes.delete('/:id', authMiddleware, deleteCourse);

export default courseRoutes;
