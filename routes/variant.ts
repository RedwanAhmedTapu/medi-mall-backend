import { Router } from 'express';
import VariantController from '../controller/variantController';

const router = Router();

router.post('/add-variants', VariantController.createVariant);
router.get('/get-variants', VariantController.getVariants);
router.put('/update-variants/:id', VariantController.updateVariant);
router.delete('/delete-variants/:id', VariantController.deleteVariant);

export default router;
