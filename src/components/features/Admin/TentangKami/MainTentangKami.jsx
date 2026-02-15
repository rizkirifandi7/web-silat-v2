"use client";

import React from "react";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutForm } from "./AboutForm";
import { FoundersTable } from "./FoundersList/FoundersTable";
import { Info, Users } from "lucide-react";

export const MainTentangKami = () => {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header Dashboard */}
      <TitleDashboard
        title="Tentang Kami"
        subtitle="Kelola profil organisasi, sejarah, visi misi, dan daftar pendiri."
      />

      {/* Tabs Modern */}
      <Tabs defaultValue="about" className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-1">
          <TabsList className="bg-transparent p-0 h-auto gap-6">
            <TabsTrigger
              value="about"
              className="relative bg-transparent rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:shadow-none hover:text-foreground"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Informasi Utama</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="founders"
              className="relative bg-transparent rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:shadow-none hover:text-foreground"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Daftar Pendiri</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="about"
          className="focus-visible:outline-none focus-visible:ring-0"
        >
          <AboutForm />
        </TabsContent>

        <TabsContent
          value="founders"
          className="focus-visible:outline-none focus-visible:ring-0"
        >
          <FoundersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
