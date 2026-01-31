"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/beranda",
      icon: IconDashboard,
    },
    {
      title: "Donasi",
      url: "/donasi",
      icon: IconListDetails,
    },
    {
      title: "Event",
      url: "/event",
      icon: IconChartBar,
    },
    {
      title: "Galeri",
      url: "/galeri",
      icon: IconFolder,
    },
    {
      title: "Materi",
      url: "/materi",
      icon: IconUsers,
    },
    {
      title: "Tentang Kami",
      url: "/tentang-kami",
      icon: IconUsers,
    },
    {
      title: "User",
      url: "/user",
      icon: IconUsers,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <div>
                <Image
                  src="/pusamada-logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                />
                <span className="text-base font-semibold">PUSAMADA</span>
              </div>
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
