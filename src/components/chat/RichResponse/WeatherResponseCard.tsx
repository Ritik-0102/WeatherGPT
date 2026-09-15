import { WeatherCardData } from "@/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { CloudRain, Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherResponseCardProps {
  data: WeatherCardData;
}

export function WeatherResponseCard({ data }: WeatherResponseCardProps) {
  return (
    <Card className="my-3 overflow-hidden bg-gradient-to-br from-blue-500/10 via-card to-card border-blue-500/20 shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 border-b mb-3">
          <div>
            <h4 className="text-sm font-semibold">{data.location}</h4>
            <p className="text-xs text-muted-foreground">{data.condition}</p>
          </div>
          <div className="flex items-center gap-1 text-blue-500 font-bold text-lg">
            <CloudRain className="h-5 w-5" />
            <span>{data.rainProbability}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 bg-muted/40 p-2.5 rounded-lg">
            <Thermometer className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-muted-foreground text-[10px]">TEMP</p>
              <p className="font-semibold text-sm">{data.temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-muted/40 p-2.5 rounded-lg">
            <CloudRain className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-muted-foreground text-[10px]">RAINFALL</p>
              <p className="font-semibold text-sm">{data.expectedRainfall}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-muted/40 p-2.5 rounded-lg">
            <Droplets className="h-4 w-4 text-cyan-500" />
            <div>
              <p className="text-muted-foreground text-[10px]">HUMIDITY</p>
              <p className="font-semibold text-sm">{data.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-muted/40 p-2.5 rounded-lg">
            <Wind className="h-4 w-4 text-teal-500" />
            <div>
              <p className="text-muted-foreground text-[10px]">WIND</p>
              <p className="font-semibold text-sm">{data.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
