import { Router } from 'express'
import prisma from '../db'
import { authenticateToken } from '../middleware/auth'

const router = Router()

// Get all teams
router.get('/', async (req, res) => {
  try {
    const { group } = req.query

    const where: any = {}
    if (group) {
      where.group = group
    }

    const teams = await prisma.team.findMany({
      where,
      orderBy: [
        { group: 'asc' },
        { points: 'desc' },
        { goalDifference: 'desc' },
        { goalsFor: 'desc' }
      ]
    })

    res.json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

// Get single team
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const team = await prisma.team.findUnique({
      where: { id }
    })

    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }

    res.json(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

// Update team (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name, flag, group, played, wins, draws, losses, goalsFor, goalsAgainst } = req.body

    const updateData: any = {}
    
    if (name) updateData.name = name
    if (flag) updateData.flag = flag
    if (group) updateData.group = group
    if (played !== undefined) updateData.played = played
    if (wins !== undefined) updateData.wins = wins
    if (draws !== undefined) updateData.draws = draws
    if (losses !== undefined) updateData.losses = losses
    if (goalsFor !== undefined) updateData.goalsFor = goalsFor
    if (goalsAgainst !== undefined) updateData.goalsAgainst = goalsAgainst

    // Calculate derived fields
    if (goalsFor !== undefined || goalsAgainst !== undefined) {
      const team = await prisma.team.findUnique({ where: { id } })
      const gf = goalsFor !== undefined ? goalsFor : team?.goalsFor || 0
      const ga = goalsAgainst !== undefined ? goalsAgainst : team?.goalsAgainst || 0
      updateData.goalDifference = gf - ga
    }

    if (wins !== undefined || draws !== undefined) {
      const team = await prisma.team.findUnique({ where: { id } })
      const w = wins !== undefined ? wins : team?.wins || 0
      const d = draws !== undefined ? draws : team?.draws || 0
      updateData.points = w * 3 + d
    }

    const team = await prisma.team.update({
      where: { id },
      data: updateData
    })

    res.json(team)
  } catch (error) {
    console.error('Error updating team:', error)
    res.status(500).json({ error: 'Failed to update team' })
  }
})

export default router
