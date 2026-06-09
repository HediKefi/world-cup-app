import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const teams = [
  // Group A
  { name: 'United States', flag: '🇺🇸', group: 'A', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
  { name: 'Netherlands', flag: '🇳🇱', group: 'A', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 4 },
  { name: 'Senegal', flag: '🇸🇳', group: 'A', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
  { name: 'Ecuador', flag: '🇪🇨', group: 'A', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0 },

  // Group B
  { name: 'Argentina', flag: '🇦🇷', group: 'B', played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 5, goalsAgainst: 0, goalDifference: 5, points: 6 },
  { name: 'France', flag: '🇫🇷', group: 'B', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
  { name: 'Mexico', flag: '🇲🇽', group: 'B', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 1 },
  { name: 'Peru', flag: '🇵🇪', group: 'B', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 1 },

  // Group C
  { name: 'England', flag: '🇬🇧', group: 'C', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 4 },
  { name: 'Spain', flag: '🇪🇸', group: 'C', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
  { name: 'Germany', flag: '🇩🇪', group: 'C', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
  { name: 'Japan', flag: '🇯🇵', group: 'C', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 0 },

  // Group D
  { name: 'Brazil', flag: '🇧🇷', group: 'D', played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 6, goalsAgainst: 1, goalDifference: 5, points: 6 },
  { name: 'Belgium', flag: '🇧🇪', group: 'D', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
  { name: 'Canada', flag: '🇨🇦', group: 'D', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 },
  { name: 'Morocco', flag: '🇲🇦', group: 'D', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 1 },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin', 10)
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    }
  })
  console.log('✅ Created admin user')

  // Create teams
  const createdTeams: any = {}
  for (const team of teams) {
    const created = await prisma.team.upsert({
      where: { name: team.name },
      update: team,
      create: team
    })
    createdTeams[team.name] = created
    console.log(`✅ Created team: ${team.name}`)
  }

  // Create matches
  const matches = [
    // Group A
    { homeTeam: 'United States', awayTeam: 'Netherlands', homeTeamFlag: '🇺🇸', awayTeamFlag: '🇳🇱', date: '2026-06-21', time: '14:00', status: 'COMPLETED', homeScore: 1, awayScore: 2, group: 'A' },
    { homeTeam: 'Senegal', awayTeam: 'Ecuador', homeTeamFlag: '🇸🇳', awayTeamFlag: '🇪🇨', date: '2026-06-21', time: '17:00', status: 'COMPLETED', homeScore: 1, awayScore: 0, group: 'A' },
    { homeTeam: 'Netherlands', awayTeam: 'Senegal', homeTeamFlag: '🇳🇱', awayTeamFlag: '🇸🇳', date: '2026-06-25', time: '17:00', status: 'COMPLETED', homeScore: 2, awayScore: 0, group: 'A' },
    { homeTeam: 'Ecuador', awayTeam: 'United States', homeTeamFlag: '🇪🇨', awayTeamFlag: '🇺🇸', date: '2026-06-25', time: '20:00', status: 'COMPLETED', homeScore: 1, awayScore: 2, group: 'A' },

    // Group B
    { homeTeam: 'Argentina', awayTeam: 'Peru', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇵🇪', date: '2026-06-22', time: '14:00', status: 'COMPLETED', homeScore: 2, awayScore: 0, group: 'B' },
    { homeTeam: 'France', awayTeam: 'Mexico', homeTeamFlag: '🇫🇷', awayTeamFlag: '🇲🇽', date: '2026-06-22', time: '17:00', status: 'COMPLETED', homeScore: 1, awayScore: 0, group: 'B' },
    { homeTeam: 'Mexico', awayTeam: 'Peru', homeTeamFlag: '🇲🇽', awayTeamFlag: '🇵🇪', date: '2026-06-26', time: '14:00', status: 'COMPLETED', homeScore: 1, awayScore: 1, group: 'B' },
    { homeTeam: 'Argentina', awayTeam: 'France', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇫🇷', date: '2026-06-26', time: '20:00', status: 'COMPLETED', homeScore: 3, awayScore: 2, group: 'B' },

    // Group C
    { homeTeam: 'England', awayTeam: 'Germany', homeTeamFlag: '🇬🇧', awayTeamFlag: '🇩🇪', date: '2026-06-23', time: '14:00', status: 'COMPLETED', homeScore: 2, awayScore: 1, group: 'C' },
    { homeTeam: 'Spain', awayTeam: 'Japan', homeTeamFlag: '🇪🇸', awayTeamFlag: '🇯🇵', date: '2026-06-23', time: '17:00', status: 'COMPLETED', homeScore: 1, awayScore: 0, group: 'C' },
    { homeTeam: 'Japan', awayTeam: 'Germany', homeTeamFlag: '🇯🇵', awayTeamFlag: '🇩🇪', date: '2026-06-27', time: '14:00', status: 'COMPLETED', homeScore: 1, awayScore: 1, group: 'C' },
    { homeTeam: 'Spain', awayTeam: 'England', homeTeamFlag: '🇪🇸', awayTeamFlag: '🇬🇧', date: '2026-06-27', time: '20:00', status: 'COMPLETED', homeScore: 2, awayScore: 2, group: 'C' },

    // Group D
    { homeTeam: 'Brazil', awayTeam: 'Morocco', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇲🇦', date: '2026-06-24', time: '14:00', status: 'COMPLETED', homeScore: 3, awayScore: 0, group: 'D' },
    { homeTeam: 'Belgium', awayTeam: 'Canada', homeTeamFlag: '🇧🇪', awayTeamFlag: '🇨🇦', date: '2026-06-24', time: '17:00', status: 'COMPLETED', homeScore: 1, awayScore: 0, group: 'D' },
    { homeTeam: 'Canada', awayTeam: 'Morocco', homeTeamFlag: '🇨🇦', awayTeamFlag: '🇲🇦', date: '2026-06-28', time: '14:00', status: 'COMPLETED', homeScore: 0, awayScore: 1, group: 'D' },
    { homeTeam: 'Brazil', awayTeam: 'Belgium', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇧🇪', date: '2026-06-28', time: '20:00', status: 'COMPLETED', homeScore: 3, awayScore: 2, group: 'D' },

    // Upcoming knockout matches
    { homeTeam: 'Argentina', awayTeam: 'Netherlands', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇳🇱', date: '2026-07-03', time: '16:00', status: 'UPCOMING', homeScore: null, awayScore: null, group: 'Round of 16' },
    { homeTeam: 'Brazil', awayTeam: 'Spain', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇪🇸', date: '2026-07-04', time: '16:00', status: 'UPCOMING', homeScore: null, awayScore: null, group: 'Round of 16' },
    { homeTeam: 'England', awayTeam: 'France', homeTeamFlag: '🇬🇧', awayTeamFlag: '🇫🇷', date: '2026-07-05', time: '16:00', status: 'UPCOMING', homeScore: null, awayScore: null, group: 'Round of 16' },
    { homeTeam: 'Germany', awayTeam: 'United States', homeTeamFlag: '🇩🇪', awayTeamFlag: '🇺🇸', date: '2026-07-06', time: '16:00', status: 'UPCOMING', homeScore: null, awayScore: null, group: 'Round of 16' },
  ]

  for (const match of matches) {
    await prisma.match.create({
      data: {
        homeTeamId: createdTeams[match.homeTeam].id,
        awayTeamId: createdTeams[match.awayTeam].id,
        homeTeamFlag: match.homeTeamFlag,
        awayTeamFlag: match.awayTeamFlag,
        date: match.date,
        time: match.time,
        status: match.status as any,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        group: match.group
      }
    })
    console.log(`✅ Created match: ${match.homeTeam} vs ${match.awayTeam}`)
  }

  // Create some predictions
  const upcomingMatches = await prisma.match.findMany({
    where: { status: 'UPCOMING' },
    take: 4
  })

  const predictionData = [
    { winner: 'HOME', homePercentage: 65, awayPercentage: 20, drawPercentage: 15 },
    { winner: 'HOME', homePercentage: 72, awayPercentage: 18, drawPercentage: 10 },
    { winner: 'AWAY', homePercentage: 42, awayPercentage: 52, drawPercentage: 6 },
    { winner: 'DRAW', homePercentage: 48, awayPercentage: 35, drawPercentage: 17 },
  ]

  upcomingMatches.forEach(async (match, index) => {
    const data = predictionData[index]
    await prisma.prediction.create({
      data: {
        matchId: match.id,
        winner: data.winner as any,
        totalPredictions: Math.round((data.homePercentage + data.awayPercentage + data.drawPercentage) * 30),
        homePercentage: data.homePercentage,
        awayPercentage: data.awayPercentage,
        drawPercentage: data.drawPercentage
      }
    })
    console.log(`✅ Created prediction for match ${match.id}`)
  })

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
