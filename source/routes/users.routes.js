import { Router } from 'express'
import { validateField } from '../middlewares/validatesFields.js'
import { body } from 'express-validator'
import { createUser, loginUser } from '.././controllers/users.controllers.js'
const router = Router()

router.post('/',
  [
    body('username', 'El username es requerido y debe tener entre 3 y 20 caracteres').isLength({ min: 3, max: 20 }),
    body('password', 'La password es requerida y debe tener entre 5 y 30 caracteres').isLength({ min: 3, max: 20 }),
    validateField
  ], createUser)
router.post('/login',
  [
    body('username', 'El username es requerido y debe tener entre 3 y 20 caracteres').isLength({ min: 3, max: 20 }),
    body('password', 'La password es requerida y debe tener entre 5 y 30 caracteres').isLength({ min: 3, max: 20 }),
    validateField
  ], loginUser)

export default router
