import express from 'express'
import { productsRoutes, usersRoutes } from './routes/index.js'
import cors from 'cors'
import { dbConnection } from './db/db.js'

export class Server {
  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    this.connectionDb()
  }

  async connectionDb () {
    await dbConnection()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/products', productsRoutes)
    this.app.use('/users', usersRoutes)
  }

  listen () {
    this.app.listen(8003, () => {
      console.log('Servidor corriendo en el puerto 8003')
    })
  }
}
