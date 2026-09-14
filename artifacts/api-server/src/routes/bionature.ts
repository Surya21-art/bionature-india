import { Router, Request, Response } from "express";

const router = Router();

// In-memory persistent demo store for API requests
let products = [
  {
    id: "prod-1",
    name: "Bio-NPK Liquid Consortia",
    slug: "bio-npk-liquid-consortia",
    category: "Bio Fertilizers",
    shortDescription: "Combined microbial liquid formulation fixing Nitrogen, solubilizing Phosphorus, and mobilizing Potassium.",
    dosage: "1 to 2 Liters per acre",
    published: true,
  },
  {
    id: "prod-2",
    name: "Trichoderma Viride Bio-Fungicide",
    slug: "trichoderma-viride-bio-fungicide",
    category: "Bio Fungicides",
    shortDescription: "High-potency biological antagonistic fungus protecting roots and stems from soil-borne fungal pathogens.",
    dosage: "1-2 kg per acre mixed with organic compost",
    published: true,
  },
  {
    id: "prod-3",
    name: "Neem Shield Bio-Pesticide (10,000 PPM)",
    slug: "neem-shield-bio-pesticide-10000-ppm",
    category: "Bio Pesticides",
    shortDescription: "Broad-spectrum cold-pressed Azadirachtin formulation controlling sucking insects and caterpillars.",
    dosage: "2-3 ml per Liter of water",
    published: true,
  },
];

let enquiries: any[] = [];
let farmerHelpRequests: any[] = [];
let distributorLeads: any[] = [];

// GET /api/products
router.get("/products", (req: Request, res: Response) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category && typeof category === "string") {
    result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q));
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/products/:slug
router.get("/products/:slug", (req: Request, res: Response) => {
  const product = products.find((p) => p.slug === req.params.slug);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product });
});

// POST /api/products
router.post("/products", (req: Request, res: Response) => {
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// POST /api/enquiries
router.post("/enquiries", (req: Request, res: Response) => {
  const { name, mobile, message, state, district } = req.body;
  if (!name || !mobile || !message) {
    return res.status(400).json({ success: false, message: "Name, mobile, and message are required" });
  }
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    ...req.body,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  enquiries.unshift(newEnquiry);
  res.status(201).json({ success: true, message: "Enquiry submitted successfully", data: newEnquiry });
});

// GET /api/enquiries
router.get("/enquiries", (_req: Request, res: Response) => {
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// POST /api/farmer-help (Crop Diagnosis)
router.post("/farmer-help", (req: Request, res: Response) => {
  const { farmerName, mobile, crop, problemDescription } = req.body;
  if (!farmerName || !mobile || !crop) {
    return res.status(400).json({ success: false, message: "Farmer name, mobile, and crop are required" });
  }
  const referenceNumber = `BN-DIAG-${Math.floor(1000 + Math.random() * 9000)}`;
  const ticket = {
    id: `diag-${Date.now()}`,
    referenceNumber,
    ...req.body,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  farmerHelpRequests.unshift(ticket);
  res.status(201).json({
    success: true,
    message: "Crop diagnosis request submitted successfully",
    referenceNumber,
    data: ticket,
  });
});

// GET /api/farmer-help/:ref
router.get("/farmer-help/:ref", (req: Request, res: Response) => {
  const ticket = farmerHelpRequests.find(
    (t) => t.referenceNumber.toUpperCase() === req.params.ref.toUpperCase(),
  );
  if (!ticket) {
    return res.status(404).json({ success: false, message: "No diagnosis ticket found with this reference number" });
  }
  res.json({ success: true, data: ticket });
});

// POST /api/distributor
router.post("/distributor", (req: Request, res: Response) => {
  const { name, company, mobile, email, state } = req.body;
  if (!name || !company || !mobile) {
    return res.status(400).json({ success: false, message: "Name, company, and mobile are required" });
  }
  const lead = {
    id: `dist-${Date.now()}`,
    ...req.body,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  distributorLeads.unshift(lead);
  res.status(201).json({ success: true, message: "Distributor application received", data: lead });
});

// POST /api/auth/login
router.post("/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === "admin@bionature.in" && password === "Admin@123") {
    return res.json({
      success: true,
      message: "Authentication successful",
      user: {
        email: "admin@bionature.in",
        name: "BioNature Administrator",
        role: "Super Admin",
      },
    });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

export default router;
