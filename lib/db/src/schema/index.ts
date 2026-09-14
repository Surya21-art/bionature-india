import { pgTable, text, serial, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Products table
export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  category: text("category").notNull(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  benefits: json("benefits").$type<string[]>().default([]),
  ingredients: text("ingredients").notNull(),
  applicationMethod: text("application_method").notNull(),
  dosage: text("dosage").notNull(),
  packSizes: json("pack_sizes").$type<string[]>().default([]),
  images: json("images").$type<string[]>().default([]),
  documents: json("documents").$type<{ name: string; url: string; type: string }[]>().default([]),
  suitableCrops: json("suitable_crops").$type<string[]>().default([]),
  targetProblems: json("target_problems").$type<string[]>().default([]),
  published: boolean("published").default(true),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;

// Categories table
export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
});

export const insertCategorySchema = createInsertSchema(categoriesTable).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categoriesTable.$inferSelect;

// Crops table
export const cropsTable = pgTable("crops", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  image: text("image"),
  stages: json("stages").$type<{ stage: string; days: string; management: string; products: string[] }[]>().default([]),
  commonProblems: json("common_problems").$type<string[]>().default([]),
});

export const insertCropSchema = createInsertSchema(cropsTable).omit({ id: true });
export type InsertCrop = z.infer<typeof insertCropSchema>;
export type Crop = typeof cropsTable.$inferSelect;

// Problems table
export const problemsTable = pgTable("problems", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  category: text("category").notNull(),
  symptoms: text("symptoms").notNull(),
  management: text("management").notNull(),
  recommendedProducts: json("recommended_products").$type<string[]>().default([]),
});

export const insertProblemSchema = createInsertSchema(problemsTable).omit({ id: true });
export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problemsTable.$inferSelect;

// Enquiries table
export const enquiriesTable = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email"),
  state: text("state").notNull(),
  district: text("district").notNull(),
  crop: text("crop"),
  message: text("message").notNull(),
  productSlug: text("product_slug"),
  status: text("status").default("new").notNull(), // 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEnquirySchema = createInsertSchema(enquiriesTable).omit({ id: true, createdAt: true });
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiriesTable.$inferSelect;

// Farmer Help Requests (Crop Diagnosis) table
export const farmerHelpTable = pgTable("farmer_help_requests", {
  id: serial("id").primaryKey(),
  referenceNumber: text("reference_number").unique().notNull(),
  farmerName: text("farmer_name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email"),
  state: text("state").notNull(),
  district: text("district").notNull(),
  crop: text("crop").notNull(),
  cropAge: text("crop_age").notNull(),
  problemDescription: text("problem_description").notNull(),
  imageUrls: json("image_urls").$type<string[]>().default([]),
  status: text("status").default("new").notNull(), // 'new' | 'assigned' | 'in_review' | 'responded' | 'closed'
  expertNotes: text("expert_notes"),
  recommendedProducts: json("recommended_products").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFarmerHelpSchema = createInsertSchema(farmerHelpTable).omit({ id: true, createdAt: true });
export type InsertFarmerHelp = z.infer<typeof insertFarmerHelpSchema>;
export type FarmerHelpRequest = typeof farmerHelpTable.$inferSelect;

// Distributor Leads table
export const distributorLeadsTable = pgTable("distributor_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  state: text("state").notNull(),
  district: text("district").notNull(),
  currentBusiness: text("current_business").notNull(),
  yearsInBusiness: text("years_in_business").notNull(),
  interestedCategories: json("interested_categories").$type<string[]>().default([]),
  message: text("message"),
  status: text("status").default("new").notNull(), // 'new' | 'contacted' | 'approved' | 'closed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDistributorLeadSchema = createInsertSchema(distributorLeadsTable).omit({ id: true, createdAt: true });
export type InsertDistributorLead = z.infer<typeof insertDistributorLeadSchema>;
export type DistributorLead = typeof distributorLeadsTable.$inferSelect;

// Blog Posts table
export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  coverImage: text("cover_image").notNull(),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true, createdAt: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;