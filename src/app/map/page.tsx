"use client";

import { useState } from "react";
import { mockMapCities, CityWeatherMarker } from "@/lib/mock/mapCities";
import { WeatherMapContainer } from "@/components/map/WeatherMapContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Thermometer, CloudRain, ShieldAlert, Wind, Search, MapPin } from "lucide-react";

type MapLayer = "temp" | "rainfall" | "alerts" | "wind";

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState<MapLayer>("temp");
  const [selectedCity, setSelectedCity] = useState<CityWeatherMarker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = mockMapCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 max-w-7xl mx-auto w-full gap-4">
      {/* Top Map Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search city (e.g. Delhi, Mumbai, Phagwara)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border bg-card text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
          />

          {searchQuery && (
            <div className="absolute top-12 left-0 right-0 z-30 max-h-48 overflow-y-auto rounded-xl border bg-card shadow-lg p-1">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery("");
                  }}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs hover:bg-muted rounded-lg text-left"
                >
                  <span className="font-semibold">{city.name}, {city.state}</span>
                  <span className="text-muted-foreground">{city.temp}°C</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Floating Layer Controls */}
        <div className="flex items-center gap-1 bg-card p-1 rounded-xl border shadow-sm self-center sm:self-auto overflow-x-auto max-w-full">
          <Button
            variant={activeLayer === "temp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("temp")}
            className="text-xs gap-1.5 rounded-lg"
          >
            <Thermometer className="h-3.5 w-3.5" />
            Temperature
          </Button>

          <Button
            variant={activeLayer === "rainfall" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("rainfall")}
            className="text-xs gap-1.5 rounded-lg"
          >
            <CloudRain className="h-3.5 w-3.5" />
            Rainfall
          </Button>

          <Button
            variant={activeLayer === "alerts" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("alerts")}
            className="text-xs gap-1.5 rounded-lg"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Alerts
          </Button>

          <Button
            variant={activeLayer === "wind" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("wind")}
            className="text-xs gap-1.5 rounded-lg"
          >
            <Wind className="h-3.5 w-3.5" />
            Wind
          </Button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex-1 w-full min-h-[400px]">
        <WeatherMapContainer
          cities={mockMapCities}
          activeLayer={activeLayer}
          selectedCity={selectedCity}
        />

        {/* Quick Location Reset Chip */}
        {selectedCity && (
          <Card className="absolute bottom-4 left-4 z-20 bg-background/95 backdrop-blur-md p-2.5 flex items-center gap-2 shadow-md">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">Focused on {selectedCity.name}</span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setSelectedCity(null)}
              className="text-xs text-muted-foreground"
            >
              Reset
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
