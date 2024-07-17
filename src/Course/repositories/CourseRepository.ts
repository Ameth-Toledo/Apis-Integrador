import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Course } from "../models/Course";

export class CourseRepository {
    public static async findAll(): Promise<Course[]> {
        const query = "SELECT * FROM course WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const courses: Course[] = results as Course[];
                    resolve(courses);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Course | null> {
        const query = "SELECT * FROM course WHERE course_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const courses: Course[] = results as Course[];
                    if (courses.length > 0) {
                        resolve(courses[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createCourse(course: Course): Promise<Course> {
        const { course_id, title, description, subject, created_by, created_at, updated_by, updated_at, deleted } = course;
        const query = `INSERT INTO course (course_id, title, description, subject, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [course_id, title, description, subject, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdCourseId = (result as any).insertId;
                    const createdCourse: Course = { ...course, course_id: createdCourseId };
                    resolve(createdCourse);
                }
            });
        });
    }

    public static async updateCourse(courseId: number, courseData: Course): Promise<Course | null> {
        const { title, description, subject, updated_by, updated_at, deleted } = courseData;
        const query = `UPDATE course SET title = ?, description = ?, subject = ?, updated_by = ?, updated_at = ?, deleted = ? WHERE course_id = ?`;
        const values = [title, description, subject, updated_by, updated_at, deleted ? 1 : 0, courseId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...courseData, course_id: courseId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteCourse(id: number): Promise<boolean> {
        const query = 'DELETE FROM course WHERE course_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    public static async deleteLogic(id: number): Promise<boolean> {
        const query = 'UPDATE course SET deleted = 1 WHERE course_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
