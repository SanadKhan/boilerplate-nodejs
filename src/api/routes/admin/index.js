import {Router} from 'express';
import fetchEnquiries from './fetchEnquiries';

const router = Router();

router.use(fetchEnquiries);

export default router;