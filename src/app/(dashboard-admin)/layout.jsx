import React from "react";
import { AppSidebar } from "@/components/layout/Sidebar/AppSidebar";
import { SiteHeader } from "@/components/layout/Sidebar/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Dashboard Admin",
  description: "Dashboard Admin PUSAMADA",
};

const DashboardAdminLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardAdminLayout;
