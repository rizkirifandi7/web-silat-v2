import React from "react";
import { SidebarAdmin } from "@/components/layout/Sidebar/SidebarAdmin";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/layout/Sidebar/SiteHeader";

export const metadata = {
  title: "Admin Dashboard - PUSAMADA",
  description: "Admin Management PUSAMADA",
};

const LayoutAdmin = ({ children }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <SidebarAdmin variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutAdmin;
