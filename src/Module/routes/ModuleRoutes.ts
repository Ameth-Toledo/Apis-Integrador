import { Router } from "express";
import { getAllModules, getModuleById, updateModule, createModule, deleteModule, deleteLogicalModule } from "../controllers/moduleControllers";
import { authMiddleware } from "../../shared/middlewares/auth";

const moduleRoutes: Router = Router();

moduleRoutes.get('/', authMiddleware, getAllModules);
moduleRoutes.get('/:id', authMiddleware, getModuleById);
moduleRoutes.put('/:id', authMiddleware, updateModule);
moduleRoutes.post('/', createModule);
moduleRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalModule);
moduleRoutes.delete('/:id', authMiddleware, deleteModule);

export default moduleRoutes;
