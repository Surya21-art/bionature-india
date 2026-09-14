import React, { useState } from "react";
import { Link } from "wouter";
import {
  Sprout,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";
import { CROPS, PROBLEMS } from "@/data/bionature-data";
import { SmartProductFinder } from "@/components/solutions/SmartProductFinder";
import { Button } from "@/components/ui/button";

export const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"crops" | "problems">("crops");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Integrated Agricultural Programs
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
            Science-Backed Solutions by Crop & Problem
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Sustainable biological farming starts with targeted solutions. Explore our stage-wise crop management programs or diagnose specific fungal, bacterial, pest, or nutrient challenges.
          </p>
        </div>
      </div>

      {/* Embedded Smart Finder */}
      <SmartProductFinder />

      {/* Solutions Navigation Tabs */}
      <div className="space-y-8" id="solutions-browser">
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab("crops")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "crops"
                  ? "bg-white text-emerald-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Solutions by Crop (10 Crops)</span>
            </button>

            <button
              onClick={() => setActiveTab("problems")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "problems"
                  ? "bg-white text-emerald-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Solutions by Problem (9 Issues)</span>
            </button>
          </div>
        </div>

        {/* 1. SOLUTIONS BY CROP */}
        {activeTab === "crops" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                Select Your Crop for Stage-Wise Calendar
              </h2>
              <p className="text-xs text-slate-500">
                Detailed schedules covering nursery treatment, vegetative growth, flowering, and harvest.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CROPS.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                        {crop.scientificName}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                        {crop.name} Solutions
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {crop.description}
                      </p>

                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Major Challenges Addressed:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {crop.commonProblems.map((prob) => (
                            <span
                              key={prob}
                              className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                            >
                              {prob}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link href={`/solutions/crops/${crop.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs font-semibold text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300"
                      >
                        <span>View {crop.name} Growth Guide</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. SOLUTIONS BY PROBLEM */}
        {activeTab === "problems" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                Select an Agricultural Problem for Biological Remedy
              </h2>
              <p className="text-xs text-slate-500">
                Identify pest, disease, chlorosis, and soil compaction symptoms with verified protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROBLEMS.map((problem) => (
                <div
                  key={problem.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                        {problem.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                      {problem.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {problem.description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Typical Visible Symptoms:
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1">
                        {problem.symptoms.slice(0, 2).map((sym, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                            <span className="text-amber-500">•</span>
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href={`/solutions/problems/${problem.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:border-emerald-300"
                    >
                      <span>Read Treatment Protocol</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
