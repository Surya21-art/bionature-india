import React from "react";
import { useRoute, Link } from "wouter";
import {
  Sprout,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { CROPS, PRODUCTS, Product } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

interface CropSolutionsProps {
  onEnquire: (product: Product) => void;
}

export const CropSolutions: React.FC<CropSolutionsProps> = ({ onEnquire }) => {
  const [, params] = useRoute("/solutions/crops/:crop");
  const cropParam = params?.crop?.toLowerCase() || "tomato";

  const currentCrop = CROPS.find((c) => c.slug === cropParam || c.name.toLowerCase() === cropParam) || CROPS[0];

  const matchedProducts = PRODUCTS.filter((p) => p.suitableCrops.includes(currentCrop.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/solutions" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Solutions</span>
        </Link>
        <span>/</span>
        <span>Crops</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{currentCrop.name}</span>
      </div>

      {/* Crop Hero Card */}
      <div className="bg-emerald-950 text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl border border-emerald-900">
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-4 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-700 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 w-fit">
            <Sprout className="w-3.5 h-3.5" />
            <span>Botanical Name: {currentCrop.scientificName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            {currentCrop.name} Management Program
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
            {currentCrop.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="font-semibold text-emerald-300 self-center">Frequent Challenges:</span>
            {currentCrop.commonProblems.map((prob) => (
              <span key={prob} className="bg-emerald-900 text-emerald-200 px-2.5 py-1 rounded-md border border-emerald-800">
                {prob}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto">
          <img src={currentCrop.image} alt={currentCrop.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Stage-by-Stage Phenological Management Schedule */}
      {currentCrop.stages && currentCrop.stages.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 font-serif flex items-center gap-2">
              <Calendar className="w-6 h-6 text-emerald-600" />
              Stage-by-Stage Biological Schedule for {currentCrop.name}
            </h2>
            <p className="text-xs text-slate-500">
              Apply biological fertilizers and bio-pesticides aligned with critical vegetative and reproductive phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCrop.stages.map((stg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-sm hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Stage {idx + 1} • {stg.days}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{stg.stage}</h3>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{stg.description}</p>

                <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 block">
                    Recommended Agronomy Action:
                  </span>
                  <p className="text-xs text-emerald-800 leading-relaxed">{stg.management}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products for This Crop */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              BioNature Formulations for {currentCrop.name}
            </h2>
            <p className="text-xs text-slate-500">
              Field-tested microbial inoculants and biological crop protectors tailored for {currentCrop.name}.
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" size="sm" className="text-xs text-emerald-700">
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </div>
  );
};
