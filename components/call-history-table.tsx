"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  Filter,
  Phone,
  Clock,
  User,
  Headphones,
  FileText,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const callHistoryData = [
  {
    id: 1,
    time: "2025-08-20 15:33",
    phoneNumber: "(380) 257 8476",
    firstName: "Jason",
    callDuration: "07:03 minutes",
    liveAgentTransfer: "Y",
    abandoned: "N",
    eLead: "Y",
    conversationSummary:
      "Customer inquired about the new Chevy Silverado pricing and financing options. Discussed trade-in value for their current vehicle. Showed interest in scheduling a test drive for this weekend. Agent provided detailed information about current promotions and warranty coverage.",
  },
  {
    id: 2,
    time: "2025-08-20 15:28",
    phoneNumber: "(555) 123 4567",
    firstName: "Sarah",
    callDuration: "04:15 minutes",
    liveAgentTransfer: "N",
    abandoned: "N",
    eLead: "Y",
    conversationSummary:
      "Customer called regarding service appointment scheduling. Needed oil change and tire rotation. Successfully scheduled appointment for next Tuesday at 10 AM. Provided service department contact information.",
  },
  {
    id: 3,
    time: "2025-08-20 15:22",
    phoneNumber: "(312) 987 6543",
    firstName: "Michael",
    callDuration: "02:45 minutes",
    liveAgentTransfer: "Y",
    abandoned: "Y",
    eLead: "N",
    conversationSummary:
      "Customer called about parts availability for 2019 Chevy Malibu. Call was transferred to parts department but customer hung up before connection was established.",
  },
  {
    id: 4,
    time: "2025-08-20 15:18",
    phoneNumber: "(847) 555 0123",
    firstName: "Emma",
    callDuration: "09:22 minutes",
    liveAgentTransfer: "Y",
    abandoned: "N",
    eLead: "Y",
    conversationSummary:
      "Detailed discussion about leasing options for Chevy Equinox. Customer compared different trim levels and financing packages. Scheduled in-person appointment for Thursday to finalize lease agreement. High-quality lead with strong purchase intent.",
  },
  {
    id: 5,
    time: "2025-08-20 15:12",
    phoneNumber: "(630) 444 7890",
    firstName: "David",
    callDuration: "01:33 minutes",
    liveAgentTransfer: "N",
    abandoned: "N",
    eLead: "N",
    conversationSummary:
      "Quick inquiry about store hours and location. Customer was looking for directions to the dealership. Provided address and parking information.",
  },
]

export default function CallHistoryTable() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [callHistoryFilters, setCallHistoryFilters] = useState({
    dateFrom: "",
    dateTo: "",
    phoneNumber: "",
    firstName: "",
    liveAgentTransfer: "",
    abandoned: "",
    eLead: "",
  })

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {/* Filters section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-slate-600" />
          <h3 className="text-lg font-bold text-slate-800">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date From</label>
            <Input
              type="date"
              value={callHistoryFilters.dateFrom}
              onChange={(e) => setCallHistoryFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date To</label>
            <Input
              type="date"
              value={callHistoryFilters.dateTo}
              onChange={(e) => setCallHistoryFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <Input
              placeholder="Search phone..."
              value={callHistoryFilters.phoneNumber}
              onChange={(e) => setCallHistoryFilters((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
            <Input
              placeholder="Search name..."
              value={callHistoryFilters.firstName}
              onChange={(e) => setCallHistoryFilters((prev) => ({ ...prev, firstName: e.target.value }))}
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Live Agent</label>
            <Select
              value={callHistoryFilters.liveAgentTransfer}
              onValueChange={(value) => setCallHistoryFilters((prev) => ({ ...prev, liveAgentTransfer: value }))}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Abandoned</label>
            <Select
              value={callHistoryFilters.abandoned}
              onValueChange={(value) => setCallHistoryFilters((prev) => ({ ...prev, abandoned: value }))}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">eLead</label>
            <Select
              value={callHistoryFilters.eLead}
              onValueChange={(value) => setCallHistoryFilters((prev) => ({ ...prev, eLead: value }))}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Y">Yes</SelectItem>
                <SelectItem value="N">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Call history table */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800 w-8"></th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Time</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Phone Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">First Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Call Duration</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">Live Agent Transfer</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">Abandoned</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">eLead</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-800">...</th>
              </tr>
            </thead>
            <tbody>
              {callHistoryData.map((call, index) => (
                <>
                  <tr
                    key={call.id}
                    className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer ${
                      expandedRow === call.id ? "bg-blue-50/30" : index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                    }`}
                    onClick={() => toggleRowExpansion(call.id)}
                  >
                    <td className="px-6 py-4">
                      {expandedRow === call.id ? (
                        <ChevronDown className="h-4 w-4 text-slate-600" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-600" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">{call.time}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-mono">{call.phoneNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">{call.firstName}</td>
                    <td className="px-6 py-4 text-sm text-slate-800">{call.callDuration}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          call.liveAgentTransfer === "Y"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {call.liveAgentTransfer}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          call.abandoned === "Y" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {call.abandoned}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          call.eLead === "Y" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {call.eLead}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-400">•••</td>
                  </tr>

                  {expandedRow === call.id && (
                    <tr className="bg-gradient-to-r from-blue-50/50 to-slate-50/50 border-b border-slate-200">
                      <td colSpan={9} className="px-6 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                          {/* Left side - Call Metadata */}
                          <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-blue-600" />
                                Call Details
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 font-medium">Duration</span>
                                  <div className="flex items-center text-xs font-semibold text-slate-800">
                                    <Clock className="h-3 w-3 mr-1 text-emerald-600" />
                                    {call.callDuration}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 font-medium">Caller</span>
                                  <div className="flex items-center text-xs font-semibold text-slate-800">
                                    <User className="h-3 w-3 mr-1 text-blue-600" />
                                    {call.firstName}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 font-medium">Phone</span>
                                  <span className="text-xs font-mono text-slate-800">{call.phoneNumber}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status Indicators */}
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                                <TrendingUp className="h-4 w-4 mr-2 text-emerald-600" />
                                Call Status
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 font-medium">Agent Transfer</span>
                                  <div className="flex items-center">
                                    {call.liveAgentTransfer === "Y" ? (
                                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-slate-400" />
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 font-medium">Abandoned</span>
                                  <div className="flex items-center">
                                    {call.abandoned === "Y" ? (
                                      <AlertCircle className="h-4 w-4 text-red-500" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 font-medium">eLead Generated</span>
                                  <div className="flex items-center">
                                    {call.eLead === "Y" ? (
                                      <CheckCircle className="h-4 w-4 text-blue-600" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-slate-400" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Center - Action buttons */}
                          <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                                <Headphones className="h-4 w-4 mr-2 text-purple-600" />
                                Audio Controls
                              </h4>
                              <div className="space-y-3">
                                <Button
                                  variant="outline"
                                  className="w-full h-12 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200 group"
                                >
                                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full mr-3 group-hover:bg-blue-700 transition-colors">
                                    <Play className="h-4 w-4 text-white fill-white" />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-sm font-bold">Call Recording</div>
                                    <div className="text-xs text-blue-600">Full conversation</div>
                                  </div>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full h-12 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border-emerald-200 text-emerald-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200 group"
                                >
                                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 rounded-full mr-3 group-hover:bg-emerald-700 transition-colors">
                                    <Headphones className="h-4 w-4 text-white" />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-sm font-bold">Audio Synopsis</div>
                                    <div className="text-xs text-emerald-600">AI-generated summary</div>
                                  </div>
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Right side - Conversation Summary */}
                          <div className="lg:col-span-3">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                              <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 px-6 py-4 border-b border-slate-200">
                                <h4 className="text-lg font-bold text-slate-800 flex items-center">
                                  <FileText className="h-5 w-5 mr-3 text-blue-600" />
                                  Conversation Summary
                                  <div className="ml-auto flex items-center space-x-2">
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                      AI Generated
                                    </span>
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                                      Confidence: 94%
                                    </span>
                                  </div>
                                </h4>
                              </div>
                              <div className="p-6">
                                <div className="prose prose-sm max-w-none">
                                  <p className="text-slate-700 leading-relaxed mb-4">{call.conversationSummary}</p>

                                  {/* Key Insights */}
                                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                      <div className="flex items-center mb-2">
                                        <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                                        <span className="text-sm font-bold text-blue-800">Intent</span>
                                      </div>
                                      <p className="text-xs text-blue-700">Vehicle Purchase Inquiry</p>
                                    </div>
                                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                      <div className="flex items-center mb-2">
                                        <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                                        <span className="text-sm font-bold text-emerald-800">Outcome</span>
                                      </div>
                                      <p className="text-xs text-emerald-700">Test Drive Scheduled</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                                      <div className="flex items-center mb-2">
                                        <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                                        <span className="text-sm font-bold text-amber-800">Priority</span>
                                      </div>
                                      <p className="text-xs text-amber-700">High Value Lead</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
