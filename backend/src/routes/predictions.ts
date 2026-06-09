import { Router } from 'express'
import prisma from '../db'

const router = Router()

// Get all predictions
router.get('/', async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        }
      }
    })

    const formatted = predictions.map(p => ({
      id: p.id,
      matchId: p.matchId,
      winner: p.winner.toLowerCase(),
      totalPredictions: p.totalPredictions,
      percentages: {
        home: p.homePercentage,
        away: p.awayPercentage,
        draw: p.drawPercentage
      }
    }))

    res.json(formatted)
  } catch (error) {
    console.error('Error fetching predictions:', error)
    res.status(500).json({ error: 'Failed to fetch predictions' })
  }
})

// Get prediction for specific match
router.get('/match/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params

    const prediction = await prisma.prediction.findUnique({
      where: { matchId }
    })

    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' })
    }

    res.json({
      id: prediction.id,
      matchId: prediction.matchId,
      winner: prediction.winner.toLowerCase(),
      totalPredictions: prediction.totalPredictions,
      percentages: {
        home: prediction.homePercentage,
        away: prediction.awayPercentage,
        draw: prediction.drawPercentage
      }
    })
  } catch (error) {
    console.error('Error fetching prediction:', error)
    res.status(500).json({ error: 'Failed to fetch prediction' })
  }
})

// Create or update prediction
router.post('/', async (req, res) => {
  try {
    const { matchId, winner, homePercentage, awayPercentage, drawPercentage } = req.body

    const totalPredictions = Math.round((homePercentage + awayPercentage + drawPercentage) * 10)

    const prediction = await prisma.prediction.upsert({
      where: { matchId },
      update: {
        winner: winner.toUpperCase(),
        homePercentage,
        awayPercentage,
        drawPercentage,
        totalPredictions
      },
      create: {
        matchId,
        winner: winner.toUpperCase(),
        homePercentage,
        awayPercentage,
        drawPercentage,
        totalPredictions
      }
    })

    res.json({
      id: prediction.id,
      matchId: prediction.matchId,
      winner: prediction.winner.toLowerCase(),
      totalPredictions: prediction.totalPredictions,
      percentages: {
        home: prediction.homePercentage,
        away: prediction.awayPercentage,
        draw: prediction.drawPercentage
      }
    })
  } catch (error) {
    console.error('Error creating/updating prediction:', error)
    res.status(500).json({ error: 'Failed to create/update prediction' })
  }
})

export default router
