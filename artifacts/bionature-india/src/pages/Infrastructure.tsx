import React from "react";
import { Link } from "wouter";
import { Building2, FlaskConical, ShieldCheck, Layers, ArrowLeft } from "lucide-react";
import { INFRASTRUCTURE_FACILITIES } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";

export const Infrastructure: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/about" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>About Us</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Infrastructure & Manufacturing</span>
      </div>

      {/* Header */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          World-Class Biotech Infrastructure
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Advanced Fermentation & Testing Facilities
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Located in Hyderabad&rsquo;s biotechnology industrial zone, our manufacturing and research center adheres to the highest statutory and environmental standards for biological input synthesis.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INFRASTRUCTURE_FACILITIES.map((facility, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 bg-slate-900/90 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                Capacity: {facility.capacity}
              </span>
            </div>

            <div className="p-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 font-serif">{facility.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{facility.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* R&D Commitment Banner */}
      <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 text-center max-w-3xl mx-auto space-y-3">
        <h3 className="text-lg font-bold text-slate-900 font-serif">
          Interested in a Technical Visit or Institutional Supply?
        </h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          We welcome agricultural university faculty, Farmer Producer Organizations (FPOs), and commercial distributors to tour our fermentation and quality testing facility.
        </p>
        <Link href="/contact">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs mt-2">
            Schedule a Facility Visit
          </Button>
        </Link>
      </div>
    </div>
  );
};
