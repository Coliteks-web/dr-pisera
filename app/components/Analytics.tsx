"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-R6LW837FKS";

export const Analytics = () => {
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent !== "granted") return;

    // Wstaw GA script
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        anonymize_ip: true
      });
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
};
