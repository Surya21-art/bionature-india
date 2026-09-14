import React from "react";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  BookOpen,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import { BLOG_POSTS, PRODUCTS } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const BlogDetails: React.FC = () => {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const post = BLOG_POSTS.find((b) => b.slug === slug) || BLOG_POSTS[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/blog" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Blog</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate">{post.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-emerald-700 text-white">{post.category}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <div>
              <strong className="text-slate-900">{post.author}</strong> — {post.authorRole}
            </div>
            <span>•</span>
            <div>{post.date}</div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="text-xs text-slate-700 gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-md">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4">
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 text-emerald-950 italic">
          <strong>Key Takeaway:</strong> {post.excerpt}
        </div>

        <div className="whitespace-pre-line text-slate-700 space-y-4">{post.content}</div>
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Tags:</span>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Relevant Recommended Products Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-md">
          <h3 className="text-xl font-bold font-serif">Apply These Agronomy Insights</h3>
          <p className="text-xs text-emerald-200">
            Explore BioNature&rsquo;s certified biological formulations designed specifically for biological nitrogen fixation, plant nutrition, and disease defense.
          </p>
        </div>
        <Link href="/products">
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0">
            Browse BioNature Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};
