"use client";

import dynamic from "next/dynamic";
import { CityWeatherMarker } from "@/lib/mock/mapCities";
import { Loader2 } from "lucide-react";

interface WeatherMapContainerProps {
  cities: CityWeatherMarker[];
  activeLayer: "temp" | "rainfall" | "alerts" | "wind";
  selectedCity: CityWeatherMarker | null;
}

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border bg-muted/20">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span>Loading Interactive GIS Map...</span>
      </div>
    </div>
  ),
});

export function WeatherMapContainer(props: WeatherMapContainerProps) {
  return <MapComponent {...props} />;
}
