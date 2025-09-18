// F1 drivers data converted from Python script
export const f1DriversWithTeams = [
  { driver: "Oscar Piastri", team: "McLaren" },
  { driver: "Lando Norris", team: "McLaren" },
  { driver: "Charles Leclerc", team: "Ferrari" },
  { driver: "Carlos Sainz", team: "Ferrari" },
  { driver: "Lewis Hamilton", team: "Mercedes" },
  { driver: "George Russell", team: "Mercedes" },
  { driver: "Kimi Antonelli", team: "Mercedes" },
  { driver: "Max Verstappen", team: "Red Bull" },
  { driver: "Yuki Tsunoda", team: "RB" },
  { driver: "Alexander Albon", team: "Williams" },
  { driver: "Lance Stroll", team: "Aston Martin" },
  { driver: "Fernando Alonso", team: "Aston Martin" },
  { driver: "Liam Lawson", team: "RB" },
  { driver: "Isack Hadjar", team: "RB" },
  { driver: "Nico Hülkenberg", team: "Sauber" },
  { driver: "Gabriel Bortoleto", team: "Sauber" },
  { driver: "Esteban Ocon", team: "Alpine" },
  { driver: "Pierre Gasly", team: "Alpine" },
  { driver: "Oliver Bearman", team: "Ferrari" },
  { driver: "Franco Colapinto", team: "Williams" },
]

export const f1Teams = Array.from(new Set(f1DriversWithTeams.map((d) => d.team))).sort()

export const f1Drivers = f1DriversWithTeams.map((d) => d.driver)

export interface DriverPosition {
  driver: string
  team: string
  position: number
}

// Shuffle array utility function
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate starting positions (equivalent to start_race() in Python)
export function generateStartingPositions(): DriverPosition[] {
  const positions = Array.from({ length: 20 }, (_, i) => i + 1)
  const shuffledPositions = shuffleArray(positions)

  return f1DriversWithTeams.map((driverTeam, index) => ({
    driver: driverTeam.driver,
    team: driverTeam.team,
    position: shuffledPositions[index],
  }))
}

// Generate race results (equivalent to end_race() in Python)
export function generateRaceResults(): DriverPosition[] {
  const positions = Array.from({ length: 20 }, (_, i) => i + 1)
  const shuffledPositions = shuffleArray(positions)

  return f1DriversWithTeams
    .map((driverTeam, index) => ({
      driver: driverTeam.driver,
      team: driverTeam.team,
      position: shuffledPositions[index],
    }))
    .sort((a, b) => a.position - b.position)
}

// Get driver team colors for visual appeal
export function getDriverColor(driver: string): string {
  const colorMap: Record<string, string> = {
    "Max Verstappen": "#1e40af", // Red Bull Blue
    "Lando Norris": "#f97316", // McLaren Orange
    "Oscar Piastri": "#f97316", // McLaren Orange
    "Charles Leclerc": "#dc2626", // Ferrari Red
    "Carlos Sainz": "#dc2626", // Ferrari Red
    "Oliver Bearman": "#dc2626", // Ferrari Red
    "Lewis Hamilton": "#059669", // Mercedes Green
    "George Russell": "#059669", // Mercedes Green
    "Kimi Antonelli": "#059669", // Mercedes Green
    "Fernando Alonso": "#16a34a", // Aston Martin Green
    "Lance Stroll": "#16a34a", // Aston Martin Green
    "Pierre Gasly": "#3b82f6", // Alpine Blue
    "Esteban Ocon": "#3b82f6", // Alpine Blue
    "Nico Hülkenberg": "#8b5cf6", // Sauber Purple
    "Gabriel Bortoleto": "#8b5cf6", // Sauber Purple
    "Yuki Tsunoda": "#6366f1", // RB Purple
    "Liam Lawson": "#6366f1", // RB Purple
    "Isack Hadjar": "#6366f1", // RB Purple
    "Alexander Albon": "#0ea5e9", // Williams Blue
    "Franco Colapinto": "#0ea5e9", // Williams Blue
  }

  return colorMap[driver] || "#6b7280"
}

export function getTeamColor(team: string): string {
  const teamColorMap: Record<string, string> = {
    McLaren: "#f97316",
    Ferrari: "#dc2626",
    Mercedes: "#059669",
    "Red Bull": "#1e40af",
    "Aston Martin": "#16a34a",
    Alpine: "#3b82f6",
    Sauber: "#8b5cf6",
    RB: "#6366f1",
    Williams: "#0ea5e9",
  }

  return teamColorMap[team] || "#6b7280"
}

export type BetType = "winner" | "podium"
export type BetTarget = "driver" | "team"

export interface GameStats {
  balance: number
  totalRaces: number
  wins: number
  losses: number
}

export function calculatePayout(betTarget: BetTarget, betType: BetType, betAmount: number, isWin: boolean): number {
  if (!isWin) return 0

  if (betTarget === "driver") {
    if (betType === "winner") {
      return betAmount * 10 // 10x payout for driver winner
    } else if (betType === "podium") {
      return betAmount * 7 // 7x payout for driver podium
    }
  } else if (betTarget === "team") {
    if (betType === "winner") {
      return betAmount * 5 // 5x payout for team winner
    } else if (betType === "podium") {
      return betAmount * 7 // 7x payout for team podium
    }
  }

  return 0
}

export function checkBetResult(
  userBet: string,
  betTarget: BetTarget,
  betType: BetType,
  results: DriverPosition[],
): boolean {
  const sortedResults = results.sort((a, b) => a.position - b.position)

  if (betTarget === "driver") {
    if (betType === "winner") {
      return userBet.toLowerCase().trim() === sortedResults[0].driver.toLowerCase()
    } else if (betType === "podium") {
      const podium = [sortedResults[0].driver, sortedResults[1].driver, sortedResults[2].driver]
      return podium.some((driver) => driver.toLowerCase() === userBet.toLowerCase().trim())
    }
  } else if (betTarget === "team") {
    if (betType === "winner") {
      return userBet.toLowerCase().trim() === sortedResults[0].team.toLowerCase()
    } else if (betType === "podium") {
      const podiumTeams = [sortedResults[0].team, sortedResults[1].team, sortedResults[2].team]
      return podiumTeams.some((team) => team.toLowerCase() === userBet.toLowerCase().trim())
    }
  }

  return false
}
