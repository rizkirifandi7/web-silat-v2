"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import React, { useState } from "react";
import { columnsGaleri } from "./ColumnGaleri";
import { Input } from "@/components/ui/input";
import { AddGaleri } from "./AddGaleri";
import { useQuery } from "@tanstack/react-query";
import { getGalleries } from "@/lib/api/gallery";

const MainGaleri = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["galleries", globalFilter],
    queryFn: () => getGalleries({ search: globalFilter }),
  });

  const galleries = data?.data?.data || [];

  return (
    <div>
      <TitleDashboard
        title="Galeri"
        subtitle="Manajemen galeri foto kegiatan"
      />
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm shadow-none"
          />
          <AddGaleri />
        </div>
        <DataTable
          columns={columnsGaleri}
          data={galleries}
        />
      </div>
    </div>
  );
};

export default MainGaleri;
