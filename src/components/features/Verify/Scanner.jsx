"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const [permissionError, setPermissionError] = useState(false);
  const scannerRef = useRef(null);
  const containerIdRaw = useId();
  const containerId = `qr-reader-${containerIdRaw.replace(/:/g, "")}`;

  useEffect(() => {
    let isMounted = true;
    let html5QrCode = null;

    const startScanner = async () => {
      try {
        // Jangan mulai jika sudah unmounted
        if (!isMounted) return;

        // Pastikan container bersih sebelum mulai
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = "";
        }

        html5QrCode = new Html5Qrcode(containerId);
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          },
          (decodedText) => {
            // STOP KAMERA SETELAH SCAN BERHASIL
            if (html5QrCode && html5QrCode.isScanning) {
              html5QrCode
                .stop()
                .then(() => {
                  html5QrCode.clear();
                  if (onScanSuccess) onScanSuccess(decodedText);
                })
                .catch((err) => {
                  console.warn("Gagal stop scanner:", err);
                  if (onScanSuccess) onScanSuccess(decodedText);
                });
            }
          },
          () => {
            // Error scanning (ignore untuk performa)
          },
        );
      } catch (err) {
        if (isMounted) {
          console.error("Gagal memulai kamera:", err);
          setPermissionError(true);
        }
      }
    };

    // Delay sedikit untuk memastikan DOM siap di React Strict Mode
    const timer = setTimeout(startScanner, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);

      const cleanup = async () => {
        if (html5QrCode) {
          try {
            if (html5QrCode.isScanning) {
              await html5QrCode.stop();
            }
            html5QrCode.clear();
            console.log("Scanner cleaned up successfully");
          } catch (e) {
            console.warn("Cleanup error:", e);
          }
        }
      };

      cleanup();
      scannerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  const handleRetry = () => {
    window.location.reload(); // Hard reload solusi terbaik untuk izin kamera
  };

  if (permissionError) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] bg-muted/20 rounded-xl border border-dashed border-destructive/50 p-6 text-center space-y-4">
        <div className="bg-destructive/10 p-3 rounded-full">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            Akses Kamera Ditolak
          </h3>
          <p className="text-sm text-muted-foreground">
            Mohon izinkan akses kamera di browser Anda.
          </p>
        </div>
        <Button
          onClick={handleRetry}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCcw className="w-4 h-4" /> Muat Ulang
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-lg border border-border">
      {/* Container Library */}
      <div id={containerId} className="w-full h-full min-h-[350px]"></div>

      {/* Overlay UI (Bingkai & Garis Scan) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pojok Kiri Atas */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-xl opacity-80" />
        {/* Pojok Kanan Atas */}
        <div className="absolute top-6 right-6 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-xl opacity-80" />
        {/* Pojok Kiri Bawah */}
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-xl opacity-80" />
        {/* Pojok Kanan Bawah */}
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-xl opacity-80" />

        {/* Teks Instruksi */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <span className="bg-black/60 text-white px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10">
            Arahkan QR Code ke dalam kotak
          </span>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
