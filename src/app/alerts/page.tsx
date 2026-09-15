"use client";

import { useState } from "react";
import { mockWeatherAlerts } from "@/lib/mock/alerts";
import { WeatherAlert, AlertSeverity } from "@/types/alert";
import { AlertCard } from "@/components/alerts/AlertCard";
import { AlertDetailsModal } from "@/components/alerts/AlertDetailsModal";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Search } from "lucide-react";

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<WeatherAlert | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSeverity, setActiveSeverity] = useState<AlertSeverity | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAlert = (alert: WeatherAlert) => {
    setSelectedAlert(alert);
    setModalOpen(true);
  };

  const filteredAlerts = mockWeatherAlerts.filter((alert) => {
    const matchesSeverity = activeSeverity === "ALL" || alert.severity === activeSeverity;
    const matchesQuery =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <ShieldAlert className="h-5 w-5" />
            <h1>Weather Alert Center</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time emergency advisories, monsoon surge watches, and IMD meteorological warnings.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter location or alert..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border bg-card text-xs placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {(["ALL", "CRITICAL", "WARNING", "WATCH", "ADVISORY"] as const).map((severity) => (
          <Button
            key={severity}
            variant={activeSeverity === severity ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSeverity(severity)}
            className="text-xs rounded-full shrink-0"
          >
            {severity}
          </Button>
        ))}
      </div>

      {/* Alert Grid */}
      {filteredAlerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onSelect={handleSelectAlert} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border rounded-2xl bg-muted/10 my-8">
          <ShieldAlert className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
          <h3 className="font-semibold text-sm">No Active Alerts Found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            No weather warnings match your selected filter criteria.
          </p>
        </div>
      )}

      {/* Alert Modal */}
      <AlertDetailsModal
        alert={selectedAlert}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
