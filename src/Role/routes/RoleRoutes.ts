import { Router } from "express";
import { getAllRoles, getRoleById, updateRole, createRole, deleteRole, deleteLogicalRole } from "../controllers/roleController";
import { authMiddleware } from "../../shared/middlewares/auth";

const roleRoutes: Router = Router();

roleRoutes.get('/', authMiddleware, getAllRoles);
roleRoutes.get('/:id', authMiddleware, getRoleById);
roleRoutes.put('/:id', authMiddleware, updateRole);
roleRoutes.post('/', createRole);
roleRoutes.put('/deleted/:id/', authMiddleware, deleteLogicalRole);
roleRoutes.delete('/:id', authMiddleware, deleteRole);

export default roleRoutes;
