"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { AddDonasi } from "./AddDonasi";
import { columnsDonasi } from "./ColumnDonasi";
import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "@/lib/api/donasi";

const MainDonasi = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["campaigns", globalFilter],
    queryFn: () => getCampaigns({ search: globalFilter }),
  });

  const campaigns = data?.data || [];

  return (
    <div>
      <TitleDashboard title="Donasi" subtitle="Manajemen program donasi" />
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Cari program donasi..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm shadow-none"
          />
          <AddDonasi />
        </div>
        <DataTable columns={columnsDonasi} data={campaigns} />
      </div>
    </div>
  );
};

export default MainDonasi;
