import React from "react";
import { Link } from "wouter";
import {
  Sprout,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { COMPANY_INFO, CATEGORIES } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-900/40">
      {/* Trust & Certifications Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">ISO 9001:2015</h4>
              <p className="text-xs text-slate-400">Quality Certified Manufacturing</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-400 shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">NPOP Organic Verified</h4>
              <p className="text-xs text-slate-400">100% Residue-Free Inputs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">FCO & CIB&RC Approved</h4>
              <p className="text-xs text-slate-400">Govt Regulatory Compliance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Expert Agronomy Support</h4>
              <p className="text-xs text-slate-400">Toll-Free Farmer Guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white font-serif">
                BioNature<span className="text-emerald-400 font-sans font-bold text-sm ml-1 px-1.5 py-0.5 bg-emerald-950 rounded border border-emerald-800">INDIA</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              BioNature India develops biological fertilizers, natural crop protectors, plant nutrition, and bio-stimulants empowering Indian farmers with higher yields and regenerative soil health.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Products
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-emerald-400 hover:underline font-medium">
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Crop Solutions */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Crop Solutions
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/solutions/crops/tomato" className="hover:text-emerald-400 transition-colors">
                  Tomato Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/crops/chilli" className="hover:text-emerald-400 transition-colors">
                  Chilli Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/crops/cotton" className="hover:text-emerald-400 transition-colors">
                  Cotton Protection
                </Link>
              </li>
              <li>
                <Link href="/solutions/crops/banana" className="hover:text-emerald-400 transition-colors">
                  Banana Nutrition
                </Link>
              </li>
              <li>
                <Link href="/solutions/crops/paddy" className="hover:text-emerald-400 transition-colors">
                  Paddy / Basmati Program
                </Link>
              </li>
              <li>
                <Link href="/crop-diagnosis" className="text-amber-400 hover:underline font-medium flex items-center gap-1">
                  Crop Photo Diagnosis 🩺
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Dealership */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/infrastructure" className="hover:text-emerald-400 transition-colors">
                  Infrastructure & Plant
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-emerald-400 transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/distributor" className="hover:text-emerald-400 transition-colors">
                  Become a Distributor
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Agri Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-emerald-400 transition-colors">
                  Brochure Downloads
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright and Legal Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} BioNature India Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Agricultural Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
