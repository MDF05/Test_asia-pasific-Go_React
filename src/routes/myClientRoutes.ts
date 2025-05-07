import { Router } from 'express';
import * as myClientController from '../controllers/myClientController';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/', upload.single('client_logo'), myClientController.create);
router.get('/', myClientController.getAll);
router.get('/:id', myClientController.getById);
router.put('/:id', upload.single('client_logo'), myClientController.update);
router.delete('/:id', myClientController.softDelete);

export default router; 