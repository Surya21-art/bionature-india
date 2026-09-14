import React, { useState } from "react";
import { Link } from "wouter";
import {
  Stethoscope,
  Phone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Search,
  ArrowRight,
  ShieldCheck,
  Sprout,
  Clock,
  AlertCircle,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FAQS = [
  {
    q: "Can BioNature bio-fertilizers be tank-mixed with chemical pesticides?",
    a: "Bio-fertilizers and bio-fungicides contain living beneficial microorganisms. They should NOT be mixed directly in the spray tank with chemical fungicides or copper bactericides. Maintain an interval of at least 4 to 5 days between biological applications and chemical fungicide sprays.",
  },
  {
    q: "What is the best time of day to spray biological products?",
    a: "Always spray in the early morning (before 9:00 AM) or late afternoon (after 4:30 PM). Ultraviolet (UV) radiation from intense mid-day sun degrades live spores and volatile botanical terpenoids.",
  },
  {
    q: "Does water quality affect bio-pesticide efficacy?",
    a: "Yes. Highly alkaline water (pH above 8.0) or hard borewell water can reduce spore viability. For best results, use clean irrigation water with neutral pH (6.5 - 7.2).",
  },
  {
    q: "How long does it take to see visible improvement in yellowing leaves?",
    a: "Foliar application of Chelated Micronutrients and Bio-NPK typically initiates visible greening within 4 to 7 days. Soil-applied VAM mycorrhiza and humic conditioners manifest visible root growth within 10 to 14 days.",
  },
  {
    q: "What is the shelf life of BioNature liquid formulations?",
    a: "Our stabilized liquid consortia and biopesticides possess a validated shelf life of 12 to 24 months when stored in original sealed containers away from direct sunlight at room temperature.",
  },
];

export const FarmerHelp: React.FC = () => {
  const { store } = useBioNatureStore();
  const [lookupRef, setLookupRef] = useState("");
  const [searchedTicket, setSearchedTicket] = useState<any | null>(null);
  const [searchError, setSearchError] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchedTicket(null);

    if (!lookupRef.trim()) {
      setSearchError("Please enter your Reference ID (e.g. BN-DIAG-8492)");
      return;
    }

    const ticket = store.getDiagnosisByReference(lookupRef.trim());
    if (ticket) {
      setSearchedTicket(ticket);
    } else {
      setSearchError(`No ticket found for reference "${lookupRef}". Please check the ID or contact our helpline.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Dedicated Kisan Agronomy Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Having a Problem With Your Crop?
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Share your crop symptoms or upload field photos to receive verified guidance from certified agronomists. We provide scientific, residue-free biological solutions.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/crop-diagnosis">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm">
                Upload Crop Photo for Diagnosis
              </Button>
            </Link>
            <a href={`tel:${COMPANY_INFO.phone}`}>
              <Button variant="outline" size="lg" className="border-emerald-600 text-white hover:bg-emerald-800/60 text-xs sm:text-sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Helpline
              </Button>
            </a>
          </div>
        </div>

        {/* Helpline Contact Card */}
        <div className="bg-emerald-950/80 border border-emerald-700 p-6 rounded-2xl text-center space-y-3 shrink-0 max-w-xs backdrop-blur-md">
          <Phone className="w-8 h-8 mx-auto text-emerald-400" />
          <div>
            <div className="text-xs text-emerald-300">Kisan Toll-Free Helpline</div>
            <div className="text-xl font-black font-serif text-white">{COMPANY_INFO.phone}</div>
          </div>
          <p className="text-[11px] text-emerald-200">
            Certified technical advisors available in Hindi, Telugu, Marathi, Kannada, and English.
          </p>
          <div className="text-[10px] text-emerald-400 border-t border-emerald-800 pt-2 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Mon - Sat: 9:00 AM - 6:30 PM IST</span>
          </div>
        </div>
      </div>

      {/* 3 Core Farmer Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Crop Photo Diagnosis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload photos of pests, yellowing leaves, or rot. Our agronomy team inspects your crop and returns a reference ticket with exact biological spray steps.
            </p>
          </div>
          <Link href="/crop-diagnosis">
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold">
              Open Diagnosis Tool →
            </Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">WhatsApp Expert Chat</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prefer chatting directly on your phone? Connect immediately with our regional support desk to share images and voice notes.
            </p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full text-xs font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50">
              Chat on WhatsApp →
            </Button>
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:border-emerald-400 transition-colors flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Browse Crop Solutions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore proven management protocols for tomato, chilli, cotton, paddy, sugarcane, and vegetables tailored for Indian soil conditions.
            </p>
          </div>
          <Link href="/solutions">
            <Button variant="outline" className="w-full text-xs font-semibold text-slate-700 hover:bg-slate-50">
              Browse Solutions →
            </Button>
          </Link>
        </div>
      </div>

      {/* Ticket Tracking Section */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6" id="tracking">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900 font-serif">
            Check Status of Your Diagnosis Ticket
          </h2>
          <p className="text-xs text-slate-500">
            Enter your 11-digit Reference ID received after submitting crop photos (e.g. BN-DIAG-8492 or BN-DIAG-9120).
          </p>
        </div>

        <form onSubmit={handleLookup} className="max-w-md mx-auto flex items-center gap-2">
          <Input
            value={lookupRef}
            onChange={(e) => setLookupRef(e.target.value)}
            placeholder="Enter ID: BN-DIAG-XXXX"
            className="text-xs uppercase"
          />
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0">
            <Search className="w-3.5 h-3.5 mr-1" />
            Lookup
          </Button>
        </form>

        {searchError && (
          <div className="max-w-md mx-auto p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center">
            {searchError}
          </div>
        )}

        {searchedTicket && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400">Reference:</span>
                <div className="text-base font-bold text-emerald-800">{searchedTicket.referenceNumber}</div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                  searchedTicket.status === "responded"
                    ? "bg-emerald-100 text-emerald-800"
                    : searchedTicket.status === "in_review"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                Status: {searchedTicket.status.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Farmer Name:</span>
                <div className="font-semibold text-slate-800">{searchedTicket.farmerName}</div>
              </div>
              <div>
                <span className="text-slate-400">Crop & Age:</span>
                <div className="font-semibold text-slate-800">
                  {searchedTicket.crop} ({searchedTicket.cropAge})
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-slate-400">Observed Symptom:</span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg">{searchedTicket.problemDescription}</p>
            </div>

            {searchedTicket.expertNotes ? (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1.5">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Agronomist Diagnosis & Treatment Recommendation:
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">{searchedTicket.expertNotes}</p>
              </div>
            ) : (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Our technical team is reviewing your images. Recommendations will be updated shortly.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">
            Frequently Asked Agronomy Questions
          </h2>
          <p className="text-xs text-slate-500">
            Answers to common questions on bio-fertilizer compatibility, application timing, and dosages.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
