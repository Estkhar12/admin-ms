import { Router } from 'express';
import adminRoter from './modules/admin/routes';
import categoryRouter from './modules/category/routes';
import { verify_token } from './middleware/verifyToken';

const router = Router();

router.use('/', adminRoter);

router.use(verify_token);
router.use('/', categoryRouter);

export default router;
