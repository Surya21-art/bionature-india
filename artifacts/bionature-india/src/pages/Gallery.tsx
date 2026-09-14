import React, { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const GALLERY_IMAGES = [
  {
    title: "Farmer Demonstration Meeting in Nashik",
    category: "Farmer Meets",
    url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1000&auto=format&fit=crop&q=80",
    description: "Training over 120 progressive vegetable farmers on cold-pressed seaweed bio-stimulant timing.",
  },
  {
    title: "Automated Microbial Fermentation Bioreactors",
    category: "Manufacturing",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=80",
    description: "Stainless-steel computerized fermenters ensuring sterile pure strain culturing.",
  },
  {
    title: "Microbiology Quality Testing Laboratory",
    category: "R&D",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80",
    description: "Colony count verification and pathogen-free certification of each batch.",
  },
  {
    title: "Healthy Basmati Paddy Crop in Punjab",
    category: "Field Crops",
    url: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=1000&auto=format&fit=crop&q=80",
    description: "Demonstration plot treated with Zinc Solubilizing Bio-fertilizer showing zero zinc deficiency.",
  },
  {
    title: "Residue-Free Chilli Cluster in Guntur",
    category: "Field Crops",
    url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=1000&auto=format&fit=crop&q=80",
    description: "Export-grade green chillies protected with Neem Shield 10,000 PPM and Trichoderma.",
  },
  {
    title: "Automated Bottle Filling & Packaging Line",
    category: "Manufacturing",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
    description: "Leak-proof induction sealing and batch barcode tracking.",
  },
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Field Crops", "Manufacturing", "R&D", "Farmer Meets"];

  const filtered = GALLERY_IMAGES.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Visual Field Proof
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Field Demonstrations & Facilities Gallery
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          Explore photography from our manufacturing plants, testing laboratories, farmer field days, and lush harvest plots across India.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition-all ${
              activeCategory === cat
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-medium px-2.5 py-0.5 rounded backdrop-blur-sm">
                {img.category}
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                {img.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
          {selectedImage && (
            <div className="bg-slate-950 text-white rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-serif">{selectedImage.title}</h3>
                  <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                    {selectedImage.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
