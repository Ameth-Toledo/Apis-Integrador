import { Router } from 'express';
import { getAllModules, getModuleById, createModule, updateModule, deleteModule, deleteLogicalModule } from '../controllers/moduleControllers';
import upload from '../../shared/middlewares/uploadMiddleware';

const moduleRoutes = Router();

// Rutas de módulos
moduleRoutes.get('/modules', getAllModules);
moduleRoutes.get('/modules/:id', getModuleById);
moduleRoutes.post('/modules', upload.single('file'), createModule);
moduleRoutes.put('/modules/:id', upload.single('file'), updateModule);
moduleRoutes.delete('/modules/:id', deleteModule);
moduleRoutes.patch('/modules/:id', deleteLogicalModule);

export default moduleRoutes;