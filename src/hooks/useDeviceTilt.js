// src/hooks/useDeviceTilt.js
import { useEffect, useState } from "react";

export default function useDeviceTilt(enabled = true) {
  const [tilt, setTilt] = useState({ alpha: 0, beta: 0, gamma: 0, ok: false });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let active = true;

    const handler = (e) => {
      if (!active) return;
      // beta: front/back tilt (-180..180)  | gamma: left/right tilt (-90..90)
      setTilt({ alpha: e.alpha || 0, beta: e.beta || 0, gamma: e.gamma || 0, ok: true });
    };

    const start = async () => {
      try {
        if (typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function") {
          // iOS needs a user gesture; we’ll not auto-ask here
          // caller will call requestPermission() from a tap.
        } else {
          window.addEventListener("deviceorientation", handler, { passive: true });
        }
      } catch {
        /* no-op */
      }
    };

    start();
    return () => { active = false; window.removeEventListener("deviceorientation", handler); };
  }, [enabled]);

  return tilt; // {alpha,beta,gamma,ok}
}
