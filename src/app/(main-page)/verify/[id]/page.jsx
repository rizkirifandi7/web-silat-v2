"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyMember } from "@/lib/api/membership";
import MemberInfo from "@/components/features/Verify/MemberInfo";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  ScanLine,
  ShieldCheck,
  AlertCircle,
  QrCode,
} from "lucide-react";

const VIEW_STATE = {
  VERIFYING: "verifying",
  SUCCESS: "success",
  ERROR: "error",
};

const PageVerifyId = () => {
  const { id } = useParams();
  const router = useRouter();

  const [viewState, setViewState] = useState(VIEW_STATE.VERIFYING);
  const [memberData, setMemberData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    const handleVerify = async () => {
      if (!id || hasFetched.current) return;

      hasFetched.current = true;
      setViewState(VIEW_STATE.VERIFYING);

      try {
        const response = await verifyMember(id);

        if (response.success) {
          setMemberData(response.data);
          setViewState(VIEW_STATE.SUCCESS);
          toast.success("Anggota Valid", {
            description: `Berhasil memverifikasi ${response.data.nama || "anggota"}.`,
          });
        } else {
          throw new Error("Data tidak valid.");
        }
      } catch (error) {
        console.error("Verifikasi Gagal:", error);
        const msg =
          error.response?.data?.message || "Data anggota tidak ditemukan.";
        setErrorMessage(msg);
        setViewState(VIEW_STATE.ERROR);
        toast.error("Gagal Verifikasi", { description: msg });
      }
    };

    handleVerify();
  }, [id]);

  const handleReset = () => {
    router.push("/verify");
  };

  const renderContent = () => {
    switch (viewState) {
      case VIEW_STATE.VERIFYING:
        return (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <RefreshCw className="w-12 h-12 text-primary animate-spin relative z-10" />
            </div>
            <p className="text-muted-foreground font-medium">
              Memverifikasi data...
            </p>
          </div>
        );

      case VIEW_STATE.SUCCESS:
        return (
          <div className="w-full animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-green-500/10 border-b border-green-500/20 p-3 flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  Terverifikasi Resmi
                </span>
              </div>

              <div className="p-4">
                <MemberInfo data={memberData} />
              </div>

              <div className="p-4 bg-muted/30 flex justify-center border-t">
                <Button
                  onClick={handleReset}
                  size="lg"
                  className="w-full sm:w-auto gap-2 shadow-md"
                >
                  <ScanLine className="w-4 h-4" /> Scan Anggota Lain
                </Button>
              </div>
            </div>
          </div>
        );

      case VIEW_STATE.ERROR:
        return (
          <div className="w-full max-w-md animate-in zoom-in-95 duration-300">
            <div className="bg-destructive/5 border-2 border-dashed border-destructive/30 rounded-2xl p-8 text-center space-y-4">
              <div className="bg-destructive/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto text-destructive">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Verifikasi Gagal
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {errorMessage}
                </p>
              </div>
              <Button
                onClick={handleReset}
                variant="destructive"
                className="w-full gap-2 mt-4"
              >
                <RefreshCw className="w-4 h-4" /> Coba Lagi
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2 text-primary">
            <QrCode className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Hasil Verifikasi
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Informasi status keanggotaan berdasarkan ID yang dipindai.
          </p>
        </div>

        {/* Dynamic Area */}
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Sistem Informasi Organisasi.
        </div>
      </div>
    </div>
  );
};

export default PageVerifyId;
