"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DriverCard } from "./driver-card"
import { RaceResults } from "./race-results"
import {
  generateStartingPositions,
  generateRaceResults,
  f1Drivers,
  calculatePayout,
  checkBetResult,
  type DriverPosition,
  type BetType,
  type GameStats,
} from "@/lib/f1-data"
import { Flag, Play, RotateCcw, Coins, TrendingUp, TrendingDown } from "lucide-react"

type GameState = "starting" | "betting" | "racing" | "results"

export function F1PredictionGame() {
  const [gameState, setGameState] = useState<GameState>("starting")
  const [startingPositions, setStartingPositions] = useState<DriverPosition[]>([])
  const [raceResults, setRaceResults] = useState<DriverPosition[]>([])
  const [selectedDriver, setSelectedDriver] = useState<string>("")
  const [betType, setBetType] = useState<BetType>("winner")
  const [betAmount, setBetAmount] = useState<number>(10)
  const [userBet, setUserBet] = useState<{ driver: string; type: BetType; amount: number }>({
    driver: "",
    type: "winner",
    amount: 0,
  })
  const [gameStats, setGameStats] = useState<GameStats>({
    balance: 100,
    totalRaces: 0,
    wins: 0,
    losses: 0,
  })
  const [lastResult, setLastResult] = useState<{ won: boolean; payout: number } | null>(null)

  const startNewRace = () => {
    if (gameStats.balance <= 0) {
      alert("Game Over! You're out of points.")
      return
    }

    const positions = generateStartingPositions()
    setStartingPositions(positions)
    setGameState("betting")
    setSelectedDriver("")
    setRaceResults([])
    setLastResult(null)
  }

  const placeBet = () => {
    if (!selectedDriver || betAmount <= 0 || betAmount > gameStats.balance) return

    setUserBet({ driver: selectedDriver, type: betType, amount: betAmount })
    setGameState("racing")

    // Simulate race with delay for excitement
    setTimeout(() => {
      const results = generateRaceResults()
      setRaceResults(results)

      const won = checkBetResult(selectedDriver, betType, results)
      const payout = calculatePayout(betType, betAmount, won)

      setGameStats((prev) => ({
        balance: won ? prev.balance + payout : prev.balance - betAmount,
        totalRaces: prev.totalRaces + 1,
        wins: won ? prev.wins + 1 : prev.wins,
        losses: won ? prev.losses : prev.losses + 1,
      }))

      setLastResult({ won, payout: won ? payout : 0 })
      setGameState("results")
    }, 2000)
  }

  const resetGame = () => {
    setGameState("starting")
    setStartingPositions([])
    setRaceResults([])
    setSelectedDriver("")
    setUserBet({ driver: "", type: "winner", amount: 0 })
    setGameStats({
      balance: 100,
      totalRaces: 0,
      wins: 0,
      losses: 0,
    })
    setLastResult(null)
  }

  const isValidBet = selectedDriver && betAmount > 0 && betAmount <= gameStats.balance

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Stats */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🏎️ F1 Betting Game
          </h1>
          <p className="text-lg text-muted-foreground">Place your bets and test your F1 knowledge!</p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="default" className="text-lg px-4 py-2">
              <Coins className="w-4 h-4 mr-2" />
              {gameStats.balance} Points
            </Badge>
            {gameStats.totalRaces > 0 && (
              <>
                <Badge variant="outline" className="px-3 py-1">
                  Races: {gameStats.totalRaces}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Wins: {gameStats.wins}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-red-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Losses: {gameStats.losses}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Game Content */}
        {gameState === "starting" && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Flag className="w-6 h-6" />
                Ready to Race?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                You start with 100 points. Bet on winners (3x payout) or podium finishers (2x payout)!
              </p>
              <Button onClick={startNewRace} size="lg" className="w-full" disabled={gameStats.balance <= 0}>
                <Play className="w-4 h-4 mr-2" />
                {gameStats.balance <= 0 ? "Game Over" : "Start New Race"}
              </Button>
              {gameStats.totalRaces > 0 && (
                <Button onClick={resetGame} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Game
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {gameState === "betting" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Flag className="w-6 h-6" />
                  Starting Grid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {startingPositions
                    .sort((a, b) => a.position - b.position)
                    .map((driverPos) => (
                      <DriverCard key={driverPos.driver} driverPosition={driverPos} />
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Place Your Bet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Bet Type</Label>
                  <RadioGroup value={betType} onValueChange={(value) => setBetType(value as BetType)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="winner" id="winner" />
                      <Label htmlFor="winner" className="cursor-pointer">
                        Winner Bet (3x payout) - Pick the race winner
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="podium" id="podium" />
                      <Label htmlFor="podium" className="cursor-pointer">
                        Podium Bet (2x payout) - Pick a top 3 finisher
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="betAmount" className="text-base font-semibold">
                    Bet Amount (Max: {gameStats.balance})
                  </Label>
                  <Input
                    id="betAmount"
                    type="number"
                    min="1"
                    max={gameStats.balance}
                    value={betAmount}
                    onChange={(e) =>
                      setBetAmount(Math.max(1, Math.min(gameStats.balance, Number.parseInt(e.target.value) || 1)))
                    }
                    className="w-32"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Driver</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {f1Drivers.map((driver) => (
                      <Button
                        key={driver}
                        variant={selectedDriver === driver ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDriver(driver)}
                        className="text-xs p-2 h-auto"
                      >
                        {driver}
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDriver && (
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-semibold">Your Bet:</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="default">{selectedDriver}</Badge>
                        <Badge variant="outline">{betType === "winner" ? "Winner" : "Podium"}</Badge>
                        <Badge variant="outline">{betAmount} points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Potential payout: {calculatePayout(betType, betAmount, true)} points
                      </p>
                    </div>
                    <Button onClick={placeBet} size="lg" disabled={!isValidBet}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Race!
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "racing" && (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-12 space-y-4">
              <div className="text-6xl animate-bounce">🏎️</div>
              <h2 className="text-2xl font-bold">Race in Progress...</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Your bet: <Badge variant="default">{userBet.driver}</Badge>
                </p>
                <p className="text-sm text-muted-foreground">
                  {userBet.type === "winner" ? "Winner" : "Podium"} bet • {userBet.amount} points
                </p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "results" && (
          <div className="space-y-6">
            {lastResult && (
              <Card className={`max-w-md mx-auto ${lastResult.won ? "border-green-500" : "border-red-500"}`}>
                <CardContent className="text-center py-6 space-y-4">
                  <div className={`text-6xl ${lastResult.won ? "animate-bounce" : ""}`}>
                    {lastResult.won ? "🎉" : "😔"}
                  </div>
                  <h2 className={`text-2xl font-bold ${lastResult.won ? "text-green-600" : "text-red-600"}`}>
                    {lastResult.won ? "Congratulations!" : "Better luck next time!"}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Your bet: <Badge variant="outline">{userBet.driver}</Badge> •
                      <Badge variant="outline" className="ml-1">
                        {userBet.type}
                      </Badge>
                    </p>
                    {lastResult.won ? (
                      <p className="text-green-600 font-semibold">
                        You won {lastResult.payout} points! (+{lastResult.payout - userBet.amount})
                      </p>
                    ) : (
                      <p className="text-red-600 font-semibold">You lost {userBet.amount} points</p>
                    )}
                    <p className="text-lg font-bold">New balance: {gameStats.balance} points</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <RaceResults results={raceResults} userBet={userBet.driver} betType={userBet.type} />

            <div className="text-center space-y-4">
              {gameStats.balance > 0 ? (
                <Button onClick={startNewRace} size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Next Race
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xl font-bold text-red-600">Game Over!</p>
                  <p className="text-muted-foreground">You're out of points.</p>
                  <Button onClick={resetGame} size="lg" variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start New Game
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
