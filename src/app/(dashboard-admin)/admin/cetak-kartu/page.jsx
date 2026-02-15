"use client";

import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/users";
import {
  MemberCardFront,
  MemberCardBack,
} from "@/components/features/Admin/Users/MemberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Search, User, CreditCard, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toPng } from "html-to-image";

export default function CetakKartuPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users", "anggota", search],
    queryFn: () => getUsers({ role: "anggota", search, limit: 100 }),
  });

  const members = data?.data || [];

  const handleDownload = async (elementId, side) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2, // Higher resolution for better quality
      });

      const link = document.createElement("a");
      link.download = `Kartu-Anggota-${side}-${selectedMember?.nama || "User"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Download Kartu Anggota
        </h1>
        <p className="text-muted-foreground">
          Pilih anggota untuk mempratinjau dan mengunduh kartu keanggotaan resmi
          dua sisi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Member Selection List */}
        <Card className="lg:col-span-4 h-fit max-h-[calc(100vh-200px)] flex flex-col gap-0">
          <CardHeader className="">
            <CardTitle className="text-lg">Daftar Anggota</CardTitle>
            <CardDescription>
              Cari berdasarkan nama atau nomor anggota
            </CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <ScrollArea className="h-[500px] px-2">
              <div className="p-4 space-y-2">
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : members.length > 0 ? (
                  members.map((member, index) => (
                    <button
                      key={member?.id || `member-${index}`}
                      onClick={() => member && setSelectedMember(member)}
                      className={`w-full text-left p-3 rounded-xl border transition-all hover:bg-muted/50 group ${
                        selectedMember?.id === member?.id
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                            selectedMember?.id === member?.id
                              ? "bg-primary/20 border-primary/30"
                              : "bg-muted border-transparent"
                          }`}
                        >
                          {member?.foto_url ? (
                            <Image
                              src={member.foto_url}
                              alt={member.nama || "Foto Anggota"}
                              className="w-full h-full rounded-full object-cover"
                              width={40}
                              height={40}
                              unoptimized
                            />
                          ) : (
                            <User
                              className={`w-5 h-5 ${selectedMember?.id === member?.id ? "text-primary" : "text-muted-foreground"}`}
                            />
                          )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-semibold text-sm truncate uppercase tracking-tight">
                            {member?.nama}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {member?.nomor_anggota || "N/A"}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground italic text-sm">
                    Tidak ada anggota ditemukan
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Card Preview */}
        <Card className="lg:col-span-8 overflow-hidden min-h-[500px] flex flex-col items-center p-8 bg-muted/20">
          {selectedMember ? (
            <div className="flex flex-col items-center gap-5 w-full animate-in zoom-in-95 duration-300">
              <Badge
                variant="outline"
                className="px-3 py-1 bg-background shadow-sm text-xs font-bold uppercase tracking-widest text-primary border-primary/20"
              >
                Pratinjau Kartu (Dua Sisi)
              </Badge>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full transition-transform">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Sisi Depan
                  </p>
                  <div className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden scale-75 xl:scale-[0.85] transform transition-all mb-2">
                    <MemberCardFront
                      member={selectedMember}
                      id="member-card-front-print"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-[10px] font-bold uppercase tracking-tight gap-2"
                    onClick={() =>
                      handleDownload("member-card-front-print", "Depan")
                    }
                  >
                    Download Depan
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Sisi Belakang
                  </p>
                  <div className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden scale-75 xl:scale-[0.85] transform transition-all mb-2">
                    <MemberCardBack
                      member={selectedMember}
                      id="member-card-back-print"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-[10px] font-bold uppercase tracking-tight gap-2"
                    onClick={() =>
                      handleDownload("member-card-back-print", "Belakang")
                    }
                  >
                    Download Belakang
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center gap-4 text-muted-foreground h-full py-20">
              <div className="w-24 h-24 rounded-[2.5rem] bg-muted/50 flex items-center justify-center mb-4 border border-border/50 shadow-inner">
                <CreditCard className="w-12 h-12 opacity-20" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Pilih Anggota
                </h3>
                <p className="text-sm max-w-[280px] mt-2">
                  Silakan pilih anggota dari daftar di sebelah kiri untuk
                  melihat pratinjau kartu keanggotaan dua sisi.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
