export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export const getCurrentPosition = async (): Promise<GeoCoordinates | null> => {
  if (typeof navigator === "undefined" || !navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => {
        console.warn("Geolocation error:", err);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 }
    );
  });
};
