import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { BioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  subject: z.string().min(3, "Subject is required"),
  enquiryType: z.string().min(1, "Please select an enquiry category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: "Product Enquiry",
      email: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      BioNatureStore.submitEnquiry({
        name: data.name,
        mobile: data.mobile,
        email: data.email || undefined,
        state: "Direct Contact Form",
        district: "National",
        enquiryType: data.enquiryType,
        message: `[Subject: ${data.subject}] ${data.message}`,
      });

      setSubmitted(true);
      toast.success("Thank you! Your message has been received by our head office team.");
      reset();
    } catch {
      toast.error("Failed to send message. Please call our helpline directly.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 shadow-xl space-y-4 max-w-4xl">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          Contact BioNature India
        </h1>
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          Have questions about our bio-fertilizer formulations, bulk FPO supplies, or dealership opportunities? Connect with our corporate office or technical support desk.
        </p>
      </div>

      {/* Main Grid: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 Cols: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 font-serif">
              Corporate & Manufacturing Headquarters
            </h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Plant & Office Address</strong>
                  <p className="leading-relaxed">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Farmer Support Helpline</strong>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-emerald-700 font-semibold hover:underline">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Official WhatsApp Desk</strong>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Email Enquiries</strong>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-emerald-700 font-semibold hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Working Hours</strong>
                  <p>{COMPANY_INFO.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview Container */}
          <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 aspect-[16/9] relative flex items-center justify-center text-slate-400 p-6 text-center">
            <div>
              <Building2 className="w-8 h-8 mx-auto mb-2 text-emerald-600 opacity-60" />
              <div className="text-xs font-semibold text-slate-700">BioNature India Biotech Plant</div>
              <div className="text-[11px] text-slate-500">Industrial Estate, Hyderabad, Telangana</div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500">
              Our executive agronomy and customer care team will respond within 4 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Delivered!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting BioNature India. A team member has been assigned to your query.
              </p>
              <Button onClick={() => setSubmitted(false)} className="bg-emerald-600 text-white mt-4 text-xs">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Your Full Name *</Label>
                  <Input placeholder="e.g. Rameshwar Patil" {...register("name")} className="text-xs" />
                  {errors.name && <p className="text-[11px] text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Mobile Number (10 Digits) *</Label>
                  <Input placeholder="98XXXXXXXX" {...register("mobile")} className="text-xs" />
                  {errors.mobile && <p className="text-[11px] text-red-500">{errors.mobile.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Email Address (Optional)</Label>
                  <Input type="email" placeholder="name@domain.com" {...register("email")} className="text-xs" />
                  {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Enquiry Department *</Label>
                  <select
                    {...register("enquiryType")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                  >
                    <option value="Product Enquiry">Product Enquiry & Pricing</option>
                    <option value="Farmer Support">Farmer Technical Support</option>
                    <option value="Distributor">Distributor / Dealership</option>
                    <option value="Bulk Order">Bulk Order (FPO / Institutional)</option>
                    <option value="Technical Support">R&D & Quality Query</option>
                    <option value="General Enquiry">General Corporate Query</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Subject / Purpose *</Label>
                <Input placeholder="e.g. Price quote for Bio-NPK 500L supply" {...register("subject")} className="text-xs" />
                {errors.subject && <p className="text-[11px] text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Your Detailed Message *</Label>
                <Textarea
                  rows={4}
                  placeholder="Share details of your farm location, crops, or partnership requirement..."
                  {...register("message")}
                  className="text-xs"
                />
                {errors.message && <p className="text-[11px] text-red-500">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm rounded-xl shadow-md"
              >
                {isSubmitting ? "Sending..." : "Send Message to BioNature Team"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
