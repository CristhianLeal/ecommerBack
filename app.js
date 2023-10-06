import dotenv from 'dotenv'
import { Server } from './source/server.js'

dotenv.config()
const server = new Server()

server.listen()
