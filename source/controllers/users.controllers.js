import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
  const { username, password, code } = req.body
  const claveToken = process.env.TOKEN
  if (code === claveToken) {
    try {
      const existingUser = await prisma.User.findUnique({ where: { username } })
      if (existingUser) {
        return res.status(206).send('Este usuario ya está en uso')
      }
      const createdUser = await prisma.User.create({
        data: {
          username,
          password
        }
      })
      return res.status(201).json({
        message: `Usuario ${username} creado`,
        User: createdUser
      })
    } catch (error) {
      console.error('Error creating User:', error)
      res.status(500).json({
        message: 'No se pudo crear el Usuario',
        error: error.message
      })
    }
  }
  return res.status(500).json({
    message: 'No se pudo crear el usuario'
  })
}

export const loginUser = async (req, res) => {
  const claveToken = process.env.TOKEN
  const { username, password } = req.body
  try {
    const User = await prisma.User.findUnique({ where: { username } })
    if (User) {
      if (password === User.password) {
        const token = jwt.sign({ User }, claveToken, { expiresIn: '1h' })
        return res.status(200).json({ message: 'Usuario logueado con exito.', User, token })
      } else {
        return res.status(206).json({ message: 'Datos incorrectos.' })
      }
    } else {
      return res.status(206).json({
        message: 'No se encontraron usuarios'
      })
    }
  } catch (error) {
    console.error('Error buscando usuarios', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
