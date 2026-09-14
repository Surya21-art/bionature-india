export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string;
  applicationMethod: string;
  dosage: string;
  packSizes: string[];
  images: string[];
  documents: { name: string; type: string; size: string }[];
  suitableCrops: string[];
  targetProblems: string[];
  featured?: boolean;
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count?: number;
  icon: string;
  image: string;
}

export interface Crop {
  id: string;
  name: string;
  slug: string;
  scientificName: string;
  description: string;
  image: string;
  commonProblems: string[];
  recommendedProducts: string[];
  stages: {
    stage: string;
    days: string;
    description: string;
    management: string;
    recommendedProducts: string[];
  }[];
}

export interface Problem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  causes: string[];
  management: string;
  recommendedProducts: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  farmerName: string;
  location: string;
  state: string;
  crop: string;
  productUsed: string;
  yieldIncrease: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuingBody: string;
  certNumber: string;
  validity: string;
  description: string;
  image: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
}

// VERIFIED OFFICIAL COMPANY INFORMATION - Updated to match bionatureindia.com
export const COMPANY_INFO = {
  name: "BioNature",
  tagline: "Providing quality agrochemical solutions for sustainable farming",
  subheadline: "Ambitious by the objective of contributing to the national growth through use of economical and eco-friendly technologies for sustainable agriculture, BioNature is committed to provide the Indian farmers with better farming techniques and products to make them more profitable and globally competitive.",
  phone: "+91 956 6753 333",
  whatsapp: "+91 956 6753 333",
  email: "hari@bionatureindia.com",
  supportEmail: "hari@bionatureindia.com",
  dealershipEmail: "hari@bionatureindia.com",
  address: "SARASWATHI NAGAR, CHINNATHIRUPATHY, SALEM-636008, Tamil Nadu, India",
  workingHours: "9:30 AM - 6:30 PM",
  founder: "Dr. Harikrishnan",
  established: "2012",
  partner: "Agrocare India Pvt. Ltd, Bangalore",
  mission: "To grow a double crop production in organic methods of farming",
  vision: "Transforming nature's future",
  manufacturingUnit: "Chinnathirupathy",
  registeredOffice: "Salem, Tamil Nadu",
  stats: {
    farmersSupported: "10,000+", // Official: 10000+ farmers being benefitted
    hectaresCovered: "20,000", // Official: 20k hectares under sustainable cultivation
    dealersCount: "Information coming soon",
    statesActive: "Information coming soon", 
    productsCount: "5", // Updated to match current implementation
    satisfactionRate: "98%", // Official: 98% Customer Satisfaction
    farmersPartnered: "12,000+", // Official: 12k Farmers partnered with across regions
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Bio Fertilizers",
    slug: "bio-fertilizers",
    description: "Live beneficial microbial inoculants that fix atmospheric nitrogen and mobilize soil nutrients.",
    count: 2,
    icon: "Sprout",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-2",
    name: "Bio Pesticides",
    slug: "bio-pesticides",
    description: "Botanical and entomopathogenic agents controlling caterpillar, borer, and sucking pest infestations.",
    icon: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-3",
    name: "Bio Fungicides",
    slug: "bio-fungicides",
    description: "Antagonistic biological organisms suppressing root rot, wilts, blights, and powdery mildew safely.",
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-4",
    name: "Plant Nutrition",
    slug: "plant-nutrition",
    description: "Balanced organic plant foods promoting vigorous leaf canopy and sustained cellular vitality.",
    icon: "Leaf",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-5",
    name: "Micronutrients",
    slug: "micronutrients",
    description: "Chelated Zinc, Boron, Ferrous, and multi-micronutrients eliminating deficiency symptoms rapidly.",
    count: 2,
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-6",
    name: "Plant Growth Promoters",
    slug: "plant-growth-promoters",
    description: "Natural amino acids, fulvic complexes, and bio-stimulants triggering profuse flowering and root growth.",
    count: 1,
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-7",
    name: "Soil Health",
    slug: "soil-health",
    description: "Humic conditioners, VAM mycorrhiza, and carbon enhancers rejuvenating degraded farm soils.",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-8",
    name: "Crop Protection",
    slug: "crop-protection",
    description: "Integrated biological barriers preventing nematode damage, viral transmission, and fungal outbreaks.",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-9",
    name: "Seaweed Products",
    slug: "seaweed-products",
    description: "Cold-extracted marine Ascophyllum Nodosum packed with natural cytokinins and alginic bio-actives.",
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-10",
    name: "Specialty Agricultural Solutions",
    slug: "specialty-agricultural-solutions",
    description: "Specialized bio-surfactants, silicon foliar activators, and pH balancers maximizing spray efficacy.",
    icon: "FlaskConical",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80",
  },
];

// VERIFIED PRODUCTS FROM OFFICIAL BIONATUREINDIA.COM WEBSITE  
// Matching the 5 products currently implemented in the system
export const PRODUCTS: Product[] = [
  {
    id: "prod-1", name: "Phytocil", slug: "phytocil", category: "Bio Fertilizers", categorySlug: "bio-fertilizers",
    shortDescription: "Bio-fertilizer for enhanced plant growth and soil health.",
    description: "Information coming soon - product details to be updated from official BioNature specifications.",
    benefits: ["Information coming soon"], ingredients: "Information coming soon", applicationMethod: "Information coming soon",
    dosage: "Information coming soon", packSizes: ["Information coming soon"],
    images: ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80"],
    documents: [], suitableCrops: [], targetProblems: [], featured: false, published: true,
  },
  {
    id: "prod-2", name: "Energy Pro", slug: "energy-pro", category: "Plant Growth Promoters", categorySlug: "plant-growth-promoters",
    shortDescription: "Energy booster for enhanced plant vigor.",
    description: "Information coming soon - product details to be updated from official BioNature specifications.",
    benefits: ["Information coming soon"], ingredients: "Information coming soon", applicationMethod: "Information coming soon",
    dosage: "Information coming soon", packSizes: ["Information coming soon"],
    images: ["https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80"],
    documents: [], suitableCrops: [], targetProblems: [], featured: false, published: true,
  },
  {
    id: "prod-3", name: "Grow Mag", slug: "grow-mag", category: "Micronutrients", categorySlug: "micronutrients",
    shortDescription: "Magnesium supplement for plant growth.",
    description: "Information coming soon - product details to be updated from official BioNature specifications.",
    benefits: ["Information coming soon"], ingredients: "Information coming soon", applicationMethod: "Information coming soon",
    dosage: "Information coming soon", packSizes: ["Information coming soon"],
    images: ["https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"],
    documents: [], suitableCrops: [], targetProblems: [], featured: false, published: true,
  },
  {
    id: "prod-4", name: "AgroMag", slug: "agromag", category: "Micronutrients", categorySlug: "micronutrients",
    shortDescription: "Agricultural magnesium supplement.",
    description: "Information coming soon - product details to be updated from official BioNature specifications.",
    benefits: ["Information coming soon"], ingredients: "Information coming soon", applicationMethod: "Information coming soon",
    dosage: "Information coming soon", packSizes: ["Information coming soon"],
    images: ["https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"],
    documents: [], suitableCrops: [], targetProblems: [], featured: false, published: true,
  },
  {
    id: "prod-5", name: "BioFert-G", slug: "biofert-g", category: "Bio Fertilizers", categorySlug: "bio-fertilizers",
    shortDescription: "Granular bio-fertilizer for soil enrichment.",
    description: "Information coming soon - product details to be updated from official BioNature specifications.",
    benefits: ["Information coming soon"], ingredients: "Information coming soon", applicationMethod: "Information coming soon",
    dosage: "Information coming soon", packSizes: ["Information coming soon"],
    images: ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80"],
    documents: [], suitableCrops: [], targetProblems: [], featured: false, published: true,
  },
];

// CROPS, PROBLEMS, TESTIMONIALS, BLOG_POSTS, CERTIFICATIONS, AWARDS - Temporarily empty
// These will be populated once verified information is obtained from BioNature
export const CROPS: Crop[] = [];
export const PROBLEMS: Problem[] = [];
export const TESTIMONIALS: Testimonial[] = [];
export const BLOG_POSTS: BlogPost[] = [];
export const CERTIFICATIONS: Certificate[] = [];
export const AWARDS: Award[] = [];
export const INFRASTRUCTURE_FACILITIES: any[] = [];