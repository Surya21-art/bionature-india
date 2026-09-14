import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Phone,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Award,
  BookOpen,
  FileText,
  UserCheck,
  Stethoscope,
  Building2,
  Users,
} from "lucide-react";
import { COMPANY_INFO, CATEGORIES } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { AnimatedDropdown } from "@/components/ui/animated-dropdown";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenEnquiry: (productName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenEnquiry }) => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform header based on scroll
  const headerBlur = useTransform(scrollY, [0, 100], [8, 20]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 hidden md:block border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ISO 9001:2015 & NPOP Organic Certified Agri-Inputs
            </span>
            <span className="text-emerald-500">|</span>
            <span className="text-emerald-300">Residue-Free • High Viability Microbial Formulations</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Farmer Helpline: {COMPANY_INFO.phone}</span>
            </a>
            <span className="text-emerald-500">|</span>
            <Link href="/admin" className="text-emerald-400 hover:text-white font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <motion.header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white backdrop-blur-md border-b border-emerald-100 ${
          isScrolled ? "py-2.5 shadow-md" : "py-3.5 shadow-sm"
        }`}
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
          scale: headerScale,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end sm:justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="hidden sm:flex items-center gap-3 group shrink-0">
            {/* Official BioNature Logo with 3D Animation */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* 3D Shadow Effect */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-12 h-12 bg-green-300/30 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Actual Logo SVG */}
              <motion.div
                className="w-12 h-12 relative overflow-hidden rounded-full"
                whileHover={{
                  boxShadow: "0 8px 25px rgba(0, 166, 81, 0.4)",
                }}
              >
                <img 
                  src="/bionature-logo.svg" 
                  alt="BioNature Logo" 
                  className="w-full h-full object-contain"
                />
                
                {/* Animated overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-300/10 to-transparent rounded-full"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Company Name with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-2xl font-extrabold tracking-tight text-emerald-950 font-serif block leading-none"
                whileHover={{
                  color: "#065f46",
                  textShadow: "0 0 8px rgba(16, 185, 129, 0.3)",
                }}
              >
                BioNature
                <motion.span
                  className="text-emerald-600 font-sans font-bold text-sm ml-1 px-1.5 py-0.5 bg-emerald-50 rounded"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#dcfce7",
                  }}
                >
                  INDIA
                </motion.span>
              </motion.span>
              <motion.span
                className="text-xs text-emerald-700 font-medium tracking-wide block mt-0.5"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Make crop easier
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors ${
                location === "/" ? "text-emerald-700 font-semibold bg-emerald-50" : ""
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <AnimatedDropdown
              trigger={<span>Products</span>}
              isActive={location.startsWith("/products")}
              items={[
                {
                  label: "All Products Catalog",
                  href: "/products",
                  icon: (
                    <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ),
                  description: "Browse our complete product range"
                },
                { separator: true, label: "" },
                ...CATEGORIES.slice(0, 7).map(cat => ({
                  label: cat.name,
                  href: `/products?category=${encodeURIComponent(cat.name)}`,
                  description: `${cat.count || 0} products available`
                })),
                { separator: true, label: "" },
                {
                  label: "Smart Product Finder",
                  href: "/smart-finder",
                  badge: "AI",
                  description: "Find the perfect product with AI assistance"
                }
              ]}
            />

            {/* Solutions Dropdown */}
            <AnimatedDropdown
              trigger={<span>Solutions</span>}
              isActive={location.startsWith("/solutions")}
              items={[
                {
                  label: "Solutions Overview",
                  href: "/solutions",
                  description: "Comprehensive agricultural solutions"
                },
                { separator: true, label: "" },
                {
                  label: "Solutions by Crop",
                  href: "/solutions#crops",
                  icon: (
                    <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ),
                  description: "Targeted solutions for 10+ crops"
                },
                {
                  label: "Solutions by Problem",
                  href: "/solutions#problems",
                  icon: <ShieldCheck className="w-4 h-4" />,
                  description: "Problem-specific treatments"
                },
                {
                  label: "Interactive Solution Finder",
                  href: "/smart-finder",
                  icon: <Search className="w-4 h-4" />,
                  badge: "Smart",
                  description: "AI-powered recommendation engine"
                }
              ]}
            />

            {/* Farmer Help Center Dropdown */}
            <AnimatedDropdown
              trigger={
                <div className="flex items-center gap-1">
                  <span>Farmer Help</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                </div>
              }
              isActive={
                location.startsWith("/farmer-help") || location.startsWith("/crop-diagnosis")
              }
              items={[
                {
                  label: "Farmer Help Center Hub",
                  href: "/farmer-help",
                  icon: <UserCheck className="w-4 h-4" />,
                  description: "Complete support center for farmers"
                },
                {
                  label: "Crop Photo Diagnosis Tool",
                  href: "/crop-diagnosis",
                  icon: <Stethoscope className="w-4 h-4" />,
                  badge: "AI",
                  description: "Upload crop photos for instant diagnosis"
                },
                {
                  label: "Track Diagnosis Ticket",
                  href: "/farmer-help#tracking",
                  description: "Track your diagnosis by ticket ID"
                }
              ]}
            />

            {/* About Us Dropdown */}
            <AnimatedDropdown
              trigger={<span>About</span>}
              isActive={
                location === "/about" ||
                location === "/infrastructure" ||
                location === "/certifications" ||
                location === "/awards" ||
                location === "/testimonials"
              }
              items={[
                {
                  label: "Who We Are & Mission",
                  href: "/about",
                  description: "Our story and agricultural mission"
                },
                {
                  label: "R&D & Manufacturing Plant",
                  href: "/infrastructure",
                  icon: <Building2 className="w-4 h-4" />,
                  description: "State-of-the-art facilities"
                },
                {
                  label: "Quality & Certifications",
                  href: "/certifications",
                  icon: <ShieldCheck className="w-4 h-4" />,
                  description: "ISO 9001:2015 & NPOP certified"
                },
                {
                  label: "Awards & Honors",
                  href: "/awards",
                  icon: <Award className="w-4 h-4" />,
                  description: "Recognition and achievements"
                },
                {
                  label: "Farmer Testimonials",
                  href: "/testimonials",
                  icon: <Users className="w-4 h-4" />,
                  description: "Success stories from farmers"
                }
              ]}
            />

            {/* Resources Dropdown */}
            <AnimatedDropdown
              trigger={<span>Resources</span>}
              isActive={
                location.startsWith("/blog") ||
                location === "/resources" ||
                location === "/gallery" ||
                location === "/videos"
              }
              items={[
                {
                  label: "Agri Blog & Knowledge Hub",
                  href: "/blog",
                  icon: <BookOpen className="w-4 h-4" />,
                  description: "Latest agricultural insights"
                },
                {
                  label: "Downloads & Dosage Charts",
                  href: "/resources",
                  icon: <FileText className="w-4 h-4" />,
                  description: "Technical resources and guides"
                },
                {
                  label: "Field Photo Gallery",
                  href: "/gallery",
                  description: "Success stories in images"
                },
                {
                  label: "Application Videos",
                  href: "/videos",
                  description: "How-to and demonstration videos"
                }
              ]}
            />

            <Link
              href="/distributor"
              className={`px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors ${
                location === "/distributor" ? "text-emerald-700 font-semibold bg-emerald-50" : ""
              }`}
            >
              Dealership
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors ${
                location === "/contact" ? "text-emerald-700 font-semibold bg-emerald-50" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-emerald-800 bg-emerald-50 border border-emerald-200 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 opacity-100"
              title="Search products, crops, and guides"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                "Hello BioNature India team, I would like agricultural product and crop advice."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 text-xs font-semibold px-3 py-2 rounded-lg border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span>WhatsApp</span>
            </a>

            {/* Enquire Now CTA */}
            <Button
              onClick={() => onOpenEnquiry()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-700 font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg shadow-sm shadow-emerald-700/20 opacity-100"
            >
              Enquire Now
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-emerald-100 shadow-xl max-h-[85vh] overflow-y-auto px-4 py-6 animate-in slide-in-from-top-2">
            <div className="space-y-4">
              <Link href="/" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Home
              </Link>
              <Link href="/products" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                All Products Catalog
              </Link>
              <Link href="/smart-finder" className="block py-2 text-base font-semibold text-emerald-600 border-b">
                ✨ Smart Product Finder
              </Link>
              <Link href="/solutions" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Solutions by Crop & Problem
              </Link>
              <Link href="/crop-diagnosis" className="block py-2 text-base font-semibold text-amber-700 border-b">
                🩺 Farmer Crop Diagnosis Tool
              </Link>
              <Link href="/farmer-help" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Farmer Help Center
              </Link>
              <Link href="/about" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                About Us & Infrastructure
              </Link>
              <Link href="/certifications" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Quality & Certifications
              </Link>
              <Link href="/distributor" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Become a Distributor
              </Link>
              <Link href="/blog" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Agri Blog & Knowledge Hub
              </Link>
              <Link href="/resources" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Downloads & Brochures
              </Link>
              <Link href="/contact" className="block py-2 text-base font-semibold text-emerald-950 border-b">
                Contact Us
              </Link>
              <Link href="/admin" className="block py-2 text-base font-semibold text-emerald-700 border-b">
                Admin Management Portal
              </Link>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-800 rounded-lg font-medium text-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Call Helpline: {COMPANY_INFO.phone}
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.header>
    </>
  );
};
