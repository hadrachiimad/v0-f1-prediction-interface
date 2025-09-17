import type { DriverPosition, BetType } from "@/lib/f1-data"
import { DriverCard } from "./driver-card"
import { Trophy, Medal, Award } from "lucide-react"

interface RaceResultsProps {
  results: DriverPosition[]
  userBet?: string
  betType?: BetType // Added bet type prop
}

export function RaceResults({ results, userBet, betType = "winner" }: RaceResultsProps) {
  const winner = results[0]
  const podium = results.slice(0, 3)

  const isWinningBet =
    betType === "winner"
      ? userBet?.toLowerCase().trim() === winner.driver.toLowerCase()
      : podium.some((driver) => driver.driver.toLowerCase() === userBet?.toLowerCase().trim())

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

          <div className={`text-lg font-semibold ${isWinningBet ? "text-green-600" : "text-red-600"}`}>
            {isWinningBet ? (
              <div className="space-y-1">
                <div>🎉 Congratulations! Your bet was successful!</div>
                <div className="text-sm">
                  {betType === "winner" ? "You correctly predicted the winner!" : "Your driver made the podium!"}
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div>😔 Sorry, your bet didn't win.</div>
                <div className="text-sm">
                  You chose: {userBet} ({betType === "winner" ? "Winner" : "Podium"} bet)
                  <br />
                  {betType === "winner"
                    ? `The winner was: ${winner.driver}`
                    : `Podium: ${podium.map((p) => p.driver).join(", ")}`}
                </div>
              </div>
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
              <DriverCard
                driverPosition={result}
                showPosition={false}
                className={`hover:scale-100 ${
                  userBet?.toLowerCase().trim() === result.driver.toLowerCase()
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full Results */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Full Race Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((result) => (
            <DriverCard
              key={result.driver}
              driverPosition={result}
              className={`hover:scale-100 ${
                userBet?.toLowerCase().trim() === result.driver.toLowerCase() ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
