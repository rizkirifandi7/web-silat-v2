"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Shield, Target, Award, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAboutInfo } from "@/lib/api/about";

const TentangPage = () => {
  const { data: aboutResponse, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutInfo,
  });

  const about = aboutResponse?.data?.data || null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
            Memuat Informasi...
          </p>
        </div>
      </div>
    );
  }

  // Fallback if no data
  if (!about) return null;

  return (
    <main className="bg-background min-h-screen">
      {/* 1. Page Header */}
      <section className="relative pt-32 pb-10 overflow-hidden bg-background flex items-center justify-center min-h-[50vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/bg-2.webp"
            alt="Martial Arts Background"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/60 to-background" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-block relative mb-4">
            <div className="absolute inset-0 bg-primary/20 skew-x-[-15deg] rounded-sm transform scale-105" />
            <span className="relative px-3 py-1 text-primary font-bold tracking-widest uppercase text-sm z-10">
              Tentang Kami
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic mb-6 drop-shadow-xl">
            Mengenal <span className="text-primary">PUSAMADA</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Menelusuri jejak sejarah, meresapi nilai-nilai luhur, dan memahami
            visi misi Pusaka Mande Muda Indonesia.
          </p>
        </div>
      </section>

      {/* 2. Sejarah (History) */}
      <section className="py-24 relative overflow-hidden bg-background">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-0.5 w-10 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">
                  Sejarah Kami
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-foreground uppercase italic mb-8 leading-none">
                Perjalanan <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-red-600">
                  Melestarikan Budaya
                </span>
              </h2>
              <div className="relative aspect-3/4 rounded-none -skew-x-3 border-4 border-white shadow-2xl overflow-hidden bg-muted group">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
                <Image
                  src="/bg-abouts.webp"
                  alt="Sejarah Pusamada"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-bold uppercase tracking-widest text-sm">
                    Sejak 19XX
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 prose prose-lg prose-slate dark:prose-invert max-w-none">
              <div className="leading-relaxed text-zinc-600 dark:text-zinc-300 mb-6 whitespace-pre-line max-h-200 overflow-y-auto  custom-scrollbar rounded-lg border border-primary/10 p-4 bg-background/60 ">
                {about.sejarah || "Sejarah belum tersedia."}
              </div>
              {about.updatedAt && (
                <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 italic text-foreground font-medium">
                  Informasi terakhir diperbarui pada{" "}
                  {new Date(about.updatedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pendiri (Founders) */}
      <section className="py-24 bg-background text-foreground relative overflow-hidden text-center">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
              Para Pendiri
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">
              Tokoh Dibalik <span className="text-primary">PUSAMADA</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Perjuangan dan dedikasi mereka menjadi pondasi kokoh nan abadi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.founders?.map((founder) => (
              <div key={founder.id} className="group relative">
                <div className="relative aspect-3/4 -skew-x-3 border-2 border-zinc-200 bg-white overflow-hidden mb-6 transition-all duration-300 group-hover:border-primary group-hover:shadow-[8px_8px_0px_0px_var(--color-primary)]">
                  {/* Founder Image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 group-hover:bg-zinc-200 transition-colors">
                    {founder.photoUrl ? (
                      <Image
                        src={founder.photoUrl}
                        alt={founder.nama}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Award className="w-16 h-16 text-zinc-400 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white text-sm italic">
                      &quot;
                      {founder.description || "Dedikasi untuk Pencak Silat."}
                      &quot;
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-black text-xl text-foreground uppercase italic">
                    {founder.nama}
                  </h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">
                    {founder.title || "Pendiri"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Filosofi Lambang */}
      <section className="py-24 overflow-hidden bg-background">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic mb-6">
              Makna & <span className="text-primary">Filosofi</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Setiap goresan memiliki arti, setiap warna memiliki jiwa.
            </p>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
              <Image
                src={about.logoUrl || "/pusamada-logo.png"}
                alt="Lambang PUSAMADA"
                fill
                className="relative z-10 drop-shadow-2xl object-contain"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-8 border-2 border-dashed border-zinc-200 rounded-none bg-zinc-50/50">
            <h3 className="font-black text-2xl text-foreground uppercase italic mb-6 text-center">
              Filosofi <span className="text-primary">Mendalam</span>
            </h3>
            <div className="prose prose-slate max-w-none text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed text-center">
              {(() => {
                let points = about.filosofiLogo;
                if (typeof points === "string" && points.startsWith("[")) {
                  try {
                    points = JSON.parse(points);
                  } catch (e) {
                    // Fallback
                  }
                }

                if (Array.isArray(points)) {
                  return (
                    <ul className="list-none p-0 space-y-3 inline-block text-left mx-auto">
                      {points.map((p, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                          <span>{typeof p === "string" ? p : p.value}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return points || "Filosofi logo belum ditambahkan.";
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visi & Misi Refined */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('/bg-texture.png')] opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Visi */}
            <div className="space-y-8">
              <div className="inline-block relative">
                <span className="relative z-10 text-primary font-bold tracking-widest uppercase text-sm">
                  Visi Kami
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary skew-x-[-10deg]" />
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                &quot;{about.visi || "Visi belum ditambahkan."}&quot;
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-8 md:p-10 border-l-4 border-primary shadow-xl">
              <div className="inline-block relative mb-8">
                <span className="relative z-10 text-primary font-bold tracking-widest uppercase text-sm">
                  Misi Kami
                </span>
              </div>
              <div className="space-y-6">
                {(() => {
                  let missionPoints = about.misi;

                  // If it's a string, try to parse it (it might be stringified JSON array)
                  if (
                    typeof missionPoints === "string" &&
                    missionPoints.startsWith("[")
                  ) {
                    try {
                      missionPoints = JSON.parse(missionPoints);
                    } catch (e) {
                      // Fallback to original string if parsing fails
                    }
                  }

                  if (Array.isArray(missionPoints)) {
                    return missionPoints.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start group">
                        <div className="shrink-0 mt-1 w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <span className="text-[10px] font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-zinc-600 group-hover:text-foreground transition-colors">
                          {typeof item === "string" ? item : item.value}
                        </p>
                      </div>
                    ));
                  }

                  return (
                    <div className="prose prose-slate max-w-none text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                      {missionPoints || "Misi belum ditambahkan."}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TentangPage;
