# WeatherGPT — AI-Powered Weather Intelligence Platform

**SIH Problem Statement 26068**: *WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information.*

WeatherGPT is a modern, high-performance meteorological platform built for SIH demonstrations. It runs seamlessly as a Web Application, PWA, and Native Android App (TWA - Trusted Web Activity) powered by a single Next.js 14 codebase.

---

## 🌟 Key Features

- 🌤️ **Real-Time Weather Hero**: Instant temperature, "feels like" metrics, and secondary atmospheric indicators (humidity, wind speed, visibility, UV index, pressure).
- 💬 **WeatherGPT AI Assistant**: Hero conversational interface supporting rich UI response cards (Weather cards, Forecast cards, City comparisons, Alert cards), streaming responses, response regeneration, copy actions, and thumbs up/down feedback.
- 🎙️ **Voice Assistant & Speech-to-Text**: Real-time microphone speech recognition filling queries directly into text inputs, accompanied by text-to-speech audio responses.
- 🗺️ **Interactive GIS Map**: Leaflet-powered GIS weather map featuring customizable layers (Temperature, Rainfall, Alerts, Wind) and interactive Indian city weather markers.
- 🚨 **Emergency Weather Alert Center**: Categorized warnings (`CRITICAL`, `WARNING`, `WATCH`, `ADVISORY`) with safety guidelines and regional impact metrics.
- 📊 **Historical Climate Analytics**: `Recharts` visualizations tracking multi-decadal temperature warming trends, rainfall changes, and historical extreme weather events.
- 🔐 **User Authentication & Persona Roles**: Sign in via Email/Password or Google OAuth, with persona roles (`General Citizen`, `Farmer`, `Pilot`, `Fisherman`, `Researcher`).
- 🌐 **Multilingual Indian-Language Support**: Complete i18n support for English, Hindi (हिन्दी), and Punjabi (ਪੰਜਾਬੀ).
- 📱 **Mobile-First TWA/PWA Architecture**: Touch-friendly bottom navigation bar, safe area insets (`pt-safe`, `pb-safe`), and full Google Chrome custom tab performance.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, `shadcn/ui`
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **State Management**: Zustand (with Persist Middleware)
- **Data Fetching / HTTP**: Axios, TanStack Query
- **Data Visualization**: Recharts
- **GIS Map**: Leaflet, `react-leaflet`
- **Mobile Packaging**: Trusted Web Activity (TWA / Bubblewrap) & PWA Manifest

---

## 🚀 Step-by-Step Deployment Guide

### 1. Web Local Development

```bash
# Install dependencies
npm install

# Run local web development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Deploying Frontend to Vercel (or Netlify)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your `weathergpt` repository.
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `http://localhost:8080/api/v1` (or your live Spring Boot backend URL)
   - `NEXT_PUBLIC_USE_MOCK` = `false`
5. Click **Deploy**. Vercel will provide your live HTTPS domain (e.g. `https://weathergpt-app.vercel.app`).

---

### 3. Generating Native Android APK (Google Bubblewrap TWA)

Google's official **Bubblewrap CLI** packages your live HTTPS web application into a native Android `.apk` / `.aab` file running inside Google Chrome Custom Tabs with 100% Next.js compatibility and instant live updates.

```bash
# Step A: Install Bubblewrap CLI globally
npm install -g @bubblewrap/cli

# Step B: Initialize TWA using your deployed Vercel/Netlify URL
bubblewrap init --manifest=https://your-weathergpt-domain.vercel.app/manifest.json

# Step C: Build the Android APK & AAB
bubblewrap build
```

The output file `app-release-signed.apk` (or `WeatherGPT.apk`) is ready to install on any Android phone!

---

## 📁 Project Structure

```
WeatherGPT/
├── public/
│   ├── .well-known/          # Digital Asset Links for Android TWA verification
│   ├── icon.svg              # Vector app icon
│   └── manifest.json         # PWA Web App Manifest
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Dashboard
│   │   ├── login/            # User Login & Account Registration
│   │   ├── profile/          # User Profile & Security Settings
│   │   ├── chat/             # WeatherGPT Assistant
│   │   ├── forecast/         # Hourly & 7-Day Extended Forecasts
│   │   ├── map/              # GIS Weather Map
│   │   ├── alerts/           # Alert Center
│   │   ├── climate/          # Climate Analytics
│   │   └── settings/        # System Preferences & i18n
│   ├── components/           # UI components grouped by feature
│   ├── i18n/                 # Dictionaries (en.json, hi.json, pa.json)
│   ├── lib/
│   │   ├── api/              # Axios REST API services (auth, weather, chat, etc.)
│   │   ├── mock/             # Realistic mock fallback datasets
│   │   └── mobile/           # Platform utilities (location, voice, haptics)
│   ├── stores/               # Zustand global stores (auth, location, settings, chat)
│   └── types/                # Strict TypeScript type definitions
└── PROJECT_DOCUMENTATION.md  # Detailed system documentation
```
