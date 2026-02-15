"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  defs,
  linearGradient,
  stop,
} from "recharts";

const dummyData = [
  { name: "Sen", value: 12 },
  { name: "Sel", value: 18 },
  { name: "Rab", value: 15 },
  { name: "Kam", value: 25 },
  { name: "Jum", value: 20 },
  { name: "Sab", value: 32 },
  { name: "Min", value: 40 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border/50 px-3 py-2 rounded-lg shadow-xl outline-none animate-in fade-in zoom-in-95 duration-200">
        <p className="text-sm font-semibold mb-1 text-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-xs text-muted-foreground">
            User Baru:{" "}
            <span className="font-bold text-foreground">
              {payload[0].value}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function UserOverviewChart({ data }) {
  // Jika ada data real dari props, gunakan. Jika tidak, pakai dummyData.
  const chartData = data?.registrationHistory || dummyData;

  return (
    <Card className="col-span-4 lg:col-span-4 shadow-sm hover:shadow-md transition-all duration-300 border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tren Pendaftaran User</CardTitle>
            <CardDescription>
              Jumlah pengguna baru dalam 7 hari terakhir.
            </CardDescription>
          </div>
          {/* Badge Indikator Kenaikan (Opsional) */}
          <div className="hidden sm:flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-1 rounded-md text-xs font-medium">
            +12.5%{" "}
            <span className="text-muted-foreground font-normal">
              vs minggu lalu
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-0 pb-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

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
                dx={-10}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#3b82f6",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
