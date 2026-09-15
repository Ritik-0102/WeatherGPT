import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AIClimateInsightsProps {
  timescale: string;
}

export function AIClimateInsights({ timescale }: AIClimateInsightsProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-sm">
      <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>WeatherGPT Climate Synthesis ({timescale})</span>
          </div>

          <p className="text-sm font-semibold text-foreground">
            Average temperature has increased by approximately <span className="text-amber-500 font-bold">+1.6°C</span> over the selected {timescale.toLowerCase()} observation window.
          </p>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Data reveals a noticeable rise in extreme precipitation events and an increase in annual heatwave frequency from 8 days to 25 days annually.
          </p>
        </div>

        <Link
          href="/chat?q=Explain%20the%20long%20term%20climate%20change%20trends%20in%20North%20India"
          className={cn(buttonVariants({ size: "sm" }), "gap-1.5 shrink-0 text-xs")}
        >
          Ask AI Analysis <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
