"use client";

import React, { useState, useEffect } from "react";
import { getMaterials, getMaterialById } from "@/lib/api/materi";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthStore from "@/store/useAuthStore";
import { URUTAN_SABUK } from "@/constant/data";
import {
  PlayCircle,
  FileText,
  Lock,
  BookOpen,
  AlertCircle,
  MonitorPlay,
} from "lucide-react";

const MateriMain = () => {
  const [selectedId, setSelectedId] = useState(null);
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Fetch daftar materi
  const {
    data: materialsData,
    isLoading: loading,
    error: errorMaterials,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: () => getMaterials().then((res) => res.data.data || []),
    onSuccess: (data) => {
      if (data && data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
      }
    },
  });

  // Fetch detail materi terpilih
  const {
    data: selectedMaterial,
    isLoading: loadingContent,
    error: errorDetail,
  } = useQuery({
    queryKey: ["material", selectedId],
    queryFn: () =>
      selectedId
        ? getMaterialById(selectedId).then((res) => res.data.data)
        : null,
    enabled: !!selectedId,
  });

  // Pastikan user selalu diisi dari backend/cookies jika belum ada
  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  // Helper: pastikan value sabuk valid dan konsisten
  function getSabukIndex(sabuk) {
    const idx = URUTAN_SABUK.indexOf(sabuk);
    if (idx === -1) {
      return 0; // fallback ke terendah
    }
    return idx;
  }

  // Ambil sabuk anggota dari user. Fallback ke terendah jika tidak ada/invalid
  const anggotaSabuk =
    user?.anggotaSilat?.tingkatan_sabuk || user?.tingkatan_sabuk;
  const anggotaSabukIdx = getSabukIndex(anggotaSabuk);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[calc(100vh-8rem)] min-h-screen lg:min-h-0">
      {/* === MAIN CONTENT (Video/PDF Player) === */}
      {/* Di mobile order-1 (tampil di atas), di desktop flex-1 */}
      <main className="order-1 lg:order-2 flex-1 flex flex-col bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px] lg:min-h-0">
        {loadingContent || !selectedMaterial ? (
          <div className="flex flex-col h-full p-6 gap-4">
            <Skeleton className="h-8 w-1/3 rounded-lg" />
            <Skeleton className="flex-1 w-full rounded-xl" />
          </div>
        ) : errorDetail ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
            <div className="p-4 bg-red-50 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Gagal Memuat Materi
            </h3>
            <p className="text-sm text-neutral-500 mt-1">
              Terjadi kesalahan saat mengambil detail materi.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header Judul Materi */}
            <div className="p-5 border-b border-neutral-100 flex items-center gap-3 shrink-0 bg-white">
              <div className="p-2 bg-neutral-50 rounded-lg ring-1 ring-neutral-200">
                {selectedMaterial.type === "video" ? (
                  <MonitorPlay className="w-5 h-5 text-neutral-600" />
                ) : (
                  <FileText className="w-5 h-5 text-neutral-600" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900 tracking-tight leading-none">
                  {selectedMaterial.title}
                </h1>
                <p className="text-xs font-medium text-neutral-500 mt-1 uppercase tracking-wider">
                  Materi{" "}
                  {selectedMaterial.type === "video" ? "Video" : "Dokumen PDF"}
                </p>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="relative flex-1 bg-neutral-900 w-full">
              {(selectedMaterial.type === "video" ||
                selectedMaterial.type === "pdf") &&
              selectedMaterial.fileUrl ? (
                <iframe
                  src={selectedMaterial.fileUrl}
                  title={selectedMaterial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-medium">
                  Tautan konten tidak tersedia.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* === SIDEBAR (Daftar Materi) === */}
      {/* Di mobile order-2 (tampil di bawah), di desktop lebar tetap (w-80) */}
      <aside className="order-2 lg:order-1 w-full lg:w-[340px] flex flex-col bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden shrink-0 h-[500px] lg:h-full">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
          <BookOpen className="w-5 h-5 text-neutral-600" />
          <h2 className="font-bold text-base text-neutral-900 tracking-tight">
            Daftar Materi
          </h2>
        </div>

        <ScrollArea className="flex-1 custom-scrollbar">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : errorMaterials ? (
            <div className="p-6 text-center">
              <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-red-600">
                {errorMaterials?.response?.status === 401 ||
                errorMaterials?.response?.status === 403
                  ? "Akses ditolak. Silakan login."
                  : "Gagal memuat daftar materi."}
              </p>
            </div>
          ) : (
            <div className="p-3 flex flex-col gap-1.5">
              {(materialsData || []).map((mat) => {
                const materiSabukIdx = getSabukIndex(mat.sabuk);
                const terkunci = materiSabukIdx > anggotaSabukIdx;
                const isSelected = selectedId === mat.id;

                return (
                  <button
                    key={mat.id}
                    disabled={terkunci}
                    onClick={() => !terkunci && setSelectedId(mat.id)}
                    className={`
                      relative flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 border border-transparent
                      ${isSelected ? "bg-neutral-100 border-neutral-200/60 shadow-sm" : "hover:bg-neutral-50"}
                      ${terkunci ? "opacity-60 cursor-not-allowed grayscale" : "cursor-pointer"}
                    `}
                  >
                    {/* Ikon Materi */}
                    <div
                      className={`shrink-0 ${isSelected ? "text-neutral-900" : "text-neutral-400"}`}
                    >
                      {terkunci ? (
                        <Lock className="w-5 h-5" />
                      ) : mat.type === "video" ? (
                        <PlayCircle className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>

                    {/* Teks Materi */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm truncate ${isSelected ? "font-bold text-neutral-900" : "font-medium text-neutral-700"}`}
                      >
                        {mat.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5 capitalize flex items-center gap-1.5">
                        <span className="font-semibold text-neutral-400">
                          {mat.type || "Materi"}
                        </span>
                        {terkunci && (
                          <span className="text-red-500 font-medium">
                            • Membutuhkan {mat.sabuk}
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Indikator Sedang Diputar (Kecil di Kanan) */}
                    {isSelected && !terkunci && (
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0"></div>
                    )}
                  </button>
                );
              })}

              {(!materialsData || materialsData.length === 0) && (
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-50 ring-1 ring-neutral-200 mb-3">
                    <BookOpen className="w-5 h-5 text-neutral-400" />
                  </div>
                  <p className="text-sm font-medium text-neutral-600">
                    Belum ada materi tersedia.
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </aside>
    </div>
  );
};

export default MateriMain;
