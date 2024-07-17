// routes/LessonRoutes.ts
import { Router } from "express";
import { getAllLessons, getLessonById, updateLesson, createLesson, deleteLesson, deleteLogicalLesson } from "../controllers/lessonController";
import { authMiddleware } from "../../shared/middlewares/auth";

const lessonRoutes: Router = Router();

lessonRoutes.get('/', authMiddleware, getAllLessons);
lessonRoutes.get('/:id', authMiddleware, getLessonById);
lessonRoutes.put('/:id', authMiddleware, updateLesson);
lessonRoutes.post('/', createLesson);
lessonRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalLesson);
lessonRoutes.delete('/:id', authMiddleware, deleteLesson);

export default lessonRoutes;
