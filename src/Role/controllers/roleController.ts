import { Request, Response } from 'express';
import { RoleService } from '../services/roleService'; 

export const getAllRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await RoleService.getAllRoles();
        if (roles) {
            res.status(200).json(roles);
        } else {
            res.status(404).json({ message: 'No roles found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);
        const role = await RoleService.getRoleById(roleId);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createRole = async (req: Request, res: Response) => {
    try {
        const newRole = await RoleService.addRole(req.body);
        if (newRole) {
            res.status(201).json(newRole);
        } else {
            res.status(400).json({ message: 'Role creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);
        const updatedRole = await RoleService.modifyRole(roleId, req.body);
        if (updatedRole) {
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ message: 'Role not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);
        const deleted = await RoleService.deleteRole(roleId);
        if (deleted) {
            res.status(200).json({ message: 'Role deleted successfully' });
        } else {
            res.status(404).json({ message: 'Role not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);
        const success = await RoleService.deleteRoleLogic(roleId);
        if (success) {
            res.status(200).json({ message: 'Role logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Role not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
