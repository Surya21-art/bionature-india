import React from "react";
import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";

interface WhatsAppButtonProps {
  productName?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ productName }) => {
  const cleanNumber = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const defaultText = productName
    ? `Hello BioNature India, I am interested in ${productName}. Please share dosage and availability details.`
    : "Hello BioNature India, I would like agricultural guidance and product advice.";

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
      <div className="hidden md:block bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Chat with BioNature Expert
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BioNature on WhatsApp"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/80 animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
