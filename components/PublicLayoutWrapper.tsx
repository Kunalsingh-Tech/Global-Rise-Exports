"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/control");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pb-16 sm:pb-0 overflow-x-hidden">{children}</main>
      <Footer />
      <MobileBottomBar />
      <FloatingWhatsApp />
    </>
  );
}
