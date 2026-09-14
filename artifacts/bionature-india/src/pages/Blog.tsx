import React, { useState } from "react";
import { Link } from "wouter";
import { BookOpen, Search, ArrowRight, Clock, User, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/data/bionature-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Bio Fertilizers", "Crop Protection", "Plant Nutrition", "Soil Health"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Agronomy & Farmer Education Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Scientific Insights for Modern Sustainable Farming
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          Deep-dive technical guides written by certified agronomists and soil microbiologists on nitrogen fixation, biological pest control, flower retention, and organic soil enrichment.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-9 text-xs h-9"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <Badge className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] border-0">
                  {post.category}
                </Badge>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 font-serif">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <div className="text-xs">
                <div className="font-semibold text-slate-800">{post.author}</div>
                <div className="text-[10px] text-slate-400">{post.authorRole}</div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
