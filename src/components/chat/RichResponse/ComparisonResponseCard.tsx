import { ComparisonData } from "@/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftRight, Droplets, Thermometer } from "lucide-react";

interface ComparisonResponseCardProps {
  data: ComparisonData;
}

export function ComparisonResponseCard({ data }: ComparisonResponseCardProps) {
  return (
    <Card className="my-3 bg-card border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between pb-3 border-b mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>City Comparison</span>
          <ArrowLeftRight className="h-4 w-4" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg">
            <h5 className="font-bold text-base">{data.city1.name}</h5>
            <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-lg">
              <Thermometer className="h-5 w-5" />
              <span>{data.city1.temp}°C</span>
            </div>
            <p className="text-xs text-muted-foreground">{data.city1.condition}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              <span>{data.city1.humidity}% Humidity</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg">
            <h5 className="font-bold text-base">{data.city2.name}</h5>
            <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-lg">
              <Thermometer className="h-5 w-5" />
              <span>{data.city2.temp}°C</span>
            </div>
            <p className="text-xs text-muted-foreground">{data.city2.condition}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Droplets className="h-3.5 w-3.5 text-blue-500" />
              <span>{data.city2.humidity}% Humidity</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
