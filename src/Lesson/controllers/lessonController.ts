// controllers/lessonController.ts
import { Request, Response } from 'express';
import { LessonService } from '../services/lessonService'; 

export const getAllLessons = async (_req: Request, res: Response) => {
    try {
        const lessons = await LessonService.getAllLessons();
        if (lessons) {
            res.status(200).json(lessons);
        } else {
            res.status(404).json({ message: 'No lessons found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getLessonById = async (req: Request, res: Response) => {
    try {
        const lessonId = parseInt(req.params.id, 10);
        const lesson = await LessonService.getLessonById(lessonId);
        if (lesson) {
            res.status(200).json(lesson);
        } else {
            res.status(404).json({ message: 'Lesson not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createLesson = async (req: Request, res: Response) => {
    try {
        const newLesson = await LessonService.addLesson(req.body);
        if (newLesson) {
            res.status(201).json(newLesson);
        } else {
            res.status(400).json({ message: 'Lesson creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateLesson = async (req: Request, res: Response) => {
    try {
        const lessonId = parseInt(req.params.id, 10);
        const updatedLesson = await LessonService.modifyLesson(lessonId, req.body);
        if (updatedLesson) {
            res.status(200).json(updatedLesson);
        } else {
            res.status(404).json({ message: 'Lesson not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLesson = async (req: Request, res: Response) => {
    try {
        const lessonId = parseInt(req.params.id, 10);
        const deleted = await LessonService.deleteLesson(lessonId);
        if (deleted) {
            res.status(200).json({ message: 'Lesson deleted successfully' });
        } else {
            res.status(404).json({ message: 'Lesson not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalLesson = async (req: Request, res: Response) => {
    try {
        const lessonId = parseInt(req.params.id, 10);
        const success = await LessonService.deleteLessonLogic(lessonId);
        if (success) {
            res.status(200).json({ message: 'Lesson logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Lesson not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
