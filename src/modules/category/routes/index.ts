import express from 'express';
import deleteCategory from '../controllers/deleteCategory';
import addCategory from '../controllers/addCategory';
import getAllCategory from '../controllers/getAllCategory';
import getCategory from '../controllers/getCategory';
import updateCategory from '../controllers/updateCategory';

const router = express.Router();

router.post('/addCategory', addCategory);
router.delete('/deleteCategory', deleteCategory);
router.get('/getAllCategory', getAllCategory);
router.get('/getCategory', getCategory);
router.patch('/updateCategory', updateCategory);

const categoryRouter = router;
export default categoryRouter;
