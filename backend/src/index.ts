import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import matchRoutes from './routes/matches'
import teamRoutes from './routes/teams'
import analyticsRoutes from './routes/analytics'
import predictionRoutes from './routes/predictions'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

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
