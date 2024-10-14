"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const ButtonInstallPwa = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const checkIfPwaInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
    });

    checkIfPwaInstalled();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation.");
        } else {
          console.log("User dismissed the PWA installation.");
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (isInstalled) {
    return null;
  }

  return (
    <Button
      className="text-black dark:text-white"
      onClick={handleInstallClick}
      variant="outline"
    >
      Install
    </Button>
  );
};

export default ButtonInstallPwa;
