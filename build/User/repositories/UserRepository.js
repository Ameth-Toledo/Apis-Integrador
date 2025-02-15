"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class UserRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM user WHERE deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        resolve(users);
                    }
                });
            });
        });
    }
    static findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM user WHERE user_id = ? AND deleted = 0";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [user_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        if (users.length > 0) {
                            resolve(users[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM user WHERE name= ?', [name], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const employees = results;
                        if (employees.length > 0) {
                            resolve(employees[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, role_id_fk, created_by, updated_at, updated_by, deleted } = user;
            const query = `INSERT INTO user (name, password, role_id_fk, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [name, password, role_id_fk, created_by, updated_at, updated_by, deleted ? 1 : 0];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createUserId = result.insertId;
                        const createdUser = Object.assign(Object.assign({}, user), { user_id: createUserId });
                        resolve(createdUser);
                    }
                });
            });
        });
    }
    static updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, role_id_fk, updated_at, updated_by, deleted } = userData;
            const query = `UPDATE user SET name = ?, role_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE user_id = ?`;
            const values = [name, role_id_fk, updated_at, updated_by, deleted ? 1 : 0, userId];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(Object.assign(Object.assign({}, userData), { user_id: userId }));
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM user WHERE user_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [user_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
    static deleteLogic(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE user SET deleted = 1 WHERE user_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [user_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.UserRepository = UserRepository;
