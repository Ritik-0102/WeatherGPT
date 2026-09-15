export const initNetworkListener = (onStatusChange: (isOnline: boolean) => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener("online", () => onStatusChange(true));
    window.addEventListener("offline", () => onStatusChange(false));
    onStatusChange(navigator.onLine);
  }
};
