"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
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

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manajemen Galeri",
      url: "/admin/galeri",
      icon: IconChartBar,
    },
    {
      title: "Manajemen Donasi",
      url: "/admin/donasi",
      icon: IconFolder,
    },
    {
      title: "Manajemen Event",
      url: "/admin/event",
      icon: IconChartBar,
    },
    {
      title: "Manajemen Materi",
      url: "/admin/materi",
      icon: IconChartBar,
    },
    {
      title: "Manajemen Tentang Kami",
      url: "/admin/tentang-kami",
      icon: IconSettings,
    },
    {
      title: "Manajemen User",
      url: "/admin/anggota",
      icon: IconUsers,
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
                <span className="text-base font-semibold">Admin Panel</span>
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
