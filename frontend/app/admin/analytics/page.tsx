'use client'

import { useEffect, useState } from 'react'
import { getMatches, getTeams } from '@/lib/storage'

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalTeams: 0,
    upcomingMatches: 0,
    liveMatches: 0,
    completedMatches: 0,
    totalGoals: 0,
    averageGoalsPerMatch: 0,
    topScorer: { team: '', goals: 0 },
    groupStats: [] as any[],
  })

  useEffect(() => {
    const matches = getMatches()
    const teams = getTeams()

    let totalGoals = 0
    let completedCount = 0
    const teamGoals: { [key: string]: number } = {}

    matches.forEach((m: any) => {
      if (m.status === 'completed' || m.status === 'live') {
        const goals = (m.homeScore || 0) + (m.awayScore || 0)
        totalGoals += goals
        completedCount++
        teamGoals[m.home] = (teamGoals[m.home] || 0) + (m.homeScore || 0)
        teamGoals[m.away] = (teamGoals[m.away] || 0) + (m.awayScore || 0)
      }
    })

    const topScorer = Object.entries(teamGoals).reduce(
      (acc, [team, goals]: [string, any]) =>
        goals > acc.goals ? { team, goals } : acc,
      { team: '', goals: 0 }
    )

    // Group statistics
    const groupStats = ['A', 'B', 'C', 'D'].map(group => {
      const groupTeams = teams.filter((t: any) => t.group === group)
      const totalPoints = groupTeams.reduce((sum: number, t: any) => sum + (t.won * 3 + t.drawn), 0)
      const totalMatches = groupTeams.reduce((sum: number, t: any) => sum + t.played, 0)

      return {
        group,
        teams: groupTeams.length,
        matches: totalMatches,
        points: totalPoints,
      }
    })

    setStats({
      totalMatches: matches.length,
      totalTeams: teams.length,
      upcomingMatches: matches.filter((m: any) => m.status === 'upcoming').length,
      liveMatches: matches.filter((m: any) => m.status === 'live').length,
      completedMatches: matches.filter((m: any) => m.status === 'completed').length,
      totalGoals,
      averageGoalsPerMatch: completedCount > 0 ? (totalGoals / completedCount).toFixed(2) : 0,
      topScorer,
      groupStats,
    })
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Tournament statistics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Matches</p>
          <p className="text-3xl font-bold text-primary mt-2">{stats.totalMatches}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.upcomingMatches} upcoming, {stats.completedMatches} completed
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Goals</p>
          <p className="text-3xl font-bold text-accent mt-2">{stats.totalGoals}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {typeof stats.averageGoalsPerMatch === 'string'
              ? stats.averageGoalsPerMatch
              : (stats.averageGoalsPerMatch as number).toFixed(2)}{' '}
            per match average
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Top Scorer</p>
          <p className="text-3xl font-bold text-secondary mt-2">{stats.topScorer.goals}</p>
          <p className="text-xs text-muted-foreground mt-2">{stats.topScorer.team}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm font-medium">Participating Teams</p>
          <p className="text-3xl font-bold text-muted-foreground mt-2">{stats.totalTeams}</p>
          <p className="text-xs text-muted-foreground mt-2">Across 4 groups</p>
        </div>
      </div>

      {/* Match Status Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Match Status Distribution</h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Completed</span>
              <span className="text-sm font-semibold text-foreground">{stats.completedMatches}</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{
                  width: `${(stats.completedMatches / stats.totalMatches) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Upcoming</span>
              <span className="text-sm font-semibold text-foreground">{stats.upcomingMatches}</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-secondary rounded-full h-2 transition-all"
                style={{
                  width: `${(stats.upcomingMatches / stats.totalMatches) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Live</span>
              <span className="text-sm font-semibold text-foreground">{stats.liveMatches}</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-accent rounded-full h-2 transition-all"
                style={{
                  width: `${(stats.liveMatches / stats.totalMatches) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Group Statistics */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Group</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Teams</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Matches Played</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {stats.groupStats.map(group => (
              <tr key={group.group} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {group.group}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-foreground font-medium">{group.teams}</td>
                <td className="px-6 py-4 text-center text-sm text-foreground">{group.matches}</td>
                <td className="px-6 py-4 text-center text-sm font-bold text-primary">{group.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tournament Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-3">Tournament Format</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>32 teams divided into 4 groups</li>
            <li>Each team plays 3 group stage matches</li>
            <li>Top 2 teams per group advance</li>
            <li>Total of 64 matches</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-3">Points System</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Win = 3 points</li>
            <li>Draw = 1 point</li>
            <li>Loss = 0 points</li>
            <li>Tiebreaker: Goal difference, then goals scored</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
