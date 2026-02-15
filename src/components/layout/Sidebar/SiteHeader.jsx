"use client";

import { NavUser } from "@/components/layout/Sidebar/nav-user";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuthStore from "@/store/useAuthStore";

export function SiteHeader() {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Member Area</h1>
        <div className="ml-auto flex items-center gap-2">
          <NavUser
            user={{
              name: user?.nama || user?.name || "User",
              email: user?.email || "-",
              avatar: user?.foto_url || user?.profile_picture || undefined,
            }}
          />
        </div>
      </div>
    </header>
  );
}
