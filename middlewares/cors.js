import cors from 'cors'

const ACCEPTED_ORIGINS = [
  // Localhost
  'http://localhost:8080',
  'http://localhost:3000',
  // Despliegues
  'https://joseabh.github.io',
  'https://api-rest-river-date-dev-bmke.4.us-1.fl0.io'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
