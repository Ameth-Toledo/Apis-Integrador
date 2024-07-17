// services/lessonService.ts
import { LessonRepository } from "../repositories/LessonRepository";
import { Lesson } from "../models/Lesson";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class LessonService {

    public static async getAllLessons(): Promise<Lesson[]> {
        try {
            return await LessonRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting lessons: ${error.message}`);
        }
    }

    public static async getLessonById(lessonId: number): Promise<Lesson | null> {
        try {
            return await LessonRepository.findById(lessonId);
        } catch (error: any) {
            throw new Error(`Error finding lesson: ${error.message}`);
        }
    }

    public static async addLesson(lesson: Lesson): Promise<Lesson> {
        try {
            lesson.created_at = DateUtils.formatDate(new Date());
            lesson.updated_at = DateUtils.formatDate(new Date());

            const createdLesson = await LessonRepository.createLesson(lesson);

            return createdLesson;
        } catch (error: any) {
            throw new Error(`Error creating lesson: ${error.message}`);
        }
    }

    public static async modifyLesson(lessonId: number, lessonData: Lesson): Promise<Lesson | null> {
        try {
            const lessonFound = await LessonRepository.findById(lessonId);
            if (lessonFound) {
                if (lessonData.module_id) {
                    lessonFound.module_id = lessonData.module_id;
                }
                if (lessonData.title) {
                    lessonFound.title = lessonData.title;
                }
                if (lessonData.content) {
                    lessonFound.content = lessonData.content;
                }
                if (lessonData.progress) {
                    lessonFound.progress = lessonData.progress;
                }
                if (lessonData.deleted !== undefined) {
                    lessonFound.deleted = lessonData.deleted;
                }
                lessonFound.updated_at = DateUtils.formatDate(new Date());

                return await LessonRepository.updateLesson(lessonId, lessonFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying lesson: ${error.message}`);
        }
    }

    public static async deleteLesson(lessonId: number): Promise<boolean> {
        try {
            return await LessonRepository.deleteLesson(lessonId);
        } catch (error: any) {
            throw new Error(`Error deleting lesson: ${error.message}`);
        }
    }

    public static async deleteLessonLogic(lessonId: number): Promise<boolean> {
        try {
            return await LessonRepository.deleteLogic(lessonId);
        } catch (error: any) {
            throw new Error(`Error logically deleting lesson: ${error.message}`);
        }
    }
}
