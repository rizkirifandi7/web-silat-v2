"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function DashboardChart({ data }) {
  const chartData = [
    {
      name: "Users",
      total: data?.totalUsers || 0,
    },
    {
      name: "Anggota",
      total: data?.totalMembers || 0,
    },
    {
      name: "Events",
      total: data?.totalEvents || 0,
    },
    {
      name: "Pendaftar",
      total: data?.recentActivity?.length || 0,
    },
  ];

  return (
    <Card className="col-span-4 lg:col-span-4 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>Ringkasan Data</CardTitle>
        <CardDescription>
          Perbandingan jumlah data dalam sistem saat ini.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--popover-foreground))",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar
              dataKey="total"
              fill="url(#colorTotal)"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
