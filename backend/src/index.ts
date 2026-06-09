import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeDatabaseUrlFromSecrets } from './config/database'

dotenv.config()

const PORT = process.env.PORT || 3001

async function bootstrap() {
  const dbConfigSource = await initializeDatabaseUrlFromSecrets()
  console.log(`Database config source: ${dbConfigSource}`)

  const [
    { default: authRoutes },
    { default: matchRoutes },
    { default: teamRoutes },
    { default: analyticsRoutes },
    { default: predictionRoutes }
  ] = await Promise.all([
    import('./routes/auth'),
    import('./routes/matches'),
    import('./routes/teams'),
    import('./routes/analytics'),
    import('./routes/predictions')
  ])

  const app = express()

  // Middleware
  app.use(cors())
  app.use(express.json())

  // Routes
  app.use('/api/auth', authRoutes)
  app.use('/api/matches', matchRoutes)
  app.use('/api/teams', teamRoutes)
  app.use('/api/analytics', analyticsRoutes)
  app.use('/api/predictions', predictionRoutes)

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'World Cup 2026 API is running' })
  })

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
