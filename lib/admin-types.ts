export type ProductStatus = "published" | "draft" | "out_of_stock";
export type PriceVisibility = "public" | "on_enquiry" | "hidden";

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  category: string;
  collection: string;
  productType: string;
  tags: string[];
  material: string;
  weight: string;
  dimensions: string;
  finish: string[];
  color: string;
  moq: string;
  leadTime: string;
  packaging: string;
  hsnCode: string;
  price: string;
  numericPrice: number;
  currency: "INR" | "USD";
  priceVisibility: PriceVisibility;
  requestForQuote: boolean;
  images: string[];
  imageAlt: string;
  status: ProductStatus;
  isFeatured: boolean;
  isNewArrival: boolean;
  seoTitle: string;
  seoDescription: string;
  canonicalSlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  productCount: number;
}

export interface AdminCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isFeatured: boolean;
  status: "published" | "draft";
  assignedProductIds: string[];
  createdAt: string;
}

export type EnquiryStatus = "new" | "contacted" | "in_progress" | "converted" | "closed";

export interface AdminEnquiry {
  id: string;
  customerName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  country: string;
  companyName: string;
  productOfInterest: string;
  skuOfInterest?: string;
  quantity: string;
  message: string;
  submissionDate: string;
  status: EnquiryStatus;
  internalNotes: { id: string; author: string; note: string; timestamp: string }[];
}

export interface AdminMediaItem {
  id: string;
  filename: string;
  url: string;
  fileType: string;
  fileSize: string;
  dimensions: string;
  altText: string;
  uploadedAt: string;
}

export interface AdminHomepageConfig {
  hero: {
    heading: string;
    subtitle: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    metalStandard: string;
    dispatchGateway: string;
    quote: string;
  };
  bestSellers: {
    heading: string;
    description: string;
    enabled: boolean;
  };
  featuredCollections: {
    heading: string;
    subtitle: string;
    enabled: boolean;
  };
  newArrivals: {
    heading: string;
    subtitle: string;
    enabled: boolean;
  };
  brandStory: {
    heading: string;
    description: string;
    image: string;
    atelierSubtitle: string;
  };
  craftsmanship: {
    heading: string;
    description: string;
    enabled: boolean;
  };
  globalPresence: {
    heading: string;
    description: string;
    enabled: boolean;
  };
  contactCta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    whatsappText: string;
  };
}

export interface AdminSiteSettings {
  general: {
    websiteName: string;
    tagline: string;
    logoText: string;
    logoSubtext: string;
    primaryCurrency: string;
    language: string;
  };
  contact: {
    contactEmail: string;
    phoneNumber: string;
    whatsappNumber: string;
    businessAddress: string;
    exportDeskHours: string;
    iecCode: string;
    gstin: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    pinterest: string;
  };
  footer: {
    description: string;
    copyrightText: string;
    fobPort: string;
  };
}

export interface AdminSeoEntry {
  id: string;
  pageKey: string;
  pageName: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
}

export type AuditActionType =
  | "product_create"
  | "product_update"
  | "product_delete"
  | "category_change"
  | "collection_change"
  | "enquiry_update"
  | "homepage_update"
  | "settings_update"
  | "security_event";

export interface AdminAuditLog {
  id: string;
  action: string;
  admin: string;
  affectedRecord: string;
  actionType: AuditActionType;
  timestamp: string;
  details?: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  googleAuthEnabled: boolean;
  totpEnabled: boolean;
  recoveryCodesConfigured: boolean;
  activeSessions: {
    id: string;
    device: string;
    ip: string;
    lastActive: string;
    current: boolean;
  }[];
  lastLogin: string;
}
