import { Router } from 'express';
import { addDiscount } from '../controllers/addDiscount';
import { updateDiscount } from '../controllers/updateDiscount';
import { getDiscount } from '../controllers/getDiscount';
import { getAllDiscount } from '../controllers/getAllDiscount';
import { deleteDiscount } from '../controllers/deleteDiscount';

const router = Router();

router.post('/addDiscount', addDiscount);
router.patch('/updateDiscount', updateDiscount);
router.get('/getDiscount', getDiscount);
router.get('/getAllDiscount', getAllDiscount);
router.patch('/deleteDiscount', deleteDiscount);

const DiscountRouter = router;

export default DiscountRouter;
