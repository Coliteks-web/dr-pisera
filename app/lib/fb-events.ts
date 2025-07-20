export const sendFbEvent = async (eventName: string, eventData?: Record<string, any>) => {
  try {
    const consent = localStorage.getItem("cookie_consent");
    if (consent !== "granted") return;

    await fetch("/api/fb-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventData,
      }),
    });
  } catch (error) {
    console.error("Błąd wysyłania zdarzenia do Facebook Conversion API:", error);
  }
};
