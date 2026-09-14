import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Product } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onEnquire: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnquire }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        scale: 1.02,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {/* 3D Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-emerald-500/20 rounded-2xl blur-lg opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Card */}
      <motion.div
        className="relative bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group"
        animate={{
          borderColor: isHovered ? "rgba(16, 185, 129, 0.3)" : "rgba(148, 163, 184, 0.5)",
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)" 
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? 0.03 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-green-400/10" />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={isHovered ? {
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              } : {}}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Product Image & Category Badge */}
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ 
              scale: 1.1,
              rotateY: 2,
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* 3D Image Overlay Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent opacity-0"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
            >
              <Badge className="bg-emerald-700/90 hover:bg-emerald-700 text-white font-medium text-[11px] backdrop-blur-sm border-0 shadow-lg">
                {product.category}
              </Badge>
            </motion.div>
            
            {product.featured && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.1, rotate: -2 }}
              >
                <Badge className="bg-amber-500 hover:bg-amber-500 text-slate-950 font-bold text-[10px] border-0 shadow-lg">
                  <motion.span
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ★
                  </motion.span>
                  <span className="ml-1">Recommended</span>
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Floating Action Hint */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute bottom-3 right-3"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content with 3D Transform */}
        <motion.div
          className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10"
          animate={{
            rotateX: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <Link href={`/products/${product.slug}`}>
              <motion.h3
                className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-1"
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 8px rgba(16, 185, 129, 0.3)",
                }}
              >
                {product.name}
              </motion.h3>
            </Link>

            <motion.p
              className="text-xs text-slate-500 line-clamp-2 leading-relaxed"
              animate={{
                color: isHovered ? "#64748b" : "#64748b",
              }}
            >
              {product.shortDescription}
            </motion.p>

            {/* Animated Key Benefits */}
            <div className="pt-2 space-y-1">
              {product.benefits.slice(0, 2).map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-1.5 text-xs text-slate-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                  whileHover={{ x: 3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  </motion.div>
                  <span className="line-clamp-1">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated Suitable Crops Badges */}
            <div className="pt-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Suitable Crops
              </span>
              <div className="flex flex-wrap gap-1">
                {product.suitableCrops.slice(0, 3).map((crop, idx) => (
                  <motion.span
                    key={crop}
                    className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "#f0fdf4",
                      color: "#16a34a",
                    }}
                  >
                    {crop}
                  </motion.span>
                ))}
                {product.suitableCrops.length > 3 && (
                  <motion.span
                    className="text-[10px] text-slate-400 self-center"
                    animate={{
                      opacity: isHovered ? 0.8 : 0.6,
                    }}
                  >
                    +{product.suitableCrops.length - 3} more
                  </motion.span>
                )}
              </div>
            </div>
          </div>

          {/* 3D Action Buttons */}
          <motion.div
            className="pt-3 border-t border-slate-100 flex items-center gap-2"
            animate={{
              borderColor: isHovered ? "rgba(16, 185, 129, 0.2)" : "rgba(241, 245, 249, 1)",
            }}
          >
            <Link href={`/products/${product.slug}`} className="flex-1">
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                >
                  <span>View Details</span>
                  <motion.div
                    animate={isHovered ? { x: 2 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateY: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                onClick={() => onEnquire(product)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <motion.div
                  animate={isHovered ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                </motion.div>
                <span>Enquire</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Glow Line */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          animate={{
            width: isHovered ? "80%" : "0%",
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};
