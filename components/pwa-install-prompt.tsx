"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowPrompt(true);
    };

    const checkIfPwaInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        // The app is installed; do not show the prompt.
        return true;
      }
      return false;
    };

    const hasDismissedPrompt = localStorage.getItem("pwa-prompt-dismissed");

    if (!checkIfPwaInstalled() && !hasDismissedPrompt) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

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
        setShowPrompt(false);
      });
    }
  };

  const handleCloseClick = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(false);
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showPrompt]);

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-background border text-white rounded-lg shadow-lg z-50 w-[400px]">
      <p className="text-sm">
        Tambahkan aplikasi ini ke layar utama Anda untuk pengalaman yang lebih
        baik.
      </p>
      <Button
        className="mt-2 px-4 py-2 rounded-md dark:text-white"
        onClick={handleInstallClick}
      >
        Install
      </Button>
      <Button
        className="ml-2 px-4 py-2 rounded-md"
        onClick={handleCloseClick}
        variant="secondary"
      >
        Close
      </Button>
    </div>
  );
};

export default PwaInstallPrompt;
