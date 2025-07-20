import express from 'express'
import cors from 'cors'
import logsRouter from './routes/logs'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()

const app = express()

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

app.use((err: any, req: Request, res: Response) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Swagger docs at http://localhost:${port}/api-docs`)
}) 
