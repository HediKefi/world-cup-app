import { Router } from 'express'
import prisma from '../db'
import { authenticateToken } from '../middleware/auth'

const router = Router()
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isValidUuid(id: unknown): id is string {
  return typeof id === 'string' && UUID_REGEX.test(id)
}

// Get all matches
router.get('/', async (req, res) => {
  try {
    const { status, group } = req.query

    const where: any = {}
    if (status) {
      where.status = (status as string).toUpperCase()
    }
    if (group) {
      where.group = group
    }

    const matches = await prisma.match.findMany({
      where,
      include: {
        homeTeam: true,
        awayTeam: true
      },
      orderBy: {
        date: 'asc'
      }
    })

    // Format matches for frontend
    const formattedMatches = matches.map(match => ({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeTeamFlag: match.homeTeamFlag,
      awayTeamFlag: match.awayTeamFlag,
      date: match.date,
      time: match.time,
      status: match.status.toLowerCase(),
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      group: match.group
    }))

    res.json(formattedMatches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    res.status(500).json({ error: 'Failed to fetch matches' })
  }
})

// Get single match
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!isValidUuid(id)) {
      return res.status(400).json({ error: 'Invalid match ID format' })
    }

    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    if (!match) {
      return res.status(404).json({ error: 'Match not found' })
    }

    res.json({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeTeamFlag: match.homeTeamFlag,
      awayTeamFlag: match.awayTeamFlag,
      date: match.date,
      time: match.time,
      status: match.status.toLowerCase(),
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      group: match.group
    })
  } catch (error) {
    console.error('Error fetching match:', error)
    res.status(500).json({ error: 'Failed to fetch match' })
  }
})

// Create match (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { homeTeam, awayTeam, homeTeamFlag, awayTeamFlag, date, time, status, homeScore, awayScore, group } = req.body

    // Find team IDs
    const homeTeamData = await prisma.team.findFirst({ where: { name: homeTeam } })
    const awayTeamData = await prisma.team.findFirst({ where: { name: awayTeam } })

    if (!homeTeamData || !awayTeamData) {
      return res.status(400).json({ error: 'Invalid team names' })
    }

    const match = await prisma.match.create({
      data: {
        homeTeamId: homeTeamData.id,
        awayTeamId: awayTeamData.id,
        homeTeamFlag,
        awayTeamFlag,
        date,
        time,
        status: (status || 'upcoming').toUpperCase(),
        homeScore,
        awayScore,
        group
      },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    res.status(201).json({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeTeamFlag: match.homeTeamFlag,
      awayTeamFlag: match.awayTeamFlag,
      date: match.date,
      time: match.time,
      status: match.status.toLowerCase(),
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      group: match.group
    })
  } catch (error) {
    console.error('Error creating match:', error)
    res.status(500).json({ error: 'Failed to create match' })
  }
})

// Update match (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { homeTeam, awayTeam, homeTeamFlag, awayTeamFlag, date, time, status, homeScore, awayScore, group } = req.body

    if (!isValidUuid(id)) {
      return res.status(400).json({ error: 'Invalid match ID format' })
    }

    const updateData: any = {}

    if (homeTeam) {
      const homeTeamData = await prisma.team.findFirst({ where: { name: homeTeam } })
      if (homeTeamData) updateData.homeTeamId = homeTeamData.id
    }

    if (awayTeam) {
      const awayTeamData = await prisma.team.findFirst({ where: { name: awayTeam } })
      if (awayTeamData) updateData.awayTeamId = awayTeamData.id
    }

    if (homeTeamFlag) updateData.homeTeamFlag = homeTeamFlag
    if (awayTeamFlag) updateData.awayTeamFlag = awayTeamFlag
    if (date) updateData.date = date
    if (time) updateData.time = time
    if (status) updateData.status = status.toUpperCase()
    if (homeScore !== undefined) updateData.homeScore = homeScore
    if (awayScore !== undefined) updateData.awayScore = awayScore
    if (group) updateData.group = group

    const match = await prisma.match.update({
      where: { id },
      data: updateData,
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    res.json({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeTeamFlag: match.homeTeamFlag,
      awayTeamFlag: match.awayTeamFlag,
      date: match.date,
      time: match.time,
      status: match.status.toLowerCase(),
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      group: match.group
    })
  } catch (error) {
    console.error('Error updating match:', error)
    res.status(500).json({ error: 'Failed to update match' })
  }
})

// Delete match (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    if (!isValidUuid(id)) {
      return res.status(400).json({ error: 'Invalid match ID format' })
    }

    await prisma.match.delete({
      where: { id }
    })

    res.json({ message: 'Match deleted successfully' })
  } catch (error) {
    console.error('Error deleting match:', error)
    res.status(500).json({ error: 'Failed to delete match' })
  }
})

export default router
