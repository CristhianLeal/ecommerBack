import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION)
    console.log('La conexión con la base de datos fue exitosa')
  } catch (error) {
    console.log('Falló la conexión con  la base de datos')
  }
}
