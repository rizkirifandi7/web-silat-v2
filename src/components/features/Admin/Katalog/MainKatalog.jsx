"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import React, { useState } from "react";
import { columnsKatalog } from "./ColumnKatalog";
import { Input } from "@/components/ui/input";
import { AddKatalog } from "./AddKatalog";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/katalog";

const MainKatalog = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["products", globalFilter],
    queryFn: () => getProducts({ search: globalFilter }),
  });

  const products = data?.data || [];

  return (
    <div>
      <TitleDashboard
        title="Katalog Produk"
        subtitle="Manajemen inventori dan merchandise"
      />
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Cari produk..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm shadow-none"
          />
          <AddKatalog />
        </div>
        <DataTable
          columns={columnsKatalog}
          data={products}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MainKatalog;
