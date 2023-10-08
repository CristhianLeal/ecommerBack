import { validationResult } from 'express-validator'

export const validateField = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Errores validando los campos',
      errors: errors.array()
    })
  }
  next()
}
