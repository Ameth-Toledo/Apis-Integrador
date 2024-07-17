import { RoleRepository } from "../repositories/RoleRepository";
import { Role } from "../models/Role";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class RoleService {

    public static async getAllRoles(): Promise<Role[]> {
        try {
            return await RoleRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting roles: ${error.message}`);
        }
    }

    public static async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return await RoleRepository.findById(roleId);
        } catch (error: any) {
            throw new Error(`Error finding role: ${error.message}`);
        }
    }

    public static async addRole(role: Role): Promise<Role> {
        try {
            role.created_at = DateUtils.formatDate(new Date());
            role.updated_at = DateUtils.formatDate(new Date());

            const createdRole = await RoleRepository.createRole(role);

            return createdRole;
        } catch (error: any) {
            throw new Error(`Error creating role: ${error.message}`);
        }
    }

    public static async modifyRole(roleId: number, roleData: Role): Promise<Role | null> {
        try {
            const roleFound = await RoleRepository.findById(roleId);
            if (roleFound) {
                if (roleData.role_name) {
                    roleFound.role_name = roleData.role_name;
                }
                if (roleData.deleted !== undefined) {
                    roleFound.deleted = roleData.deleted;
                }
                roleFound.updated_at = DateUtils.formatDate(new Date());

                return await RoleRepository.updateRole(roleId, roleFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying role: ${error.message}`);
        }
    }

    public static async deleteRole(roleId: number): Promise<boolean> {
        try {
            return await RoleRepository.deleteRole(roleId);
        } catch (error: any) {
            throw new Error(`Error deleting role: ${error.message}`);
        }
    }

    public static async deleteRoleLogic(roleId: number): Promise<boolean> {
        try {
            return await RoleRepository.deleteLogic(roleId);
        } catch (error: any) {
            throw new Error(`Error logically deleting role: ${error.message}`);
        }
    }
}
