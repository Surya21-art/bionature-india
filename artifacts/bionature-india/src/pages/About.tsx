import React from "react";
import { Link } from "wouter";
import {
  Sprout,
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  Heart,
  TrendingUp,
  FlaskConical,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";

const TIMELINE = [
  {
    year: "2016",
    title: "Founding & Pilot Fermentation",
    description: "BioNature India established by agricultural scientists and bio-technologists in Hyderabad with pilot 2,000L microbial fermentation vessels.",
  },
  {
    year: "2019",
    title: "Commercial NPOP & FCO Certification",
    description: "Received statutory recognition from Department of Agriculture (FCO) and APEDA National Programme for Organic Production (NPOP).",
  },
  {
    year: "2022",
    title: "Expansion to 25,000L Bioreactors",
    description: "Expanded production capacity with automated stainless-steel fermenters, automated bottling lines, and dedicated cold storage facilities.",
  },
  {
    year: "2024",
    title: "12,000+ Farmers Reached",
    description: "Expanded distribution network across 16 Indian states, launching the Digital Farmer Crop Diagnosis Support Initiative.",
  },
];

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Hero Section */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-14 border border-emerald-900 shadow-xl relative overflow-hidden text-center max-w-5xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-800 inline-block">
          Nature + Science + Agriculture
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif max-w-3xl mx-auto leading-tight">
          Pioneering Biological Agriculture for a Healthier India
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
          BioNature India was born from a singular commitment: empowering farmers to rejuvenate tired soils, minimize chemical pesticide residues, and harvest abundant, high-nutrition crops through biological science.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide Indian farmers with scientifically verified, high-viability biological inputs that reduce input costs, enhance crop resilience against weather anomalies, and deliver residue-free harvests.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To become India&rsquo;s most trusted biological agriculture brand, recognized globally for excellence in fermentation technology, soil carbon restoration, and farmer livelihood empowerment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">Our Values</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Uncompromising quality purity, farmer transparency, continuous laboratory research, and ecological stewardship guiding every formulation we bottle.
          </p>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Milestones</span>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Our Growth Journey</h2>
          <p className="text-xs text-slate-500">From pilot fermentation vessels to nationwide agricultural impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2 relative">
              <div className="text-2xl font-black font-serif text-emerald-700">{item.year}</div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* R&D and Quality Assurance */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Research & Development
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Science at the Heart of Every Formulation
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Our state-of-the-art microbiology laboratory in Hyderabad employs certified bio-technologists, soil scientists, and entomologists. We screen indigenous microbial strains that thrive under high-temperature Indian soil environments.
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>DNA sequencing and strain verification for maximum purity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Multi-locational field validation trials with agricultural universities</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Temperature-stability stress testing up to 45°C</span>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/infrastructure">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs">
                Explore Our Infrastructure & Labs →
              </Button>
            </Link>
          </div>
        </div>

        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80"
            alt="Microbiology laboratory"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
