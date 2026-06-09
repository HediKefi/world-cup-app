'use client'

import { useEffect, useState } from 'react'
import { getMatches, getTeams } from '@/lib/storage'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalTeams: 0,
    upcomingMatches: 0,
    completedMatches: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [matches, teams] = await Promise.all([
          getMatches(),
          getTeams()
        ])

        setStats({
          totalMatches: matches.length,
          totalTeams: teams.length,
          upcomingMatches: matches.filter((m: any) => m.status === 'upcoming').length,
          completedMatches: matches.filter((m: any) => m.status === 'completed').length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  const quickActions = [
    { href: '/admin/matches', label: 'Manage Matches', icon: '⚽' },
    { href: '/admin/teams', label: 'Manage Teams', icon: '🏆' },
    { href: '/admin/analytics', label: 'View Analytics', icon: '📊' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage World Cup 2026 tournament data and view analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Matches</p>
              <p className="text-3xl font-bold text-primary mt-2">{stats.totalMatches}</p>
            </div>
            <div className="text-2xl">⚽</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Teams</p>
              <p className="text-3xl font-bold text-accent mt-2">{stats.totalTeams}</p>
            </div>
            <div className="text-2xl">🏆</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Upcoming</p>
              <p className="text-3xl font-bold text-secondary mt-2">{stats.upcomingMatches}</p>
            </div>
            <div className="text-2xl">📅</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-muted-foreground mt-2">{stats.completedMatches}</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Access and manage data
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Information</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-xl">ℹ️</div>
              <div>
                <p className="font-medium text-foreground">Data Persistence</p>
                <p className="text-sm text-muted-foreground">
                  All changes are saved to browser localStorage and will persist across sessions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-xl">📱</div>
              <div>
                <p className="font-medium text-foreground">Live Updates</p>
                <p className="text-sm text-muted-foreground">
                  Changes made in the admin panel are reflected immediately on the public site.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-xl">🔒</div>
              <div>
                <p className="font-medium text-foreground">Admin Access</p>
                <p className="text-sm text-muted-foreground">
                  You are logged in as admin. Use the Logout button in the header to exit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
