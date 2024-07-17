import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Module } from "../models/module";

export class ModuleRepository {

    public static async findAll(): Promise<Module[]> {
        const query = "SELECT * FROM module WHERE deleted = 0";
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
        const query = "SELECT * FROM module WHERE module_id = ? AND deleted = 0";
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
    
    public static async createModule(module: Module): Promise<Module> {
        const { module_id, course_id,title, content, description, material, teacher, created_by, created_at, updated_by, updated_at, deleted } = module;
        const query = `INSERT INTO module (module_id,course_id, title, content, description, material, teacher, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        const values = [module_id, course_id,title, content, description, material, teacher, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createModuleId = (result as any).insertId;
                    const createdModule: Module = { ...module, module_id: createModuleId };
                    resolve(createdModule);
                }
            });
        });
    }
    
    public static async updateModule(moduleId: number, moduleData: Module): Promise<Module | null> {
        const { title, content, description, material, teacher, updated_at, updated_by, deleted } = moduleData;
        const query = `UPDATE module SET title = ?, content = ?, description = ?, material = ?, teacher = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE module_id = ?`;
        const values = [title, content, description, material, teacher, updated_at, updated_by, deleted ? 1 : 0, moduleId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...moduleData, module_id: moduleId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteModule(id: number): Promise<boolean> {
        const query = 'DELETE FROM module WHERE module_id = ?';
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
        const query = 'UPDATE module SET deleted = 1 WHERE module_id = ?';
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
