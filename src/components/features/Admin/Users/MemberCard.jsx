"use client";

import React from "react";
import QRCode from "react-qr-code";
import {
  Shield,
  MapPin,
  User,
  Award,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
import Image from "next/image";

export const MemberCardFront = ({ member, id = "member-card-front" }) => {
  if (!member) return null;

  console.log(member.id);

  return (
    <div
      id={id}
      className="relative w-[350px] h-[540px] overflow-hidden shadow-2xl bg-[#0a0a0a] text-white font-sans border border-white/10"
      style={{
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -ml-24 -mb-24"></div>

      {/* Diagonal Patterns like the image */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[20%] bg-gradient-to-r from-white/20 to-transparent -rotate-12 transform"></div>
        <div className="absolute top-[20%] left-[-10%] w-[120%] h-[30%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-12 transform"></div>
        <div className="absolute top-[60%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-r from-white/5 to-transparent -rotate-12 transform"></div>
      </div>

      {/* Header - Center Aligned */}
      <div className="absolute top-20 left-0 w-full flex flex-col items-center gap-4 px-8 z-10">
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-widest uppercase leading-none text-white drop-shadow-md">
            Pusamada
          </h2>
          <p className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase mt-2">
            Official Member Card
          </p>
        </div>
      </div>

      {/* Main Content - Vertical Layout */}
      <div className="absolute top-[150px] left-0 w-full flex flex-col items-center px-8 text-center z-10">
        {/* Profile Photo */}
        <div className="relative mb-8">
          <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-primary/30 bg-[#1a1a1a] shadow-2xl transition-transform hover:scale-105 duration-500">
            {member?.foto_url ? (
              <Image
                src={member.foto_url}
                alt={member?.nama}
                className="w-full h-full object-cover"
                width={160}
                height={160}
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/10">
                <User size={80} />
              </div>
            )}
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary px-5 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)] min-w-[140px] border border-black/10">
            <p className="text-xs font-black uppercase tracking-widest text-white text-center">
              {member?.tingkatan_sabuk || "ANGGOTA"}
            </p>
          </div>
        </div>

        {/* Member Info */}
        <div className="flex flex-col gap-4 mt-6 items-center">
          <h3 className="text-xl font-black uppercase tracking-wider leading-tight line-clamp-2 min-h-14 flex items-center text-white drop-shadow-sm">
            {member?.nama}
          </h3>

          <div className="flex flex-col gap-2.5 items-center">
            <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm shadow-sm">
              <Award className="w-4 h-4 text-primary" />
              <p className="text-[13px] font-black uppercase tracking-[0.2em] leading-none text-primary-foreground/90">
                {member?.nomor_anggota || "PSM-000000"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-2.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
    </div>
  );
};

export const MemberCardBack = ({ member, id = "member-card-back" }) => {
  return (
    <div
      id={id}
      className="relative w-[350px] h-[540px] overflow-hidden shadow-2xl bg-[#0a0a0a] text-white font-sans border border-white/10"
      style={{
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
      }}
    >
      {/* Geometric Background as per image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#111] to-[#050505]"></div>
        {/* Large Geometric Slabs */}
        <div className="absolute top-[10%] left-[-20%] w-[140%] h-[150px] bg-[#1a1a1a] -rotate-[25deg] transform border-y border-white/[0.03]"></div>
        <div className="absolute top-[40%] left-[-20%] w-[140%] h-[200px] bg-[#151515] -rotate-[25deg] transform border-y border-white/[0.03] shadow-2xl"></div>
        <div className="absolute top-[75%] left-[-20%] w-[140%] h-[120px] bg-[#1a1a1a] -rotate-[25deg] transform border-y border-white/[0.03]"></div>

        {/* Accent Light */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* QR Code Section - Top Large */}
      <div className="absolute top-12 left-0 w-full flex flex-col items-center gap-3 z-10 scale-110">
        <div className="p-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          <QRCode
            value={
              member?.id
                ? `${window.location.origin}/verify/${member.id}`
                : "invalid"
            }
            size={140}
            level="H"
          />
        </div>
      </div>

      {/* Logo Section - Middle */}
      <div className="absolute top-[240px] left-0 w-full flex flex-col items-center z-10">
        <div className="w-24 h-24 flex items-center justify-center">
          <Image
            src="/pusamada-logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-16 h-16 text-primary"
          />
        </div>
        <div className="text-center px-10">
          <h2 className="text-xl font-black tracking-[0.15em] uppercase leading-none text-white drop-shadow-xl">
            Pusamada
          </h2>
          <div className="mt-2 flex flex-col gap-1 items-center">
            <p className="text-[11px] font-medium text-white/80 leading-relaxed italic max-w-[200px] text-center">
              &quot;Elmu Luhung Jembar Kabisa Budi Suci Gede Bakti&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Section - Bottom */}
      <div className="absolute bottom-12 left-0 w-full px-8 z-10">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <Globe className="w-3.5 h-3.5 text-white" />
            <span className="text-[9px] font-bold tracking-tight">
              www.pusamadaind.com
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary rounded-[2px] mb-[-2px]">
              <span className="text-[7px] text-white font-black uppercase">
                T
              </span>
            </div>
            <span className="text-[9px] font-bold tracking-tight">
              @pusamadaindonesia
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <Instagram className="w-3.5 h-3.5 text-white" />
            <span className="text-[9px] font-bold tracking-tight">
              @pusamadaindonesia
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <Facebook className="w-3.5 h-3.5 text-white" />
            <span className="text-[9px] font-bold tracking-tight">
              @pusakamandemuda
            </span>
          </div>
        </div>
      </div>

      {/* Footer Accent */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary/30 rounded-full blur-sm"></div>
    </div>
  );
};

// Default export
export const MemberCard = MemberCardFront;
