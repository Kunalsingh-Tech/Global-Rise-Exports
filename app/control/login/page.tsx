"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import { useToast } from "@/components/admin/AdminToast";
import { adminStore } from "@/lib/admin-store";
import { SUPABASE_CONFIG } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [email, setEmail] = useState("admin@globalriseexports.com");
  const [password, setPassword] = useState("MoradabadBrass2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email.trim() && password.trim()) {
        adminStore.setAuth(true);
        success("Authentication Successful", `Welcome back, Kunal Singh`);
        router.push("/control/dashboard");
      } else {
        error("Authentication Failed", "Please enter valid email and password.");
        setIsLoading(false);
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail("admin@globalriseexports.com");
    setPassword("MoradabadBrass2026!");
  };

  return (
    <div className="min-h-screen bg-[#F6F2EA] flex items-center justify-center p-4 sm:p-6 font-body">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <span className="font-heading text-2xl sm:text-3xl text-[#1F1A16] font-black tracking-tight group-hover:text-brand-accent transition-colors">
              Global Rise Exports
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-brand-secondary font-bold mt-1">
              Peetal Nagri &bull; Atelier Admin Console
            </span>
          </Link>
        </div>

        {/* Login Box */}
        <div className="bg-[#FFFFFF] border border-[#E2D8C6] shadow-xl p-6 sm:p-8 rounded-none">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#A78044] mb-2 font-heading">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Personnel Access</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl font-black text-[#1F1A16] mb-1">
            Sign In to Console
          </h2>
          <p className="text-xs text-[#685E53] mb-6">
            Manage catalogue, B2B wholesale enquiries, pricing, and export logistics.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1.5 font-heading">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@globalriseexports.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E2D8C6] text-xs sm:text-sm text-[#1F1A16] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] font-heading">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] text-[#A78044] hover:text-[#1F1A16] font-semibold transition-colors"
                >
                  Use Demo Credentials
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E2D8C6] text-xs sm:text-sm text-[#1F1A16] focus:border-[#1F1A16] focus:bg-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1F1A16]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1F1A16] rounded border-[#E2D8C6] focus:ring-0"
                />
                <span className="text-[#685E53] font-medium">Keep session active (30 Days)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] text-xs uppercase tracking-wider font-extrabold transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <span>Authenticating Session...</span>
              ) : (
                <>
                  <span>Enter Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 p-3.5 bg-[#F6F2EA] border border-[#E2D8C6] text-xs text-[#685E53] space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-[#1F1A16]">
              <KeyRound className="w-3.5 h-3.5 text-[#A78044]" />
              <span>Demonstration Credentials Pre-configured</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Email: <code className="text-[#1F1A16] font-semibold">admin@globalriseexports.com</code>
              <br />
              Password: <code className="text-[#1F1A16] font-semibold">MoradabadBrass2026!</code>
            </p>
          </div>

          {/* Supabase Target Integration Footnote */}
          <div className="mt-4 text-center text-[10px] text-neutral-400">
            <span>Prepared for Supabase Cloud Auth &bull; </span>
            <span className="text-[#A78044] font-medium">merepbglbxeseolsabvi.supabase.co</span>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#685E53] hover:text-[#1F1A16] font-semibold transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
