"use client";

import { useEffect } from "react";
import { sendFbEvent } from "../lib/fb-events";

export default function AnalyticsEvents() {
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "granted") {
      sendFbEvent("PageView");
    }
  }, []);

  return null;
}
