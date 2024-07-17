import { Request, Response } from 'express';
import { ModuleService } from '../services/moduleService'; 

export const getAllModules = async (_req: Request, res: Response) => {
    try {
        const modules = await ModuleService.getAllModules();
        if (modules) {
            res.status(200).json(modules);
        } else {
            res.status(404).json({ message: 'No modules found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getModuleById = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id, 10);
        const module = await ModuleService.getModuleById(moduleId);
        if (module) {
            res.status(200).json(module);
        } else {
            res.status(404).json({ message: 'Module not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createModule = async (req: Request, res: Response) => {
    try {
        const newModule = await ModuleService.addModule(req.body);
        if (newModule) {
            res.status(201).json(newModule);
        } else {
            res.status(400).json({ message: 'Module creation failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateModule = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id, 10);
        const updatedModule = await ModuleService.modifyModule(moduleId, req.body);
        if (updatedModule) {
            res.status(200).json(updatedModule);
        } else {
            res.status(404).json({ message: 'Module not found or update failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteModule = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id, 10);
        const deleted = await ModuleService.deleteModule(moduleId);
        if (deleted) {
            res.status(200).json({ message: 'Module deleted successfully' });
        } else {
            res.status(404).json({ message: 'Module not found or deletion failed' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalModule = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id, 10);
        const success = await ModuleService.deleteModuleLogic(moduleId);
        if (success) {
            res.status(200).json({ message: 'Module logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'Module not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
