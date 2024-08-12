import { Router } from 'express';
import addProduct from '../controllers/addProduct';
import getProduct from '../controllers/getProduct';
import updateProduct from '../controllers/updateProduct';
import deleteProduct from '../controllers/deleteProduct';
import getAllProduct from '../controllers/getAllProducts';

const router = Router();

router.post('/addProduct', addProduct);
router.get('/getProduct', getProduct);
router.patch('/updateProduct', updateProduct);
router.patch('/deleteProduct', deleteProduct);
router.get('/getAllProduct-', getAllProduct);

const ProductRouter = router;
export default ProductRouter;
