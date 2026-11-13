"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { adminStore } from "@/lib/admin-store";
import { AdminProduct } from "@/lib/admin-types";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const found = adminStore.getProductById(productId);
      if (found) {
        setProduct(found);
      }
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold uppercase tracking-wider text-[#685E53] font-heading">
          Loading Article Data...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white border border-[#E2D8C6] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
        <AlertCircle className="w-10 h-10 text-[#C5A059] mx-auto mb-3" />
        <h2 className="font-heading text-xl font-black text-[#1F1A16] mb-1">
          Product Not Found
        </h2>
        <p className="text-xs text-[#685E53] mb-6">
          Could not locate article with ID <code className="font-bold text-[#1F1A16]">{productId}</code>. It may have been deleted or moved.
        </p>
        <Link
          href="/control/products"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1F1A16] text-[#F6F2EA] text-xs font-bold uppercase tracking-wider rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Products</span>
        </Link>
      </div>
    );
  }

  return <ProductForm initialProduct={product} isEditMode={true} />;
}
