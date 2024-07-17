import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Role } from "../models/Role";

export class RoleRepository {

    public static async findAll(): Promise<Role[]> {
        const query = "SELECT * FROM role WHERE deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    resolve(roles);
                }
            });
        });
    }

    public static async findById(id: number): Promise<Role | null> {
        const query = "SELECT * FROM role WHERE role_id = ? AND deleted = 0";
        return new Promise((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const roles: Role[] = results as Role[];
                    if (roles.length > 0) {
                        resolve(roles[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createRole(role: Role): Promise<Role> {
        const { role_id, role_name, created_by, created_at, updated_by, updated_at, deleted } = role;
        const query = `INSERT INTO role (role_id, role_name, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [role_id, role_name, created_by, created_at, updated_by, updated_at, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createRoleId = (result as any).insertId;
                    const createdRole: Role = { ...role, role_id: createRoleId };
                    resolve(createdRole);
                }
            });
        });
    }

    public static async updateRole(roleId: number, roleData: Role): Promise<Role | null> {
        const { role_name, updated_at, updated_by, deleted } = roleData;
        const query = `UPDATE role SET role_name = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE role_id = ?`;
        const values = [role_name, updated_at, updated_by, deleted ? 1 : 0, roleId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...roleData, role_id: roleId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteRole(id: number): Promise<boolean> {
        const query = 'DELETE FROM role WHERE role_id = ?';
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
        const query = 'UPDATE role SET deleted = 1 WHERE role_id = ?';
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
