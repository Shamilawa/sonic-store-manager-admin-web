"use client";

import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    MapPin,
    Search,
    Building2,
} from "lucide-react";

interface Branch {
    id: string;
    name: string;
    location: string;
}

interface Brand {
    id: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    branches: Branch[];
}

interface SidebarNavigationProps {
    onBranchSelect: (brand: string, branch: string) => void;
    selectedBrand: string;
    selectedBranch: string;
}

const brandsData: Brand[] = [
    {
        id: "chevy",
        name: "Chevrolet",
        icon: Building2,
        branches: [
            { id: "ny", name: "New York", location: "Manhattan" },
            { id: "la", name: "Los Angeles", location: "Downtown" },
            { id: "chicago", name: "Chicago", location: "Loop" },
        ],
    },
    {
        id: "ford",
        name: "Ford",
        icon: Building2,
        branches: [
            { id: "miami", name: "Miami", location: "South Beach" },
            { id: "dallas", name: "Dallas", location: "Downtown" },
            { id: "seattle", name: "Seattle", location: "Capitol Hill" },
        ],
    },
    {
        id: "toyota",
        name: "Toyota",
        icon: Building2,
        branches: [
            { id: "boston", name: "Boston", location: "Back Bay" },
            { id: "denver", name: "Denver", location: "LoDo" },
            { id: "phoenix", name: "Phoenix", location: "Central" },
        ],
    },
    {
        id: "honda",
        name: "Honda",
        icon: Building2,
        branches: [
            { id: "atlanta", name: "Atlanta", location: "Midtown" },
            { id: "portland", name: "Portland", location: "Pearl District" },
            { id: "austin", name: "Austin", location: "Downtown" },
        ],
    },
];

export default function SidebarNavigation({
    onBranchSelect,
    selectedBrand,
    selectedBranch,
}: SidebarNavigationProps) {
    const [expandedBrands, setExpandedBrands] = useState<string[]>(["chevy"]);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleBrand = (brandId: string) => {
        setExpandedBrands((prev) =>
            prev.includes(brandId)
                ? prev.filter((id) => id !== brandId)
                : [...prev, brandId]
        );
    };

    const handleBranchSelect = (brandName: string, branchName: string) => {
        onBranchSelect(brandName, branchName);
    };

    const filteredBrands = brandsData
        .map((brand) => ({
            ...brand,
            branches: brand.branches.filter(
                (branch) =>
                    branch.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    branch.location
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter(
            (brand) =>
                brand.branches.length > 0 ||
                brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="w-72 bg-white border-r border-slate-200 h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-200 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold text-slate-800">
                            Sonic
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Dealership Management
                        </p>
                    </div>
                </div>
            </div>

            {/* Search bar */}
            <div className="p-4 border-b border-slate-100 flex-shrink-0">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search brands or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
                {/* Current selection indicator */}
                {selectedBrand && selectedBranch && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                            Current Location
                        </div>
                        <div className="text-sm font-semibold text-blue-800">
                            {selectedBrand}
                        </div>
                        <div className="text-xs text-blue-600">
                            {selectedBranch}
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {filteredBrands.map((brand) => (
                        <div key={brand.id} className="space-y-1">
                            {/* Brand Header */}
                            <button
                                onClick={() => toggleBrand(brand.id)}
                                className={`w-full flex items-center justify-between py-2 px-1 text-left transition-all duration-150 group cursor-pointer ${
                                    selectedBrand === brand.name
                                        ? "text-blue-600"
                                        : "text-slate-700 hover:text-blue-600"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Building2
                                        className={`w-4 h-4 transition-colors ${
                                            selectedBrand === brand.name
                                                ? "text-blue-600"
                                                : "text-slate-500 group-hover:text-blue-500"
                                        }`}
                                    />
                                    <div>
                                        <span className="font-medium text-sm group-hover:underline underline-offset-2">
                                            {brand.name}
                                        </span>
                                        <div className="text-xs text-slate-500">
                                            {brand.branches.length} locations
                                        </div>
                                    </div>
                                </div>
                                {expandedBrands.includes(brand.id) ? (
                                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-all" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-all" />
                                )}
                            </button>

                            {/* Branches */}
                            {expandedBrands.includes(brand.id) && (
                                <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                    {brand.branches.map((branch) => (
                                        <button
                                            key={branch.id}
                                            onClick={() =>
                                                handleBranchSelect(
                                                    brand.name,
                                                    branch.name
                                                )
                                            }
                                            className={`w-full flex items-center space-x-3 py-2 px-1 text-left transition-all duration-150 group cursor-pointer ${
                                                selectedBrand === brand.name &&
                                                selectedBranch === branch.name
                                                    ? "text-blue-600 bg-blue-50/50 border-l-2 border-blue-500 pl-3"
                                                    : "text-slate-600 hover:text-blue-600 hover:pl-2"
                                            }`}
                                        >
                                            <MapPin
                                                className={`w-3 h-3 flex-shrink-0 transition-colors ${
                                                    selectedBrand ===
                                                        brand.name &&
                                                    selectedBranch ===
                                                        branch.name
                                                        ? "text-blue-600"
                                                        : "text-slate-400 group-hover:text-blue-500"
                                                }`}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div
                                                    className={`text-sm font-medium truncate transition-all ${
                                                        selectedBrand ===
                                                            brand.name &&
                                                        selectedBranch ===
                                                            branch.name
                                                            ? ""
                                                            : "group-hover:underline underline-offset-2"
                                                    }`}
                                                >
                                                    {branch.name}
                                                </div>
                                                <div className="text-xs text-slate-500 truncate">
                                                    {branch.location}
                                                </div>
                                            </div>
                                            {selectedBrand === brand.name &&
                                                selectedBranch ===
                                                    branch.name && (
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {searchTerm && filteredBrands.length === 0 && (
                    <div className="text-center py-8">
                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">
                            No locations found
                        </p>
                        <p className="text-xs text-slate-400">
                            Try a different search term
                        </p>
                    </div>
                )}
            </nav>
        </div>
    );
}
