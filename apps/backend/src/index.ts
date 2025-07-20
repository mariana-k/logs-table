import express from 'express'
console.log('express imported');
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import logsRouter from './routes/logs'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'

console.log('index.ts started');

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Swagger setup
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Logs API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/logs', logsRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Swagger docs at http://localhost:${port}/api-docs`)
}) 
