import React from "react";
import { Play, Video, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIDEOS = [
  {
    title: "How to Apply Bio-NPK Liquid Consortia Through Drip Irrigation",
    category: "Application Guide",
    duration: "4:30",
    embedId: "dQw4w9WgXcQ", // demo video placeholder
    thumbnail: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
    description: "Step-by-step procedure for mixing, venturi filter calibration, and optimal morning application timing.",
  },
  {
    title: "Trichoderma Viride Seed & Nursery Bed Treatment Protocol",
    category: "Biological Protection",
    duration: "5:15",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    description: "Preventing damping-off and collar rot before transplanting vegetables into the main field.",
  },
  {
    title: "Managing Chilli Black Thrips with Neem Shield 10,000 PPM",
    category: "Pest Management",
    duration: "6:20",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80",
    description: "Demonstration of spray nozzle angle and leaf underside coverage in Andhra Pradesh fields.",
  },
  {
    title: "Farmer Interview: 28% Tomato Yield Boost in Maharashtra",
    category: "Farmer Stories",
    duration: "7:40",
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    description: "Rameshwar Patil shares his experience overcoming blossom drop and chemical spray reductions.",
  },
];

export const Videos: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Video Demonstrations & Stories
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Agronomy Video Library
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          Watch instructional guides on bio-fertilizer mixing, sprayer calibration, disease diagnosis, and farmer field testimonials.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {VIDEOS.map((vid, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="aspect-video bg-slate-900 relative group overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 bg-emerald-600/90 group-hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                {vid.duration}
              </span>
              <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-medium px-2.5 py-0.5 rounded">
                {vid.category}
              </span>
            </div>

            <div className="p-6 space-y-2">
              <h3 className="font-bold text-slate-900 text-base font-serif">{vid.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{vid.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
