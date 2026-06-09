// World Cup 2026 Mock Data
export interface Team {
  id: string
  name: string
  flag: string
  group: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamFlag: string
  awayTeamFlag: string
  date: string
  time: string
  status: 'upcoming' | 'live' | 'completed'
  homeScore?: number
  awayScore?: number
  group: string
}

export interface Prediction {
  id: string
  matchId: string
  winner: 'home' | 'away' | 'draw'
  totalPredictions: number
  percentages: {
    home: number
    away: number
    draw: number
  }
}

// Teams grouped by group stage
export const teams: Team[] = [
  // Group A
  { id: 'usa', name: 'United States', flag: '🇺🇸', group: 'A', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
  { id: 'netherlands', name: 'Netherlands', flag: '🇳🇱', group: 'A', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 4 },
  { id: 'senegal', name: 'Senegal', flag: '🇸🇳', group: 'A', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
  { id: 'ecuador', name: 'Ecuador', flag: '🇪🇨', group: 'A', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0 },

  // Group B
  { id: 'argentina', name: 'Argentina', flag: '🇦🇷', group: 'B', played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 5, goalsAgainst: 0, goalDifference: 5, points: 6 },
  { id: 'france', name: 'France', flag: '🇫🇷', group: 'B', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
  { id: 'mexico', name: 'Mexico', flag: '🇲🇽', group: 'B', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 1 },
  { id: 'peru', name: 'Peru', flag: '🇵🇪', group: 'B', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 1 },

  // Group C
  { id: 'england', name: 'England', flag: '🇬🇧', group: 'C', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 4 },
  { id: 'spain', name: 'Spain', flag: '🇪🇸', group: 'C', played: 2, wins: 1, draws: 1, losses: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', group: 'C', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', group: 'C', played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 0 },

  // Group D
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷', group: 'D', played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 6, goalsAgainst: 1, goalDifference: 5, points: 6 },
  { id: 'belgique', name: 'Belgium', flag: '🇧🇪', group: 'D', played: 2, wins: 1, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', group: 'D', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 },
  { id: 'morocco', name: 'Morocco', flag: '🇲🇦', group: 'D', played: 2, wins: 0, draws: 1, losses: 1, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 1 },
]

export const matches: Match[] = [
  // Group A
  { id: 'm1', homeTeam: 'United States', awayTeam: 'Netherlands', homeTeamFlag: '🇺🇸', awayTeamFlag: '🇳🇱', date: '2026-06-21', time: '14:00', status: 'completed', homeScore: 1, awayScore: 2, group: 'A' },
  { id: 'm2', homeTeam: 'Senegal', awayTeam: 'Ecuador', homeTeamFlag: '🇸🇳', awayTeamFlag: '🇪🇨', date: '2026-06-21', time: '17:00', status: 'completed', homeScore: 1, awayScore: 0, group: 'A' },
  { id: 'm3', homeTeam: 'Netherlands', awayTeam: 'Senegal', homeTeamFlag: '🇳🇱', awayTeamFlag: '🇸🇳', date: '2026-06-25', time: '17:00', status: 'completed', homeScore: 2, awayScore: 0, group: 'A' },
  { id: 'm4', homeTeam: 'Ecuador', awayTeam: 'United States', homeTeamFlag: '🇪🇨', awayTeamFlag: '🇺🇸', date: '2026-06-25', time: '20:00', status: 'completed', homeScore: 1, awayScore: 2, group: 'A' },

  // Group B
  { id: 'm5', homeTeam: 'Argentina', awayTeam: 'Peru', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇵🇪', date: '2026-06-22', time: '14:00', status: 'completed', homeScore: 2, awayScore: 0, group: 'B' },
  { id: 'm6', homeTeam: 'France', awayTeam: 'Mexico', homeTeamFlag: '🇫🇷', awayTeamFlag: '🇲🇽', date: '2026-06-22', time: '17:00', status: 'completed', homeScore: 1, awayScore: 0, group: 'B' },
  { id: 'm7', homeTeam: 'Mexico', awayTeam: 'Peru', homeTeamFlag: '🇲🇽', awayTeamFlag: '🇵🇪', date: '2026-06-26', time: '14:00', status: 'completed', homeScore: 1, awayScore: 1, group: 'B' },
  { id: 'm8', homeTeam: 'Argentina', awayTeam: 'France', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇫🇷', date: '2026-06-26', time: '20:00', status: 'completed', homeScore: 3, awayScore: 2, group: 'B' },

  // Group C
  { id: 'm9', homeTeam: 'England', awayTeam: 'Germany', homeTeamFlag: '🇬🇧', awayTeamFlag: '🇩🇪', date: '2026-06-23', time: '14:00', status: 'completed', homeScore: 2, awayScore: 1, group: 'C' },
  { id: 'm10', homeTeam: 'Spain', awayTeam: 'Japan', homeTeamFlag: '🇪🇸', awayTeamFlag: '🇯🇵', date: '2026-06-23', time: '17:00', status: 'completed', homeScore: 1, awayScore: 0, group: 'C' },
  { id: 'm11', homeTeam: 'Japan', awayTeam: 'Germany', homeTeamFlag: '🇯🇵', awayTeamFlag: '🇩🇪', date: '2026-06-27', time: '14:00', status: 'completed', homeScore: 1, awayScore: 1, group: 'C' },
  { id: 'm12', homeTeam: 'Spain', awayTeam: 'England', homeTeamFlag: '🇪🇸', awayTeamFlag: '🇬🇧', date: '2026-06-27', time: '20:00', status: 'completed', homeScore: 2, awayScore: 2, group: 'C' },

  // Group D
  { id: 'm13', homeTeam: 'Brazil', awayTeam: 'Morocco', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇲🇦', date: '2026-06-24', time: '14:00', status: 'completed', homeScore: 3, awayScore: 0, group: 'D' },
  { id: 'm14', homeTeam: 'Belgium', awayTeam: 'Canada', homeTeamFlag: '🇧🇪', awayTeamFlag: '🇨🇦', date: '2026-06-24', time: '17:00', status: 'completed', homeScore: 1, awayScore: 0, group: 'D' },
  { id: 'm15', homeTeam: 'Canada', awayTeam: 'Morocco', homeTeamFlag: '🇨🇦', awayTeamFlag: '🇲🇦', date: '2026-06-28', time: '14:00', status: 'completed', homeScore: 0, awayScore: 1, group: 'D' },
  { id: 'm16', homeTeam: 'Brazil', awayTeam: 'Belgium', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇧🇪', date: '2026-06-28', time: '20:00', status: 'completed', homeScore: 3, awayScore: 2, group: 'D' },

  // Upcoming knockout matches
  { id: 'm17', homeTeam: 'Argentina', awayTeam: 'Netherlands', homeTeamFlag: '🇦🇷', awayTeamFlag: '🇳🇱', date: '2026-07-03', time: '16:00', status: 'upcoming', group: 'Round of 16' },
  { id: 'm18', homeTeam: 'Brazil', awayTeam: 'Spain', homeTeamFlag: '🇧🇷', awayTeamFlag: '🇪🇸', date: '2026-07-04', time: '16:00', status: 'upcoming', group: 'Round of 16' },
  { id: 'm19', homeTeam: 'England', awayTeam: 'France', homeTeamFlag: '🇬🇧', awayTeamFlag: '🇫🇷', date: '2026-07-05', time: '16:00', status: 'upcoming', group: 'Round of 16' },
  { id: 'm20', homeTeam: 'Germany', awayTeam: 'United States', homeTeamFlag: '🇩🇪', awayTeamFlag: '🇺🇸', date: '2026-07-06', time: '16:00', status: 'upcoming', group: 'Round of 16' },
]

export const predictions: Prediction[] = [
  { id: 'p1', matchId: 'm17', winner: 'home', totalPredictions: 4521, percentages: { home: 65, away: 20, draw: 15 } },
  { id: 'p2', matchId: 'm18', winner: 'home', totalPredictions: 5234, percentages: { home: 72, away: 18, draw: 10 } },
  { id: 'p3', matchId: 'm19', winner: 'away', totalPredictions: 4892, percentages: { home: 42, away: 52, draw: 6 } },
  { id: 'p4', matchId: 'm20', winner: 'draw', totalPredictions: 3645, percentages: { home: 48, away: 35, draw: 17 } },
]
