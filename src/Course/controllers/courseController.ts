import { Request, Response } from 'express';
import { CourseService } from '../services/courseService'; 

export const getAllCourses = async (_req: Request, res: Response) => {
    try {
        const courses = await CourseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const courseId = parseInt(req.params.id, 10);
        const course = await CourseService.getCourseById(courseId);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createCourse = async (req: Request, res: Response) => {
    try {
        const newCourse = await CourseService.addCourse(req.body);
        res.status(201).json(newCourse);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const courseId = parseInt(req.params.id, 10);
        const updatedCourse = await CourseService.modifyCourse(courseId, req.body);
        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const courseId = parseInt(req.params.id, 10);
        const deleted = await CourseService.deleteCourse(courseId);
        if (deleted) {
            res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ message: 'Course not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalCourse = async (req: Request, res: Response) => {
    try {
        const courseId = parseInt(req.params.id, 10);
        const success = await CourseService.deleteCourseLogic(courseId);
        if (success) {
            res.status(200).json({ message: 'Course logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Course not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
