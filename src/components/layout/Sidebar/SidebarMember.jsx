"use client";

import * as React from "react";
import {
  IconDashboard,
  IconUser,
  IconCalendarEvent,
  IconHeartHandshake,
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
      url: "/member/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Profil Saya",
      url: "/member/profile",
      icon: IconUser,
    },
    {
      title: "Event Saya",
      url: "/member/events",
      icon: IconCalendarEvent,
    },
    {
      title: "Donasi Saya",
      url: "/member/donations",
      icon: IconHeartHandshake,
    },
  ],
};

export function SidebarMember({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/member/dashboard">
                <Image
                  src="/pusamada-logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                />
                <span className="text-base font-semibold">Member Area</span>
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
