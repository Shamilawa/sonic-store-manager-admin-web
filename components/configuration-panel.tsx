"use client";

import { useState } from "react";
import {
    Plus,
    Clock,
    Settings,
    Phone,
    Users,
    Save,
    RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const initialStoreHours = days.reduce((acc, day) => {
    acc[day] = { from: "09:00", to: "18:00" };
    return acc;
}, {} as Record<string, { from: string; to: string }>);

const initialTransferIntents = ["Need to speak to user", "Live agent", "Agent"];

const initialRedirections = [
    { label: "Lease, Finance", phone: "(555) 123 456" },
    { label: "Parts", phone: "(555) 123 567" },
];

export default function ConfigurationPanel() {
    const [activeTab, setActiveTab] = useState("hours");
    const [storeHours, setStoreHours] = useState(initialStoreHours);
    const [language, setLanguage] = useState("english");
    const [voice, setVoice] = useState("male");
    const [transferIntents, setTransferIntents] = useState(
        initialTransferIntents
    );
    const [redirections, setRedirections] = useState(initialRedirections);

    const [isRedirectionModalOpen, setIsRedirectionModalOpen] = useState(false);
    const [isTransferIntentModalOpen, setIsTransferIntentModalOpen] =
        useState(false);
    const [newRedirection, setNewRedirection] = useState({
        label: "",
        phone: "",
    });
    const [newTransferIntent, setNewTransferIntent] = useState("");

    const updateStoreHours = (
        day: string,
        field: "from" | "to",
        value: string
    ) => {
        setStoreHours((prev) => ({
            ...prev,
            [day]: { ...prev[day], [field]: value },
        }));
    };

    const handleAddRedirection = () => {
        if (newRedirection.label && newRedirection.phone) {
            setRedirections((prev) => [...prev, newRedirection]);
            setNewRedirection({ label: "", phone: "" });
            setIsRedirectionModalOpen(false);
        }
    };

    const handleAddTransferIntent = () => {
        if (newTransferIntent.trim()) {
            setTransferIntents((prev) => [...prev, newTransferIntent.trim()]);
            setNewTransferIntent("");
            setIsTransferIntentModalOpen(false);
        }
    };

    const copyHoursToAll = (sourceDay: string) => {
        const sourceHours = storeHours[sourceDay];
        const updatedHours = days.reduce((acc, day) => {
            acc[day] = { ...sourceHours };
            return acc;
        }, {} as Record<string, { from: string; to: string }>);
        setStoreHours(updatedHours);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Configuration Settings
                    </h2>
                    <p className="text-slate-600 mt-1">
                        Manage your store settings, voice preferences, and call
                        routing
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        <Save className="h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
            >
                <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 bg-slate-100 p-1 rounded-xl">
                    <TabsTrigger
                        value="hours"
                        className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                        <Clock className="h-4 w-4" />
                        Store Hours
                    </TabsTrigger>
                    <TabsTrigger
                        value="voice"
                        className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                        <Settings className="h-4 w-4" />
                        Voice Settings
                    </TabsTrigger>
                    <TabsTrigger
                        value="transfers"
                        className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                        <Users className="h-4 w-4" />
                        Live Transfers
                    </TabsTrigger>
                    <TabsTrigger
                        value="redirections"
                        className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                        <Phone className="h-4 w-4" />
                        Redirections
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="hours" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                </div>
                                Store Operating Hours
                            </CardTitle>
                            <CardDescription>
                                Set your store&apos;s operating hours for each
                                day of the week. These hours will be used for
                                automated responses.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                    <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-700">
                                        <div>Day</div>
                                        <div>Opening Time</div>
                                        <div>Closing Time</div>
                                        <div>Actions</div>
                                    </div>
                                    {days.map((day, index) => (
                                        <div
                                            key={day}
                                            className={`grid grid-cols-4 gap-4 p-4 items-center hover:bg-slate-50/50 transition-colors ${
                                                index !== days.length - 1
                                                    ? "border-b border-slate-100"
                                                    : ""
                                            }`}
                                        >
                                            <div className="font-medium text-slate-900">
                                                {day}
                                            </div>
                                            <Input
                                                type="time"
                                                value={storeHours[day].from}
                                                onChange={(e) =>
                                                    updateStoreHours(
                                                        day,
                                                        "from",
                                                        e.target.value
                                                    )
                                                }
                                                className="h-9 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                                            />
                                            <Input
                                                type="time"
                                                value={storeHours[day].to}
                                                onChange={(e) =>
                                                    updateStoreHours(
                                                        day,
                                                        "to",
                                                        e.target.value
                                                    )
                                                }
                                                className="h-9 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    copyHoursToAll(day)
                                                }
                                                className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                Copy to all
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="voice" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <Settings className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    Voice Configuration
                                </CardTitle>
                                <CardDescription>
                                    Configure the voice settings for your AI
                                    assistant
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Language
                                    </Label>
                                    <Select
                                        value={language}
                                        onValueChange={setLanguage}
                                    >
                                        <SelectTrigger className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">
                                                🇺🇸 English
                                            </SelectItem>
                                            <SelectItem value="spanish">
                                                🇪🇸 Spanish
                                            </SelectItem>
                                            <SelectItem value="french">
                                                🇫🇷 French
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                                        Voice Type
                                    </Label>
                                    <Select
                                        value={voice}
                                        onValueChange={setVoice}
                                    >
                                        <SelectTrigger className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20">
                                            <SelectValue placeholder="Select voice" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">
                                                Male Voice
                                            </SelectItem>
                                            <SelectItem value="female">
                                                Female Voice
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <Settings className="h-5 w-5 text-amber-600" />
                                    </div>
                                    Advanced Settings
                                </CardTitle>
                                <CardDescription>
                                    Additional voice and behavior configurations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                        <p className="text-sm text-amber-800 font-medium">
                                            Coming Soon
                                        </p>
                                        <p className="text-xs text-amber-600 mt-1">
                                            Advanced voice customization options
                                            will be available in the next
                                            update.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="transfers" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Users className="h-5 w-5 text-indigo-600" />
                                </div>
                                Live Transfer Intents
                                <Badge variant="secondary" className="ml-auto">
                                    {transferIntents.length} intents
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Configure phrases that will trigger a transfer
                                to a live agent
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {transferIntents.map((intent, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:from-indigo-100 hover:to-blue-100 transition-colors group"
                                    >
                                        <span className="text-sm font-medium text-slate-700">
                                            {intent}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Dialog
                                    open={isTransferIntentModalOpen}
                                    onOpenChange={setIsTransferIntentModalOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="mt-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-colors bg-transparent"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add New Intent
                                        </Button>
                                    </DialogTrigger>
                                    {/* ... existing modal content ... */}
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Add Live Transfer Intent
                                            </DialogTitle>
                                            <DialogDescription>
                                                Add a new intent that will
                                                trigger a live agent transfer.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="intent"
                                                    className="text-right"
                                                >
                                                    Intent
                                                </Label>
                                                <Input
                                                    id="intent"
                                                    value={newTransferIntent}
                                                    onChange={(e) =>
                                                        setNewTransferIntent(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g., Speak to sales manager"
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsTransferIntentModalOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                onClick={
                                                    handleAddTransferIntent
                                                }
                                            >
                                                Add Intent
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="redirections" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-teal-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-teal-100 rounded-lg">
                                    <Phone className="h-5 w-5 text-teal-600" />
                                </div>
                                Call Redirections
                                <Badge variant="secondary" className="ml-auto">
                                    {redirections.length} redirections
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Set up phone numbers for different departments
                                or services
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {redirections.map((redirect, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100 hover:from-teal-100 hover:to-cyan-100 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <div className="font-semibold text-slate-900">
                                                    {redirect.label}
                                                </div>
                                                <div className="text-sm text-teal-600 font-mono">
                                                    {redirect.phone}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}

                                <Dialog
                                    open={isRedirectionModalOpen}
                                    onOpenChange={setIsRedirectionModalOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="mt-2 border-dashed border-teal-300 text-teal-600 hover:bg-teal-50 hover:border-teal-400 transition-colors bg-transparent"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add New Redirection
                                        </Button>
                                    </DialogTrigger>
                                    {/* ... existing modal content ... */}
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Add Redirection
                                            </DialogTitle>
                                            <DialogDescription>
                                                Add a new redirection with a
                                                name and phone number for call
                                                routing.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="name"
                                                    className="text-right"
                                                >
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={newRedirection.label}
                                                    onChange={(e) =>
                                                        setNewRedirection(
                                                            (prev) => ({
                                                                ...prev,
                                                                label: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    placeholder="e.g., Service Department"
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="phone"
                                                    className="text-right"
                                                >
                                                    Phone
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    value={newRedirection.phone}
                                                    onChange={(e) =>
                                                        setNewRedirection(
                                                            (prev) => ({
                                                                ...prev,
                                                                phone: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    placeholder="(555) 123-4567"
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsRedirectionModalOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                onClick={handleAddRedirection}
                                            >
                                                Add Redirection
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
