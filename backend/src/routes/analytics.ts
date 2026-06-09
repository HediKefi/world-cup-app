import { Router } from 'express'
import prisma from '../db'

const router = Router()

// Get analytics data
router.get('/', async (req, res) => {
  try {
    const [totalMatches, totalTeams, upcomingMatches, completedMatches, liveMatches] = await Promise.all([
      prisma.match.count(),
      prisma.team.count(),
      prisma.match.count({ where: { status: 'UPCOMING' } }),
      prisma.match.count({ where: { status: 'COMPLETED' } }),
      prisma.match.count({ where: { status: 'LIVE' } })
    ])

    // Get top scorers (teams with most goals)
    const topScorers = await prisma.team.findMany({
      orderBy: { goalsFor: 'desc' },
      take: 5,
      select: {
        name: true,
        flag: true,
        goalsFor: true
      }
    })

    // Get group standings
    const groups = ['A', 'B', 'C', 'D']
    const groupStandings = await Promise.all(
      groups.map(async (group) => {
        const teams = await prisma.team.findMany({
          where: { group },
          orderBy: [
            { points: 'desc' },
            { goalDifference: 'desc' },
            { goalsFor: 'desc' }
          ],
          take: 4
        })
        return { group, teams }
      })
    )

    res.json({
      overview: {
        totalMatches,
        totalTeams,
        upcomingMatches,
        completedMatches,
        liveMatches
      },
      topScorers,
      groupStandings
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
})

export default router
