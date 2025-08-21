"use client";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Cell,
    PieChart,
    Pie,
    Area,
    AreaChart,
    Line,
    LineChart,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
    Phone,
    Car,
    Building2,
    PhoneOff,
    UserX,
    Users,
    Clock,
    TrendingUp,
    Star,
    AlertTriangle,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
];

const redirectionData = [
    { name: "Service", value: 342, color: "#f59e0b", percentage: 27.4 },
    { name: "Finance/Lease", value: 298, color: "#10b981", percentage: 23.9 },
    { name: "Sales", value: 234, color: "#3b82f6", percentage: 18.8 },
    { name: "Parts", value: 189, color: "#8b5cf6", percentage: 15.2 },
    { name: "General Inquiry", value: 184, color: "#ef4444", percentage: 14.7 },
];

const telemetryData = {
    aht: [
        { period: "Mon", time: 4.2 },
        { period: "Tue", time: 3.8 },
        { period: "Wed", time: 4.5 },
        { period: "Thu", time: 3.9 },
        { period: "Fri", time: 4.1 },
        { period: "Sat", time: 5.2 },
        { period: "Sun", time: 4.8 },
    ],
    escalationReasons: [
        { reason: "Technical Issues", count: 45, color: "#ef4444" },
        { reason: "Pricing Inquiry", count: 38, color: "#f59e0b" },
        { reason: "Product Details", count: 32, color: "#3b82f6" },
        { reason: "Availability", count: 28, color: "#10b981" },
        { reason: "Other", count: 15, color: "#8b5cf6" },
    ],
    npsData: [
        { category: "Sale - New", score: 8.4, responses: 234 },
        { category: "Sale - Used", score: 7.8, responses: 189 },
        { category: "Service", score: 8.1, responses: 156 },
        { category: "Finance", score: 7.9, responses: 98 },
    ],
    brandPerformance: [
        { brand: "Silverado", nps: 8.6, calls: 145 },
        { brand: "Equinox", nps: 8.2, calls: 123 },
        { brand: "Malibu", nps: 7.9, calls: 98 },
        { brand: "Tahoe", nps: 8.4, calls: 87 },
    ],
    fallouts: {
        trend: [
            { period: "Mon", count: 12 },
            { period: "Tue", count: 8 },
            { period: "Wed", count: 15 },
            { period: "Thu", count: 11 },
            { period: "Fri", count: 9 },
            { period: "Sat", count: 18 },
            { period: "Sun", count: 14 },
        ],
        reasonCodes: [
            { reason: "System Timeout", count: 23, color: "#ef4444" },
            { reason: "Agent Unavailable", count: 19, color: "#f59e0b" },
            { reason: "Call Dropped", count: 16, color: "#8b5cf6" },
            { reason: "Technical Error", count: 12, color: "#06b6d4" },
            { reason: "Customer Hangup", count: 8, color: "#10b981" },
            { reason: "Other", count: 9, color: "#64748b" },
        ],
    },
};

export default function DashboardAnalytics() {
    return (
        <div className="space-y-6">
            {/* Overview stats section */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Phone className="h-8 w-8 text-blue-100" />
                        <div className="text-blue-200 text-xs">+15%</div>
                    </div>
                    <div className="text-3xl font-bold">1,247</div>
                    <div className="text-blue-100 text-sm font-medium">
                        Total Calls
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Car className="h-8 w-8 text-emerald-100" />
                        <div className="text-emerald-200 text-xs">+8%</div>
                    </div>
                    <div className="text-3xl font-bold">342</div>
                    <div className="text-emerald-100 text-sm font-medium">
                        Test Drive Redirects
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Building2 className="h-8 w-8 text-amber-100" />
                        <div className="text-amber-200 text-xs">+12%</div>
                    </div>
                    <div className="text-3xl font-bold">298</div>
                    <div className="text-amber-100 text-sm font-medium">
                        Store Transfers
                    </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <PhoneOff className="h-8 w-8 text-red-100" />
                        <div className="text-red-200 text-xs">-5%</div>
                    </div>
                    <div className="text-3xl font-bold">156</div>
                    <div className="text-red-100 text-sm font-medium">
                        Closed w/o Test Drive
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <UserX className="h-8 w-8 text-purple-100" />
                        <div className="text-purple-200 text-xs">-3%</div>
                    </div>
                    <div className="text-3xl font-bold">89</div>
                    <div className="text-purple-100 text-sm font-medium">
                        Early Closures
                    </div>
                </div>
            </div>

            {/* Call redirections by category section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Users className="h-5 w-5 text-slate-600" />
                        Call Redirections by Category
                    </h3>
                    <div className="text-xs text-slate-600">Last 30 days</div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Compact pie chart */}
                    <div className="h-32 w-32 flex-shrink-0">
                        <ChartContainer
                            config={{
                                value: {
                                    label: "Calls",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-full w-full"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={redirectionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={35}
                                        outerRadius={60}
                                        paddingAngle={1}
                                        dataKey="value"
                                    >
                                        {redirectionData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <ChartTooltip
                                        content={({ active, payload }) => {
                                            if (
                                                active &&
                                                payload &&
                                                payload.length
                                            ) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-lg">
                                                        <p className="font-semibold text-slate-800 text-sm">
                                                            {data.name}
                                                        </p>
                                                        <p className="text-slate-600 text-xs">
                                                            Calls:{" "}
                                                            {data.value.toLocaleString()}
                                                        </p>
                                                        <p className="text-slate-600 text-xs">
                                                            Percentage:{" "}
                                                            {data.percentage}%
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>

                    {/* Compact horizontal breakdown */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {redirectionData.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"
                            >
                                <div
                                    className="w-3 h-3 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-slate-800 text-sm truncate">
                                        {item.name}
                                    </div>
                                    <div className="text-xs text-slate-600">
                                        {item.value} ({item.percentage}%)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call Telemetry section with minimalistic design */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-slate-600" />
                        Call Telemetry & Trends
                    </h3>
                    <div className="flex items-center gap-3">
                        <Select defaultValue="week">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">
                                    This Month
                                </SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
                    {/* AHT Metric */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-600">
                                    Avg Handle Time
                                </span>
                            </div>
                            <span className="text-xs text-green-600">
                                -0.3m
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 mb-2">
                            4.2m
                        </div>
                        <div className="h-16">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={telemetryData.aht}>
                                    <Area
                                        type="monotone"
                                        dataKey="time"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.1}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* NPS Score */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-600">
                                    Avg NPS Score
                                </span>
                            </div>
                            <span className="text-xs text-green-600">+0.2</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 mb-2">
                            8.1
                        </div>
                        <div className="text-xs text-slate-500">
                            Based on 677 responses
                        </div>
                    </div>

                    {/* Escalations */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-600">
                                    Escalations
                                </span>
                            </div>
                            <span className="text-xs text-red-600">+5</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 mb-2">
                            158
                        </div>
                        <div className="text-xs text-slate-500">
                            12.7% of total calls
                        </div>
                    </div>

                    {/* Fall-outs metric card */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-600">
                                    Fall-outs
                                </span>
                            </div>
                            <span className="text-xs text-red-600">+3</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 mb-2">
                            87
                        </div>
                        <div className="text-xs text-slate-500">
                            7.0% failed handovers
                        </div>
                    </div>

                    {/* Top Performer */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Car className="h-4 w-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-600">
                                    Top Model
                                </span>
                            </div>
                            <span className="text-xs text-green-600">
                                NPS 8.6
                            </span>
                        </div>
                        <div className="text-lg font-bold text-slate-800 mb-1">
                            Silverado
                        </div>
                        <div className="text-xs text-slate-500">
                            145 calls this week
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
                    {/* Escalation Reasons */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-4">
                            Escalation Reasons
                        </h4>
                        <div className="space-y-3">
                            {telemetryData.escalationReasons.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            ></div>
                                            <span className="text-xs text-slate-600">
                                                {item.reason}
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-slate-800">
                                            {item.count}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Fall-outs Trend Chart */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-4">
                            Fall-outs Trend
                        </h4>
                        <div className="h-24 mb-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={telemetryData.fallouts.trend}>
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={{
                                            fill: "#ef4444",
                                            strokeWidth: 0,
                                            r: 3,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="text-xs text-slate-500">
                            Daily failed handovers
                        </div>
                    </div>

                    {/* Fall-out Reason Codes */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-4">
                            Fall-out Reasons
                        </h4>
                        <div className="space-y-2">
                            {telemetryData.fallouts.reasonCodes
                                .slice(0, 4)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            ></div>
                                            <span className="text-xs text-slate-600">
                                                {item.reason}
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-slate-800">
                                            {item.count}
                                        </span>
                                    </div>
                                ))}
                            <div className="text-xs text-slate-400 pt-1">
                                +2 more reasons
                            </div>
                        </div>
                    </div>

                    {/* NPS by Enquiry Type */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-4">
                            NPS by Enquiry Type
                        </h4>
                        <div className="space-y-3">
                            {telemetryData.npsData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-xs text-slate-600">
                                        {item.category}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{
                                                    width: `${
                                                        (item.score / 10) * 100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-800 w-8">
                                            {item.score}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Brand Performance */}
                    <div className="border border-slate-100 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-4">
                            Brand Performance
                        </h4>
                        <div className="space-y-3">
                            {telemetryData.brandPerformance.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="text-xs font-medium text-slate-700">
                                                {item.brand}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {item.calls} calls
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs font-medium text-slate-800">
                                                {item.nps}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                NPS
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Existing analytics charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {analyticsData.map((chart, index) => (
                    <div
                        key={index}
                        className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                                    {chart.title}
                                </h3>
                                <div
                                    className={`text-sm font-bold px-2 py-1 rounded-full ${
                                        chart.trend.startsWith("+")
                                            ? "text-emerald-600 bg-emerald-50"
                                            : "text-red-600 bg-red-50"
                                    }`}
                                >
                                    {chart.trend}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-3xl font-bold text-slate-800 mb-1">
                                    {chart.percentage}%
                                </div>
                                <div className="text-sm text-slate-600">
                                    {chart.description}
                                </div>
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
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={chart.data}
                                            margin={{
                                                top: 20,
                                                right: 20,
                                                left: 20,
                                                bottom: 20,
                                            }}
                                        >
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fontSize: 12,
                                                    fill: "#64748b",
                                                    fontWeight: 500,
                                                }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#94a3b8",
                                                }}
                                            />
                                            <ChartTooltip
                                                content={({
                                                    active,
                                                    payload,
                                                    label,
                                                }) => {
                                                    if (
                                                        active &&
                                                        payload &&
                                                        payload.length
                                                    ) {
                                                        return (
                                                            <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                                                                <p className="font-semibold text-slate-800">
                                                                    {label}
                                                                </p>
                                                                <p className="text-slate-600">
                                                                    Value:{" "}
                                                                    {payload[0].value?.toLocaleString()}
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                                cursor={{
                                                    fill: "rgba(59, 130, 246, 0.1)",
                                                }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                radius={[6, 6, 0, 0]}
                                                maxBarSize={60}
                                            >
                                                {chart.data.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.color}
                                                        />
                                                    )
                                                )}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center space-x-4">
                                    {chart.data.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center space-x-2"
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            ></div>
                                            <span className="text-slate-600 font-medium">
                                                {item.name}:{" "}
                                                {item.value.toLocaleString()}
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
    );
}
