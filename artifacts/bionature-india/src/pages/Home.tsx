import React from "react";
import { Link } from "wouter";
import {
  Sprout,
  ShieldCheck,
  TrendingUp,
  FlaskConical,
  Award,
  Users,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  COMPANY_INFO,
  CATEGORIES,
  PRODUCTS,
  CROPS,
  TESTIMONIALS,
  BLOG_POSTS,
  Product,
} from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { SmartProductFinder } from "@/components/solutions/SmartProductFinder";
import { Hero3D } from "@/components/sections/Hero3D";
import { ScrollReveal, Parallax, FloatingElement } from "@/components/common/PageTransition";

interface HomeProps {
  onEnquire: (product?: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onEnquire }) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. 3D HERO SECTION */}
      <Hero3D onEnquire={onEnquire} />

      {/* 2. WHY FARMERS CHOOSE BIONATURE (Trust Section) */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0.2}>
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Excellence in Agricultural Biologicals
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                Why Farmers Across India Choose BioNature
              </h2>
              <p className="text-sm text-slate-600">
                Backed by science, state-of-the-art sterile fermentation, and field trials across major agricultural universities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Highest Microbial CFU Viability",
                description: "Every bottle delivers a minimum guaranteed viable colony count (1x10^8 CFU/ml) with 24-month stability even in hot Indian weather."
              },
              {
                icon: <Sprout className="w-6 h-6" />,
                title: "100% Residue-Free Harvests",
                description: "Zero chemical pesticides, no heavy metal contamination, and safe for beneficial honeybees. Ideal for high-value domestic and export markets."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Proven Yield & Quality Increase",
                description: "Our balanced bio-fertilizers cut synthetic chemical fertilizer expenses by 25-30% while increasing marketable crate yields by 15-28%."
              },
              {
                icon: <FlaskConical className="w-6 h-6" />,
                title: "In-House R&D & Fermentation",
                description: "Advanced laboratory with bioreactors, quality testing spectrophotometers, and batch-wise FCO purity testing before release."
              },
              {
                icon: <Stethoscope className="w-6 h-6" />,
                title: "Free Crop Doctor & Diagnosis",
                description: "Farmers can upload crop pictures to receive tailored biological spray schedules and dosage instructions from certified agronomists."
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Government & Organic Recognized",
                description: "Accredited under ISO 9001:2015, NPOP Organic standards, and fully certified under the Fertilizer Control Order (FCO)."
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)} direction="up">
                <FloatingElement intensity={5} speed={3 + index * 0.2}>
                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl space-y-3 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 3. PRODUCT CATEGORIES (Interactive Grid) */}
      <ScrollReveal delay={0.2}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Complete Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
                  Browse by Agricultural Category
                </h2>
              </div>
              <Link href="/products" className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm flex items-center gap-1">
                <span>View All Categories</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, index) => (
              <ScrollReveal key={cat.id} delay={0.1 * index} direction="up">
                <FloatingElement intensity={3} speed={2.5 + index * 0.1}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-emerald-500 hover:shadow-lg transition-all group flex flex-col justify-between space-y-3"
                  >
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-tight">
                        {cat.description}
                      </p>
                    </div>
                  </Link>
                </FloatingElement>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 4. SMART SOLUTION FINDER (WIZARD) */}
      <ScrollReveal delay={0.3}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Parallax speed={0.1}>
            <SmartProductFinder onEnquire={onEnquire} />
          </Parallax>
        </section>
      </ScrollReveal>

      {/* 5. FEATURED PRODUCTS SHOWCASE */}
      <ScrollReveal delay={0.2}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Farmer Favorites
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
                  Top BioNature Formulations
                </h2>
              </div>
              <Link href="/products" className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm flex items-center gap-1">
                <span>Explore All 5+ Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={0.1 * (index + 1)} direction="up">
                <ProductCard product={product} onEnquire={onEnquire} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 6. SOLUTIONS BY CROP SPOTLIGHT */}
      <section className="bg-emerald-50/70 border-y border-emerald-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Tailored Agronomy Schedules
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Solutions for India’s Major Crops
            </h2>
            <p className="text-sm text-slate-600">
              Stage-by-stage nutritional management and pest prevention programs customized for specific crop phenology.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CROPS.slice(0, 5).map((crop) => (
              <Link
                key={crop.id}
                href={`/solutions/crops/${crop.slug}`}
                className="bg-white rounded-2xl border border-emerald-200/70 overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                    {crop.name}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-medium">View Crop Guide →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/solutions">
              <Button variant="outline" className="text-emerald-800 border-emerald-300 hover:bg-emerald-100 font-semibold text-xs">
                View Complete Solutions Library (Crops & Problems)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FARMER CROP DIAGNOSIS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-800/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-100">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Free Expert Agronomy Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Having a Problem With Your Crop?
            </h2>
            <p className="text-sm text-amber-100 leading-relaxed">
              Upload photos of curled leaves, root decay, or insects. Our certified agronomists diagnose the issue and provide a scientific biological treatment schedule within 4 hours.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/crop-diagnosis">
                <Button size="lg" className="bg-white hover:bg-amber-50 text-amber-950 font-bold text-sm shadow-md">
                  Upload Crop Photo for Diagnosis
                </Button>
              </Link>
              <Link href="/farmer-help">
                <Button variant="outline" size="lg" className="border-amber-200 text-white hover:bg-amber-800/60 text-sm font-semibold">
                  Visit Farmer Help Center
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center space-y-2 shrink-0 backdrop-blur-md max-w-xs">
            <Phone className="w-8 h-8 mx-auto text-amber-200" />
            <div className="text-xs text-amber-100 font-medium">Toll-Free Farmer Hotline</div>
            <div className="text-xl font-black font-serif text-white">{COMPANY_INFO.phone}</div>
            <div className="text-[11px] text-amber-200">Mon - Sat: 9:00 AM - 6:30 PM</div>
          </div>
        </div>
      </section>

      {/* 8. FARMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Real Field Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Verified Farmer Experiences
          </h2>
          <p className="text-sm text-slate-600">
            Hear directly from progressive farmers who transformed their productivity using BioNature biological inputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {t.yieldIncrease}
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.farmerName}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.farmerName}</div>
                  <div className="text-[11px] text-slate-500">
                    {t.location}, {t.state} • {t.crop}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. LATEST BLOG INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Farmer Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
              Agronomy Knowledge Hub
            </h2>
          </div>
          <Link href="/blog" className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm flex items-center gap-1">
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div className="aspect-video bg-slate-100 overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-medium px-2.5 py-0.5 rounded backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {post.date} • {post.readTime}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-emerald-700 flex items-center gap-1 pt-2"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. DEALERSHIP / DISTRIBUTOR CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Business Partnership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Become a BioNature Certified Distributor
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Expand your agricultural input business with high-margin biological fertilizers and biopesticides. We provide technical training, field marketing collateral, and farmer promotional meets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/distributor">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6">
                Apply for Dealership
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-sm">
                Contact Business Head
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
