"use client";

import { useState } from "react";
import { useSettingsStore, LanguageCode, ThemeMode } from "@/stores/useSettingsStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Globe,
  Gauge,
  Bell,
  Mic,
  MapPin,
  SunMoon,
  Check,
} from "lucide-react";

import enDict from "@/i18n/dictionaries/en.json";
import hiDict from "@/i18n/dictionaries/hi.json";
import paDict from "@/i18n/dictionaries/pa.json";

const getDictionary = (lang: LanguageCode) => {
  switch (lang) {
    case "hi": return hiDict;
    case "pa": return paDict;
    default: return enDict;
  }
};

export function SettingsForm() {
  const {
    language,
    units,
    notificationsEnabled,
    autoSpeakVoice,
    autoLocation,
    theme,
    setLanguage,
    setUnits,
    setNotificationsEnabled,
    setAutoSpeakVoice,
    setAutoLocation,
    setTheme,
  } = useSettingsStore();

  const [saved, setSaved] = useState(false);
  const dict = getDictionary(language);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Language Preferences */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            {dict.language}
          </CardTitle>
          <CardDescription className="text-xs">{dict.selectLanguage}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2">
          {[
            { code: "en", label: "English" },
            { code: "hi", label: "हिन्दी (Hindi)" },
            { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
          ].map((item) => (
            <Button
              key={item.code}
              variant={language === item.code ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage(item.code as LanguageCode)}
              className="text-xs rounded-xl"
            >
              {item.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Units System */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            {dict.units}
          </CardTitle>
          <CardDescription className="text-xs">{dict.selectUnits}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button
            variant={units === "metric" ? "default" : "outline"}
            size="sm"
            onClick={() => setUnits("metric")}
            className="text-xs rounded-xl"
          >
            {dict.metric}
          </Button>
          <Button
            variant={units === "imperial" ? "default" : "outline"}
            size="sm"
            onClick={() => setUnits("imperial")}
            className="text-xs rounded-xl"
          >
            {dict.imperial}
          </Button>
        </CardContent>
      </Card>

      {/* Toggles (Notifications, Voice, Location) */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">{dict.preferences}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          {/* Notifications */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{dict.notifications}</p>
                <p className="text-muted-foreground">{dict.enableAlerts}</p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          {/* Voice */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <Mic className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{dict.voice}</p>
                <p className="text-muted-foreground">{dict.autoSpeak}</p>
              </div>
            </div>
            <Switch
              checked={autoSpeakVoice}
              onCheckedChange={setAutoSpeakVoice}
            />
          </div>

          {/* Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{dict.location}</p>
                <p className="text-muted-foreground">{dict.autoLocation}</p>
              </div>
            </div>
            <Switch
              checked={autoLocation}
              onCheckedChange={setAutoLocation}
            />
          </div>
        </CardContent>
      </Card>

      {/* Theme Appearance */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <SunMoon className="h-4 w-4 text-primary" />
            {dict.theme}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2">
          {[
            { code: "light", label: dict.light },
            { code: "dark", label: dict.dark },
            { code: "system", label: dict.system },
          ].map((item) => (
            <Button
              key={item.code}
              variant={theme === item.code ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme(item.code as ThemeMode)}
              className="text-xs rounded-xl"
            >
              {item.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="gap-2">
          {saved ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span>Saved!</span>
            </>
          ) : (
            <span>{dict.save}</span>
          )}
        </Button>
      </div>
    </div>
  );
}
