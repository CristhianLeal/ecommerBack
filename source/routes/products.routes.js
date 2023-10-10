import { Router } from 'express'
import { getProducts, getProduct, createProduct, deleteProduct, editProduct, log, getByFilter } from '../controllers/products.controllers.js'
import { body } from 'express-validator'
import { validateToken } from '../middlewares/validatesToken.js'
import { validateField } from '../middlewares/validatesFields.js'
const router = Router()

router.get('/', getProducts)
router.get('/log', log)
router.get('/:id', getProduct)
router.post('/filter',
  [
    body('searchQuery', 'El contenido debe tener entre 3 y 20 caracteres').isLength({ min: 3, max: 20 }),
    validateField
  ],
  getByFilter)
router.post('/',
  [
    body('name', 'El nombre es requerido y debe tener entre 3 y 20 caracteres').isLength({ min: 3, max: 20 }),
    body('description', 'La descripcion es requerida y debe tener entre 5 y 30 caracteres').isLength({ min: 5, max: 30 }),
    body('imageUrl', 'El nombre es requerido y debe tener entre 5 y 500 caracteres').isLength({ min: 5, max: 500 }),
    body('price', 'El precio es requerido , debe ser un número y tener entre 2 y 10 numeros').isLength({ min: 2, max: 10 }).isNumeric(),
    validateField
  ],
  validateToken,
  createProduct)

router.put('/:id',
  [
    body('name', 'El nombre es requerido y debe tener entre 3 y 20 caracteres').isLength({ min: 3, max: 20 }),
    body('description', 'La descripcion es requerida y debe tener entre 5 y 30 caracteres').isLength({ min: 5, max: 30 }),
    body('imageUrl', 'El nombre es requerido y debe tener entre 5 y 500 caracteres').isLength({ min: 5, max: 500 }),
    body('price', 'El precio es requerido , debe ser un número y tener entre 2 y 10 numeros').isLength({ min: 2, max: 10 }).isNumeric(),
    validateField
  ],
  validateToken,
  editProduct)
router.delete('/:id', validateToken, deleteProduct)
export default router
