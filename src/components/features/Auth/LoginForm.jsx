"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useLogin } from "@/hooks/useLogin";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LoginForm({ className, ...props }) {
  const { mutate: login, isPending: isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <Link href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex bg-primary/10 p-2 rounded-full mb-2">
            <Image
              src="/pusamada-logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="drop-shadow-md"
            />
          </div>
          <span className="sr-only">PUSAMADA</span>
        </Link>
        <h1 className="text-3xl font-black uppercase italic tracking-tight">
          Selamat Datang
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Masuk untuk mengakses dashboard anggota dan layanan PUSAMADA.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.response?.data?.message || "Login failed"}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="uppercase font-bold text-xs tracking-widest text-primary"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            required
            className="rounded-none border-2 border-zinc-200 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 bg-muted/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="uppercase font-bold text-xs tracking-widest text-primary"
            >
              Password
            </Label>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              Lupa password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="rounded-none border-2 border-zinc-200 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 bg-muted/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-none h-12 text-base font-black uppercase tracking-widest skew-x-[-10deg] hover:bg-zinc-900 transition-all border-2 border-transparent hover:border-primary"
          disabled={isLoading}
        >
          <span className="skew-x-10 flex items-center justify-center gap-2">
            {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
            {isLoading ? "Masuk..." : "Masuk"}
          </span>
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200"></span>
        </div>
        <span className="relative bg-background px-2 text-xs uppercase font-bold tracking-widest">
          Atau
        </span>
      </div>

      <div className="text-center text-sm">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors uppercase tracking-wide"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
