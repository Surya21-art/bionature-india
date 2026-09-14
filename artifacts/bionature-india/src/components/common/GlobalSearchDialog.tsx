import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, X, Sprout, ShieldAlert, BookOpen, ArrowRight } from "lucide-react";
import { PRODUCTS, CROPS, PROBLEMS, BLOG_POSTS } from "@/data/bionature-data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GlobalSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GlobalSearchDialog: React.FC<GlobalSearchDialogProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  const q = query.trim().toLowerCase();

  const matchingProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.suitableCrops.some((c) => c.toLowerCase().includes(q)) ||
          p.targetProblems.some((pr) => pr.toLowerCase().includes(q))
      ).slice(0, 5)
    : [];

  const matchingCrops = q
    ? CROPS.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const matchingProblems = q
    ? PROBLEMS.filter((pr) => pr.name.toLowerCase().includes(q) || pr.description.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const matchingBlogs = q
    ? BLOG_POSTS.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const totalResults = matchingProducts.length + matchingCrops.length + matchingProblems.length + matchingBlogs.length;

  const handleSelect = (url: string) => {
    onOpenChange(false);
    setQuery("");
    setLocation(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (q) {
      handleSelect(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white text-slate-900 border-emerald-200 shadow-2xl">
        <DialogTitle className="sr-only">Search BioNature India</DialogTitle>
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, crops (e.g. Tomato), problems (e.g. yellow leaves), guides..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <Sprout className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-60" />
              <p>Type keywords to discover products, crop management schedules, or disease solutions.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="text-slate-500 font-medium">Try searching:</span>
                {["Tomato", "Bio-NPK", "Root Rot", "Thrips", "Flower Drop", "Basmati"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              <p>No agricultural products or solutions matched &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-slate-400 mt-1">Try another term or contact our agronomy helpline.</p>
            </div>
          )}

          {/* Products Group */}
          {matchingProducts.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                Products ({matchingProducts.length})
              </div>
              <div className="space-y-1">
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/products/${p.slug}`)}
                    className="p-2.5 rounded-lg hover:bg-emerald-50/70 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{p.shortDescription}</div>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      {p.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Crops Group */}
          {matchingCrops.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                Crops & Stage Schedules ({matchingCrops.length})
              </div>
              <div className="space-y-1">
                {matchingCrops.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/solutions/crops/${c.slug}`)}
                    className="p-2.5 rounded-lg hover:bg-emerald-50/70 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                        {c.name} Solution Guide
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{c.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problems Group */}
          {matchingProblems.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                Crop Problems & Diagnosis ({matchingProblems.length})
              </div>
              <div className="space-y-1">
                {matchingProblems.map((pr) => (
                  <div
                    key={pr.id}
                    onClick={() => handleSelect(`/solutions/problems/${pr.slug}`)}
                    className="p-2.5 rounded-lg hover:bg-amber-50/60 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-800">
                        {pr.name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{pr.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Group */}
          {matchingBlogs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Agri Knowledge Articles ({matchingBlogs.length})
              </div>
              <div className="space-y-1">
                {matchingBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleSelect(`/blog/${b.slug}`)}
                    className="p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                        {b.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{b.excerpt}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
