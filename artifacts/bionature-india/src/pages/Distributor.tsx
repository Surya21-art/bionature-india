import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import { CATEGORIES, COMPANY_INFO } from "@/data/bionature-data";
import { BioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const distributorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company / Firm name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Valid email address is required"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  currentBusiness: z.string().min(2, "Current business type is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  interestedCategories: z.array(z.string()).min(1, "Please select at least one product category"),
  message: z.string().optional(),
});

type DistributorFormData = z.infer<typeof distributorSchema>;

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Other State / UT",
];

export const Distributor: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Bio Fertilizers",
    "Bio Fungicides",
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DistributorFormData>({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      interestedCategories: selectedCategories,
    },
  });

  const toggleCategory = (catName: string) => {
    let updated: string[];
    if (selectedCategories.includes(catName)) {
      updated = selectedCategories.filter((c) => c !== catName);
    } else {
      updated = [...selectedCategories, catName];
    }
    setSelectedCategories(updated);
  };

  const onSubmit = async (data: DistributorFormData) => {
    try {
      BioNatureStore.submitDistributor({
        name: data.name,
        company: data.company,
        mobile: data.mobile,
        email: data.email,
        state: data.state,
        district: data.district,
        currentBusiness: data.currentBusiness,
        yearsInBusiness: data.yearsInBusiness,
        interestedCategories: selectedCategories,
        message: data.message,
      });

      setSubmitted(true);
      toast.success("Dealership application received! Our state sales head will contact you within 24 hours.");
      reset();
    } catch (e) {
      toast.error("Failed to submit dealership application.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Commercial Partnership
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
            Grow Your Agricultural Business With BioNature India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Partner with India’s trusted manufacturer of residue-free biological fertilizers, microbial inoculants, and bio-pesticides. Enjoy competitive trade margins, exclusive territory rights, and full agronomy field support.
          </p>
        </div>
      </div>

      {/* Value Proposition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Attractive Trade Margins</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            High ROI on inventory with transparent tier pricing, seasonal promotional schemes, and prompt dispatch from regional hubs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Territorial Exclusivity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dedicated block and district-level distribution rights protecting your dealer network and customer retention.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Farmer Field Campaigns</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our qualified agronomists conduct village-level farmer awareness meets, demonstration plots, and crop doctor camps in your territory.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Quality Assurance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full statutory documentation, FCO test reports, NPOP organic certificates, and 24-month guaranteed shelf-life stability.
          </p>
        </div>
      </div>

      {/* Main Application Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">
            Distributor / Dealership Application Form
          </h2>
          <p className="text-xs text-slate-500">
            Submit your firm’s profile below. Our commercial sales director will review and contact you for territory allocation.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Received!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for your interest in partnering with BioNature India. Our regional distribution team will call your registered contact number to discuss terms and sample shipment.
            </p>
            <Button onClick={() => setSubmitted(false)} className="bg-emerald-600 text-white mt-4">
              Submit Another Application
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Person & Firm Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Applicant Name *</Label>
                <Input placeholder="e.g. Ramesh Chandra" {...register("name")} className="text-xs" />
                {errors.name && <p className="text-[11px] text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Firm / Company Name *</Label>
                <Input placeholder="e.g. Kisan Agri Inputs Pvt Ltd" {...register("company")} className="text-xs" />
                {errors.company && <p className="text-[11px] text-red-500">{errors.company.message}</p>}
              </div>
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Mobile Number (10 Digits) *</Label>
                <Input placeholder="98XXXXXXXX" {...register("mobile")} className="text-xs" />
                {errors.mobile && <p className="text-[11px] text-red-500">{errors.mobile.message}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Business Email Address *</Label>
                <Input type="email" placeholder="contact@yourbusiness.com" {...register("email")} className="text-xs" />
                {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">State *</Label>
                <select
                  {...register("state")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-[11px] text-red-500">{errors.state.message}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">District / Headquarter Town *</Label>
                <Input placeholder="e.g. Nashik, Guntur, Karnal" {...register("district")} className="text-xs" />
                {errors.district && <p className="text-[11px] text-red-500">{errors.district.message}</p>}
              </div>
            </div>

            {/* Current Business & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Current Business Type *</Label>
                <Input placeholder="e.g. Wholesale Fertilizer Distributor, Retail Agrochemical Shop" {...register("currentBusiness")} className="text-xs" />
                {errors.currentBusiness && <p className="text-[11px] text-red-500">{errors.currentBusiness.message}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Years in Agricultural Business *</Label>
                <Input placeholder="e.g. 5 Years, 12 Years" {...register("yearsInBusiness")} className="text-xs" />
                {errors.yearsInBusiness && <p className="text-[11px] text-red-500">{errors.yearsInBusiness.message}</p>}
              </div>
            </div>

            {/* Categories of Interest */}
            <div className="space-y-2">
              <Label className="text-xs block">
                Interested Product Lines (Select all that apply) *
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.name)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between text-left transition-all ${
                      selectedCategories.includes(cat.name)
                        ? "bg-emerald-50 border-emerald-600 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategories.includes(cat.name) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label className="text-xs">Proposed Territory / Distribution Network Details (Optional)</Label>
              <Textarea
                rows={3}
                placeholder="Mention number of sub-dealers, current turnover, key crops in your area..."
                {...register("message")}
                className="text-xs"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm rounded-xl shadow-md"
            >
              {isSubmitting ? "Submitting Application..." : "Submit Dealership Application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
