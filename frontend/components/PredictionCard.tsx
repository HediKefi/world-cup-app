import { Match, Prediction } from '@/lib/data'

export default function PredictionCard({ 
  match, 
  prediction 
}: { 
  match: Match
  prediction: Prediction 
}) {
  const getWinnerLabel = () => {
    switch(prediction.winner) {
      case 'home': return `${match.homeTeam} Win`
      case 'away': return `${match.awayTeam} Win`
      case 'draw': return 'Draw'
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted/30 p-4 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">{match.date}</div>
            <div className="font-semibold text-foreground">{getWinnerLabel()}</div>
          </div>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-semibold">
            Most Predicted
          </span>
        </div>
      </div>

      {/* Match */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1 text-center">
            <div className="text-2xl mb-2">{match.homeTeamFlag}</div>
            <div className="text-xs font-semibold text-foreground">{match.homeTeam}</div>
          </div>
          <div className="text-lg font-bold text-muted-foreground">VS</div>
          <div className="flex-1 text-center">
            <div className="text-2xl mb-2">{match.awayTeamFlag}</div>
            <div className="text-xs font-semibold text-foreground">{match.awayTeam}</div>
          </div>
        </div>

        {/* Prediction Bars */}
        <div className="space-y-3">
          {/* Home Win */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-foreground">{match.homeTeam} Win</span>
              <span className={`text-sm font-bold ${prediction.winner === 'home' ? 'text-primary' : 'text-muted-foreground'}`}>
                {prediction.percentages.home}%
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${prediction.percentages.home}%` }}
              />
            </div>
          </div>

          {/* Draw */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-foreground">Draw</span>
              <span className={`text-sm font-bold ${prediction.winner === 'draw' ? 'text-secondary' : 'text-muted-foreground'}`}>
                {prediction.percentages.draw}%
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-secondary h-full rounded-full transition-all"
                style={{ width: `${prediction.percentages.draw}%` }}
              />
            </div>
          </div>

          {/* Away Win */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-foreground">{match.awayTeam} Win</span>
              <span className={`text-sm font-bold ${prediction.winner === 'away' ? 'text-accent' : 'text-muted-foreground'}`}>
                {prediction.percentages.away}%
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-accent h-full rounded-full transition-all"
                style={{ width: `${prediction.percentages.away}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-2">
            {prediction.totalPredictions.toLocaleString()} predictions
          </p>
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded font-semibold text-sm transition">
            Make Your Prediction
          </button>
        </div>
      </div>
    </div>
  )
}
