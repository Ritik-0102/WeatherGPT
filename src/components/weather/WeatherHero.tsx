"use client";

import { CurrentWeather } from "@/types/weather";
import { MapPin, CloudSun, Cloud, CloudRain, Moon, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocationStore } from "@/stores/useLocationStore";

interface WeatherHeroProps {
  data: CurrentWeather;
}

const getIcon = (iconName: string, className?: string) => {
  const props = { className: className || "h-12 w-12" };
  switch (iconName) {
    case "cloud-sun": return <CloudSun {...props} />;
    case "cloud": return <Cloud {...props} />;
    case "cloud-rain": return <CloudRain {...props} />;
    case "moon": return <Moon {...props} />;
    case "sun": return <Sun {...props} />;
    default: return <Sun {...props} />;
  }
};

export function WeatherHero({ data }: WeatherHeroProps) {
  const { locationName } = useLocationStore();
  const displayLocation = locationName || data.location;

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-500/10 via-background to-background shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">{displayLocation}</span>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-7xl font-bold tracking-tighter sm:text-8xl">
                {data.temperature}°
              </h1>
              <div className="flex flex-col text-muted-foreground">
                <span className="text-xl font-medium text-foreground">{data.condition}</span>
                <span>Feels like {data.feelsLike}°C</span>
              </div>
            </div>
          </div>

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/5 text-primary">
            {getIcon(data.icon, "h-20 w-20")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
