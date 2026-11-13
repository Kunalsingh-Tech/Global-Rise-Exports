"use client";

import {
  AdminProduct,
  AdminCategory,
  AdminCollection,
  AdminEnquiry,
  AdminHomepageConfig,
  AdminSiteSettings,
  AdminSeoEntry,
  AdminAuditLog,
  AdminProfile,
  AdminMediaItem,
} from "./admin-types";
import { PRODUCTS } from "@/data/products";

// Initial Demo Categories
const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    name: "Brass Vases & Urns",
    slug: "brass-vases-urns",
    description: "Fluted, amphora, and sand-cast architectural vessels hand-turned in Moradabad.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
    displayOrder: 1,
    isActive: true,
    seoTitle: "Handcrafted Brass Vases & Urns | Global Rise Exports",
    seoDescription: "Explore luxury hand-turned brass vases and archival urns crafted for global architectural spaces.",
    productCount: 4,
  },
  {
    id: "cat-2",
    name: "Decorative Bowls & Urlis",
    slug: "decorative-bowls-urlis",
    description: "Traditional hammered floating urlis, petal basins, and ceremonial brass vessels.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    displayOrder: 2,
    isActive: true,
    seoTitle: "Traditional Brass Decorative Urlis & Bowls | Export Catalogue",
    seoDescription: "Wholesale hand-hammered brass urlis and centerpiece bowls directly from Moradabad foundries.",
    productCount: 3,
  },
  {
    id: "cat-3",
    name: "Artistic Sculptures",
    slug: "artistic-sculptures",
    description: "Lost-wax cast figurative, abstract, and spiritual brass art pieces for galleries and hotels.",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
    displayOrder: 3,
    isActive: true,
    seoTitle: "Fine Brass Sculptures & Artware | Global Rise Exports",
    seoDescription: "Artisan-cast brass sculptures and heritage artware for luxury interiors and hospitality.",
    productCount: 2,
  },
  {
    id: "cat-4",
    name: "Candle Holders & Lighting",
    slug: "candle-holders-lighting",
    description: "Heavy solid brass candelabras, votive lamps, and hurricane sconces with protective lacquering.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    displayOrder: 4,
    isActive: true,
    seoTitle: "Solid Brass Candelabras & Lighting Accents | Global Rise Exports",
    seoDescription: "Polished and antique brass candle holders, diya lamps, and votives engineered for export.",
    productCount: 1,
  },
  {
    id: "cat-5",
    name: "Tableware & Trays",
    slug: "tableware-trays",
    description: "Engraved brass serving platters, etched coaster sets, and hammered luxury cutlery.",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=800&auto=format&fit=crop",
    displayOrder: 5,
    isActive: true,
    seoTitle: "Luxury Brass Tableware & Serving Trays | Moradabad Export",
    seoDescription: "Food-safe tin-lined and lacquered brass tableware, etched platters, and luxury dining accents.",
    productCount: 1,
  },
];

// Initial Demo Collections
const INITIAL_COLLECTIONS: AdminCollection[] = [
  {
    id: "col-1",
    name: "The Royal Moradabad Atelier Collection",
    slug: "royal-moradabad-atelier",
    description: "Masterwork vessels and urlis celebrating 400 years of Peetal Nagri metal-casting mastery.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
    status: "published",
    assignedProductIds: ["gbr-804", "gbr-ur-102", "gbr-vs-550"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "col-2",
    name: "Brutalist & Minimalist Brass",
    slug: "brutalist-minimalist-brass",
    description: "Sharp architectural silhouettes, raw sand-cast textures, and blackened oxidations for modern penthouses.",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
    status: "published",
    assignedProductIds: ["gbr-sc-901", "gbr-vs-310"],
    createdAt: "2024-02-10T12:00:00Z",
  },
  {
    id: "col-3",
    name: "Heritage Verdigris & Antique Patina",
    slug: "heritage-verdigris-patina",
    description: "Natural mineral accelerated oxidations resulting in turquoise verdigris and museum bronze finishes.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
    isFeatured: false,
    status: "published",
    assignedProductIds: ["gbr-804", "gbr-ch-402"],
    createdAt: "2024-03-01T09:30:00Z",
  },
];

// Seed Admin Products from data/products.ts
const INITIAL_PRODUCTS: AdminProduct[] = PRODUCTS.map((p, index) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  sku: p.sku,
  shortDescription: p.subtitle,
  description: p.description,
  category: p.category,
  collection: index % 2 === 0 ? "The Royal Moradabad Atelier Collection" : "Brutalist & Minimalist Brass",
  productType: "Handcrafted Brassware",
  tags: ["Solid Brass", "Moradabad", "Handmade", p.category.split(" ")[0]],
  material: p.material,
  weight: p.weight,
  dimensions: p.dimensions,
  finish: p.finish,
  color: "Natural Brass / Aged Patina",
  moq: p.moq,
  leadTime: p.leadTime,
  packaging: p.packaging,
  hsnCode: p.hsnCode,
  price: p.price,
  numericPrice: p.rawPrice,
  currency: "INR",
  priceVisibility: "public",
  requestForQuote: true,
  images: p.images,
  imageAlt: `${p.name} - Handcrafted Brass Product`,
  status: "published",
  isFeatured: !!p.isFeatured,
  isNewArrival: !!p.isNewArrival,
  seoTitle: `${p.name} | Global Rise Exports`,
  seoDescription: p.subtitle,
  canonicalSlug: `/catalogue/${p.slug}`,
  createdAt: new Date(Date.now() - (index + 1) * 86400000 * 3).toISOString(),
  updatedAt: new Date(Date.now() - index * 3600000 * 4).toISOString(),
}));

// Initial Demo Enquiries
const INITIAL_ENQUIRIES: AdminEnquiry[] = [
  {
    id: "enq-101",
    customerName: "Julian Vance",
    email: "j.vance@vancestudio-london.co.uk",
    phoneNumber: "+44 20 7946 0912",
    whatsappNumber: "+44 7700 900821",
    country: "United Kingdom",
    companyName: "Vance Interior Architecture Ltd.",
    productOfInterest: "Handcrafted Antique Brass Sculptural Urli Vase",
    skuOfInterest: "GBR-BR-804",
    quantity: "48 Units (Container Tier)",
    message: "We are specifying decorative brass vessels for a boutique hospitality development in Mayfair, London. Please provide CIF Southampton quotation and lead time for 48 units.",
    submissionDate: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "new",
    internalNotes: [
      {
        id: "note-1",
        author: "Kunal Singh",
        note: "High priority UK architect. Ready for CIF quotation with protective crate packaging.",
        timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      },
    ],
  },
  {
    id: "enq-102",
    customerName: "Camille Laurent",
    email: "claurent@maison-lyon.fr",
    phoneNumber: "+33 4 72 10 30 20",
    whatsappNumber: "+33 6 12 34 56 78",
    country: "France",
    companyName: "Maison Laurent Décoration",
    productOfInterest: "Heritage Fluted Brass Artisanal Urn",
    skuOfInterest: "GBR-VS-550",
    quantity: "24 Units",
    message: "Bonjour, we would like to place an order for the fluted brass urns in brushed satin finish with custom laser etched brand stamp. Please share OEM terms.",
    submissionDate: new Date(Date.now() - 86400000 * 1.2).toISOString(),
    status: "in_progress",
    internalNotes: [
      {
        id: "note-2",
        author: "Export Desk",
        note: "Sent OEM spec sheet and CAD etching guidelines via email.",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
  {
    id: "enq-103",
    customerName: "Tariq Al-Mansoor",
    email: "tariq@gulfdecor.ae",
    phoneNumber: "+971 4 321 8899",
    whatsappNumber: "+971 50 123 4567",
    country: "United Arab Emirates",
    companyName: "Gulf Luxury Palaces Contracting LLC",
    productOfInterest: "Traditional Brass Decorative Lotus Urli Basin",
    skuOfInterest: "GBR-UR-102",
    quantity: "120 Units (Full LCL)",
    message: "Need 120 pieces of the 24-inch lotus urlis for a luxury resort project in Abu Dhabi. Can you ship direct via Jebel Ali Port within 35 days?",
    submissionDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "contacted",
    internalNotes: [],
  },
  {
    id: "enq-104",
    customerName: "Evelyn Reed",
    email: "e.reed@tribecagroup-ny.com",
    phoneNumber: "+1 212 555 0198",
    whatsappNumber: "+1 917 555 0144",
    country: "United States",
    companyName: "Tribeca Living NYC",
    productOfInterest: "Heavy Sand-Cast Brass Architectural Vessel",
    skuOfInterest: "GBR-VS-310",
    quantity: "36 Units",
    message: "Looking for sample crate dispatch to Port Newark (NJ). Please confirm if ISTA-3A drop test certification is available.",
    submissionDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "converted",
    internalNotes: [
      {
        id: "note-3",
        author: "Kunal Singh",
        note: "Sample crate dispatched via Air Cargo DEL to JFK. Tracking provided.",
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
      },
    ],
  },
  {
    id: "enq-105",
    customerName: "Rohan Malhotra",
    email: "rohan@malhotrainteriors.in",
    phoneNumber: "+91 98112 34567",
    whatsappNumber: "+91 98112 34567",
    country: "India",
    companyName: "Malhotra & Partners Design Studio",
    productOfInterest: "Abstract Brass Form Sculptural Art Piece",
    skuOfInterest: "GBR-SC-901",
    quantity: "12 Units",
    message: "Domestic project delivery needed in New Delhi for luxury farmhouse project. GST invoice required.",
    submissionDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: "closed",
    internalNotes: [],
  },
];

// Initial Demo Homepage Config
const INITIAL_HOMEPAGE_CONFIG: AdminHomepageConfig = {
  hero: {
    heading: "Crafted With Heritage. Designed For The World.",
    subtitle: "INDIAN HANDICRAFT • GLOBAL ARCHITECTURE",
    description: "Discover thoughtfully crafted brass products, timeless decorative pieces and distinctive handcrafted collections created for global interior architecture. Formed by generational Moradabad artisans, translating ancient sand-casting metallurgy into modern luxury living.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    buttonText: "Explore Collections",
    buttonLink: "/catalogue",
    secondaryButtonText: "Our Heritage",
    secondaryButtonLink: "/about",
    metalStandard: "100% Solid Brass (CuZn40)",
    dispatchGateway: "Nhava Sheva (JNPT) & DEL",
    quote: "“In the hammer-peen texture of raw brass lies the unhurried patience of master hands.”",
  },
  bestSellers: {
    heading: "Our Best Sellers",
    description: "Explore the handcrafted pieces and discover timeless beauty. From sculptural decor to everyday brass essentials, these popular export finds blend Indian artistry, metallurgical purity, and soul.",
    enabled: true,
  },
  featuredCollections: {
    heading: "Curated Collections",
    subtitle: "FOUNDRY CATEGORIES",
    enabled: true,
  },
  newArrivals: {
    heading: "New Arrivals",
    subtitle: "RECENT FOUNDRY RELEASES",
    enabled: true,
  },
  brandStory: {
    heading: "Where Generational Metallurgic Heritage Meets Contemporary International Design",
    description: "For over four decades, Global Rise Exports has operated from the historic brass cluster of Moradabad, India—known globally as 'Peetal Nagri'. Our foundries unite traditional master sand-casters, chiseled hand-engravers, and contemporary industrial designers.",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
    atelierSubtitle: "Moradabad Brass Foundry Atelier • Est. 1984",
  },
  craftsmanship: {
    heading: "Metals Formed With Purpose",
    description: "Every masterwork emerging from our Moradabad foundries undergoes four rigorous stages of artisanal refinement.",
    enabled: true,
  },
  globalPresence: {
    heading: "Connecting Indian Craftsmanship With The World",
    description: "Strategically located close to inland container depots, we ship weekly consolidated containers and express air-cargo shipments to luxury brands worldwide.",
    enabled: true,
  },
  contactCta: {
    heading: "Looking For Something Distinctive?",
    description: "Connect with our foundry export desk to explore customized finishes, architectural project scaling, volume tiered quotations in Indian Rupees (₹) and US Dollars, or to receive physical sample crates.",
    buttonText: "Send an Enquiry",
    buttonLink: "/contact",
    whatsappText: "WhatsApp Direct Desk (+91 98765 43210)",
  },
};

// Initial Site Settings
const INITIAL_SITE_SETTINGS: AdminSiteSettings = {
  general: {
    websiteName: "Global Rise Exports",
    tagline: "Handcrafted Brass Products & Artware Export House",
    logoText: "Global Rise Exports",
    logoSubtext: "Moradabad Brass • Peetal Nagri, India",
    primaryCurrency: "INR",
    language: "English",
  },
  contact: {
    contactEmail: "export@globalriseexports.com",
    phoneNumber: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210",
    businessAddress: "Civil Lines, Moradabad Brass Cluster, Uttar Pradesh - 244001, India",
    exportDeskHours: "Monday – Saturday: 09:30 AM – 06:30 PM IST",
    iecCode: "0508019284 (DGFT Certified)",
    gstin: "09AAACG1234D1Z8",
  },
  socialMedia: {
    instagram: "https://instagram.com/globalriseexports",
    facebook: "https://facebook.com/globalriseexports",
    linkedin: "https://linkedin.com/company/global-rise-exports",
    youtube: "https://youtube.com/@globalriseexports",
    pinterest: "https://pinterest.com/globalriseexports",
  },
  footer: {
    description: "Connecting India's century-old Moradabad metalworking heritage with international architecture, luxury hospitality groups, and global decor houses.",
    copyrightText: "© 2026 Global Rise Exports. All rights reserved. Registered Export House, Peetal Nagri, Moradabad, India.",
    fobPort: "FOB Nhava Sheva (JNPT) & Air Cargo DEL",
  },
};

// Initial SEO Entries
const INITIAL_SEO: AdminSeoEntry[] = [
  {
    id: "seo-1",
    pageKey: "homepage",
    pageName: "Homepage (/)",
    seoTitle: "Global Rise Exports | Handcrafted Brass Products & Artware Export House",
    metaDescription: "Premier Indian manufacturer and international exporter of handcrafted brassware, architectural vessels, decorative urlis, bowls, sculptures, and luxury metal home decor from Moradabad, India.",
    canonicalUrl: "https://globalriseexports.vercel.app/",
    ogTitle: "Global Rise Exports | Luxury Brass & Handicraft Exports",
    ogDescription: "Discover authentic Indian brass architectural vessels, decorative urlis, and sculptures crafted for global markets.",
    ogImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    ogType: "website",
  },
  {
    id: "seo-2",
    pageKey: "catalogue",
    pageName: "Export Catalogue (/catalogue)",
    seoTitle: "Export Collections & Brass Catalogue | Global Rise Exports",
    metaDescription: "Browse over 100+ solid brass products with wholesale pricing in INR (₹), FOB shipping specs, MOQs, and instant WhatsApp quotation options.",
    canonicalUrl: "https://globalriseexports.vercel.app/catalogue",
    ogTitle: "Brass Export Catalogue | Moradabad Handicrafts",
    ogDescription: "Complete catalog of brass vases, urlis, sculptures, and candelabras for wholesale and international projects.",
    ogImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    ogType: "article",
  },
  {
    id: "seo-3",
    pageKey: "about",
    pageName: "About Us (/about)",
    seoTitle: "Foundry Heritage & Artisanal Metallurgy | Global Rise Exports",
    metaDescription: "Learn about our 40-year brass casting heritage in Moradabad, our sand-casting artisans, metallurgical purity standards, and international export certifications.",
    canonicalUrl: "https://globalriseexports.vercel.app/about",
    ogTitle: "About Global Rise Exports | Moradabad Foundry Heritage",
    ogDescription: "The legacy of Peetal Nagri metalworking meets international architectural specifications.",
    ogImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
    ogType: "article",
  },
  {
    id: "seo-4",
    pageKey: "contact",
    pageName: "Contact & RFQ (/contact)",
    seoTitle: "Export Inquiry & Trade Desk | Global Rise Exports",
    metaDescription: "Submit Request for Quotation (RFQ), order physical brass sample crates, or connect directly with our foundry export managers via WhatsApp and Email.",
    canonicalUrl: "https://globalriseexports.vercel.app/contact",
    ogTitle: "Contact Global Rise Exports Trade Desk",
    ogDescription: "Direct B2B trade lines, FOB logistics inquiries, and custom OEM manufacturing discussions.",
    ogImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    ogType: "website",
  },
];

// Initial Media Items
const INITIAL_MEDIA: AdminMediaItem[] = [
  {
    id: "med-1",
    filename: "brass-sculptural-urli-vase-hero.jpg",
    url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    fileType: "image/jpeg",
    fileSize: "482 KB",
    dimensions: "1200 × 1500 px",
    altText: "Handcrafted Antique Brass Sculptural Urli Vase",
    uploadedAt: "2024-03-10T14:22:00Z",
  },
  {
    id: "med-2",
    filename: "artisan-brass-patina-artifact.jpg",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    fileType: "image/jpeg",
    fileSize: "614 KB",
    dimensions: "1200 × 1600 px",
    altText: "Archival Moradabad brass patina urn",
    uploadedAt: "2024-03-08T11:15:00Z",
  },
  {
    id: "med-3",
    filename: "moradabad-foundry-artisan-crafting.jpg",
    url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
    fileType: "image/jpeg",
    fileSize: "730 KB",
    dimensions: "1200 × 800 px",
    altText: "Master artisan shaping glowing brass over anvil",
    uploadedAt: "2024-03-05T09:40:00Z",
  },
  {
    id: "med-4",
    filename: "abstract-figurative-brass-sculpture.jpg",
    url: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1200&auto=format&fit=crop",
    fileType: "image/jpeg",
    fileSize: "395 KB",
    dimensions: "1200 × 1500 px",
    altText: "Minimalist abstract figurative brass sculpture",
    uploadedAt: "2024-03-01T16:05:00Z",
  },
  {
    id: "med-5",
    filename: "brass-candle-stand-candelabra.jpg",
    url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
    fileType: "image/jpeg",
    fileSize: "410 KB",
    dimensions: "1200 × 1200 px",
    altText: "Heavy solid brass candelabra",
    uploadedAt: "2024-02-28T12:30:00Z",
  },
  {
    id: "med-6",
    filename: "decorative-brass-etched-serving-tray.jpg",
    url: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1200&auto=format&fit=crop",
    fileType: "image/jpeg",
    fileSize: "550 KB",
    dimensions: "1200 × 800 px",
    altText: "Hand-etched decorative brass tray",
    uploadedAt: "2024-02-25T10:10:00Z",
  },
];

// Initial Audit Logs
const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: "log-1",
    action: "Product Created",
    admin: "Kunal Singh (Lead Admin)",
    affectedRecord: "Handcrafted Antique Brass Sculptural Urli Vase (GBR-BR-804)",
    actionType: "product_create",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    details: "Added with 3 high-res gallery images, INR 15,400 tier price, and published status.",
  },
  {
    id: "log-2",
    action: "Enquiry Status Updated",
    admin: "Export Desk Agent",
    affectedRecord: "Enquiry #ENQ-101 (Julian Vance - Vance Interior Architecture)",
    actionType: "enquiry_update",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    details: "Status marked as 'In Progress'. Added note: 'Ready for CIF quotation'.",
  },
  {
    id: "log-3",
    action: "Category Updated",
    admin: "Kunal Singh (Lead Admin)",
    affectedRecord: "Category: Brass Vases & Urns",
    actionType: "category_change",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    details: "Updated display order to 1 and refreshed category thumbnail banner.",
  },
  {
    id: "log-4",
    action: "Homepage CMS Saved",
    admin: "Kunal Singh (Lead Admin)",
    affectedRecord: "Hero Section & Craftsmanship Walkthrough",
    actionType: "homepage_update",
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    details: "Synchronized new editorial copy and metallurgy standards bar.",
  },
  {
    id: "log-5",
    action: "Admin Login Succeeded",
    admin: "Kunal Singh (Lead Admin)",
    affectedRecord: "Session #auth-8819",
    actionType: "security_event",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    details: "Authenticated via local secure credentials from IP 103.21.124.89 (New Delhi, India).",
  },
];

// Initial Admin Profile
const INITIAL_PROFILE: AdminProfile = {
  name: "Kunal Singh",
  email: "admin@globalriseexports.com",
  role: "Chief Export Administrator & Founder",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  googleAuthEnabled: false,
  totpEnabled: false,
  recoveryCodesConfigured: true,
  activeSessions: [
    {
      id: "sess-curr",
      device: "Windows Chrome (Current Session)",
      ip: "103.21.124.89 (New Delhi, India)",
      lastActive: "Just now",
      current: true,
    },
    {
      id: "sess-mobile",
      device: "iPhone Safari Mobile",
      ip: "49.36.182.11 (Moradabad, India)",
      lastActive: "3 hours ago",
      current: false,
    },
  ],
  lastLogin: new Date(Date.now() - 3600000 * 2).toISOString(),
};

// Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: "gre_admin_products_v1",
  CATEGORIES: "gre_admin_categories_v1",
  COLLECTIONS: "gre_admin_collections_v1",
  ENQUIRIES: "gre_admin_enquiries_v1",
  HOMEPAGE: "gre_admin_homepage_v1",
  SETTINGS: "gre_admin_settings_v1",
  SEO: "gre_admin_seo_v1",
  MEDIA: "gre_admin_media_v1",
  LOGS: "gre_admin_logs_v1",
  PROFILE: "gre_admin_profile_v1",
  AUTH: "gre_admin_auth_status",
};

// Store Implementation with Safe LocalStorage Hydration
class AdminDataStore {
  private products: AdminProduct[] = INITIAL_PRODUCTS;
  private categories: AdminCategory[] = INITIAL_CATEGORIES;
  private collections: AdminCollection[] = INITIAL_COLLECTIONS;
  private enquiries: AdminEnquiry[] = INITIAL_ENQUIRIES;
  private homepage: AdminHomepageConfig = INITIAL_HOMEPAGE_CONFIG;
  private settings: AdminSiteSettings = INITIAL_SITE_SETTINGS;
  private seo: AdminSeoEntry[] = INITIAL_SEO;
  private media: AdminMediaItem[] = INITIAL_MEDIA;
  private logs: AdminAuditLog[] = INITIAL_AUDIT_LOGS;
  private profile: AdminProfile = INITIAL_PROFILE;
  private isAuthenticated: boolean = true; // demo default: accessible
  private listeners: Set<() => void> = new Set();
  private hydrated: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.hydrateFromStorage();
    }
  }

  private hydrateFromStorage() {
    try {
      const p = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (p) this.products = JSON.parse(p);

      const c = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (c) this.categories = JSON.parse(c);

      const col = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      if (col) this.collections = JSON.parse(col);

      const e = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (e) this.enquiries = JSON.parse(e);

      const h = localStorage.getItem(STORAGE_KEYS.HOMEPAGE);
      if (h) this.homepage = JSON.parse(h);

      const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (s) this.settings = JSON.parse(s);

      const seo = localStorage.getItem(STORAGE_KEYS.SEO);
      if (seo) this.seo = JSON.parse(seo);

      const m = localStorage.getItem(STORAGE_KEYS.MEDIA);
      if (m) this.media = JSON.parse(m);

      const l = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (l) this.logs = JSON.parse(l);

      const prof = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (prof) this.profile = JSON.parse(prof);

      const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (auth !== null) this.isAuthenticated = auth === "true";

      this.hydrated = true;
    } catch {
      // fallback to memory
    }
  }

  private persist(key: string, data: unknown) {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        // quota exceeded or private browsing
      }
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public isAuth(): boolean {
    return this.isAuthenticated;
  }

  public setAuth(status: boolean) {
    this.isAuthenticated = status;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.AUTH, status ? "true" : "false");
    }
    this.addAuditLog({
      action: status ? "Admin Signed In" : "Admin Signed Out",
      admin: this.profile.name,
      affectedRecord: "Session Authentication",
      actionType: "auth" as any,
      details: status ? "Demo session initialized" : "Session terminated",
    });
    this.notify();
  }

  // --- PRODUCTS ---
  public getProducts(): AdminProduct[] {
    return [...this.products];
  }

  public getProductById(id: string): AdminProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public getProductBySlug(slug: string): AdminProduct | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  public saveProduct(product: Partial<AdminProduct> & { name: string; sku: string }): AdminProduct {
    const isNew = !product.id || !this.products.some((p) => p.id === product.id);
    let saved: AdminProduct;

    if (isNew) {
      const generatedId = product.id || `gbr-${Date.now().toString(36)}`;
      const generatedSlug =
        product.slug ||
        product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      saved = {
        id: generatedId,
        name: product.name,
        slug: generatedSlug,
        sku: product.sku.toUpperCase(),
        shortDescription: product.shortDescription || "Handcrafted Moradabad Brass export article.",
        description: product.description || product.shortDescription || "",
        category: product.category || "Brass Vases & Urns",
        collection: product.collection || "The Royal Moradabad Atelier Collection",
        productType: product.productType || "Handcrafted Brassware",
        tags: product.tags || ["Solid Brass", "Moradabad"],
        material: product.material || "100% Solid Virgin Brass (CuZn40)",
        weight: product.weight || "3.5 kg approx.",
        dimensions: product.dimensions || "32 × 28 × 42 cm",
        finish: product.finish && product.finish.length > 0 ? product.finish : ["Antique Patina"],
        color: product.color || "Natural Brass",
        moq: product.moq || "12 Units",
        leadTime: product.leadTime || "15-20 Business Days",
        packaging: product.packaging || "Export Grade 7-Ply Master Carton",
        hsnCode: product.hsnCode || "7418.10.22",
        price: product.price || "₹14,500",
        numericPrice: product.numericPrice || 14500,
        currency: product.currency || "INR",
        priceVisibility: product.priceVisibility || "public",
        requestForQuote: product.requestForQuote ?? true,
        images:
          product.images && product.images.length > 0
            ? product.images
            : ["https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop"],
        imageAlt: product.imageAlt || `${product.name} - Moradabad Brass`,
        status: product.status || "published",
        isFeatured: product.isFeatured ?? false,
        isNewArrival: product.isNewArrival ?? true,
        seoTitle: product.seoTitle || `${product.name} | Global Rise Exports`,
        seoDescription: product.seoDescription || product.shortDescription || "",
        canonicalSlug: `/catalogue/${generatedSlug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.products = [saved, ...this.products];
      this.addAuditLog({
        action: "Product Created",
        admin: this.profile.name,
        affectedRecord: `${saved.name} (${saved.sku})`,
        actionType: "product_create",
        details: `Created new product with price ${saved.price} and status ${saved.status}.`,
      });
    } else {
      this.products = this.products.map((p) => {
        if (p.id === product.id) {
          saved = {
            ...p,
            ...product,
            updatedAt: new Date().toISOString(),
          };
          return saved;
        }
        return p;
      });
      this.addAuditLog({
        action: "Product Updated",
        admin: this.profile.name,
        affectedRecord: `${product.name} (${product.sku})`,
        actionType: "product_update",
        details: `Updated product details and specifications.`,
      });
    }

    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    return saved!;
  }

  public deleteProduct(id: string): boolean {
    const target = this.products.find((p) => p.id === id);
    if (!target) return false;
    this.products = this.products.filter((p) => p.id !== id);
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    this.addAuditLog({
      action: "Product Deleted",
      admin: this.profile.name,
      affectedRecord: `${target.name} (${target.sku})`,
      actionType: "product_delete",
      details: `Permanently removed product from database.`,
    });
    return true;
  }

  public duplicateProduct(id: string): AdminProduct | undefined {
    const source = this.products.find((p) => p.id === id);
    if (!source) return undefined;
    const duplicated: AdminProduct = {
      ...source,
      id: `gbr-${Date.now().toString(36)}`,
      name: `${source.name} (Copy)`,
      sku: `${source.sku}-COPY`,
      slug: `${source.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products = [duplicated, ...this.products];
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    this.addAuditLog({
      action: "Product Duplicated",
      admin: this.profile.name,
      affectedRecord: `${duplicated.name} (${duplicated.sku})`,
      actionType: "product_create",
      details: `Duplicated from ${source.sku} as draft.`,
    });
    return duplicated;
  }

  public bulkUpdateStatus(ids: string[], status: "published" | "draft" | "out_of_stock"): number {
    let count = 0;
    this.products = this.products.map((p) => {
      if (ids.includes(p.id)) {
        count++;
        return { ...p, status, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    this.addAuditLog({
      action: `Bulk Status Changed to ${status.toUpperCase()}`,
      admin: this.profile.name,
      affectedRecord: `${count} Products`,
      actionType: "product_update",
      details: `Bulk updated status for ${count} items.`,
    });
    return count;
  }

  public bulkDelete(ids: string[]): number {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => !ids.includes(p.id));
    const deletedCount = initialLen - this.products.length;
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    this.addAuditLog({
      action: "Bulk Products Deleted",
      admin: this.profile.name,
      affectedRecord: `${deletedCount} Products`,
      actionType: "product_delete",
      details: `Bulk deleted ${deletedCount} records.`,
    });
    return deletedCount;
  }

  // --- CATEGORIES ---
  public getCategories(): AdminCategory[] {
    return [...this.categories];
  }

  public saveCategory(category: Partial<AdminCategory> & { name: string }): AdminCategory {
    const isNew = !category.id || !this.categories.some((c) => c.id === category.id);
    let saved: AdminCategory;

    if (isNew) {
      const generatedId = category.id || `cat-${Date.now().toString(36)}`;
      const generatedSlug =
        category.slug ||
        category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      saved = {
        id: generatedId,
        name: category.name,
        slug: generatedSlug,
        description: category.description || "",
        image:
          category.image ||
          "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
        displayOrder: category.displayOrder || this.categories.length + 1,
        isActive: category.isActive ?? true,
        seoTitle: category.seoTitle || `${category.name} | Global Rise Exports`,
        seoDescription: category.seoDescription || category.description || "",
        productCount: 0,
      };
      this.categories = [...this.categories, saved];
      this.addAuditLog({
        action: "Category Created",
        admin: this.profile.name,
        affectedRecord: saved.name,
        actionType: "category_change",
        details: `Created new category '${saved.name}'.`,
      });
    } else {
      this.categories = this.categories.map((c) => {
        if (c.id === category.id) {
          saved = { ...c, ...category };
          return saved;
        }
        return c;
      });
      this.addAuditLog({
        action: "Category Updated",
        admin: this.profile.name,
        affectedRecord: category.name,
        actionType: "category_change",
        details: `Updated category details for '${category.name}'.`,
      });
    }

    this.persist(STORAGE_KEYS.CATEGORIES, this.categories);
    return saved!;
  }

  public deleteCategory(id: string): boolean {
    const target = this.categories.find((c) => c.id === id);
    if (!target) return false;
    this.categories = this.categories.filter((c) => c.id !== id);
    this.persist(STORAGE_KEYS.CATEGORIES, this.categories);
    this.addAuditLog({
      action: "Category Deleted",
      admin: this.profile.name,
      affectedRecord: target.name,
      actionType: "category_change",
      details: `Removed category '${target.name}'.`,
    });
    return true;
  }

  // --- COLLECTIONS ---
  public getCollections(): AdminCollection[] {
    return [...this.collections];
  }

  public saveCollection(col: Partial<AdminCollection> & { name: string }): AdminCollection {
    const isNew = !col.id || !this.collections.some((c) => c.id === col.id);
    let saved: AdminCollection;

    if (isNew) {
      const id = col.id || `col-${Date.now().toString(36)}`;
      const slug =
        col.slug ||
        col.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      saved = {
        id,
        name: col.name,
        slug,
        description: col.description || "",
        image:
          col.image ||
          "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
        isFeatured: col.isFeatured ?? false,
        status: col.status || "published",
        assignedProductIds: col.assignedProductIds || [],
        createdAt: new Date().toISOString(),
      };
      this.collections = [...this.collections, saved];
      this.addAuditLog({
        action: "Collection Created",
        admin: this.profile.name,
        affectedRecord: saved.name,
        actionType: "collection_change",
        details: `Created collection with ${saved.assignedProductIds.length} assigned products.`,
      });
    } else {
      this.collections = this.collections.map((c) => {
        if (c.id === col.id) {
          saved = { ...c, ...col };
          return saved;
        }
        return c;
      });
      this.addAuditLog({
        action: "Collection Updated",
        admin: this.profile.name,
        affectedRecord: col.name,
        actionType: "collection_change",
        details: `Updated collection settings for '${col.name}'.`,
      });
    }

    this.persist(STORAGE_KEYS.COLLECTIONS, this.collections);
    return saved!;
  }

  public deleteCollection(id: string): boolean {
    const target = this.collections.find((c) => c.id === id);
    if (!target) return false;
    this.collections = this.collections.filter((c) => c.id !== id);
    this.persist(STORAGE_KEYS.COLLECTIONS, this.collections);
    this.addAuditLog({
      action: "Collection Deleted",
      admin: this.profile.name,
      affectedRecord: target.name,
      actionType: "collection_change",
      details: `Deleted collection '${target.name}'.`,
    });
    return true;
  }

  // --- ENQUIRIES ---
  public getEnquiries(): AdminEnquiry[] {
    return [...this.enquiries];
  }

  public updateEnquiryStatus(
    id: string,
    status: AdminEnquiry["status"],
    newNote?: string
  ): AdminEnquiry | undefined {
    let updated: AdminEnquiry | undefined;
    this.enquiries = this.enquiries.map((e) => {
      if (e.id === id) {
        const notes = [...e.internalNotes];
        if (newNote && newNote.trim()) {
          notes.unshift({
            id: `note-${Date.now()}`,
            author: this.profile.name,
            note: newNote.trim(),
            timestamp: new Date().toISOString(),
          });
        }
        updated = { ...e, status, internalNotes: notes };
        return updated;
      }
      return e;
    });

    if (updated) {
      this.persist(STORAGE_KEYS.ENQUIRIES, this.enquiries);
      this.addAuditLog({
        action: "Enquiry Status Updated",
        admin: this.profile.name,
        affectedRecord: `Enquiry #${updated.id} (${updated.customerName})`,
        actionType: "enquiry_update",
        details: `Status set to ${status.toUpperCase()}.${newNote ? ` Note: "${newNote}"` : ""}`,
      });
    }
    return updated;
  }

  public addEnquiryNote(id: string, noteText: string): boolean {
    let success = false;
    this.enquiries = this.enquiries.map((e) => {
      if (e.id === id) {
        success = true;
        const notes = [
          {
            id: `note-${Date.now()}`,
            author: this.profile.name,
            note: noteText.trim(),
            timestamp: new Date().toISOString(),
          },
          ...e.internalNotes,
        ];
        return { ...e, internalNotes: notes };
      }
      return e;
    });
    if (success) {
      this.persist(STORAGE_KEYS.ENQUIRIES, this.enquiries);
    }
    return success;
  }

  public deleteEnquiry(id: string): boolean {
    const target = this.enquiries.find((e) => e.id === id);
    if (!target) return false;
    this.enquiries = this.enquiries.filter((e) => e.id !== id);
    this.persist(STORAGE_KEYS.ENQUIRIES, this.enquiries);
    this.addAuditLog({
      action: "Enquiry Deleted",
      admin: this.profile.name,
      affectedRecord: `Enquiry #${target.id} (${target.customerName})`,
      actionType: "enquiry_update",
      details: `Removed enquiry from export desk pipeline.`,
    });
    return true;
  }

  // --- HOMEPAGE CONFIG ---
  public getHomepageConfig(): AdminHomepageConfig {
    return { ...this.homepage };
  }

  public saveHomepageConfig(config: Partial<AdminHomepageConfig>): AdminHomepageConfig {
    this.homepage = { ...this.homepage, ...config };
    this.persist(STORAGE_KEYS.HOMEPAGE, this.homepage);
    this.addAuditLog({
      action: "Homepage CMS Updated",
      admin: this.profile.name,
      affectedRecord: "Homepage Editorial Configuration",
      actionType: "homepage_update",
      details: "Saved visual CMS changes to homepage.",
    });
    return this.homepage;
  }

  // --- SITE SETTINGS ---
  public getSiteSettings(): AdminSiteSettings {
    return { ...this.settings };
  }

  public saveSiteSettings(settings: Partial<AdminSiteSettings>): AdminSiteSettings {
    this.settings = { ...this.settings, ...settings };
    this.persist(STORAGE_KEYS.SETTINGS, this.settings);
    this.addAuditLog({
      action: "Website Settings Saved",
      admin: this.profile.name,
      affectedRecord: "Global Rise Exports Site Configuration",
      actionType: "settings_update",
      details: "Updated general/contact/logistics settings.",
    });
    return this.settings;
  }

  // --- SEO ---
  public getSeoEntries(): AdminSeoEntry[] {
    return [...this.seo];
  }

  public saveSeoEntry(entry: AdminSeoEntry): AdminSeoEntry {
    this.seo = this.seo.map((s) => (s.id === entry.id ? entry : s));
    this.persist(STORAGE_KEYS.SEO, this.seo);
    this.addAuditLog({
      action: "SEO Metadata Updated",
      admin: this.profile.name,
      affectedRecord: entry.pageName,
      actionType: "settings_update",
      details: `Updated title and OpenGraph metadata for ${entry.pageName}.`,
    });
    return entry;
  }

  // --- MEDIA ---
  public getMedia(): AdminMediaItem[] {
    return [...this.media];
  }

  public addMediaItem(item: Omit<AdminMediaItem, "id" | "uploadedAt">): AdminMediaItem {
    const newItem: AdminMediaItem = {
      ...item,
      id: `med-${Date.now().toString(36)}`,
      uploadedAt: new Date().toISOString(),
    };
    this.media = [newItem, ...this.media];
    this.persist(STORAGE_KEYS.MEDIA, this.media);
    this.addAuditLog({
      action: "Media Uploaded",
      admin: this.profile.name,
      affectedRecord: newItem.filename,
      actionType: "settings_update",
      details: `Uploaded ${newItem.filename} (${newItem.fileSize}).`,
    });
    return newItem;
  }

  public deleteMediaItem(id: string): boolean {
    const target = this.media.find((m) => m.id === id);
    if (!target) return false;
    this.media = this.media.filter((m) => m.id !== id);
    this.persist(STORAGE_KEYS.MEDIA, this.media);
    this.addAuditLog({
      action: "Media Deleted",
      admin: this.profile.name,
      affectedRecord: target.filename,
      actionType: "settings_update",
      details: `Deleted file ${target.filename}.`,
    });
    return true;
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AdminAuditLog[] {
    return [...this.logs];
  }

  public addAuditLog(log: Omit<AdminAuditLog, "id" | "timestamp">): AdminAuditLog {
    const newLog: AdminAuditLog = {
      ...log,
      id: `log-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.logs = [newLog, ...this.logs.slice(0, 99)]; // retain last 100
    this.persist(STORAGE_KEYS.LOGS, this.logs);
    return newLog;
  }

  // --- PROFILE ---
  public getProfile(): AdminProfile {
    return { ...this.profile };
  }

  public updateProfile(prof: Partial<AdminProfile>): AdminProfile {
    this.profile = { ...this.profile, ...prof };
    this.persist(STORAGE_KEYS.PROFILE, this.profile);
    this.addAuditLog({
      action: "Admin Profile Updated",
      admin: this.profile.name,
      affectedRecord: "Administrator Account",
      actionType: "security_event",
      details: "Profile info / security status updated.",
    });
    return this.profile;
  }
}

// Global singleton instance
export const adminStore = new AdminDataStore();
