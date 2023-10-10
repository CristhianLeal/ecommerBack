import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function dbConnection () {
  try {
    await prisma.$connect()
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message)
    throw error
  }
}
