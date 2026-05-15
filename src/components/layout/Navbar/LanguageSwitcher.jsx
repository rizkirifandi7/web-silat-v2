"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

export default function LanguageSwitcher({ isScrolled, isDarkHeaderPage }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale) => {
    startTransition(() => {
      // replace the current route with the new locale
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          className={cn(
            "rounded-full w-9 h-9 transition-colors",
            isScrolled
              ? "text-foreground hover:bg-muted"
              : isDarkHeaderPage
                ? "text-white hover:bg-white/10"
                : "text-foreground md:text-black hover:bg-muted md:hover:bg-black/10",
          )}
        >
          <Globe className="w-5 h-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("id")}
          className={cn(
            "cursor-pointer",
            locale === "id" && "bg-muted font-bold",
          )}
        >
          Indonesia (ID)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={cn(
            "cursor-pointer",
            locale === "en" && "bg-muted font-bold",
          )}
        >
          English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
