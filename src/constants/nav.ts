import {
  LayoutDashboard,
  MessageSquare,
  CloudSun,
  Map as MapIcon,
  TriangleAlert,
  BarChart3,
  Settings,
  User,
} from "lucide-react";

export const MAIN_NAV = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "WeatherGPT AI", href: "/chat", icon: MessageSquare },
  { name: "Forecast", href: "/forecast", icon: CloudSun },
  { name: "Weather Map", href: "/map", icon: MapIcon },
  { name: "Alerts", href: "/alerts", icon: TriangleAlert },
  { name: "Climate", href: "/climate", icon: BarChart3 },
];

export const BOTTOM_NAV = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "AI", href: "/chat", icon: MessageSquare },
  { name: "Map", href: "/map", icon: MapIcon },
  { name: "Alerts", href: "/alerts", icon: TriangleAlert },
  { name: "Account", href: "/profile", icon: User },
];

export const SETTINGS_NAV = [
  { name: "Account / Login", href: "/login", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];
