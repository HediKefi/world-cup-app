'use client'

import { useEffect, useState } from 'react'
import { getTeams, updateTeam } from '@/lib/storage'

interface Team {
  id: string
  name: string
  flag: string
  group: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export default function AdminTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Team>>({})
  const [selectedGroup, setSelectedGroup] = useState<string>('A')

  useEffect(() => {
    async function fetchTeams() {
      try {
        const data = await getTeams()
        setTeams(data)
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    }
    fetchTeams()
  }, [])

  const handleEdit = (team: Team) => {
    setEditingId(team.id)
    setFormData(team)
  }

  const handleSave = async () => {
    if (editingId) {
      try {
        await updateTeam(editingId, formData)
        const data = await getTeams()
        setTeams(data)
        setEditingId(null)
        setFormData({})
      } catch (error) {
        console.error('Error updating team:', error)
        alert('Failed to update team')
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({})
  }

  const groupTeams = teams.filter(t => t.group === selectedGroup)

  const calculatePoints = (team: Team) => {
    return team.won * 3 + team.drawn * 1
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
        <p className="text-muted-foreground mt-1">Edit team standings and statistics</p>
      </div>

      {/* Group Selector */}
      <div className="flex gap-2">
        {['A', 'B', 'C', 'D'].map(group => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedGroup === group
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:border-primary'
            }`}
          >
            Group {group}
          </button>
        ))}
      </div>

      {/* Edit Form */}
      {editingId && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Edit Team</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Team Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Flag Emoji</label>
                <input
                  type="text"
                  value={formData.flag || ''}
                  onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Played</label>
                <input
                  type="number"
                  value={formData.played || 0}
                  onChange={(e) => setFormData({ ...formData, played: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Won</label>
                <input
                  type="number"
                  value={formData.won || 0}
                  onChange={(e) => setFormData({ ...formData, won: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Drawn</label>
                <input
                  type="number"
                  value={formData.drawn || 0}
                  onChange={(e) => setFormData({ ...formData, drawn: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Lost</label>
                <input
                  type="number"
                  value={formData.lost || 0}
                  onChange={(e) => setFormData({ ...formData, lost: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Goals For</label>
                <input
                  type="number"
                  value={formData.goalsFor || 0}
                  onChange={(e) => setFormData({ ...formData, goalsFor: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Goals Against</label>
                <input
                  type="number"
                  value={formData.goalsAgainst || 0}
                  onChange={(e) => setFormData({ ...formData, goalsAgainst: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teams Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Team</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">P</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">W</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">D</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">L</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">GF</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">GA</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">GD</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Pts</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupTeams
              .sort((a, b) => (calculatePoints(b) || 0) - (calculatePoints(a) || 0))
              .map((team, index) => (
                <tr
                  key={team.id}
                  className={`border-b border-border hover:bg-background/50 transition-colors ${index < 2 ? 'bg-primary/5' : ''}`}
                >
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{team.flag}</span>
                      <span>{team.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">{team.played}</td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">{team.won}</td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">{team.drawn}</td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">{team.lost}</td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">{team.goalsFor}</td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">{team.goalsAgainst}</td>
                  <td className="px-6 py-4 text-center text-sm text-foreground">
                    {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-primary">
                    {calculatePoints(team)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId !== team.id && (
                      <button
                        onClick={() => handleEdit(team)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Tip:</span> Points are calculated automatically (Win = 3 points, Draw = 1 point).
          Teams are sorted by points, then goal difference.
        </p>
      </div>
    </div>
  )
}
