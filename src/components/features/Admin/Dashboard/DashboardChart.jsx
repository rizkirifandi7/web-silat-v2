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
  CartesianGrid,
} from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border/50 px-3 py-2 rounded-lg shadow-xl outline-none">
        <p className="text-sm font-semibold mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">
          Total:{" "}
          <span className="font-bold text-primary">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardChart({ data }) {
  const chartData = [
    { name: "Users", total: data?.totalUsers || 0 },
    { name: "Anggota", total: data?.totalMembers || 0 },
    { name: "Events", total: data?.totalEvents || 0 },
    { name: "Pendaftar", total: data?.recentActivity?.length || 0 },
  ];

  return (
    <Card className="col-span-4 hover:shadow-md transition-shadow border-border/60">
      <CardHeader>
        <CardTitle>Statistik Sistem</CardTitle>
        <CardDescription>
          Gambaran umum data dalam ekosistem saat ini.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.4}
            />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="total"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              barSize={40}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
