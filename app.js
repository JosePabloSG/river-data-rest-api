import express, { json } from 'express'
import { createDataRouter } from './routes/data.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config.js'

export const createApp = ({ dataModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/data', createDataRouter({ dataModel }))

  // arranque del servidor
  const PORT = process.env.PORT ?? 3000
  app.listen(PORT, () => {
    console.log(`Listening on Port http://localhost:${PORT}`)
  })
}
