"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, Shield, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EditUser } from "./EditUser";
import { DeleteUser } from "./DeleteUser";
import UserDetailDialog from "./UserDetailDialog";

export const columns = [
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Lengkap
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4 font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      let badgeVariant = "default";
      let icon = <User className="mr-1 h-3 w-3" />;

      if (role === "admin") {
        badgeVariant = "destructive"; // Red/Strong
        icon = <Shield className="mr-1 h-3 w-3" />;
      } else if (role === "anggota") {
        badgeVariant = "secondary"; // Blue/Info
        icon = <Users className="mr-1 h-3 w-3" />;
      } else {
        badgeVariant = "outline"; // Neutral
      }

      return (
        <Badge
          variant={badgeVariant}
          className="uppercase text-xs font-bold items-center"
        >
          {icon}
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "no_hp",
    header: "No HP",
    cell: ({ row }) => <div>{row.getValue("no_hp") || "-"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <UserDetailDialog user={row.original} />
          <EditUser user={row.original} />
          <DeleteUser user={row.original} />
        </div>
      );
    },
  },
];
