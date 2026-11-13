"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ControlRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/control/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE]">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
        <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F1A16]">
          Loading Atelier Console...
        </p>
      </div>
    </div>
  );
}
