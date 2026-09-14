import React from "react";
import { Link } from "wouter";
import { Star, ArrowLeft, Users, Quote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";

export const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/about" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>About Us</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Farmer Testimonials</span>
      </div>

      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Field Feedback & Verified Yields
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          What Indian Farmers Say About BioNature
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          From Punjab basmati fields to Maharashtra tomato clusters and Andhra chilli tracts, hear direct accounts of reduced chemical costs, healthier soils, and higher yields.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {t.yieldIncrease}
                </span>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-emerald-100 absolute -top-4 -left-2 -z-0" />
                <p className="text-sm text-slate-700 italic leading-relaxed relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Formulation Used:</strong> {t.productUsed}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.farmerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <div className="font-bold text-slate-900 text-sm">{t.farmerName}</div>
                <div className="text-xs text-slate-500">
                  {t.location}, {t.state} • Crop: {t.crop}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
