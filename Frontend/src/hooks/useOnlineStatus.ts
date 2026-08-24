/**
 * VEYRA — useOnlineStatus
 * Source: design_system/States/Offline.md (07.16)
 *
 * Tracks browser connectivity so the app can surface the Offline state
 * as a banner that preserves cached data (never a full-screen error).
 * Uses native `navigator.onLine` + online/offline events.
 */

import { useEffect, useState } from "react";

export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
}
