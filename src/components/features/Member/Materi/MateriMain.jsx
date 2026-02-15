"use client";

import React, { useState, useEffect } from "react";
import { getMaterials, getMaterialById } from "@/lib/api/materi";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { URUTAN_SABUK } from "@/components/features/Admin/Materials/AddMateri";

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
    user?.anggotaSilat?.tingkatan_sabuk || user?.tingkatan_sabuk
  const anggotaSabukIdx = getSabukIndex(anggotaSabuk);

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-background rounded-md border overflow-hidden">
      {/* Sidebar menu materi */}
      <aside className="w-64 border-r bg-muted/40 p-0">
        <div className="font-bold text-lg px-4 py-4.5 border-b bg-white">
          Daftar Materi
        </div>
        <ScrollArea className="h-[calc(80vh-48px)]">
          {loading ? (
            <div className="p-4 space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded" />
              ))}
            </div>
          ) : errorMaterials ? (
            <div className="p-4 text-destructive text-sm font-medium">
              {errorMaterials?.response?.status === 401 ||
              errorMaterials?.response?.status === 403
                ? "Anda belum login atau tidak punya akses ke materi."
                : "Gagal memuat materi. Silakan coba lagi nanti."}
            </div>
          ) : (
            <ul className="divide-y">
              {(materialsData || []).map((mat) => {
                const materiSabukIdx = getSabukIndex(mat.sabuk);
                // Materi terkunci jika sabuk materi > sabuk user
                const terkunci = materiSabukIdx > anggotaSabukIdx;
                return (
                  <li key={mat.id}>
                    <Button
                      variant={selectedId === mat.id ? "secondary" : "ghost"}
                      className="w-full justify-start rounded-none px-4 py-3 text-left font-medium"
                      onClick={() => !terkunci && setSelectedId(mat.id)}
                      disabled={terkunci}
                    >
                      {mat.title}
                      {terkunci && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (Terkunci)
                        </span>
                      )}
                    </Button>
                  </li>
                );
              })}
              {(!materialsData || materialsData.length === 0) && (
                <div className="p-4 text-muted-foreground text-sm">
                  Belum ada materi.
                </div>
              )}
            </ul>
          )}
        </ScrollArea>
      </aside>
      {/* Konten materi */}
      <main className="flex-1 p-0 overflow-auto flex items-stretch">
        {loadingContent || !selectedMaterial ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2 rounded" />
            <Skeleton className="h-96 w-full rounded" />
          </div>
        ) : errorDetail ? (
          <div className="text-destructive font-medium p-4">
            Gagal memuat detail materi.
          </div>
        ) : (
          <Card className="w-full h-full flex flex-col shadow-none py-0 border-0 bg-white gap-0">
            <div className="relative flex-1 flex flex-col justify-center items-center p-0">
              <div className="absolute flex items-center p-4 inset-0 h-16 bg-white">
                <h1 className="text-base font-semibold">
                  {selectedMaterial.title}
                </h1>
              </div>
              {selectedMaterial.type === "video" && selectedMaterial.fileUrl ? (
                <iframe
                  src={selectedMaterial.fileUrl}
                  title={selectedMaterial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : selectedMaterial.type === "pdf" &&
                selectedMaterial.fileUrl ? (
                <iframe
                  src={selectedMaterial.fileUrl}
                  title={selectedMaterial.title}
                  className="w-full h-full"
                />
              ) : (
                <div className="text-muted-foreground flex-1 flex items-center justify-center">
                  Konten materi tidak tersedia.
                </div>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MateriMain;
