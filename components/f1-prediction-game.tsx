"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DriverCard } from "./driver-card"
import { RaceResults } from "./race-results"
import { generateStartingPositions, generateRaceResults, f1Drivers, type DriverPosition } from "@/lib/f1-data"
import { Flag, Play, RotateCcw } from "lucide-react"

type GameState = "starting" | "betting" | "racing" | "results"

export function F1PredictionGame() {
  const [gameState, setGameState] = useState<GameState>("starting")
  const [startingPositions, setStartingPositions] = useState<DriverPosition[]>([])
  const [raceResults, setRaceResults] = useState<DriverPosition[]>([])
  const [selectedDriver, setSelectedDriver] = useState<string>("")
  const [userBet, setUserBet] = useState<string>("")

  const startNewRace = () => {
    const positions = generateStartingPositions()
    setStartingPositions(positions)
    setGameState("betting")
    setSelectedDriver("")
    setUserBet("")
    setRaceResults([])
  }

  const placeBet = () => {
    if (!selectedDriver) return
    setUserBet(selectedDriver)
    setGameState("racing")

    // Simulate race with delay for excitement
    setTimeout(() => {
      const results = generateRaceResults()
      setRaceResults(results)
      setGameState("results")
    }, 2000)
  }

  const resetGame = () => {
    setGameState("starting")
    setStartingPositions([])
    setRaceResults([])
    setSelectedDriver("")
    setUserBet("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🏎️ F1 Prediction Game
          </h1>
          <p className="text-lg text-muted-foreground">Predict the race winner and test your F1 knowledge!</p>
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
                Generate starting positions and place your bet on who you think will win the race!
              </p>
              <Button onClick={startNewRace} size="lg" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Start New Race
              </Button>
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
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Select the driver you think will win the race:</p>
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
                {selectedDriver && (
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                    <div>
                      <p className="font-semibold">Your Bet:</p>
                      <Badge variant="default">{selectedDriver}</Badge>
                    </div>
                    <Button onClick={placeBet} size="lg">
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
              <p className="text-muted-foreground">
                Your bet: <Badge variant="default">{userBet}</Badge>
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "results" && (
          <div className="space-y-6">
            <RaceResults results={raceResults} userBet={userBet} />

            <div className="text-center">
              <Button onClick={resetGame} size="lg" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
