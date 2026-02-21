"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/Table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/api/event";
import { columnsEvent } from "./ColumnEvent";
import { AddEvent } from "./AddEvent";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const MainEvent = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["events", globalFilter],
    queryFn: () => getEvents({ search: globalFilter }),
  });

  const events = data?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari event..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <AddEvent />
      </div>

      <DataTable columns={columnsEvent} data={events} isLoading={isLoading} />
    </div>
  );
};
