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

    public static async addModule(module: Module) {
        try {
            module.created_at = DateUtils.formatDate(new Date()); 
            module.updated_at = DateUtils.formatDate(new Date()); 

            const createdModule = await ModuleRepository.createModule(module);

            return { module: createdModule };
        } catch (error: any) {
            throw new Error(`Error creating module: ${error.message}`);
        }
    }

    public static async modifyModule(moduleId: number, moduleData: Module) {
        try {
            const moduleFound = await ModuleRepository.findById(moduleId);
            if (moduleFound) {
                if (moduleData.title) {
                    moduleFound.title = moduleData.title;
                }
                if (moduleData.content) {
                    moduleFound.content = moduleData.content;
                }
                if (moduleData.description) {
                    moduleFound.description = moduleData.description;
                }
                if (moduleData.material) {
                    moduleFound.material = moduleData.material;
                }
                if (moduleData.teacher) {
                    moduleFound.teacher = moduleData.teacher;
                }
                if (moduleData.deleted !== undefined) {
                    moduleFound.deleted = moduleData.deleted;
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
            return await ModuleRepository.deleteModule(moduleId);
        } catch (error: any) {
            throw new Error(`Error deleting module: ${error.message}`);
        }
    }

    public static async deleteModuleLogic(moduleId: number): Promise<boolean> {
        try {
            return await ModuleRepository.deleteLogic(moduleId);
        } catch (error: any) {
            throw new Error(`Error logically deleting module: ${error.message}`);
        }
    }
}
