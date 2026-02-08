'use client';

import React, { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  stability: {
    label: "Stability",
    color: "hsl(var(--primary))",
  },
  throughput: {
    label: "Throughput",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function TelemetryChart() {
  const [data, setData] = useState<{ time: string; stability: number; throughput: number }[]>([]);

  useEffect(() => {
    const initialData = Array.from({ length: 15 }).map((_, i) => ({
      time: i.toString(),
      stability: 90 + Math.random() * 8,
      throughput: 75 + Math.random() * 15,
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData((prev) => {
        const nextTime = (parseInt(prev[prev.length - 1].time) + 1).toString();
        const nextStability = Math.max(88, Math.min(99, prev[prev.length - 1].stability + (Math.random() - 0.5) * 3));
        const nextThroughput = Math.max(70, Math.min(98, prev[prev.length - 1].throughput + (Math.random() - 0.5) * 6));
        
        return [...prev.slice(1), { time: nextTime, stability: nextStability, throughput: nextThroughput }];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[200px] mt-2">
      <ChartContainer config={chartConfig}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-stability)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--color-stability)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-throughput)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--color-throughput)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" />
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[0, 100]} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Area
            type="monotone"
            dataKey="stability"
            stroke="var(--color-stability)"
            fillOpacity={1}
            fill="url(#colorStability)"
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="throughput"
            stroke="var(--color-throughput)"
            fillOpacity={1}
            fill="url(#colorThroughput)"
            strokeWidth={2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}