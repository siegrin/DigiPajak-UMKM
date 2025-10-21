'use client';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { formatCurrency } from '@/lib/utils';

interface OmzetPieChartProps {
  data: {
    name: string;
    omzet: number;
    connected: boolean;
  }[];
}

const chartConfig = {
  omzet: {
    label: "Omzet",
  },
  shopee: {
    label: "Shopee",
    color: "hsl(var(--chart-1))",
  },
  tokopedia: {
    label: "Tokopedia",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Lainnya",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function OmzetPieChart({ data }: OmzetPieChartProps) {
  const chartData = data
    .filter((p) => p.connected && p.omzet > 0)
    .map((p) => ({
      name: p.name,
      value: p.omzet,
      fill: p.name.toLowerCase().includes('shopee') ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))',
    }));
  
  const totalOmzet = chartData.reduce((acc, curr) => acc + curr.value, 0);

  if (chartData.length === 0) {
    return (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Data omzet belum diisi.
        </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[120px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={true}
            formatter={(value) => formatCurrency(value as number)}
            content={<ChartTooltipContent hideLabel indicator="dot" />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            innerRadius={35}
            strokeWidth={2}
          >
             {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
