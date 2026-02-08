import React from "react";
import { SidebarMember } from "@/components/layout/Sidebar/SidebarMember";
import { SiteHeaderMember } from "@/components/layout/Sidebar/SiteHeaderMember";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Member Dashboard - PUSAMADA",
  description: "Member Area PUSAMADA",
};

const LayoutMember = ({ children }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <SidebarMember variant="inset" />
      <SidebarInset>
        <SiteHeaderMember />
        <div className="flex flex-1 flex-col p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutMember;
