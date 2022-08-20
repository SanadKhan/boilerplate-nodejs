import {Router} from 'express';
import adminController from './admin';

const router = Router();

router.use('/v1/admin', adminController);


export default router;