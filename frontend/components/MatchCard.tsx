import { Match } from '@/lib/data'

export default function MatchCard({ match }: { match: Match }) {
  const isCompleted = match.status === 'completed'
  const isLive = match.status === 'live'

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition">
      <div className="bg-muted/30 p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-muted-foreground">{match.group}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${
            isLive ? 'bg-primary text-primary-foreground animate-pulse' :
            isCompleted ? 'bg-muted text-muted-foreground' :
            'bg-secondary text-secondary-foreground'
          }`}>
            {isLive ? 'LIVE' : isCompleted ? 'FINAL' : 'UPCOMING'}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Date and Time */}
        <div className="text-center text-sm text-muted-foreground mb-6">
          <div>{match.date}</div>
          <div className="font-semibold">{match.time}</div>
        </div>

        {/* Match Details */}
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="text-3xl mb-2">{match.homeTeamFlag}</div>
            <div className="text-sm font-semibold text-foreground">{match.homeTeam}</div>
          </div>

          {/* Score or VS */}
          <div className="flex-none">
            {isCompleted ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{match.homeScore}</div>
                <div className="text-xs text-muted-foreground my-1">:</div>
                <div className="text-3xl font-bold text-secondary">{match.awayScore}</div>
              </div>
            ) : (
              <div className="text-lg font-bold text-muted-foreground">VS</div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="text-3xl mb-2">{match.awayTeamFlag}</div>
            <div className="text-sm font-semibold text-foreground">{match.awayTeam}</div>
          </div>
        </div>

        {/* Footer */}
        {isCompleted && (
          <div className="mt-6 pt-4 border-t border-border">
            <button className="w-full text-sm font-semibold text-accent hover:text-accent/80 transition">
              View Match Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
