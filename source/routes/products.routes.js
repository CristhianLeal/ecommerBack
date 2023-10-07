import { Router } from 'express'
import { getProducts, getProduct, createProduct, deleteProduct, editProduct, log } from '../controllers/products.controllers.js'
import { validateToken } from '../middlewares/validatesToken.js'
const router = Router()

router.get('/', getProducts)
router.get('/log', log)
router.get('/:id', getProduct)
router.post('/', validateToken, createProduct)
router.delete('/:id', validateToken, deleteProduct)
router.put('/:id', validateToken, editProduct)

export default router
