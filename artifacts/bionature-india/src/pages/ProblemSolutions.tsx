import React from "react";
import { useRoute, Link } from "wouter";
import {
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { PROBLEMS, PRODUCTS, Product } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

interface ProblemSolutionsProps {
  onEnquire: (product: Product) => void;
}

export const ProblemSolutions: React.FC<ProblemSolutionsProps> = ({ onEnquire }) => {
  const [, params] = useRoute("/solutions/problems/:problem");
  const probParam = params?.problem?.toLowerCase() || "pest-management";

  const currentProblem =
    PROBLEMS.find((pr) => pr.slug === probParam || pr.category.toLowerCase().includes(probParam)) ||
    PROBLEMS[0];

  const matchedProducts = PRODUCTS.filter((p) => p.targetProblems.includes(currentProblem.category));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/solutions" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Solutions</span>
        </Link>
        <span>/</span>
        <span>Problems</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{currentProblem.name}</span>
      </div>

      {/* Problem Header Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full uppercase tracking-wider">
          {currentProblem.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {currentProblem.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {currentProblem.description}
        </p>
      </div>

      {/* Diagnostics Grid: Symptoms, Causes, Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Symptoms */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Field Symptoms Checklist</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            {currentProblem.symptoms.map((sym, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{sym}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Underlying Causes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <span>Key Underlying Causes</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            {currentProblem.causes.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Biological Management Protocol */}
        <div className="bg-emerald-900 text-white rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
            <span>BioNature Treatment Protocol</span>
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            {currentProblem.management}
          </p>
          <div className="pt-2">
            <Link href="/crop-diagnosis">
              <Button size="sm" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs">
                Upload Field Photo for Confirmation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Formulations */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">
            Targeted Biological Solutions
          </h2>
          <p className="text-xs text-slate-500">
            Formulations formulated specifically to resolve {currentProblem.name}.
          </p>
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
