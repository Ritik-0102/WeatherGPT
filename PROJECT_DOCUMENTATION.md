# WeatherGPT — Complete Project Documentation & Backend Integration Guide

> **SIH Problem Statement 26068**: *WeatherGPT — Conversational AI for Weather Forecasting, Alerts, and Climate Information.*

Welcome to the simple and comprehensive documentation for **WeatherGPT**. This document explains how the entire project works, how the Spring Boot Java backend connects to the Next.js frontend, how mobile Android TWA APK builds are created, and how any developer can easily add new features or maintain the project.

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Full System Architecture](#2-full-system-architecture)
3. [Folder & File Structure Explained](#3-folder--file-structure-explained)
4. [Backend API Endpoints Reference](#4-backend-api-endpoints-reference)
5. [User Personas & Roles](#5-user-personas--roles)
6. [Authentication & Google OAuth Flow](#6-authentication--google-oauth-flow)
7. [Weather & Reverse Geolocation Flow](#7-weather--reverse-geolocation-flow)
8. [Cross-Platform Mobile Deployment (TWA & PWA)](#8-cross-platform-mobile-deployment)
9. [Developer Extension Guide](#9-developer-extension-guide)

---

## 1. Project Overview

WeatherGPT is a cross-platform meteorological intelligence platform designed for web browsers and mobile smartphones (Android & iOS). It combines real-time weather forecasts, persona-based AI assistant advice (for General Citizens, Farmers, Aviators, Fishermen, and Researchers), severe weather alerts, multi-decadal climate trend charts, and Indian language support (English, Hindi, Punjabi).

---

## 2. Full System Architecture

```text
               +----------------------------------+
               |        WeatherGPT Frontend       |
               |  (Next.js 14 / React / Tailwind)  |
               +----------------------------------+
                             |       |
             +---------------+       +---------------+
             |                                       |
  [Trusted Web Activity / TWA]              [HTTP REST API Calls]
             |                                       |
  +--------------------+                   +--------------------+
  | Android APK / PWA  |                   |  Spring Boot Java  |
  | Application        |                   |      Backend       |
  +--------------------+                   +--------------------+
                                                     |
                                           +--------------------+
                                           |  FastAPI / Weather |
                                           |   Data / LLM Engine|
                                           +--------------------+
```

---

## 3. Folder & File Structure Explained

```
WeatherGPT/
├── public/                    # Static web assets
│   ├── .well-known/           # Digital Asset Links for Android TWA verification
│   ├── icon.svg               # App vector icon
│   └── manifest.json          # PWA Web App Manifest
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Main Dashboard
│   │   ├── login/             # User Login & Account Registration page
│   │   ├── profile/           # User Profile, Role, and Security Settings
│   │   ├── chat/              # WeatherGPT Conversational AI Assistant
│   │   ├── forecast/          # Hourly & 7-Day Extended Forecasts
│   │   ├── map/               # Leaflet GIS Weather Map with layer controls
│   │   ├── alerts/            # Emergency Alerts & Warning Center
│   │   ├── climate/           # Multi-decadal Historical Climate Analytics
│   │   └── settings/         # Preferences, Unit Toggles & Language i18n
│   ├── components/            # UI components grouped by feature
│   │   ├── layout/            # Sidebar, Header, BottomNav, AppLayout
│   │   ├── weather/           # Hero, Metrics, Forecast Ticker
│   │   ├── chat/              # Chat Input, Speech-to-Text, Voice UI, Rich Cards
│   │   ├── map/               # Leaflet GIS Map Container & Popups
│   │   ├── alerts/            # Alert Cards & Emergency Details Dialog
│   │   ├── climate/           # Recharts Temperature & Rainfall Charts
│   │   └── ui/                # Base shadcn UI components & Skeletons
│   ├── i18n/                  # Language dictionaries (English, Hindi, Punjabi)
│   ├── lib/
│   │   ├── api/               # Axios REST API services (auth, weather, chat, etc.)
│   │   ├── mock/              # Realistic mock fallback datasets
│   │   └── mobile/            # Platform utilities (location, voice, haptics)
│   ├── stores/                # Zustand global stores (auth, location, settings, chat)
│   └── types/                 # TypeScript interfaces and DTOs
└── PROJECT_DOCUMENTATION.md  # System documentation & deployment guide
```

---

## 4. Backend API Endpoints Reference

Backend URL: `http://localhost:8080/api/v1`

### A. Authentication Controllers (`/api/v1/auth`)

| Method | Endpoint | Request Body / Parameters | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | `UserRequestDto`: `{ username, email, password, role, homeLocation, workLocation }` | Register a new user |
| `POST` | `/api/v1/auth/login` | `LoginUserDto`: `{ password }` | Authenticate user & return JWT token |
| `POST` | `/api/v1/auth/update-password` | `LoginUserDto`: `{ password }` | Change user password |
| `POST` | `/api/v1/auth/delete-user` | `LoginUserDto`: `{ password }` | Delete user account |
| `GET` | `/api/v1/auth/profile` | Header: `Authorization: Bearer <token>` | Fetch authenticated user profile |
| `GET` | `/oauth2/authorization/google` | Redirect URL | Google OAuth2 sign-in endpoint |

### B. Weather Controllers (`/api/v1/weather`)

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/weather/test` | None | Test connection status |
| `GET` | `/api/v1/weather/current/city` | `city` | Current weather by city name |
| `GET` | `/api/v1/weather/current/coor` | `longitude`, `latitude` | Current weather by GPS coordinates |
| `GET` | `/api/v1/weather/day/city` | `city` | 24-hour forecast by city name |
| `GET` | `/api/v1/weather/day/coor` | `longitude`, `latitude` | 24-hour forecast by GPS coordinates |
| `GET` | `/api/v1/weather/week/city` | `city` | 7-day extended forecast by city name |
| `GET` | `/api/v1/weather/week/coor` | `longitude`, `latitude` | 7-day extended forecast by GPS coordinates |

### C. Conversational LLM Controllers (`/api/v1/llm`)

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/llm/intent` | `IntentRequestDto`: `{ speciality, past_messages, query }` | Detect query intent & location |
| `POST` | `/api/v1/llm/chat` | `LlmChatRequestDto`: `{ speciality, intent, query, data }` | Generate AI conversational response |
| `POST` | `/api/v1/llm/alert` | `AlertRequestDto`: `{ speciality, location, severity }` | Generate AI alert summary |

---

## 5. User Personas & Roles

WeatherGPT supports persona-based weather advice tailored for specific user groups:

1. **`NORMAL_USER`** — General Public / Citizens (General weather, travel advisories).
2. **`AGRICULTURE`** — Farmers & Agro-specialists (Monsoon timelines, soil moisture, crop protection).
3. **`AVIATION`** — Pilots & Aviation operators (Wind shears, cloud ceiling, flight visibility).
4. **`MARINE`** — Fishermen & Coastal operators (Wave heights, high tides, maritime warnings).
5. **`RESEARCH`** — Meteorological Researchers (Multi-decadal historical climate data).

---

## 6. Authentication & Google OAuth Flow

1. **User Sign In / Registration**: User submits credentials or taps *"Sign In with Google OAuth"*.
2. **JWT Token Storage**: The backend returns a JWT token which is stored in `localStorage` under `weathergpt_auth_token`.
3. **Axios Interceptor**: `src/lib/api/client.ts` automatically attaches `Authorization: Bearer <token>` to all HTTP requests.
4. **Demo Mode Fallback**: If the local backend server is offline or unreachable, the app falls back smoothly to Demo Mode so no user gets locked out.

---

## 7. Weather & Reverse Geolocation Flow

1. **GPS Detection**: When the user opens the app or taps the location button in the Header, GPS coordinates (`lat`, `lng`) are obtained.
2. **Reverse Geocoding**: The coordinates are converted into readable city names (*"New Delhi, India"*, *"Phagwara, Punjab"*, *"Mumbai, Maharashtra"*) via OpenStreetMap Nominatim / BigDataCloud APIs.
3. **Weather Query**: The frontend queries `/weather/current/city` or `/weather/current/coor` to fetch real-time atmospheric conditions.

---

## 8. Cross-Platform Mobile Deployment (TWA & PWA)

### Step A: Local Web Development
```bash
npm install
npm run dev
```

### Step B: Deploy to Vercel / Netlify
1. Push your repository to GitHub.
2. Connect your repo on Vercel (`https://vercel.com`).
3. Set environment variable: `NEXT_PUBLIC_API_URL` = `http://localhost:8080/api/v1` (or your live backend server URL).
4. Deploy! You will receive a live HTTPS URL (e.g. `https://weathergpt-app.vercel.app`).

### Step C: Generate Android APK using Google Bubblewrap TWA
```bash
# 1. Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize TWA with your live HTTPS domain
bubblewrap init --manifest=https://your-weathergpt-domain.vercel.app/manifest.json

# 3. Build APK
bubblewrap build
```
The generated `app-release-signed.apk` (or `WeatherGPT.apk`) can be installed on any Android phone!

---

## 9. Developer Extension Guide

### How to Add a New Page
1. Create a new file under `src/app/` (e.g., `src/app/analytics/page.tsx`).
2. Add the route entry in `src/constants/nav.ts`.

### How to Add a New API Endpoint
1. Define the data interface in `src/types/`.
2. Add the endpoint function in `src/lib/api/` (e.g. `src/lib/api/weather.ts`).
3. Add a fallback mock generator in `src/lib/mock/` so the app works seamlessly online and offline.

---

*Documentation maintained by WeatherGPT Engineering Team.*
