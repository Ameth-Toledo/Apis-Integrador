import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Module } from '../models/module';

export class ModuleRepository {
    public static async findAll(): Promise<Module[]> {
        const query = 'SELECT * FROM module WHERE deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const modules: Module[] = results as Module[];
                    resolve(modules);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Module | null> {
        const query = 'SELECT * FROM module WHERE module_id = ? AND deleted = 0';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const modules: Module[] = results as Module[];
                    if (modules.length > 0) {
                        resolve(modules[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createModule(newModule: Module): Promise<Module> {
        const query = 'INSERT INTO module SET ?';
        return new Promise((resolve, reject) => {
            connection.query(query, newModule, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const insertedId = (results as ResultSetHeader).insertId;
                    resolve({ ...newModule, module_id: insertedId });
                }
            });
        });
    }

    public static async updateModule(id: number, updatedModule: Module): Promise<Module> {
        const query = 'UPDATE module SET ? WHERE module_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [updatedModule, id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ ...updatedModule, module_id: id });
                }
            });
        });
    }

    public static async deleteModule(id: number): Promise<boolean> {
        const query = 'DELETE FROM module WHERE module_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public static async deleteLogic(id: number): Promise<boolean> {
        const query = 'UPDATE module SET deleted = 1 WHERE module_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}