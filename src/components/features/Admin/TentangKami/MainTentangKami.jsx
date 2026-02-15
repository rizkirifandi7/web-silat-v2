"use client";

import React from "react";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutForm } from "./AboutForm";
import { FoundersTable } from "./FoundersList/FoundersTable";

export const MainTentangKami = () => {
  return (
    <div className="space-y-6">
      <TitleDashboard
        title="Tentang Kami"
        subtitle="Manajemen informasi tentang kami"
      />

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="about">Informasi Utama</TabsTrigger>
          <TabsTrigger value="founders">Pendiri</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-6">
          <AboutForm />
        </TabsContent>
        <TabsContent value="founders" className="mt-6">
          <FoundersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
