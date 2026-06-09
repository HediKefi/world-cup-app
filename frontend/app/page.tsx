'use client'

import { useState, useEffect } from 'react'
import { predictions } from '@/lib/data'
import { getMatches, getTeams, initializeStorage } from '@/lib/storage'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import MatchCard from '@/components/MatchCard'
import StandingsTable from '@/components/StandingsTable'
import PredictionCard from '@/components/PredictionCard'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'fixtures' | 'standings' | 'predictions'>('fixtures')
  const [matches, setMatches] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [matchesData, teamsData] = await Promise.all([
          getMatches(),
          getTeams()
        ])
        setMatches(matchesData)
        setTeams(teamsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 3)
  const recentMatches = matches.filter(m => m.status === 'completed').slice(-3).reverse()
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="text-3xl font-bold text-primary">32</div>
            <div className="text-sm text-muted-foreground mt-2">Teams</div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="text-3xl font-bold text-accent">64</div>
            <div className="text-sm text-muted-foreground mt-2">Total Matches</div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="text-3xl font-bold text-secondary">8</div>
            <div className="text-sm text-muted-foreground mt-2">Groups</div>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="text-3xl font-bold text-primary">2026</div>
            <div className="text-sm text-muted-foreground mt-2">Year</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`px-4 py-3 font-semibold transition-all ${
              activeTab === 'fixtures'
                ? 'text-primary border-b-2 border-primary -mb-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Fixtures & Results
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-4 py-3 font-semibold transition-all ${
              activeTab === 'standings'
                ? 'text-primary border-b-2 border-primary -mb-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Standings
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`px-4 py-3 font-semibold transition-all ${
              activeTab === 'predictions'
                ? 'text-primary border-b-2 border-primary -mb-1'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Predictions
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'fixtures' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'standings' && (
          <div className="space-y-8">
            {['A', 'B', 'C', 'D'].map(group => (
              <div key={group}>
                <h2 className="text-xl font-bold mb-4">Group {group}</h2>
                <StandingsTable teams={teams.filter(t => t.group === group)} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'predictions' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Fan Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map(pred => {
                const match = matches.find(m => m.id === pred.matchId)
                return match ? <PredictionCard key={pred.id} match={match} prediction={pred} /> : null
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
