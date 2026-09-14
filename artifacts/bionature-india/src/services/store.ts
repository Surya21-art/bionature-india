import { useState, useEffect } from "react";
import { PRODUCTS, Product } from "@/data/bionature-data";

export interface EnquiryRecord {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  state: string;
  district: string;
  crop?: string;
  productName?: string;
  productSlug?: string;
  enquiryType: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "converted" | "closed";
  createdAt: string;
}

export interface FarmerDiagnosisRecord {
  id: string;
  referenceNumber: string;
  farmerName: string;
  mobile: string;
  email?: string;
  state: string;
  district: string;
  crop: string;
  cropAge: string;
  problemDescription: string;
  imageUrls: string[];
  status: "new" | "assigned" | "in_review" | "responded" | "closed";
  expertNotes?: string;
  recommendedProducts?: string[];
  createdAt: string;
}

export interface DistributorRecord {
  id: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  currentBusiness: string;
  yearsInBusiness: string;
  interestedCategories: string[];
  message?: string;
  status: "new" | "contacted" | "approved" | "closed";
  createdAt: string;
}

const STORAGE_KEYS = {
  PRODUCTS: "bionature_products_v1",
  ENQUIRIES: "bionature_enquiries_v1",
  DIAGNOSIS: "bionature_diagnosis_v1",
  DISTRIBUTORS: "bionature_distributors_v1",
  ADMIN_AUTH: "bionature_admin_auth_v1",
};

// Initial Seed Data
const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: "enq-1",
    name: "Rajesh Kumar Verma",
    mobile: "9876543210",
    email: "rajesh.verma@example.com",
    state: "Uttar Pradesh",
    district: "Varanasi",
    crop: "Tomato",
    productName: "Bio-NPK Liquid Consortia",
    productSlug: "bio-npk-liquid-consortia",
    enquiryType: "Product Enquiry",
    message: "Need bulk pricing for 50 Liters for my cooperative farm members.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "enq-2",
    name: "Gurpreet Singh",
    mobile: "9812345678",
    email: "gurpreet.paddy@example.com",
    state: "Punjab",
    district: "Ludhiana",
    crop: "Paddy",
    productName: "Zinc Solubilizing Bio-Fertilizer",
    productSlug: "zinc-solubilizing-bio-fertilizer",
    enquiryType: "Bulk Order",
    message: "Looking for dealership in Ludhiana block and dosage recommendations for Basmati 1509.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

const INITIAL_DIAGNOSES: FarmerDiagnosisRecord[] = [
  {
    id: "diag-1",
    referenceNumber: "BN-DIAG-8492",
    farmerName: "Balwinder Singh",
    mobile: "9887766554",
    email: "balwinder@example.com",
    state: "Punjab",
    district: "Bathinda",
    crop: "Cotton",
    cropAge: "45 Days",
    problemDescription: "Leaves turning pale yellow with dark curling at margins. Sucking insects visible under leaves.",
    imageUrls: ["https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80"],
    status: "in_review",
    expertNotes: "Symptoms indicate early whitefly feeding combined with minor Zinc deficiency. Recommended Neem Shield 10,000 PPM + Chelated Zinc foliar spray.",
    recommendedProducts: ["neem-shield-bio-pesticide-10000-ppm", "chelated-multi-micronutrient-liquid"],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "diag-2",
    referenceNumber: "BN-DIAG-9120",
    farmerName: "Narayana Swamy",
    mobile: "9443322110",
    state: "Karnataka",
    district: "Kolar",
    crop: "Tomato",
    cropAge: "30 Days (Flowering initiation)",
    problemDescription: "Sudden wilting of healthy plants in patches after heavy morning rain. Roots have dark collar rot.",
    imageUrls: ["https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80"],
    status: "responded",
    expertNotes: "Severe Phytophthora collar rot. Immediately drench surrounding beds with Trichoderma Viride and avoid standing water.",
    recommendedProducts: ["trichoderma-viride-bio-fungicide"],
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

const INITIAL_DISTRIBUTORS: DistributorRecord[] = [
  {
    id: "dist-1",
    name: "Mahesh Agrotech",
    company: "Mahesh Agri Inputs Pvt Ltd",
    mobile: "9845012345",
    email: "mahesh.agri@example.com",
    state: "Maharashtra",
    district: "Nashik",
    currentBusiness: "Agricultural Retailer & Distributor",
    yearsInBusiness: "12 Years",
    interestedCategories: ["Bio Fertilizers", "Bio Fungicides", "Seaweed Products"],
    message: "We have 150+ sub-dealer network across Nashik and Niphad grape and vegetable belts.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

// Helper to get from local storage with fallback
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("bionature_storage_updated"));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

export const BioNatureStore = {
  // Products
  getProducts(): Product[] {
    return getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, PRODUCTS);
  },
  getProductBySlug(slug: string): Product | undefined {
    const all = this.getProducts();
    return all.find((p) => p.slug === slug);
  },
  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === product.id || p.slug === product.slug);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    setLocal(STORAGE_KEYS.PRODUCTS, products);
  },
  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    setLocal(STORAGE_KEYS.PRODUCTS, products);
  },

  // Enquiries
  getEnquiries(): EnquiryRecord[] {
    return getLocal<EnquiryRecord[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },
  submitEnquiry(data: Omit<EnquiryRecord, "id" | "status" | "createdAt">): EnquiryRecord {
    const records = this.getEnquiries();
    const newRecord: EnquiryRecord = {
      ...data,
      id: `enq-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    setLocal(STORAGE_KEYS.ENQUIRIES, records);
    return newRecord;
  },
  updateEnquiryStatus(id: string, status: EnquiryRecord["status"]): void {
    const records = this.getEnquiries().map((e) => (e.id === id ? { ...e, status } : e));
    setLocal(STORAGE_KEYS.ENQUIRIES, records);
  },

  // Farmer Diagnosis
  getDiagnoses(): FarmerDiagnosisRecord[] {
    return getLocal<FarmerDiagnosisRecord[]>(STORAGE_KEYS.DIAGNOSIS, INITIAL_DIAGNOSES);
  },
  getDiagnosisByReference(ref: string): FarmerDiagnosisRecord | undefined {
    const cleanRef = ref.trim().toUpperCase();
    return this.getDiagnoses().find((d) => d.referenceNumber.toUpperCase() === cleanRef);
  },
  submitDiagnosis(data: Omit<FarmerDiagnosisRecord, "id" | "referenceNumber" | "status" | "createdAt">): FarmerDiagnosisRecord {
    const records = this.getDiagnoses();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `BN-DIAG-${randomNum}`;
    const newRecord: FarmerDiagnosisRecord = {
      ...data,
      id: `diag-${Date.now()}`,
      referenceNumber,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    setLocal(STORAGE_KEYS.DIAGNOSIS, records);
    return newRecord;
  },
  updateDiagnosis(id: string, updates: Partial<FarmerDiagnosisRecord>): void {
    const records = this.getDiagnoses().map((d) => (d.id === id ? { ...d, ...updates } : d));
    setLocal(STORAGE_KEYS.DIAGNOSIS, records);
  },

  // Distributors
  getDistributors(): DistributorRecord[] {
    return getLocal<DistributorRecord[]>(STORAGE_KEYS.DISTRIBUTORS, INITIAL_DISTRIBUTORS);
  },
  submitDistributor(data: Omit<DistributorRecord, "id" | "status" | "createdAt">): DistributorRecord {
    const records = this.getDistributors();
    const newRecord: DistributorRecord = {
      ...data,
      id: `dist-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    setLocal(STORAGE_KEYS.DISTRIBUTORS, records);
    return newRecord;
  },
  updateDistributorStatus(id: string, status: DistributorRecord["status"]): void {
    const records = this.getDistributors().map((d) => (d.id === id ? { ...d, status } : d));
    setLocal(STORAGE_KEYS.DISTRIBUTORS, records);
  },

  // Admin Auth
  isAdminLoggedIn(): boolean {
    return getLocal<boolean>(STORAGE_KEYS.ADMIN_AUTH, false);
  },
  setAdminLogin(status: boolean): void {
    setLocal(STORAGE_KEYS.ADMIN_AUTH, status);
  },
};

// React Hook to subscribe to store updates
export function useBioNatureStore() {
  const [products, setProducts] = useState<Product[]>(() => BioNatureStore.getProducts());
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(() => BioNatureStore.getEnquiries());
  const [diagnoses, setDiagnoses] = useState<FarmerDiagnosisRecord[]>(() => BioNatureStore.getDiagnoses());
  const [distributors, setDistributors] = useState<DistributorRecord[]>(() => BioNatureStore.getDistributors());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => BioNatureStore.isAdminLoggedIn());

  useEffect(() => {
    function handleUpdate() {
      setProducts(BioNatureStore.getProducts());
      setEnquiries(BioNatureStore.getEnquiries());
      setDiagnoses(BioNatureStore.getDiagnoses());
      setDistributors(BioNatureStore.getDistributors());
      setIsAdmin(BioNatureStore.isAdminLoggedIn());
    }
    window.addEventListener("bionature_storage_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("bionature_storage_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    products,
    enquiries,
    diagnoses,
    distributors,
    isAdmin,
    store: BioNatureStore,
  };
}
