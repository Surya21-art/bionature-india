import React, { useState, useMemo } from "react";
import { useSearch } from "wouter";
import {
  Search,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  Sprout,
  Check,
} from "lucide-react";
import { CATEGORIES, CROPS, PROBLEMS, Product } from "@/data/bionature-data";
import { useBioNatureStore } from "@/services/store";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ProductsProps {
  onEnquire: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ onEnquire }) => {
  const { products } = useBioNatureStore();
  const searchParams = new URLSearchParams(useSearch());
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [selectedProblem, setSelectedProblem] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchCrop = p.suitableCrops.some((c) => c.toLowerCase().includes(q));
          const matchProb = p.targetProblems.some((pr) => pr.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCrop && !matchProb) return false;
        }

        // Category
        if (selectedCategory !== "all") {
          if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        // Crop
        if (selectedCrop !== "all") {
          if (!p.suitableCrops.includes(selectedCrop)) return false;
        }

        // Problem
        if (selectedProblem !== "all") {
          if (!p.targetProblems.includes(selectedProblem)) return false;
        }

        return p.published;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        // Featured default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, selectedCrop, selectedProblem, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCrop("all");
    setSelectedProblem("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedCrop !== "all" ||
    selectedProblem !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <Badge className="bg-emerald-800 text-emerald-300 border-0 mb-1">
            BioNature Product Portfolio
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
            Biological Fertilizers & Plant Solutions
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Filter our certified bio-fertilizers, biological fungicides, organic neem pesticides, and seaweed extracts by category, crop type, or target agricultural problem.
          </p>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-600" />
                Filter Catalog
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>All Categories</span>
                  <span>({products.length})</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === cat.name
                          ? "bg-emerald-50 text-emerald-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[10px] text-slate-400">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Crop Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Target Crop
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
              >
                <option value="all">All Crops</option>
                {CROPS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Problem Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Agricultural Problem
              </label>
              <select
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
              >
                <option value="all">All Problems</option>
                {PROBLEMS.map((pr) => (
                  <option key={pr.id} value={pr.category}>
                    {pr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Controls: Search Bar & Sort Dropdown */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, crop..."
                className="pl-9 text-xs h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden text-xs text-slate-700"
              >
                <Filter className="w-3.5 h-3.5 mr-1" />
                Filters
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs">
              <span className="font-semibold text-emerald-900">Active Filters:</span>

              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-white text-emerald-800 border">
                  Category: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}

              {selectedCrop !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-white text-emerald-800 border">
                  Crop: {selectedCrop}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCrop("all")} />
                </Badge>
              )}

              {selectedProblem !== "all" && (
                <Badge variant="secondary" className="gap-1 bg-white text-emerald-800 border">
                  Problem: {selectedProblem}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedProblem("all")} />
                </Badge>
              )}

              {searchQuery && (
                <Badge variant="secondary" className="gap-1 bg-white text-emerald-800 border">
                  &ldquo;{searchQuery}&rdquo;
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs text-red-600 hover:underline font-medium ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onEnquire={onEnquire} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Sprout className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No products match your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Try widening your selection or resetting filters to browse our full biological input catalog.
              </p>
              <Button onClick={handleResetFilters} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
