'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, formatDate } from '@/lib/utils';

interface RevenueChartProps {
  data: Array<{
    date: string;
    department: string;
    total: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Transform data for charting
  const chartData = data.reduce((acc: any[], item) => {
    const existingDate = acc.find((d) => d.date === item.date);
    if (existingDate) {
      existingDate[item.department] = item.total;
    } else {
      acc.push({
        date: item.date,
        [item.department]: item.total,
      });
    }
    return acc;
  }, []);

  // Get unique departments for lines
  const departments = [...new Set(data.map((d) => d.department))];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDate(value)}
            fontSize={12}
          />
          <YAxis tickFormatter={(value) => `$${value / 1000}k`} fontSize={12} />
          <Tooltip
            formatter={(value: any) => formatCurrency(value)}
            labelFormatter={(label) => formatDate(label)}
          />
          <Legend />
          {departments.map((dept, index) => (
            <Line
              key={dept}
              type="monotone"
              dataKey={dept}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
