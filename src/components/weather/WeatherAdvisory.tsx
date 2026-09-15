import { WeatherAdvisory as WeatherAdvisoryType } from "@/types/weather";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle, Info, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WeatherAdvisoryProps {
  advisory: WeatherAdvisoryType;
}

export function WeatherAdvisory({ advisory }: WeatherAdvisoryProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex gap-1 items-center">
            <ShieldAlert className="h-3.5 w-3.5" />
            CRITICAL ADVISORY
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white flex gap-1 items-center">
            <AlertTriangle className="h-3.5 w-3.5" />
            WEATHER WARNING
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex gap-1 items-center">
            <Info className="h-3.5 w-3.5" />
            ADVISORY
          </Badge>
        );
    }
  };

  return (
    <Card className="border-l-4 border-l-amber-500 bg-amber-500/5 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {advisory.title}
        </CardTitle>
        {getSeverityBadge(advisory.severity)}
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-muted-foreground">{advisory.reason}</p>
        <p className="font-medium text-foreground">{advisory.recommendation}</p>
      </CardContent>
      <CardFooter>
        <Link
          href="/chat?q=Tell%20me%20more%20about%20the%20current%20weather%20advisory"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
        >
          Ask WeatherGPT <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
