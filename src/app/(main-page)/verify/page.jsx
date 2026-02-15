"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QRScanner from "@/components/features/Verify/Scanner";
import { QrCode } from "lucide-react";

import { Suspense } from "react";

function SearchParamsHandler({ router }) {
  const searchParams = useSearchParams();

  // --- 1. AUTO REDIRECT DARI URL PARAM (?id=...) ---
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      router.push(`/verify/${id}`);
    }
  }, [searchParams, router]);

  return null;
}

const PageVerify = () => {
  const router = useRouter();

  // --- 2. HANDLER SCANNER ---
  const handleScanSuccess = useCallback(
    (decodedText) => {
      let id = decodedText;
      // Ekstrak ID jika formatnya URL
      try {
        if (decodedText.startsWith("http")) {
          const url = new URL(decodedText);
          const urlId = url.searchParams.get("id");
          if (urlId) id = urlId;
          else {
            // Jika URL tapi tidak ada ?id=, coba ambil segment terakhir
            const segments = url.pathname.split("/").filter(Boolean);
            if (segments.length > 0) id = segments[segments.length - 1];
          }
        }
      } catch (e) {}

      if (id) {
        router.push(`/verify/${id}`);
      }
    },
    [router],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2 text-primary">
            <QrCode className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Verifikasi Anggota
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Scan QR Code pada kartu anggota digital atau fisik untuk memvalidasi
            status keanggotaan.
          </p>
        </div>

        {/* Suspense boundary for useSearchParams */}
        <Suspense>
          <SearchParamsHandler router={router} />
        </Suspense>

        {/* Dynamic Area */}
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-full max-w-sm mx-auto animate-in fade-in duration-500">
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onScanError={() => {}}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Sistem Informasi Organisasi.
        </div>
      </div>
    </div>
  );
};

export default PageVerify;
