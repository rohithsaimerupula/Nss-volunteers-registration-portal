"use client";

import React, { useState } from "react";
import { Search, X, CheckCircle2, AlertCircle, RefreshCw, Printer, ShieldCheck } from "lucide-react";
import { RegistrationSlip, type VolunteerSlipData } from "@/components/printable/RegistrationSlip";

interface StatusLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatusLookupModal({ isOpen, onClose }: StatusLookupModalProps) {
  const [rollNumber, setRollNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState<VolunteerSlipData | null>(null);
  const [showSlip, setShowSlip] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = rollNumber.trim().toUpperCase();
    if (!query) return;

    setIsLoading(true);
    setError("");
    setRecord(null);

    try {
      const res = await fetch(`/api/lookup?rollNumber=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Record not found.");
      }

      setRecord(data.volunteer);
    } catch (err: any) {
      setError(err.message || "Failed to locate registration record.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "Pending").toLowerCase();
    if (s === "selected") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-900 border border-green-300 font-mono text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 size={13} className="text-green-700" />
          <span>Selected &bull; Active Cohort</span>
        </span>
      );
    }
    if (s === "shortlisted") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 border border-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={13} className="text-blue-700" />
          <span>Shortlisted for Orientation</span>
        </span>
      );
    }
    if (s === "waitlisted") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Waitlisted (Quota Pending)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ivory text-forest border border-forest/30 font-mono text-xs font-bold uppercase tracking-wider">
        <CheckCircle2 size={13} className="text-forest" />
        <span>Registered / Under Review</span>
      </span>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white border border-forest/20 max-w-lg w-full p-6 sm:p-8 rounded-xs shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-forest/15 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xs bg-forest text-white flex items-center justify-center">
                <Search size={16} />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-forest leading-tight">
                  Check Volunteer Status
                </h3>
                <p className="text-[11px] font-mono text-charcoal/60 uppercase">
                  VIIT NSS Enrollment Verification
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-charcoal/50 hover:text-charcoal hover:bg-ivory rounded transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4 mb-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Enter Your College Roll Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 22L31A0501"
                  className="w-full pl-3.5 pr-24 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm uppercase rounded-none focus:bg-white focus:outline-forest transition-colors font-mono"
                  required
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-forest hover:bg-forest-light text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isLoading ? (
                    <RefreshCw size={13} className="animate-spin" />
                  ) : (
                    <Search size={13} />
                  )}
                  <span>{isLoading ? "Checking..." : "Search"}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Error Notice */}
          {error && (
            <div className="p-3.5 mb-5 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 rounded-xs">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{error}</p>
                <p className="text-[11px] text-amber-800/80 mt-0.5">
                  Please confirm that you typed your roll number correctly without spaces.
                </p>
              </div>
            </div>
          )}

          {/* Record Found Result Card */}
          {record && (
            <div className="p-5 bg-ivory border-2 border-forest/20 rounded-xs mb-6 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-forest/15">
                <div>
                  <span className="text-[10px] font-mono uppercase text-charcoal/60 block">
                    Registration ID
                  </span>
                  <span className="font-mono text-sm font-bold text-forest">
                    {record.registrationId}
                  </span>
                </div>
                {getStatusBadge(record.status)}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-charcoal/60 uppercase block">Student Name</span>
                  <span className="font-semibold text-charcoal">{record.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-charcoal/60 uppercase block">Roll Number</span>
                  <span className="font-mono uppercase font-bold text-forest">{record.rollNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-charcoal/60 uppercase block">Branch &amp; Year</span>
                  <span className="font-medium text-charcoal">
                    {record.department} &bull; Year {record.year} ({record.ugPg})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-charcoal/60 uppercase block">Registered Date</span>
                  <span className="font-mono text-charcoal/80">
                    {record.createdAt
                      ? new Date(record.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Recent"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-forest/15 flex items-center justify-between">
                <span className="text-[11px] text-charcoal/70">
                  Official voucher ready for download
                </span>
                <button
                  type="button"
                  onClick={() => setShowSlip(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-forest text-white hover:bg-forest-light text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
                >
                  <Printer size={13} />
                  <span>Print / View Slip</span>
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-forest/10 flex items-center justify-between text-xs text-charcoal/60">
            <span>Need to submit a fresh application?</span>
            <button
              type="button"
              onClick={onClose}
              className="text-forest hover:underline font-semibold"
            >
              Go to Registration Form &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Slip Viewer Modal */}
      {showSlip && record && (
        <RegistrationSlip
          volunteer={record}
          onClose={() => setShowSlip(false)}
        />
      )}
    </>
  );
}
