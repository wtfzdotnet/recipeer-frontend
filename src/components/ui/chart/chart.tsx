import * as React from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export interface ChartProps {
  data: Record<string, unknown>[]
  className?: string
  height?: number
}

export interface BarChartProps extends ChartProps {
  dataKey: string
  xAxisKey: string
  color?: string
}

export interface LineChartProps extends ChartProps {
  dataKey: string
  xAxisKey: string
  color?: string
}

export interface PieChartProps extends ChartProps {
  dataKey: string
  nameKey: string
  colors?: string[]
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { height?: number }
>(({ height = 300, children, ...props }, ref) => (
  <div
    ref={ref}
    className="w-full"
    style={{ height }}
    {...props}
  >
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  </div>
))
ChartContainer.displayName = "ChartContainer"

const SimpleBarChart = React.forwardRef<
  HTMLDivElement,
  BarChartProps
>(({ data, dataKey, xAxisKey, color = "hsl(var(--primary))", height, ...props }, ref) => (
  <ChartContainer ref={ref} height={height} {...props}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
      <XAxis 
        dataKey={xAxisKey} 
        className="text-muted-foreground text-sm"
        fontSize={12}
      />
      <YAxis 
        className="text-muted-foreground text-sm"
        fontSize={12}
      />
      <Tooltip 
        contentStyle={{
          backgroundColor: "hsl(var(--popover))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "6px",
          color: "hsl(var(--popover-foreground))",
        }}
        labelStyle={{ color: "hsl(var(--popover-foreground))" }}
        itemStyle={{ color: "hsl(var(--popover-foreground))" }}
      />
      <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
    </BarChart>
  </ChartContainer>
))
SimpleBarChart.displayName = "SimpleBarChart"

const SimpleLineChart = React.forwardRef<
  HTMLDivElement,
  LineChartProps
>(({ data, dataKey, xAxisKey, color = "hsl(var(--primary))", height, ...props }, ref) => (
  <ChartContainer ref={ref} height={height} {...props}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
      <XAxis 
        dataKey={xAxisKey} 
        className="text-muted-foreground text-sm"
        fontSize={12}
      />
      <YAxis 
        className="text-muted-foreground text-sm"
        fontSize={12}
      />
      <Tooltip 
        contentStyle={{
          backgroundColor: "hsl(var(--popover))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "6px",
          color: "hsl(var(--popover-foreground))",
        }}
        labelStyle={{ color: "hsl(var(--popover-foreground))" }}
        itemStyle={{ color: "hsl(var(--popover-foreground))" }}
      />
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={color} 
        strokeWidth={2}
        dot={{ fill: color, strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, fill: color }}
      />
    </LineChart>
  </ChartContainer>
))
SimpleLineChart.displayName = "SimpleLineChart"

const SimplePieChart = React.forwardRef<
  HTMLDivElement,
  PieChartProps
>(({ 
  data, 
  dataKey, 
  nameKey, 
  colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ], 
  height,
  ...props 
}, ref) => (
  <ChartContainer ref={ref} height={height} {...props}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{
          backgroundColor: "hsl(var(--popover))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "6px",
          color: "hsl(var(--popover-foreground))",
        }}
        labelStyle={{ color: "hsl(var(--popover-foreground))" }}
        itemStyle={{ color: "hsl(var(--popover-foreground))" }}
      />
      <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
    </PieChart>
  </ChartContainer>
))
SimplePieChart.displayName = "SimplePieChart"

export {
  ChartContainer,
  SimpleBarChart,
  SimpleLineChart,
  SimplePieChart,
}