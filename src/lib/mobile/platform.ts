export const isNativeApp = (): boolean => false;

export const getPlatform = (): "web" => "web";

export const isAndroid = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return /android/i.test(navigator.userAgent);
};

export const isIOS = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
};

export const isWeb = (): boolean => true;
