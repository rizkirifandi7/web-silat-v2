"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <Button
            asChild
            variant="ghost"
            className={cn(
              "font-bold uppercase tracking-wide hover:bg-transparent hover:text-primary",
              isScrolled
                ? "text-foreground"
                : "text-black hover:text-black md:hover:bg-white/10",
            )}
          >
            <Link href="/login">Masuk</Link>
          </Button>
          <Button
            asChild
            className="rounded-none skew-x-[-10deg] px-6 font-bold shadow-md hover:shadow-lg transition-all bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/register">
              <span className="skew-x-10">Daftar</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className={cn("w-6 h-6", !isScrolled && "md:text-black")} />
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
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">Masuk</Link>
            </Button>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground"
            >
              <Link href="/register">Daftar</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
