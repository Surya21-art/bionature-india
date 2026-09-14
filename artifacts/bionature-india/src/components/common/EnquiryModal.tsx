import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sprout, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BioNatureStore } from "@/services/store";
import { toast } from "sonner";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  crop: z.string().optional(),
  enquiryType: z.string().min(1, "Please select enquiry type"),
  message: z.string().min(5, "Please provide a brief message or requirements"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProductName?: string;
  defaultProductSlug?: string;
}

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

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  open,
  onOpenChange,
  defaultProductName,
  defaultProductSlug,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      enquiryType: defaultProductName ? "Product Enquiry" : "General Enquiry",
      message: defaultProductName
        ? `I am interested in ${defaultProductName}. Please share pricing, dosage, and dealer availability.`
        : "",
      crop: "",
      email: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    try {
      BioNatureStore.submitEnquiry({
        name: data.name,
        mobile: data.mobile,
        email: data.email || undefined,
        state: data.state,
        district: data.district,
        crop: data.crop || undefined,
        enquiryType: data.enquiryType,
        message: data.message,
        productName: defaultProductName,
        productSlug: defaultProductSlug,
      });

      setSubmitted(true);
      toast.success("Enquiry submitted successfully! Our agronomy team will contact you shortly.");
    } catch (e) {
      toast.error("Failed to submit enquiry. Please call our helpline directly.");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            {defaultProductName ? `Enquire About ${defaultProductName}` : "Contact BioNature India"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Submit your requirements or crop question. Our certified technical agronomists will respond within 4 hours.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Thank You!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your inquiry has been received. One of our regional field experts will contact you on your registered mobile number.
            </p>
            <Button onClick={handleClose} className="bg-emerald-600 hover:bg-emerald-700 text-white mt-4">
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            {/* Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="enq-name" className="text-xs">
                  Full Name *
                </Label>
                <Input id="enq-name" placeholder="e.g. Ramesh Patel" {...register("name")} className="text-sm" />
                {errors.name && <p className="text-[11px] text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="enq-mobile" className="text-xs">
                  Mobile Number (10 Digits) *
                </Label>
                <Input id="enq-mobile" placeholder="98XXXXXXXX" {...register("mobile")} className="text-sm" />
                {errors.mobile && <p className="text-[11px] text-red-500">{errors.mobile.message}</p>}
              </div>
            </div>

            {/* Email & Enquiry Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="enq-email" className="text-xs">
                  Email Address (Optional)
                </Label>
                <Input id="enq-email" type="email" placeholder="name@domain.com" {...register("email")} className="text-sm" />
                {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="enq-type" className="text-xs">
                  Enquiry Type *
                </Label>
                <select
                  id="enq-type"
                  {...register("enquiryType")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Product Enquiry">Product Enquiry</option>
                  <option value="Farmer Support & Dosage">Farmer Support & Dosage</option>
                  <option value="Dealership / Distributor">Dealership / Distributor</option>
                  <option value="Bulk Order (Cooperative / FPO)">Bulk Order (FPO / Cooperative)</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="enq-state" className="text-xs">
                  State *
                </Label>
                <select
                  id="enq-state"
                  {...register("state")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                <Label htmlFor="enq-district" className="text-xs">
                  District / City *
                </Label>
                <Input id="enq-district" placeholder="e.g. Nashik, Guntur, Bathinda" {...register("district")} className="text-sm" />
                {errors.district && <p className="text-[11px] text-red-500">{errors.district.message}</p>}
              </div>
            </div>

            {/* Crop */}
            <div className="space-y-1">
              <Label htmlFor="enq-crop" className="text-xs">
                Major Crop Being Grown (Optional)
              </Label>
              <Input id="enq-crop" placeholder="e.g. Tomato, Cotton, Paddy, Chilli" {...register("crop")} className="text-sm" />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label htmlFor="enq-msg" className="text-xs">
                Your Message / Specific Requirements *
              </Label>
              <Textarea id="enq-msg" rows={3} placeholder="Describe acreage, crop problem, or product quantities needed..." {...register("message")} className="text-sm" />
              {errors.message && <p className="text-[11px] text-red-500">{errors.message.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2">
              {isSubmitting ? "Submitting..." : "Send Inquiry to Agronomist"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
