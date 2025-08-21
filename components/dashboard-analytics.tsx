"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const analyticsData = [
  {
    title: "Total vs Agent Transfers",
    data: [
      { name: "Total", value: 1247, color: "#3b82f6" },
      { name: "Agent", value: 892, color: "#10b981" },
    ],
    percentage: 71.5,
    trend: "+12%",
    description: "Agent transfer success rate",
  },
  {
    title: "Total vs Abandoned",
    data: [
      { name: "Total", value: 1247, color: "#3b82f6" },
      { name: "Abandoned", value: 156, color: "#ef4444" },
    ],
    percentage: 12.5,
    trend: "-8%",
    description: "Call abandonment rate",
  },
  {
    title: "Total vs eLead",
    data: [
      { name: "Total", value: 1247, color: "#3b82f6" },
      { name: "eLead", value: 423, color: "#ec4899" },
    ],
    percentage: 33.9,
    trend: "+24%",
    description: "Electronic lead conversion",
  },
  {
    title: "Total vs Non-Sales",
    data: [
      { name: "Total", value: 1247, color: "#3b82f6" },
      { name: "Non-Sales", value: 298, color: "#8b5cf6" },
    ],
    percentage: 23.9,
    trend: "+5%",
    description: "Non-sales inquiries",
  },
  {
    title: "Total vs Unique",
    data: [
      { name: "Total", value: 1247, color: "#3b82f6" },
      { name: "Unique", value: 1089, color: "#06b6d4" },
    ],
    percentage: 87.3,
    trend: "+18%",
    description: "Unique caller identification",
  },
]

export default function DashboardAnalytics() {
  return (
    <div className="space-y-6">
      {/* Overview stats section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">1,247</div>
          <div className="text-blue-100 text-sm font-medium">Total Calls Today</div>
          <div className="text-blue-200 text-xs mt-1">+15% from yesterday</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">892</div>
          <div className="text-emerald-100 text-sm font-medium">Successful Transfers</div>
          <div className="text-emerald-200 text-xs mt-1">71.5% success rate</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">4.2m</div>
          <div className="text-amber-100 text-sm font-medium">Avg Call Duration</div>
          <div className="text-amber-200 text-xs mt-1">-12s from yesterday</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-3xl font-bold">94.2%</div>
          <div className="text-purple-100 text-sm font-medium">Customer Satisfaction</div>
          <div className="text-purple-200 text-xs mt-1">+2.1% this week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {analyticsData.map((chart, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 leading-tight">{chart.title}</h3>
                <div
                  className={`text-sm font-bold px-2 py-1 rounded-full ${
                    chart.trend.startsWith("+") ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                  }`}
                >
                  {chart.trend}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-slate-800 mb-1">{chart.percentage}%</div>
                <div className="text-sm text-slate-600">{chart.description}</div>
              </div>

              <div className="h-48 mb-4">
                <ChartContainer
                  config={{
                    value: {
                      label: "Value",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chart.data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                                <p className="font-semibold text-slate-800">{label}</p>
                                <p className="text-slate-600">Value: {payload[0].value?.toLocaleString()}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                        cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {chart.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                  {chart.data.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-600 font-medium">
                        {item.name}: {item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
