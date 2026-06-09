'use client'

import { useEffect, useState } from 'react'
import { getMatches, updateMatch, deleteMatch, createMatch } from '@/lib/storage'

interface Match {
  id: string
  home: string
  away: string
  homeScore?: number
  awayScore?: number
  date: string
  status: 'upcoming' | 'live' | 'completed'
  group: string
}

export default function AdminMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Match>>({})
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all')

  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await getMatches()
        setMatches(data)
      } catch (error) {
        console.error('Error fetching matches:', error)
      }
    }
    fetchMatches()
  }, [])

  const handleEdit = (match: Match) => {
    setEditingId(match.id)
    setFormData(match)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this match?')) {
      try {
        await deleteMatch(id)
        const data = await getMatches()
        setMatches(data)
      } catch (error) {
        console.error('Error deleting match:', error)
        alert('Failed to delete match')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateMatch(editingId, formData)
      } else {
        await createMatch(formData)
      }
      const data = await getMatches()
      setMatches(data)
      setFormData({})
      setEditingId(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error saving match:', error)
      alert('Failed to save match')
    }
  }

  const filteredMatches = matches.filter(m =>
    filterStatus === 'all' ? true : m.status === filterStatus
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Match Management</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage tournament matches</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData({})
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + New Match
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Match' : 'Create New Match'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Home Team</label>
                <input
                  type="text"
                  value={formData.home || ''}
                  onChange={(e) => setFormData({ ...formData, home: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Away Team</label>
                <input
                  type="text"
                  value={formData.away || ''}
                  onChange={(e) => setFormData({ ...formData, away: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Group</label>
                <select
                  value={formData.group || ''}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Group</option>
                  <option value="A">Group A</option>
                  <option value="B">Group B</option>
                  <option value="C">Group C</option>
                  <option value="D">Group D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={formData.status || 'upcoming'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {(formData.status === 'live' || formData.status === 'completed') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Home Score</label>
                  <input
                    type="number"
                    value={formData.homeScore || 0}
                    onChange={(e) => setFormData({ ...formData, homeScore: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Away Score</label>
                  <input
                    type="number"
                    value={formData.awayScore || 0}
                    onChange={(e) => setFormData({ ...formData, awayScore: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {editingId ? 'Update Match' : 'Create Match'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({})
                }}
                className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'upcoming', 'live', 'completed'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              filterStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:border-primary'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Matches Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Match</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Group</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Score</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map(match => (
              <tr key={match.id} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground">{match.home} vs {match.away}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{match.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {match.group}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    match.status === 'upcoming'
                      ? 'bg-secondary/10 text-secondary'
                      : match.status === 'live'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-muted/10 text-muted-foreground'
                  }`}>
                    {match.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {match.homeScore !== undefined ? `${match.homeScore}-${match.awayScore}` : '—'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(match)}
                    className="text-primary hover:text-primary/80 text-sm font-medium mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="text-destructive hover:text-destructive/80 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
