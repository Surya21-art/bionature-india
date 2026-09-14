import React, { useState } from "react";
import { Download, FileText, Search, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DOWNLOADABLE_RESOURCES = [
  {
    title: "Bio-NPK Liquid Consortia Technical Dossier",
    category: "Technical Sheet",
    size: "1.4 MB",
    description: "Detailed microbial counts, symbiotic mechanisms, Indian field trial results, and FCO regulatory standards.",
  },
  {
    title: "BioNature Complete Product Catalog (2026 Edition)",
    category: "Product Brochure",
    size: "4.8 MB",
    description: "Comprehensive 32-page full-color guide covering all biofertilizers, biopesticides, and seaweed extracts.",
  },
  {
    title: "Solanaceous Crop Spray Schedule (Tomato & Chilli)",
    category: "Crop Guide",
    size: "2.1 MB",
    description: "Stage-by-stage calendar detailing nursery, vegetative, flowering, and harvesting spray concentrations.",
  },
  {
    title: "Cotton Integrated Pest Management (IPM) Manual",
    category: "Application Guide",
    size: "1.8 MB",
    description: "Step-by-step biological protocol to manage whiteflies, thrips, and bollworms with zero chemical residue.",
  },
  {
    title: "Basmati Paddy Yield Enhancement Protocol",
    category: "Crop Guide",
    size: "1.6 MB",
    description: "Application instructions for Zinc Solubilizing Bio-Fertilizer and biological silicon foliar activators.",
  },
  {
    title: "NPOP Organic Compliance & FCO Testing Certificate",
    category: "Regulatory",
    size: "890 KB",
    description: "Statutory lab certificates certifying 100% organic purity, absence of heavy metals, and statutory adherence.",
  },
];

export const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Product Brochure", "Technical Sheet", "Crop Guide", "Application Guide", "Regulatory"];

  const filtered = DOWNLOADABLE_RESOURCES.filter((res) => {
    const matchCat = selectedCat === "All" || res.category === selectedCat;
    const matchSearch =
      !searchQuery.trim() ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}... (Sample document)`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Downloads & Technical Documentation
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Agricultural Guides, Brochures & Schedules
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          Access high-resolution product brochures, stage-wise spray charts, lab test reports, and organic compliance certificates freely downloadable for farmers and distributors.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedCat === c ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, crop names..."
            className="pl-9 text-xs h-9"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{item.size}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Button
                onClick={() => handleDownload(item.title)}
                size="sm"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Document</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
