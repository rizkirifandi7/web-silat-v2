import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export function RegisterForm({ className, ...props }) {
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
          Buat Akun Baru
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Bergabunglah dengan keluarga besar PUSAMADA dan mulai perjalananmu.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="uppercase font-bold text-xs tracking-widest text-primary"
          >
            Nama Lengkap
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Nama Lengkap Anda"
            required
            className="rounded-none border-2 border-zinc-200 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 bg-muted/30"
          />
        </div>
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
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="uppercase font-bold text-xs tracking-widest text-primary"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="rounded-none border-2 border-zinc-200 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 bg-muted/30"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="uppercase font-bold text-xs tracking-widest text-primary"
          >
            Konfirmasi Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            required
            className="rounded-none border-2 border-zinc-200 focus-visible:ring-0 focus-visible:border-primary transition-colors h-11 bg-muted/30"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-none h-12 text-base font-black uppercase tracking-widest skew-x-[-10deg] hover:bg-zinc-900 transition-all border-2 border-transparent hover:border-primary"
        >
          <span className="skew-x-10">Daftar</span>
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
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors uppercase tracking-wide"
        >
          Masuk Sekarang
        </Link>
      </div>
    </div>
  );
}
