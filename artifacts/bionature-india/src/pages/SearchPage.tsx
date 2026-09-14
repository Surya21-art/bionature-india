import React, { useState } from "react";
import { useSearch, Link } from "wouter";
import { Search, Sprout, ShieldAlert, BookOpen, ArrowRight } from "lucide-react";
import { PRODUCTS, CROPS, PROBLEMS, BLOG_POSTS, Product } from "@/data/bionature-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchPageProps {
  onEnquire: (product: Product) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onEnquire }) => {
  const searchParams = new URLSearchParams(useSearch());
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);

  const q = query.trim().toLowerCase();

  const matchingProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.suitableCrops.some((c) => c.toLowerCase().includes(q)) ||
          p.targetProblems.some((pr) => pr.toLowerCase().includes(q))
      )
    : [];

  const matchingCrops = q
    ? CROPS.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    : [];

  const matchingProblems = q
    ? PROBLEMS.filter((pr) => pr.name.toLowerCase().includes(q) || pr.description.toLowerCase().includes(q))
    : [];

  const matchingBlogs = q
    ? BLOG_POSTS.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Search Input Hero */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">Global Agricultural Search</h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl mx-auto">
          Find matching biological fertilizers, crop stage schedules, pest diagnosis guides, and agronomy articles.
        </p>

        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. Tomato, Wilt, Bio-NPK, Thrips, Nitrogen..."
            className="pl-11 py-6 text-sm bg-white text-slate-900 rounded-2xl shadow-lg border-0"
          />
        </div>
      </div>

      {/* Results Overview */}
      {q ? (
        <div className="space-y-12">
          <div className="text-sm text-slate-500 font-medium">
            Search results for &ldquo;<strong className="text-slate-900">{query}</strong>&rdquo;
          </div>

          {/* Products Group */}
          {matchingProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2 border-b pb-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                Matching Formulations ({matchingProducts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchingProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
                ))}
              </div>
            </div>
          )}

          {/* Crops Group */}
          {matchingCrops.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2 border-b pb-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                Crop Management Programs ({matchingCrops.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingCrops.map((c) => (
                  <Link
                    key={c.id}
                    href={`/solutions/crops/${c.slug}`}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-emerald-700">{c.name} Guide</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{c.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Problems Group */}
          {matchingProblems.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2 border-b pb-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                Crop Problems & Diagnosis Guides ({matchingProblems.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingProblems.map((pr) => (
                  <Link
                    key={pr.id}
                    href={`/solutions/problems/${pr.slug}`}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-500 shadow-sm flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-amber-700">{pr.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{pr.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog Group */}
          {matchingBlogs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2 border-b pb-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                Knowledge Hub Articles ({matchingBlogs.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {matchingBlogs.map((b) => (
                  <Link
                    key={b.id}
                    href={`/blog/${b.slug}`}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-sm space-y-2 group block"
                  >
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">{b.category}</span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">{b.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{b.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-sm">
          Enter a keyword above to search BioNature products, crops, or agronomy solutions.
        </div>
      )}
    </div>
  );
};
