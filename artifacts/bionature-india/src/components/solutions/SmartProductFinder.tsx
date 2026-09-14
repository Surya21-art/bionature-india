import React, { useState } from "react";
import { Link } from "wouter";
import {
  Sprout,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { CROPS, PROBLEMS, PRODUCTS, Product } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";

interface SmartProductFinderProps {
  onEnquire?: (product: Product) => void;
}

export const SmartProductFinder: React.FC<SmartProductFinderProps> = ({ onEnquire }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  const handleSelectCrop = (cropName: string) => {
    setSelectedCrop(cropName);
    setCurrentStep(2);
  };

  const handleSelectProblem = (problemCategory: string) => {
    setSelectedProblem(problemCategory);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setSelectedCrop("");
    setSelectedProblem("");
    setCurrentStep(1);
  };

  // Match products based on selected crop and problem
  const recommendedProducts = PRODUCTS.filter((p) => {
    const cropMatch = !selectedCrop || p.suitableCrops.includes(selectedCrop);
    const problemMatch = !selectedProblem || p.targetProblems.includes(selectedProblem);
    return cropMatch && problemMatch;
  });

  // Fallback if no exact intersection found
  const finalProducts =
    recommendedProducts.length > 0
      ? recommendedProducts
      : PRODUCTS.filter((p) => p.targetProblems.includes(selectedProblem) || p.suitableCrops.includes(selectedCrop)).slice(0, 3);

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-800/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Diagnostic Assistant</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
          Find the Right Agricultural Solution
        </h2>
        <p className="text-sm text-emerald-200/80 leading-relaxed">
          Select your crop and the specific challenge you are observing in the field. Our system will match verified biological fertilizers and crop protectors tailored to your needs.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 pt-2 text-xs font-semibold">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
              currentStep === 1
                ? "bg-emerald-500 text-slate-950 font-bold"
                : selectedCrop
                ? "bg-emerald-800 text-emerald-200"
                : "bg-emerald-950/80 text-emerald-500"
            }`}
          >
            <span>1. Crop:</span>
            <span>{selectedCrop || "Select"}</span>
          </div>

          <span className="text-emerald-700">→</span>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
              currentStep === 2
                ? "bg-emerald-500 text-slate-950 font-bold"
                : selectedProblem
                ? "bg-emerald-800 text-emerald-200"
                : "bg-emerald-950/80 text-emerald-500"
            }`}
          >
            <span>2. Problem:</span>
            <span>{selectedProblem || "Select"}</span>
          </div>

          <span className="text-emerald-700">→</span>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
              currentStep === 3
                ? "bg-emerald-500 text-slate-950 font-bold"
                : "bg-emerald-950/80 text-emerald-500"
            }`}
          >
            <span>3. Recommendation</span>
          </div>
        </div>
      </div>

      {/* Step 1: Crop Selection */}
      {currentStep === 1 && (
        <div className="relative z-10 space-y-4">
          <div className="text-center text-sm font-semibold text-emerald-200">
            Step 1: Which crop are you cultivating?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {CROPS.map((crop) => (
              <button
                key={crop.id}
                onClick={() => handleSelectCrop(crop.name)}
                className="p-3 bg-emerald-900/40 hover:bg-emerald-700/60 border border-emerald-800/60 hover:border-emerald-400 rounded-xl flex flex-col items-center gap-2 text-center transition-all group"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-600 group-hover:scale-105 transition-transform">
                  <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-semibold group-hover:text-emerald-200">{crop.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Problem Selection */}
      {currentStep === 2 && (
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto text-sm">
            <span className="font-semibold text-emerald-200">
              Step 2: What symptom or challenge is visible in your {selectedCrop}?
            </span>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-emerald-400 hover:text-white underline"
            >
              Change Crop
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {PROBLEMS.map((problem) => (
              <button
                key={problem.id}
                onClick={() => handleSelectProblem(problem.category)}
                className="p-4 bg-emerald-900/40 hover:bg-emerald-700/60 border border-emerald-800/60 hover:border-amber-400 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white group-hover:text-amber-200">
                    {problem.name}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-300/70 line-clamp-2 leading-tight">
                  {problem.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Recommendations Display */}
      {currentStep === 3 && (
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-900/50 p-4 rounded-2xl border border-emerald-700/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs text-emerald-300">Target Match:</div>
                <div className="text-sm font-bold text-white">
                  Crop: {selectedCrop} • Issue: {selectedProblem}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-emerald-950/60 border-emerald-600 text-emerald-200 hover:bg-emerald-800 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Start New Search
            </Button>
          </div>

          {/* Recommended Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalProducts.map((p) => (
              <div
                key={p.id}
                className="bg-slate-900/90 border border-emerald-600/40 rounded-2xl p-5 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {p.category}
                    </span>
                    <span className="text-[11px] text-amber-300 font-medium">Verified Biological</span>
                  </div>

                  <h3 className="font-bold text-white text-base">{p.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.shortDescription}</p>

                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-900/60 space-y-1">
                    <div className="text-[11px] font-semibold text-emerald-300">Recommended Application:</div>
                    <div className="text-xs text-slate-200">{p.dosage}</div>
                    <div className="text-[11px] text-slate-400">Method: {p.applicationMethod}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Link href={`/products/${p.slug}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    >
                      View Full Dossier
                    </Button>
                  </Link>
                  {onEnquire && (
                    <Button
                      size="sm"
                      onClick={() => onEnquire(p)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      Order / Enquire
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scientific / Expert Advice Disclaimer */}
          <div className="flex items-start gap-2.5 bg-amber-950/40 border border-amber-800/50 p-4 rounded-xl text-xs text-amber-200/90">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Important Farmer Guidance:</strong> Recommended based on the crop and symptom inputs provided. Field microclimates, water pH, and pest intensity can influence response. For severe outbreaks, contact our certified agronomists on the toll-free helpline or submit photographs via the{" "}
              <Link href="/crop-diagnosis" className="underline font-semibold hover:text-white">
                Crop Photo Diagnosis Tool
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
