"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import React, { useState } from "react";
import { columnsMateri } from "./ColumnMateri";
import { Input } from "@/components/ui/input";
import { AddMateri } from "./AddMateri";
import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "@/lib/api/materi";

const MainMateri = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["materials", globalFilter],
    queryFn: () => getMaterials({ search: globalFilter }),
  });

  const materials = data?.data?.data || [];

  return (
    <div>
      <TitleDashboard
        title="Materi"
        subtitle="Manajemen materi pelatihan dan pembelajaran"
      />
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Cari materi..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm shadow-none"
          />
          <AddMateri />
        </div>
        <DataTable columns={columnsMateri} data={materials} />
      </div>
    </div>
  );
};

export default MainMateri;
