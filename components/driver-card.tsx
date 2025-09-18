"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type DriverPosition, getDriverColor, getTeamColor } from "@/lib/f1-data"
import { cn } from "@/lib/utils"

interface DriverCardProps {
  driverPosition: DriverPosition
  isSelected?: boolean
  onClick?: () => void
  showPosition?: boolean
  className?: string
}

export function DriverCard({
  driverPosition,
  isSelected = false,
  onClick,
  showPosition = true,
  className,
}: DriverCardProps) {
  const { driver, team, position } = driverPosition
  const driverColor = getDriverColor(driver)
  const teamColor = getTeamColor(team)

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105",
        isSelected && "ring-2 ring-primary bg-primary/5",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: driverColor }} />
          <div>
            <h3 className="font-semibold text-sm">{driver}</h3>
            <Badge variant="outline" className="text-xs mt-1" style={{ borderColor: teamColor, color: teamColor }}>
              {team}
            </Badge>
            {showPosition && (
              <Badge variant="secondary" className="text-xs mt-1 ml-1">
                P{position}
              </Badge>
            )}
          </div>
        </div>
        {showPosition && <div className="text-2xl font-bold text-muted-foreground">{position}</div>}
      </div>
    </Card>
  )
}
