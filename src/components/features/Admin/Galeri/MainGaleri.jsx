"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import TitleDashboard from "@/components/common/Title/TitleDashboard";
import React from "react";
import { columnsGaleri } from "./ColumnGaleri";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddGaleri } from "./AddGaleri";

const data = [
  {
    id: "1",
    name: "John Doe",
    email: "[EMAIL_ADDRESS]",
    amount: 100,
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "[EMAIL_ADDRESS]",
    amount: 200,
  },
];

const MainGaleri = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div>
      <TitleDashboard title="Galeri" subtitle="Manajemen galeri" />
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
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
          data={data || []}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </div>
  );
};

export default MainGaleri;
