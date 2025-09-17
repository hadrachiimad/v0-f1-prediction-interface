// F1 drivers data converted from Python script
export const f1Drivers = [
  "Oscar Piastri",
  "Lando Norris",
  "Charles Leclerc",
  "Lewis Hamilton",
  "George Russell",
  "Kimi Antonelli",
  "Max Verstappen",
  "Yuki Tsunoda",
  "Alexander Albon",
  "Carlos Sainz",
  "Lance Stroll",
  "Fernando Alonso",
  "Liam Lawson",
  "Isack Hadjar",
  "Nico Hülkenberg",
  "Gabriel Bortoleto",
  "Esteban Ocon",
  "Oliver Bearman",
  "Pierre Gasly",
  "Franco Colapinto",
]

export interface DriverPosition {
  driver: string
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

  return f1Drivers.map((driver, index) => ({
    driver,
    position: shuffledPositions[index],
  }))
}

// Generate race results (equivalent to end_race() in Python)
export function generateRaceResults(): DriverPosition[] {
  const positions = Array.from({ length: 20 }, (_, i) => i + 1)
  const shuffledPositions = shuffleArray(positions)

  return f1Drivers
    .map((driver, index) => ({
      driver,
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
    "Lewis Hamilton": "#059669", // Mercedes Green
    "George Russell": "#059669", // Mercedes Green
    "Fernando Alonso": "#16a34a", // Aston Martin Green
    "Lance Stroll": "#16a34a", // Aston Martin Green
    "Pierre Gasly": "#3b82f6", // Alpine Blue
    "Esteban Ocon": "#3b82f6", // Alpine Blue
    "Nico Hülkenberg": "#f59e0b", // Haas Yellow
    "Oliver Bearman": "#f59e0b", // Haas Yellow
    "Yuki Tsunoda": "#6366f1", // AlphaTauri Purple
    "Liam Lawson": "#6366f1", // AlphaTauri Purple
    "Alexander Albon": "#0ea5e9", // Williams Blue
    "Franco Colapinto": "#0ea5e9", // Williams Blue
    "Kimi Antonelli": "#8b5cf6", // Sauber Purple
    "Gabriel Bortoleto": "#8b5cf6", // Sauber Purple
    "Isack Hadjar": "#ec4899", // Generic Pink
  }

  return colorMap[driver] || "#6b7280"
}
