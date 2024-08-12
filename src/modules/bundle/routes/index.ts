import { Router } from 'express';
import addBundle from '../controllers/addBundle';
import getBundle from '../controllers/getBundle';
import getAllBundle from '../controllers/getAllBundle';
import updateBundle from '../controllers/updateBundle';
import deleteBundle from '../controllers/deleteBundle';
import removeProductFromBundle from '../controllers/removeProduct';
import blockBundle from '../controllers/blockBundle';
import unblockBundle from '../controllers/unblockBundle';
import getAllBlockedBundle from '../controllers/getAllBlockBundle';

const router = Router();

router.post('/add-bundle', addBundle);
router.get('/get-bundle', getBundle);
router.get('/get-all', getAllBundle);
router.patch('/update', updateBundle);
router.patch('/delete', deleteBundle);
router.patch('/remove-product', removeProductFromBundle);
router.patch('/block', blockBundle);
router.patch('/unblock', unblockBundle);
router.get('/get-all-blocked', getAllBlockedBundle);

const BundleRouter = router;
export default BundleRouter;
