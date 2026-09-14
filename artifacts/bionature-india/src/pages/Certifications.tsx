import React from "react";
import { Link } from "wouter";
import { ShieldCheck, Download, CheckCircle2, ArrowLeft } from "lucide-react";
import { CERTIFICATIONS } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Certifications: React.FC = () => {
  const handleDownload = (certName: string) => {
    toast.success(`Downloading ${certName} certificate file...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/about" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>About Us</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Quality & Certifications</span>
      </div>

      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Statutory Compliance & Quality
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Verified Quality & Organic Certifications
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          BioNature India operates under stringent national and international agricultural input standards. Every production batch is certified for CFU counts, freedom from heavy metals, and statutory safety.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {cert.validity}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 font-serif">{cert.name}</h3>
                <div className="text-xs text-slate-500 font-medium">Issuing Authority: {cert.issuingBody}</div>
                <div className="text-xs font-mono text-emerald-700 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100 mt-2">
                  Reg No: {cert.certNumber}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{cert.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <Button
                onClick={() => handleDownload(cert.name)}
                size="sm"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Official Certificate (PDF)
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
