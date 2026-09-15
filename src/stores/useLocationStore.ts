import { create } from "zustand";
import { getCurrentPosition } from "@/lib/mobile/location";

interface LocationState {
  locationName: string;
  coordinates: { lat: number; lng: number } | null;
  isLoading: boolean;
  permissionDenied: boolean;
  error: string | null;
  fetchCurrentLocation: () => Promise<void>;
  setLocationManually: (city: string, coords?: { lat: number; lng: number }) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locationName: "New Delhi, India",
  coordinates: { lat: 28.6139, lng: 77.209 },
  isLoading: false,
  permissionDenied: false,
  error: null,

  fetchCurrentLocation: async () => {
    set({ isLoading: true, error: null });

    const coords = await getCurrentPosition();

    if (!coords) {
      set({
        isLoading: false,
        permissionDenied: true,
        error: "Location access disabled or unavailable. Click GPS icon to retry.",
      });
      return;
    }

    // Try BigDataCloud reverse geocoding (fast & CORS open)
    try {
      const bdcRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
      );
      if (bdcRes.ok) {
        const bdcData = await bdcRes.json();
        const city =
          bdcData.city ||
          bdcData.locality ||
          bdcData.principalSubdivision ||
          "Current Location";
        const stateOrCountry = bdcData.principalSubdivision || bdcData.countryName || "India";
        const locationName = `${city}, ${stateOrCountry}`;

        set({
          locationName,
          coordinates: { lat: coords.latitude, lng: coords.longitude },
          isLoading: false,
          permissionDenied: false,
          error: null,
        });
        return;
      }
    } catch (e) {
      console.warn("BigDataCloud geocoding failed, trying Nominatim...", e);
    }

    // Fallback: OpenStreetMap Nominatim
    try {
      const nomRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
      );
      const nomData = await nomRes.json();

      const city =
        nomData.address?.city ||
        nomData.address?.town ||
        nomData.address?.village ||
        nomData.address?.state_district ||
        nomData.address?.state ||
        "Current Location";

      const country = nomData.address?.country || "India";
      const locationName = `${city}, ${country}`;

      set({
        locationName,
        coordinates: { lat: coords.latitude, lng: coords.longitude },
        isLoading: false,
        permissionDenied: false,
        error: null,
      });
    } catch {
      // Direct coordinate label fallback
      set({
        locationName: `Lat ${coords.latitude.toFixed(2)}, Lng ${coords.longitude.toFixed(2)}`,
        coordinates: { lat: coords.latitude, lng: coords.longitude },
        isLoading: false,
        permissionDenied: false,
        error: null,
      });
    }
  },

  setLocationManually: (city: string, coords?: { lat: number; lng: number }) => {
    set({
      locationName: city,
      coordinates: coords || null,
      permissionDenied: false,
      error: null,
    });
  },
}));
