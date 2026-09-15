import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LanguageCode = "en" | "hi" | "pa";
export type UnitSystem = "metric" | "imperial";
export type ThemeMode = "light" | "dark" | "system";

interface SettingsState {
  language: LanguageCode;
  units: UnitSystem;
  notificationsEnabled: boolean;
  autoSpeakVoice: boolean;
  autoLocation: boolean;
  theme: ThemeMode;
  setLanguage: (lang: LanguageCode) => void;
  setUnits: (units: UnitSystem) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setAutoSpeakVoice: (enabled: boolean) => void;
  setAutoLocation: (enabled: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "en",
      units: "metric",
      notificationsEnabled: true,
      autoSpeakVoice: false,
      autoLocation: true,
      theme: "system",

      setLanguage: (language) => set({ language }),
      setUnits: (units) => set({ units }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      setAutoSpeakVoice: (autoSpeakVoice) => set({ autoSpeakVoice }),
      setAutoLocation: (autoLocation) => set({ autoLocation }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "weathergpt-settings",
    }
  )
);
