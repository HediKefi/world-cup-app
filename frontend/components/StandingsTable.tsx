import { Team } from '@/lib/data'

export default function StandingsTable({ teams }: { teams: Team[] }) {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

  return (
    <div className="overflow-x-auto bg-card rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">POS</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">TEAM</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">P</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">W</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">D</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">L</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">GF</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">GA</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">GD</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-primary">PTS</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr 
              key={team.id} 
              className="border-b border-border hover:bg-muted/20 transition"
            >
              <td className="px-4 py-4 text-sm font-bold text-primary">{index + 1}</td>
              <td className="px-4 py-4 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{team.flag}</span>
                  <span className="text-foreground">{team.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-center text-foreground">{team.played}</td>
              <td className="px-4 py-4 text-sm text-center text-accent font-semibold">{team.wins}</td>
              <td className="px-4 py-4 text-sm text-center text-foreground">{team.draws}</td>
              <td className="px-4 py-4 text-sm text-center text-muted-foreground">{team.losses}</td>
              <td className="px-4 py-4 text-sm text-center text-foreground">{team.goalsFor}</td>
              <td className="px-4 py-4 text-sm text-center text-foreground">{team.goalsAgainst}</td>
              <td className={`px-4 py-4 text-sm text-center font-semibold ${
                team.goalDifference > 0 ? 'text-accent' : team.goalDifference < 0 ? 'text-destructive' : 'text-foreground'
              }`}>
                {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
              </td>
              <td className="px-4 py-4 text-sm font-bold text-primary text-center">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
