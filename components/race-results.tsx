import type { DriverPosition } from "@/lib/f1-data"
import { DriverCard } from "./driver-card"
import { Trophy, Medal, Award } from "lucide-react"

interface RaceResultsProps {
  results: DriverPosition[]
  userBet?: string
}

export function RaceResults({ results, userBet }: RaceResultsProps) {
  const winner = results[0]
  const isWinningBet = userBet?.toLowerCase().trim() === winner.driver.toLowerCase()

  const getPodiumIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Podium Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-balance">🏁 Race Results</h2>

        {/* Winner Announcement */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h3 className="text-2xl font-bold">Winner: {winner.driver}</h3>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>

          {/* Bet Result */}
          <div className={`text-lg font-semibold ${isWinningBet ? "text-green-600" : "text-red-600"}`}>
            {isWinningBet ? (
              "🎉 Congratulations! You guessed correctly!"
            ) : (
              <>
                😔 Sorry, you lost your bet.
                <br />
                <span className="text-sm">
                  You chose: {userBet} | Winner: {winner.driver}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {results.slice(0, 3).map((result, index) => (
            <div key={result.driver} className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getPodiumIcon(result.position)}
                <span className="ml-2 text-lg font-bold">{index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}</span>
              </div>
              <DriverCard driverPosition={result} showPosition={false} className="hover:scale-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Full Results */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Full Race Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((result) => (
            <DriverCard key={result.driver} driverPosition={result} className="hover:scale-100" />
          ))}
        </div>
      </div>
    </div>
  )
}
