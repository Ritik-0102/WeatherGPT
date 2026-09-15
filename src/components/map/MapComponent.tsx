"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CityWeatherMarker } from "@/lib/mock/mapCities";
import { buttonVariants } from "@/components/ui/button";
import { Droplets, Wind, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MapComponentProps {
  cities: CityWeatherMarker[];
  activeLayer: "temp" | "rainfall" | "alerts" | "wind";
  selectedCity: CityWeatherMarker | null;
}

// Custom Div Icon Generator
const createCustomIcon = (city: CityWeatherMarker, activeLayer: string) => {
  let content = "";
  let bgClass = "bg-primary text-primary-foreground";

  if (activeLayer === "temp") {
    content = `${city.temp}°C`;
    bgClass = city.temp > 30 ? "bg-amber-500 text-white" : "bg-blue-500 text-white";
  } else if (activeLayer === "rainfall") {
    content = `${city.humidity}%`;
    bgClass = "bg-blue-600 text-white";
  } else if (activeLayer === "wind") {
    content = `${city.windSpeed}km/h`;
    bgClass = "bg-teal-600 text-white";
  } else if (activeLayer === "alerts") {
    if (city.alert) {
      content = "!";
      bgClass = city.alert.severity === "critical" ? "bg-red-600 text-white animate-bounce" : "bg-amber-500 text-white";
    } else {
      content = "✓";
      bgClass = "bg-emerald-600 text-white";
    }
  }

  const html = `<div class="flex items-center justify-center font-bold text-xs rounded-full shadow-lg ${bgClass} px-2 py-1 border-2 border-white">${content}</div>`;

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: html,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });
};

function MapViewRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 8, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function MapComponent({ cities, activeLayer, selectedCity }: MapComponentProps) {
  // Center map on India initially
  const defaultCenter: [number, number] = [20.5937, 78.9629];

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border shadow-sm">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        {/* CartoDB Positron Map Tiles (Clean, modern look) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {selectedCity && (
          <MapViewRecenter center={[selectedCity.lat, selectedCity.lng]} />
        )}

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.lat, city.lng]}
            icon={createCustomIcon(city, activeLayer)}
          >
            <Popup className="leaflet-popup-custom">
              <div className="p-1 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{city.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{city.state}</p>
                  </div>
                  <span className="font-bold text-base text-primary">{city.temp}°C</span>
                </div>

                <p className="font-medium text-foreground">{city.condition}</p>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span>Humidity: {city.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Wind className="h-3 w-3 text-teal-500" />
                    <span>Wind: {city.windSpeed} km/h</span>
                  </div>
                </div>

                {city.alert && (
                  <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-md mt-2">
                    <div className="flex items-center gap-1 text-amber-600 font-bold text-[10px]">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{city.alert.title}</span>
                    </div>
                  </div>
                )}

                <Link
                  href={`/chat?q=Weather%20in%20${encodeURIComponent(city.name)}`}
                  className={cn(buttonVariants({ size: "xs", variant: "outline" }), "w-full mt-2 text-[10px] gap-1")}
                >
                  Ask AI <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
