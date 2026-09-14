import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stethoscope,
  UploadCloud,
  CheckCircle2,
  X,
  Image as ImageIcon,
  AlertCircle,
  Phone,
  ShieldCheck,
  Search,
} from "lucide-react";
import { CROPS, COMPANY_INFO } from "@/data/bionature-data";
import { BioNatureStore, useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const diagnosisSchema = z.object({
  farmerName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  crop: z.string().min(1, "Please select the crop being grown"),
  cropAge: z.string().min(1, "Crop stage / age is required (e.g. 35 days / flowering)"),
  problemDescription: z.string().min(10, "Please describe the symptoms observed (at least 10 characters)"),
});

type DiagnosisFormData = z.infer<typeof diagnosisSchema>;

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

export const CropDiagnosis: React.FC = () => {
  const { store } = useBioNatureStore();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [submittedTicket, setSubmittedTicket] = useState<any | null>(null);

  // Status Lookup state
  const [lookupRef, setLookupRef] = useState("");
  const [searchedTicket, setSearchedTicket] = useState<any | null>(null);
  const [lookupError, setLookupError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be under 5 MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DiagnosisFormData) => {
    try {
      const ticket = BioNatureStore.submitDiagnosis({
        farmerName: data.farmerName,
        mobile: data.mobile,
        email: data.email || undefined,
        state: data.state,
        district: data.district,
        crop: data.crop,
        cropAge: data.cropAge,
        problemDescription: data.problemDescription,
        imageUrls:
          uploadedImages.length > 0
            ? uploadedImages
            : ["https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80"],
      });

      setSubmittedTicket(ticket);
      toast.success(`Diagnosis request registered! Reference Number: ${ticket.referenceNumber}`);
      reset();
      setUploadedImages([]);
    } catch (e) {
      toast.error("Failed to submit diagnosis ticket. Please contact helpline.");
    }
  };

  const handleSearchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    setSearchedTicket(null);
    if (!lookupRef.trim()) {
      setLookupError("Please provide a Reference ID");
      return;
    }
    const t = store.getDiagnosisByReference(lookupRef.trim());
    if (t) {
      setSearchedTicket(t);
    } else {
      setLookupError(`No diagnosis ticket found for "${lookupRef}".`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-amber-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-800/60 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-900 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
            <Stethoscope className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Field Agronomy Clinic</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
            Farmer Crop Diagnosis Desk
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Attach high-clarity photos of affected leaves, stems, or fruits. Our technical team identifies whether the problem is fungal, pest infestation, or mineral deficiency and issues a tailored spray plan.
          </p>
        </div>
      </div>

      {/* Success View */}
      {submittedTicket ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 shadow-sm text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 font-serif">
            Crop Diagnosis Request Submitted!
          </h2>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl max-w-sm mx-auto space-y-1">
            <span className="text-xs font-semibold text-emerald-800">Your Reference ID:</span>
            <div className="text-2xl font-mono font-extrabold text-emerald-900 tracking-wider">
              {submittedTicket.referenceNumber}
            </div>
            <p className="text-[11px] text-emerald-700">
              Please save this ID to track your diagnosis and expert advice.
            </p>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Our certified agronomists have been notified. You will receive an SMS and a response in our portal within 4 working hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              onClick={() => setSubmittedTicket(null)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
            >
              Submit Another Request
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setLookupRef(submittedTicket.referenceNumber);
                setSearchedTicket(submittedTicket);
                setSubmittedTicket(null);
              }}
              className="text-xs"
            >
              View Ticket Details
            </Button>
          </div>
        </div>
      ) : (
        /* Two Column Layout: Form on Left, Lookup & Guidelines on Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Submit Crop Information & Photos
              </h2>
              <p className="text-xs text-slate-500">
                All fields marked with * are required for scientific assessment.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Farmer Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="diag-name" className="text-xs">
                    Farmer Full Name *
                  </Label>
                  <Input id="diag-name" placeholder="e.g. Gurpreet Singh" {...register("farmerName")} className="text-xs" />
                  {errors.farmerName && <p className="text-[11px] text-red-500">{errors.farmerName.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="diag-mob" className="text-xs">
                    Mobile Number (10 Digits) *
                  </Label>
                  <Input id="diag-mob" placeholder="98XXXXXXXX" {...register("mobile")} className="text-xs" />
                  {errors.mobile && <p className="text-[11px] text-red-500">{errors.mobile.message}</p>}
                </div>
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="diag-state" className="text-xs">
                    Farm State *
                  </Label>
                  <select
                    id="diag-state"
                    {...register("state")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="text-[11px] text-red-500">{errors.state.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="diag-district" className="text-xs">
                    District / Taluka *
                  </Label>
                  <Input id="diag-district" placeholder="e.g. Bathinda, Guntur, Nashik" {...register("district")} className="text-xs" />
                  {errors.district && <p className="text-[11px] text-red-500">{errors.district.message}</p>}
                </div>
              </div>

              {/* Crop & Crop Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="diag-crop" className="text-xs">
                    Crop *
                  </Label>
                  <select
                    id="diag-crop"
                    {...register("crop")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                  >
                    <option value="">Select Crop</option>
                    {CROPS.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Other Commercial Crop">Other Commercial Crop</option>
                  </select>
                  {errors.crop && <p className="text-[11px] text-red-500">{errors.crop.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="diag-age" className="text-xs">
                    Crop Age / Growth Stage *
                  </Label>
                  <Input id="diag-age" placeholder="e.g. 40 Days / Flowering / Fruit Sizing" {...register("cropAge")} className="text-xs" />
                  {errors.cropAge && <p className="text-[11px] text-red-500">{errors.cropAge.message}</p>}
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1">
                <Label htmlFor="diag-desc" className="text-xs">
                  Detailed Symptoms & Observations *
                </Label>
                <Textarea
                  id="diag-desc"
                  rows={3}
                  placeholder="Describe leaf yellowing, spots, insect presence, root condition, or blossom drop..."
                  {...register("problemDescription")}
                  className="text-xs"
                />
                {errors.problemDescription && (
                  <p className="text-[11px] text-red-500">{errors.problemDescription.message}</p>
                )}
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-2 pt-1">
                <Label className="text-xs flex items-center justify-between">
                  <span>Upload Affected Crop Images (JPG, PNG, WEBP)</span>
                  <span className="text-[10px] text-slate-400">Max 5MB each</span>
                </Label>

                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50 relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-800">
                    Click to browse or drag & drop crop photographs
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Take close-up shots of leaves, damaged stems, or exposed root collar
                  </p>
                </div>

                {/* Uploaded Previews */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 text-sm rounded-xl shadow-md"
              >
                {isSubmitting ? "Registering Diagnosis..." : "Submit for Scientific Diagnosis"}
              </Button>
            </form>
          </div>

          {/* Right Sidebar: Ticket Tracking & Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            {/* Ticket Lookup Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                Track Submitted Ticket
              </h3>
              <p className="text-xs text-slate-500">
                Check whether our agronomists have responded to your request.
              </p>

              <form onSubmit={handleSearchTicket} className="space-y-2">
                <Input
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  placeholder="e.g. BN-DIAG-8492"
                  className="text-xs uppercase"
                />
                <Button type="submit" size="sm" variant="outline" className="w-full text-xs font-semibold">
                  Track Status
                </Button>
              </form>

              {lookupError && (
                <div className="text-[11px] text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">
                  {lookupError}
                </div>
              )}

              {searchedTicket && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800">{searchedTicket.referenceNumber}</span>
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {searchedTicket.status}
                    </Badge>
                  </div>
                  <div className="text-slate-600 font-medium">
                    Crop: {searchedTicket.crop} ({searchedTicket.cropAge})
                  </div>
                  {searchedTicket.expertNotes && (
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-900 font-medium">
                      Advice: {searchedTicket.expertNotes}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Photography Best Practices */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                Tips for Accurate Photo Diagnosis
              </h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Capture both upper and lower surfaces of affected leaves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Photograph in natural daylight without excessive shadow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Include a picture showing whole-plant habit or patch pattern in field.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
