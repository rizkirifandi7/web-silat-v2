"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconUsers,
  IconSettings,
  IconCreditCard,
} from "@tabler/icons-react";

import { NavMain } from "@/components/layout/Sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Archive, Calendar, Camera, HandCoins, IdCard, LibraryBig, Store } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Galeri",
      url: "/admin/galeri",
      icon: Camera,
    },
    {
      title: "Donasi",
      url: "/admin/donasi",
      icon: HandCoins,
    },
    {
      title: "Event",
      url: "/admin/event",
      icon: Calendar,
    },
    {
      title: "Materi",
      url: "/admin/materi",
      icon: LibraryBig,
    },
    {
      title: "Tentang Kami",
      url: "/admin/tentang-kami",
      icon: Store,
    },
    {
      title: "User",
      url: "/admin/user",
      icon: IconUsers,
    },
    {
      title: "Katalog",
      url: "/admin/katalog",
      icon: Archive,
    },
    {
      title: "Cetak Kartu",
      url: "/admin/cetak-kartu",
      icon: IdCard,
    },
  ],
};

export function SidebarAdmin({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/admin/dashboard">
                <Image
                  src="/pusamada-logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                />
                <span className="text-base font-semibold">Pusamada</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
