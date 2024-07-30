import { Request, Response } from 'express';
import { ModuleService } from '../services/moduleService';
import { Module } from '../models/module';

// Obtener todos los módulos
export const getAllModules = async (_: Request, res: Response) => {
    try {
        const modules = await ModuleService.getAllModules();
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving modules', error });
    }
};

// Obtener un módulo por ID
export const getModuleById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const module = await ModuleService.getModuleById(id);
        if (module) {
            res.status(200).json(module);
        } else {
            res.status(404).json({ message: 'Module not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving module', error });
    }
};

export const createModule = async (req: Request, res: Response) => {
    try {
        const newModuleData: Partial<Module> = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await ModuleService.createModule(file, newModuleData);
        res.status(201).json({ message: 'Module created', moduleId: result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating module', error });
    }
};

export const updateModule = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedModuleData: Module = req.body;
        const file = req.file;
        const result = await ModuleService.modifyModule(id, updatedModuleData, file);
        if (result) {
            res.status(200).json({ message: 'Module updated', module: result });
        } else {
            res.status(404).json({ message: 'Module not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating module', error });
    }
};

// Eliminar un módulo físicamente
export const deleteModule = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await ModuleService.deleteModule(id);
        res.status(200).json({ message: 'Module deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting module', error });
    }
};

// Eliminar un módulo lógicamente
export const deleteLogicalModule = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await ModuleService.deleteModuleLogic(id);
        res.status(200).json({ message: 'Module logically deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error logically deleting module', error });
    }
};