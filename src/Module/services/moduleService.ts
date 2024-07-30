import { ModuleRepository } from "../repositories/ModuleRepository";
import { Module } from "../models/module";
import { DateUtils } from "../../shared/utils/DateUtils"; 
import dotenv from 'dotenv';

dotenv.config();

export class ModuleService {

    public static async getAllModules(): Promise<Module[]> {
        try {
            return await ModuleRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting modules: ${error.message}`);
        }
    }

    public static async getModuleById(moduleId: number): Promise<Module | null> {
        try {
            return await ModuleRepository.findById(moduleId);
        } catch (error: any) {
            throw new Error(`Error finding module: ${error.message}`);
        }
    }

    public static async createModule(file: Express.Multer.File, moduleData: Partial<Module>): Promise<number> {
        const urlFile = `http://localhost:3000/uploads/${file.filename}`;
        console.log(urlFile);
    
        const module: Module = {
            module_id: null,
            course_id: moduleData.course_id ?? null,
            title: moduleData.title || '',
            purpose: moduleData.purpose || '',
            description: moduleData.description || '',
            url: urlFile,
            moduleNumber: moduleData.moduleNumber || 0,
            teacher: moduleData.teacher || '',
            created_by: moduleData.created_by || '',
            created_at: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            updated_by: moduleData.updated_by || '',
            updated_at: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            deleted: moduleData.deleted ?? false
        };
    
        const createdModule = await ModuleRepository.createModule(module);
        return createdModule.module_id ?? 0;
    }

    public static async modifyModule(moduleId: number, moduleData: Module, file?: Express.Multer.File) {
        try {
            const moduleFound = await ModuleRepository.findById(moduleId);
            if (moduleFound) {
                moduleFound.title = moduleData.title || moduleFound.title;
                moduleFound.purpose = moduleData.purpose || moduleFound.purpose;
                moduleFound.description = moduleData.description || moduleFound.description;
                moduleFound.teacher = moduleData.teacher || moduleFound.teacher;
                moduleFound.deleted = moduleData.deleted ?? moduleFound.deleted;
                if (file) {
                    moduleFound.url = `http://localhost:3000/uploads/${file.filename}`;
                }
                moduleFound.updated_at = DateUtils.formatDate(new Date());
    
                return await ModuleRepository.updateModule(moduleId, moduleFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error modifying module: ${error.message}`);
        }
    }

    public static async deleteModule(moduleId: number): Promise<boolean> {
        try {
            const result = await ModuleRepository.deleteModule(moduleId);
            return result ? true : false;
        } catch (error: any) {
            throw new Error(`Error deleting module: ${error.message}`);
        }
    }

    public static async deleteModuleLogic(moduleId: number): Promise<boolean> {
        try {
            const result = await ModuleRepository.deleteLogic(moduleId);
            return result ? true : false;
        } catch (error: any) {
            throw new Error(`Error logically deleting module: ${error.message}`);
        }
    }
}