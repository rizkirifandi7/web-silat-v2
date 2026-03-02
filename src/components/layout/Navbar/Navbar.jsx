"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/useAuthStore";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/galeri", label: "Galeri" },
  { href: "/katalog", label: "Katalog" },
  { href: "/donasi", label: "Donasi" },
  { href: "/events", label: "Event" },
  { href: "/kontak", label: "Kontak" },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDarkHeaderPage =
    pathname.startsWith("/donasi/") || pathname.startsWith("/events/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(user);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-2 border-border/50 shadow-md"
          : "bg-transparent py-4 md:py-6",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/pusamada-logo.png"
              alt="PUSAMADA Logo"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "font-black text-base md:text-lg tracking-tighter leading-none transition-colors",
                isScrolled
                  ? "text-foreground"
                  : isDarkHeaderPage
                    ? "text-white drop-shadow-md"
                    : "text-foreground md:text-black md:drop-shadow-md",
              )}
            >
              PUSAMADA
            </span>
            <span
              className={cn(
                "text-[0.6rem] md:text-xs font-bold tracking-[0.2em] uppercase opacity-80",
                isScrolled
                  ? "text-muted-foreground"
                  : isDarkHeaderPage
                    ? "text-white/80"
                    : "text-muted-foreground md:text-black/80",
              )}
            >
              Indonesia
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-bold uppercase tracking-wide transition-all hover:text-primary pb-2",
                pathname === link.href
                  ? "text-primary"
                  : isScrolled
                    ? "text-muted-foreground"
                    : isDarkHeaderPage
                      ? "text-white/90 hover:text-white"
                      : "text-black/90 hover:text-black",
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary skew-x-[-10deg]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "font-bold uppercase tracking-wide hover:bg-transparent hover:text-primary",
                  isScrolled
                    ? "text-foreground"
                    : isDarkHeaderPage
                      ? "text-white hover:text-white md:hover:bg-white/10"
                      : "text-black hover:text-black md:hover:bg-white/10",
                )}
              >
                <Link href="/login">Masuk</Link>
              </Button>
              <Button
                asChild
                className={cn(
                  "rounded-none skew-x-[-10deg] px-6 font-bold shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground hover:bg-primary/90",
                  isDarkHeaderPage ? "text-black bg-white" : "text-white",
                )}
              >
                <Link href="/register">
                  <span className="skew-x-10">DAFTAR</span>
                </Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-3 px-2 py-1.5 h-auto hover:bg-transparent hover:opacity-80 transition-opacity",
                    isScrolled
                      ? "text-foreground"
                      : isDarkHeaderPage
                        ? "text-white"
                        : "text-black",
                  )}
                >
                  <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-border shadow-sm">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.nama || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-sm font-bold tracking-tight truncate max-w-[120px]">
                      {user?.nama || "Pengguna"}
                    </span>
                    <span className="text-[0.65rem] opacity-70 uppercase tracking-widest font-medium">
                      {user?.role || "GUEST"}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 font-inter mt-2">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/admin/dashboard"
                        : "/anggota/dashboard"
                    }
                    className="flex items-center"
                  >
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/member/events" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Event Saya</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu
              className={cn(
                "w-6 h-6",
                !isScrolled &&
                  (isDarkHeaderPage
                    ? "text-white md:text-white"
                    : "md:text-black"),
              )}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 shadow-xl flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base font-bold uppercase tracking-wider py-2 border-b border-border/50 hover:text-primary transition-colors",
                pathname === link.href
                  ? "text-primary border-primary"
                  : "text-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button
                  asChild
                  className={cn("w-full bg-primary text-primary-foreground")}
                >
                  <Link href="/register">Daftar</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2 pb-2 border-b border-border/50">
                  <Avatar className="w-10 h-10 border border-primary/20">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.nama || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-base text-foreground">
                      {user?.nama || "Pengguna"}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {user?.role || "GUEST"}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-foreground"
                >
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/admin/dashboard"
                        : "/anggota/dashboard"
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-foreground mt-1"
                >
                  <Link
                    href="/member/events"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Event Saya
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start mt-1"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
