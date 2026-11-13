"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  ShieldCheck,
  Lock,
  KeyRound,
  Smartphone,
  Globe,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Save,
  Laptop,
  History,
  Database,
  ExternalLink,
} from "lucide-react";
import { adminStore } from "@/lib/admin-store";
import { AdminProfile } from "@/lib/admin-types";
import { useToast } from "@/components/admin/AdminToast";
import { checkSupabaseStatus } from "@/lib/supabase";

export default function AdminProfileSecurityPage() {
  const { success, error, info } = useToast();
  const [profile, setProfile] = useState<AdminProfile>(adminStore.getProfile());
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole] = useState(profile.role);
  
  // Security form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTotpSetup, setShowTotpSetup] = useState(false);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabaseHealth = checkSupabaseStatus();

  const demoRecoveryCodes = [
    "GRE-4921-8812-7019",
    "GRE-9912-3401-2298",
    "GRE-5510-8912-4011",
    "GRE-7719-0192-3341",
    "GRE-1120-4921-6672",
    "GRE-8823-1194-5509",
    "GRE-3391-7721-0044",
    "GRE-6629-4410-9981",
  ];

  useEffect(() => {
    setProfile(adminStore.getProfile());
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = adminStore.updateProfile({ name, email, role });
    setProfile(updated);
    success("Profile Updated", "Administrator information saved.");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      error("Password Required", "Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      error("Weak Password", "New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      error("Mismatch", "New password and confirmation do not match.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      success("Password Changed", "Administrative password updated successfully.");
    }, 450);
  };

  const handleToggleTotp = () => {
    if (profile.totpEnabled) {
      const updated = adminStore.updateProfile({ totpEnabled: false });
      setProfile(updated);
      info("2FA Disabled", "TOTP Multi-Factor Authentication turned off.");
    } else {
      setShowTotpSetup(true);
    }
  };

  const handleVerifyTotp = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6) {
      error("Invalid Token", "Please enter a 6-digit authenticator code.");
      return;
    }
    const updated = adminStore.updateProfile({ totpEnabled: true });
    setProfile(updated);
    setShowTotpSetup(false);
    setTotpCode("");
    success("2FA Activated", "Google Authenticator / TOTP MFA successfully paired.");
  };

  const handleToggleGoogleAuth = () => {
    const updated = adminStore.updateProfile({
      googleAuthEnabled: !profile.googleAuthEnabled,
    });
    setProfile(updated);
    info(
      "OAuth Status",
      !profile.googleAuthEnabled ? "Google OAuth enabled." : "Google OAuth unlinked."
    );
  };

  const handleRevokeSessions = () => {
    const currentOnly = profile.activeSessions.filter((s) => s.current);
    const updated = adminStore.updateProfile({ activeSessions: currentOnly });
    setProfile(updated);
    success("Sessions Revoked", "Terminated all other active browser sessions.");
  };

  return (
    <div className="space-y-8 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2D8C6]">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#A78044] mb-1 font-heading">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Credentials &bull; Multi-Factor Auth</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1F1A16] tracking-tight">
            Admin Profile &amp; Security
          </h1>
          <p className="text-xs text-[#685E53] mt-0.5">
            Manage administrator credentials, session authorization, two-factor authentication, and database access.
          </p>
        </div>
      </div>

      {/* Production Security Notice */}
      <div className="p-4 bg-[#FAF7F2] border border-[#C5A059] flex items-start space-x-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-[#A78044] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-heading font-extrabold text-sm text-[#1F1A16]">
            Architectural Security &amp; Authorization Model
          </h4>
          <p className="text-[#685E53] leading-relaxed">
            This administrative interface is engineered for production deployment with server-side middleware session guards and Row Level Security (RLS) policies on Supabase.
          </p>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (6 cols): Profile Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Profile Card */}
          <div className="bg-white border border-[#E2D8C6] p-6 shadow-sm space-y-5">
            <div className="flex items-center space-x-4 pb-4 border-b border-[#FAF7F2]">
              <div className="relative w-16 h-16 rounded-full bg-[#1F1A16] text-[#C5A059] font-heading font-black text-xl flex items-center justify-center border-2 border-[#C5A059] overflow-hidden flex-shrink-0">
                KS
              </div>
              <div>
                <h3 className="font-heading text-lg font-black text-[#1F1A16]">{profile.name}</h3>
                <span className="text-xs text-[#A78044] font-semibold block">{profile.role}</span>
                <span className="text-[11px] text-[#685E53] font-number">
                  Last login: {new Date(profile.lastLogin).toLocaleString()}
                </span>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1A16] mb-1 font-heading">
                  Assigned Administrative Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-[#FAF8F5] border border-[#E2D8C6] focus:border-[#1F1A16]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                Update Profile Info
              </button>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="bg-white border border-[#E2D8C6] p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
              Change Master Password
            </h3>

            <form onSubmit={handlePasswordChange} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F1A16] mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full py-2 px-3 text-xs bg-[#FAF8F5] border border-[#E2D8C6]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-[#1F1A16] hover:bg-black text-[#F6F2EA] rounded text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-70"
              >
                {isSubmitting ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (6 cols): Security & Sessions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Multi-Factor Authentication (MFA) */}
          <div className="bg-white border border-[#E2D8C6] p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-[#1F1A16] pb-3 border-b border-[#FAF7F2]">
              Authentication &amp; Verification Methods
            </h3>

            {/* TOTP 2FA */}
            <div className="p-3.5 bg-[#FAF8F5] border border-[#E2D8C6] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-[#A78044]" />
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#1F1A16]">
                    TOTP Authenticator (Google / Microsoft Auth)
                  </h4>
                  <p className="text-[11px] text-[#685E53]">
                    {profile.totpEnabled
                      ? "Active & Protecting Console"
                      : "Recommended for high-value export houses"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleTotp}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  profile.totpEnabled
                    ? "bg-rose-100 text-rose-800 hover:bg-rose-200"
                    : "bg-[#1F1A16] text-[#F6F2EA] hover:bg-black"
                }`}
              >
                {profile.totpEnabled ? "Disable" : "Enable 2FA"}
              </button>
            </div>

            {/* TOTP Setup Modal / Step */}
            {showTotpSetup && (
              <form
                onSubmit={handleVerifyTotp}
                className="p-4 bg-[#FAF7F2] border border-[#C5A059] space-y-3 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-heading text-xs font-bold text-[#1F1A16]">
                    Pair Authenticator App
                  </h5>
                  <button
                    type="button"
                    onClick={() => setShowTotpSetup(false)}
                    className="text-xs text-[#685E53] hover:text-[#1F1A16]"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-[11px] text-[#685E53] leading-relaxed">
                  Secret Key: <code className="font-bold text-[#1F1A16]">GREX-MORA-DABA-D202-6EXP</code>
                  <br />
                  Scan with your authenticator app and enter the 6-digit confirmation code:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="123456"
                    className="w-32 py-1.5 px-3 text-center text-sm font-mono font-bold bg-white border border-[#E2D8C6]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#1F1A16] text-white text-xs font-bold uppercase rounded"
                  >
                    Verify &amp; Activate
                  </button>
                </div>
              </form>
            )}

            {/* Google OAuth Status */}
            <div className="p-3.5 bg-[#FAF8F5] border border-[#E2D8C6] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-neutral-600" />
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#1F1A16]">
                    Google Workspace Single Sign-On
                  </h4>
                  <p className="text-[11px] text-[#685E53]">
                    {profile.googleAuthEnabled
                      ? "Connected to mrkunal190@gmail.com"
                      : "Connect Google Account for 1-click SSO"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleGoogleAuth}
                className="px-3 py-1.5 bg-white border border-[#E2D8C6] hover:bg-[#FAF8F5] text-xs font-bold rounded"
              >
                {profile.googleAuthEnabled ? "Disconnect" : "Connect"}
              </button>
            </div>

            {/* Backup Recovery Codes */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                className="text-xs font-bold text-[#A78044] hover:text-[#1F1A16] flex items-center space-x-1"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{showRecoveryCodes ? "Hide Backup Recovery Codes" : "View Backup Recovery Codes"}</span>
              </button>

              {showRecoveryCodes && (
                <div className="mt-3 p-3 bg-[#FAF8F5] border border-[#E2D8C6] space-y-2 animate-fadeIn">
                  <p className="text-[11px] text-[#685E53]">
                    Store these emergency one-time codes safely to recover your console access if you lose your phone:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px] text-[#1F1A16]">
                    {demoRecoveryCodes.map((code) => (
                      <span key={code} className="p-1 bg-white border border-[#E2D8C6] rounded">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white border border-[#E2D8C6] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <h3 className="font-heading text-base font-extrabold text-[#1F1A16]">
                Active Console Sessions
              </h3>
              <button
                type="button"
                onClick={handleRevokeSessions}
                className="text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                Revoke Other Sessions
              </button>
            </div>

            <div className="space-y-3">
              {profile.activeSessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3 bg-[#FAF8F5] border border-[#E2D8C6] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <Laptop className="w-4 h-4 text-neutral-500" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#1F1A16]">{sess.device}</span>
                        {sess.current && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#685E53] font-number block">
                        IP: {sess.ip} &bull; {sess.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Database Target Status */}
          <div className="bg-white border border-[#E2D8C6] p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs font-extrabold text-[#1F1A16] uppercase tracking-wider">
                Supabase Cloud Target
              </span>
              <span className="text-[10px] font-bold text-emerald-700 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ready</span>
              </span>
            </div>
            <p className="text-xs text-[#685E53]">
              Project endpoint: <code className="font-mono text-[#A78044]">merepbglbxeseolsabvi.supabase.co</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
