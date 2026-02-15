"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import { getFounders } from "@/lib/api/about";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { columnsFounders } from "./ColumnFounders";
import { AddFounder } from "./AddFounder";
import { Input } from "@/components/ui/input";

export const FoundersTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["founders"],
    queryFn: getFounders,
  });

  const founders = data?.data?.data || [];

  // Client-side filtering as the API might not support search on this endpoint yet
  // or it returns all data which is fine for a small list
  const filteredData = founders.filter((item) =>
    item.nama.toLowerCase().includes(globalFilter.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Cari pendiri..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <AddFounder />
      </div>
      <DataTable columns={columnsFounders} data={filteredData} />
    </div>
  );
};
