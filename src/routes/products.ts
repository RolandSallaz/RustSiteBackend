import { postProduct } from "../controllers/product";
import adminOnly from "../middlewares/adminOnly";
import { validateProduct } from "../utils/validation";

const router = require('express').Router()

router.post('/', adminOnly,validateProduct, postProduct);

export default router
