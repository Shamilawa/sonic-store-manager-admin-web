"use client"

import { useState } from "react"
import DashboardAnalytics from "./dashboard-analytics"
import CallHistoryTable from "./call-history-table"
import ConfigurationPanel from "./configuration-panel"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-800 tracking-wide">
            <span className="text-blue-600">Chevy</span> <span className="text-slate-400">&gt;</span> New York
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-800">Andy</div>
            <div className="text-xs text-emerald-600 font-medium">Store Manager</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="px-6">
          <div className="flex space-x-8">
            {["Dashboard", "Call History", "Configurations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600 bg-blue-50/50"
                    : "border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "Dashboard" && <DashboardAnalytics />}
        {activeTab === "Call History" && <CallHistoryTable />}
        {activeTab === "Configurations" && <ConfigurationPanel />}
      </main>
    </div>
  )
}
