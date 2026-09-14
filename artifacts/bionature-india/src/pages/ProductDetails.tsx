import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import {
  Check,
  Download,
  MessageCircle,
  Phone,
  ArrowLeft,
  ShieldCheck,
  Sprout,
  HelpCircle,
  Clock,
  Sparkles,
  Package,
} from "lucide-react";
import { useBioNatureStore } from "@/services/store";
import { COMPANY_INFO, Product } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProductDetailsProps {
  onEnquire: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ onEnquire }) => {
  const [, params] = useRoute("/products/:slug");
  const { products } = useBioNatureStore();
  const slug = params?.slug;

  const product = products.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested biological product could not be located or may have been updated.
        </p>
        <Link href="/products">
          <Button className="bg-emerald-600 text-white">Back to Products Catalog</Button>
        </Link>
      </div>
    );
  }

  const handleDownloadDoc = (docName: string) => {
    toast.success(`Downloading ${docName}... (Sample PDF document)`);
  };

  const cleanWhatsapp = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Hello BioNature India, I want details, pricing, and dealer availability for ${product.name}.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/products" className="hover:text-emerald-700 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <span>/</span>
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-emerald-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Top Grid: Image Gallery + Quick Specs & CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Imagery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-emerald-700 text-white border-0">{product.category}</Badge>
              <Badge className="bg-slate-900/80 text-white text-[10px] backdrop-blur-sm border-0">
                100% Bio-Active
              </Badge>
            </div>
          </div>

          {/* Thumbnails if multiple */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? "border-emerald-600 shadow-md" : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Certifications Strip */}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ISO 9001:2015 & FCO Compliant</span>
            </div>
            <span className="font-semibold text-emerald-700">Residue-Free</span>
          </div>
        </div>

        {/* Right: Product Headline, Dosage & Action Box */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Key Benefits Checklist */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Proven Agricultural Benefits
            </h3>
            <div className="space-y-1.5">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Pack Sizes */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-emerald-600" />
              Available Pack Sizes
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.packSizes.map((size) => (
                <span
                  key={size}
                  className="bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-lg border border-slate-200"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Action Call to Actions */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 pt-4">
            <div className="text-xs font-semibold text-slate-700">
              Direct Farmer & Dealer Enquiry
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={() => onEnquire(product)}
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-5 shadow-sm"
              >
                Send Product Enquiry
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold text-sm py-5 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                  <span>Enquire on WhatsApp</span>
                </Button>
              </a>
            </div>
            <div className="text-[11px] text-slate-400 text-center">
              Toll-Free Agronomist Assistance: {COMPANY_INFO.phone} (9 AM - 6:30 PM IST)
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Information Tabs & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-slate-200">
        {/* Left 2 Cols: Detailed Agronomy Dossier */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-serif border-l-4 border-emerald-600 pl-3">
              Product Overview & Mechanism of Action
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Verified Ingredients */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-serif border-l-4 border-emerald-600 pl-3">
              Active Ingredients & Colony Count
            </h2>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed">
              {product.ingredients}
            </div>
          </div>

          {/* Application & Dosage Table */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-serif border-l-4 border-emerald-600 pl-3">
              Verified Dosage & Application Methods
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Application Method</th>
                    <th className="p-3">Dosage per Acre / Liter</th>
                    <th className="p-3">Application Timing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">{product.applicationMethod}</td>
                    <td className="p-3 text-emerald-800 font-medium">{product.dosage}</td>
                    <td className="p-3">Early morning or late afternoon during active growth</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Suitable Crops & Target Problems */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recommended Crops
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.suitableCrops.map((c) => (
                  <Link
                    key={c}
                    href={`/solutions/crops/${c.toLowerCase()}`}
                    className="text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-2.5 py-1 rounded-md font-medium transition-colors"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Target Problems Solved
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.targetProblems.map((prob) => (
                  <span
                    key={prob}
                    className="text-xs bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md font-medium border border-amber-200/60"
                  >
                    {prob}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Download Technical Documents & Help */}
        <div className="space-y-6">
          {/* Documents Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-600" />
              Technical Documents
            </h3>
            <p className="text-xs text-slate-500">
              Download verified specifications, lab trial reports, and FCO certificates.
            </p>

            <div className="space-y-2">
              {product.documents.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDownloadDoc(doc.name)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-800 truncate max-w-[180px]">
                      {doc.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {doc.type} • {doc.size}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Need Agronomy Advice Card */}
          <div className="bg-emerald-900 text-white p-6 rounded-2xl space-y-4 shadow-md">
            <h3 className="text-sm font-bold font-serif flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-400" />
              Agronomy Field Support
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Unsure about tank mixing compatibility, water pH, or specific dosage for your acreage? Talk directly with our state agronomists.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpline: {COMPANY_INFO.phone}</span>
              </a>
              <Link
                href="/crop-diagnosis"
                className="block text-xs font-semibold text-amber-300 hover:underline"
              >
                🩺 Upload crop picture for free diagnosis →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
