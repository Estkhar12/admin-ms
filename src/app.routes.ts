import { Router } from 'express';
import adminRoter from './modules/admin/routes';
import categoryRouter from './modules/category/routes';
import { verify_token } from './middleware/verifyToken';
import BundleRouter from './modules/bundle/routes';
import ProductRouter from './modules/product/routes';
import DiscountRouter from './modules/discount/routes';

const router = Router();

router.use('/', adminRoter);

router.use(verify_token);
router.use('/', categoryRouter);
router.use('/', BundleRouter);
router.use('/', ProductRouter);
router.use('/', DiscountRouter);

export default router;
