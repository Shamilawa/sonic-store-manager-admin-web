"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const initialStoreHours = days.reduce(
  (acc, day) => {
    acc[day] = { from: "", to: "" }
    return acc
  },
  {} as Record<string, { from: string; to: string }>,
)

const initialTransferIntents = ["Need to speak to user", "Live agent", "Agent"]

const initialRedirections = [
  { label: "Lease, Finance", phone: "(555) 123 456" },
  { label: "Parts", phone: "(555) 123 567" },
]

export default function ConfigurationPanel() {
  const [storeHours, setStoreHours] = useState(initialStoreHours)
  const [language, setLanguage] = useState("english")
  const [voice, setVoice] = useState("male")
  const [transferIntents, setTransferIntents] = useState(initialTransferIntents)
  const [redirections, setRedirections] = useState(initialRedirections)

  const [isRedirectionModalOpen, setIsRedirectionModalOpen] = useState(false)
  const [isTransferIntentModalOpen, setIsTransferIntentModalOpen] = useState(false)
  const [newRedirection, setNewRedirection] = useState({ label: "", phone: "" })
  const [newTransferIntent, setNewTransferIntent] = useState("")

  const updateStoreHours = (day: string, field: "from" | "to", value: string) => {
    setStoreHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const handleAddRedirection = () => {
    if (newRedirection.label && newRedirection.phone) {
      setRedirections((prev) => [...prev, newRedirection])
      setNewRedirection({ label: "", phone: "" })
      setIsRedirectionModalOpen(false)
    }
  }

  const handleAddTransferIntent = () => {
    if (newTransferIntent.trim()) {
      setTransferIntents((prev) => [...prev, newTransferIntent.trim()])
      setNewTransferIntent("")
      setIsTransferIntentModalOpen(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Store Hours Panel */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
            Store Hours
          </h3>
          <div className="space-y-4">
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50/80 transition-colors border border-slate-100"
              >
                <div className="w-24 text-sm font-semibold text-slate-700">{day}</div>
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-slate-500 font-medium mb-1">From</label>
                    <Input
                      type="time"
                      value={storeHours[day].from}
                      onChange={(e) => updateStoreHours(day, "from", e.target.value)}
                      className="w-28 h-9 text-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                  <div className="text-slate-400 mt-6">—</div>
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-slate-500 font-medium mb-1">To</label>
                    <Input
                      type="time"
                      value={storeHours[day].to}
                      onChange={(e) => updateStoreHours(day, "to", e.target.value)}
                      className="w-28 h-9 text-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Settings and Other Settings Panel */}
      <div className="space-y-6">
        {/* Voice Settings */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full mr-3"></div>
              Voice Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Voice</label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger className="w-full border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Other Settings */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full mr-3"></div>
              Other Settings
            </h3>
            <div className="h-32 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center hover:border-amber-300 transition-colors">
              <span className="text-slate-500 text-sm font-medium">Additional settings panel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transfer Intents and Redirections Panel */}
      <div className="space-y-6">
        {/* Live Transfer Intents */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-3"></div>
              Live Transfer Intents
            </h3>
            <div className="space-y-2">
              {transferIntents.map((intent, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 text-sm text-slate-700 text-center font-medium hover:from-indigo-100 hover:to-blue-100 transition-colors"
                >
                  {intent}
                </div>
              ))}
              <Dialog open={isTransferIntentModalOpen} onOpenChange={setIsTransferIntentModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 h-10 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-colors bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Live Transfer Intent</DialogTitle>
                    <DialogDescription>Add a new intent that will trigger a live agent transfer.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="intent" className="text-right">
                        Intent
                      </Label>
                      <Input
                        id="intent"
                        value={newTransferIntent}
                        onChange={(e) => setNewTransferIntent(e.target.value)}
                        placeholder="e.g., Speak to sales manager"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsTransferIntentModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddTransferIntent}>
                      Add Intent
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Redirections */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full mr-3"></div>
              Redirections
            </h3>
            <div className="space-y-2">
              {redirections.map((redirect, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-2 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100 hover:from-teal-100 hover:to-cyan-100 transition-colors"
                >
                  <div className="text-sm font-semibold text-slate-700">{redirect.label}</div>
                  <div className="text-sm text-teal-600 text-right font-mono">{redirect.phone}</div>
                </div>
              ))}
              <Dialog open={isRedirectionModalOpen} onOpenChange={setIsRedirectionModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 h-10 border-dashed border-teal-300 text-teal-600 hover:bg-teal-50 hover:border-teal-400 transition-colors bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Redirection</DialogTitle>
                    <DialogDescription>
                      Add a new redirection with a name and phone number for call routing.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newRedirection.label}
                        onChange={(e) => setNewRedirection((prev) => ({ ...prev, label: e.target.value }))}
                        placeholder="e.g., Service Department"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={newRedirection.phone}
                        onChange={(e) => setNewRedirection((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="(555) 123-4567"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsRedirectionModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddRedirection}>
                      Add Redirection
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
