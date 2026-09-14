import React from "react";
import { Link } from "wouter";
import { Award, ArrowLeft, Star, Trophy } from "lucide-react";
import { AWARDS } from "@/data/bionature-data";

export const Awards: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/about" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>About Us</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Awards & Honors</span>
      </div>

      {/* Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
          Industry Recognition
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Awards & Agricultural Honors
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Celebrating milestones in biological formulation stability, sustainable soil impact, and farmer community welfare.
        </p>
      </div>

      {/* Awards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AWARDS.map((awd) => (
          <div
            key={awd.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
              <img src={awd.image} alt={awd.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow">
                {awd.year}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {awd.organization}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">{awd.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{awd.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
