import { CourseRepository } from "../repositories/CourseRepository";
import { Course } from "../models/Course";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class CourseService {
    public static async getAllCourses(): Promise<Course[]> {
        try {
            return await CourseRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting courses: ${error.message}`);
        }
    }

    public static async getCourseById(courseId: number): Promise<Course | null> {
        try {
            return await CourseRepository.findById(courseId);
        } catch (error: any) {
            throw new Error(`Error finding course: ${error.message}`);
        }
    }

    public static async addCourse(course: Course) {
        try {
            course.created_at = DateUtils.formatDate(new Date()); 
            course.updated_at = DateUtils.formatDate(new Date()); 

            const createdCourse = await CourseRepository.createCourse(course);

            return { course: createdCourse };
        } catch (error: any) {
            throw new Error(`Error creating course: ${error.message}`);
        }
    }

    public static async modifyCourse(courseId: number, courseData: Course) {
        try {
            const courseFound = await CourseRepository.findById(courseId);
            if (courseFound) {
                if (courseData.title) {
                    courseFound.title = courseData.title;
                }
                if (courseData.description) {
                    courseFound.description = courseData.description;
                }
                if (courseData.subject) {
                    courseFound.subject = courseData.subject;
                }
                if (courseData.deleted !== undefined) {
                    courseFound.deleted = courseData.deleted;
                }
                courseFound.updated_at = DateUtils.formatDate(new Date());

                return await CourseRepository.updateCourse(courseId, courseFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying course: ${error.message}`);
        }
    }

    public static async deleteCourse(courseId: number): Promise<boolean> {
        try {
            return await CourseRepository.deleteCourse(courseId);
        } catch (error: any) {
            throw new Error(`Error deleting course: ${error.message}`);
        }
    }

    public static async deleteCourseLogic(courseId: number): Promise<boolean> {
        try {
            return await CourseRepository.deleteLogic(courseId);
        } catch (error: any) {
            throw new Error(`Error logically deleting course: ${error.message}`);
        }
    }
}
