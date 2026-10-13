"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Lock,
  Search,
  Download,
  LogOut,
  RefreshCw,
  Users,
  Target,
  ChevronRight,
  X,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  ArrowLeft,
} from "lucide-react";

interface VolunteerRecord {
  id: string;
  registration_id: string;
  full_name: string;
  roll_number: string;
  email: string;
  phone: string;
  program: string;
  department: string;
  year: string;
  section?: string | null;
  ug_pg: string;
  interests: string;
  previous_experience?: string | null;
  motivation?: string | null;
  consent: number;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Filters State
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [ugPg, setUgPg] = useState("");

  // Detailed Modal Record
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerRecord | null>(null);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const fetchVolunteers = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (department) params.set("department", department);
      if (year) params.set("year", year);
      if (ugPg) params.set("ugPg", ugPg);

      const res = await fetch(`/api/admin/volunteers?${params.toString()}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load records");

      const data = await res.json();
      setVolunteers(data.volunteers || []);
      setTotalCount(data.totalCount || 0);
      setMatchedCount(data.matchedCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingData(false);
    }
  }, [search, department, year, ugPg]);

  // Fetch when filters change (debounced for search)
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        fetchVolunteers();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, fetchVolunteers]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setIsAuthenticated(true);
      setPassword("");
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setVolunteers([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCsv = () => {
    window.location.href = "/api/admin/export";
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="font-mono text-xs uppercase tracking-widest text-charcoal/60">
          Verifying security status...
        </div>
      </div>
    );
  }

  // 1. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-forest/20 p-8 sm:p-10 shadow-sm rounded-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-forest/10">
            <div className="w-10 h-10 rounded-xs bg-forest text-white flex items-center justify-center">
              <Lock size={18} />
            </div>
            <div>
              <h1 className="font-editorial text-xl font-bold text-forest leading-tight">
                NSS SETU Admin
              </h1>
              <p className="text-[11px] font-mono text-charcoal/60 uppercase">
                VIIT Recruiter Portal
              </p>
            </div>
          </div>

          <p className="text-xs text-charcoal/80 leading-relaxed mb-6">
            Authorized administrator credentials are required to view volunteer enrollment records and perform data export.
          </p>

          {loginError && (
            <div className="p-3 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Administrator Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-forest hover:bg-forest-light text-white font-bold text-xs uppercase tracking-widest border border-forest transition-colors shadow-2xs"
            >
              {isLoggingIn ? "Verifying..." : "Access Admin Portal"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-forest/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-forest hover:underline font-semibold"
            >
              <ArrowLeft size={13} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Administrator Dashboard
  return (
    <div className="min-h-screen bg-ivory text-charcoal pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Institutional Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-forest/15 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-1">
              <span>ADMINISTRATOR CONSOLE</span>
              <span>&bull;</span>
              <span>VIIT NSS CELL</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
              Volunteer Registrations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-forest border border-forest/30 hover:bg-forest hover:text-white transition-colors text-xs font-bold uppercase tracking-wider shadow-2xs"
              title="Download RFC 4180 CSV export of all registrations"
            >
              <FileSpreadsheet size={15} />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-charcoal/80 border border-forest/15 hover:text-red-700 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Real Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 border border-forest/15 rounded-xs shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-charcoal/60 mb-1">
              Total Live Registrations
            </div>
            <div className="font-editorial text-3xl font-bold text-forest">
              {totalCount} <span className="text-base font-normal text-charcoal/60">/ 100 Target</span>
            </div>
          </div>

          <div className="bg-white p-5 border border-forest/15 rounded-xs shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-charcoal/60 mb-1">
              Current Filter Matches
            </div>
            <div className="font-editorial text-3xl font-bold text-gold">
              {matchedCount} <span className="text-base font-normal text-charcoal/60">records</span>
            </div>
          </div>

          <div className="bg-white p-5 border border-forest/15 rounded-xs shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-charcoal/60 mb-1">
              Campaign Quota Reached
            </div>
            <div className="font-editorial text-3xl font-bold text-forest">
              {Math.min(100, Math.round((totalCount / 100) * 100))}%
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-5 border border-forest/15 rounded-xs mb-6 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, roll no, email, mobile..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-ivory/50 border border-forest/20 text-charcoal rounded-none focus:bg-white"
              />
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50"
              />
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-ivory/50 border border-forest/20 text-charcoal rounded-none focus:bg-white"
              >
                <option value="">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
                <option value="AI&DS">AI &amp; DS</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
              </select>
            </div>

            {/* Academic Year Filter */}
            <div>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-ivory/50 border border-forest/20 text-charcoal rounded-none focus:bg-white"
              >
                <option value="">All Academic Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* UG/PG Filter */}
            <div>
              <select
                value={ugPg}
                onChange={(e) => setUgPg(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-ivory/50 border border-forest/20 text-charcoal rounded-none focus:bg-white"
              >
                <option value="">All Categories (UG &amp; PG)</option>
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white border border-forest/15 rounded-xs shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ivory border-b border-forest/15 font-mono uppercase tracking-wider text-charcoal/70">
                  <th className="py-3 px-4">Reg ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Program &amp; Dept</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {isLoadingData ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-charcoal/60 font-mono">
                      Querying database records...
                    </td>
                  </tr>
                ) : volunteers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-charcoal/60">
                      No volunteer registrations found matching the selected parameters.
                    </td>
                  </tr>
                ) : (
                  volunteers.map((v) => (
                    <tr key={v.id} className="hover:bg-ivory/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-forest">
                        {v.registration_id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-charcoal">
                        {v.full_name}
                      </td>
                      <td className="py-3 px-4 font-mono uppercase text-charcoal/90">
                        {v.roll_number}
                      </td>
                      <td className="py-3 px-4 text-charcoal/80">
                        <div>{v.email}</div>
                        <div className="text-[11px] font-mono text-charcoal/60">{v.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-forest">{v.department}</span>
                        <span className="text-charcoal/60 ml-1">({v.ug_pg})</span>
                      </td>
                      <td className="py-3 px-4">Year {v.year}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-charcoal/60">
                        {new Date(v.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedVolunteer(v)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-ivory border border-forest/20 hover:bg-forest hover:text-white transition-colors"
                        >
                          <Eye size={12} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volunteer Details Modal */}
        {selectedVolunteer && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-forest/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-xs shadow-xl animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-forest/15 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                    VOLUNTEER RECORD PROFILE
                  </span>
                  <h2 className="font-editorial text-2xl font-bold text-forest">
                    {selectedVolunteer.full_name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVolunteer(null)}
                  className="p-1.5 text-charcoal/70 hover:text-forest border border-forest/15 transition-colors"
                  aria-label="Close record modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs text-charcoal/85">
                <div className="grid grid-cols-2 gap-4 bg-ivory p-4 border border-forest/10">
                  <div>
                    <span className="text-charcoal/60 block font-mono text-[10px]">REGISTRATION ID</span>
                    <span className="font-mono font-bold text-forest">{selectedVolunteer.registration_id}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60 block font-mono text-[10px]">ROLL NUMBER</span>
                    <span className="font-mono font-bold">{selectedVolunteer.roll_number}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60 block font-mono text-[10px]">EMAIL ADDRESS</span>
                    <span>{selectedVolunteer.email}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60 block font-mono text-[10px]">PHONE NUMBER</span>
                    <span className="font-mono">{selectedVolunteer.phone}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60 block font-mono text-[10px]">ACADEMIC STATUS</span>
                    <span>{selectedVolunteer.program} &bull; {selectedVolunteer.department} &bull; Year {selectedVolunteer.year} ({selectedVolunteer.ug_pg})</span>
                  </div>
                  <div>
                    <span className="text-charcoal/60 block font-mono text-[10px]">SECTION</span>
                    <span>{selectedVolunteer.section || "Not specified"}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-forest mb-2">Areas of Interest</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(() => {
                      try {
                        const parsed = JSON.parse(selectedVolunteer.interests);
                        return Array.isArray(parsed)
                          ? parsed.map((item: string) => (
                              <span
                                key={item}
                                className="px-2.5 py-1 bg-ivory border border-forest/20 text-forest text-[11px] font-semibold"
                              >
                                {item}
                              </span>
                            ))
                          : <span>{selectedVolunteer.interests}</span>;
                      } catch {
                        return <span>{selectedVolunteer.interests}</span>;
                      }
                    })()}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-forest mb-1">Previous Volunteering Experience</h4>
                  <div className="p-3 bg-ivory/60 border border-forest/10 whitespace-pre-wrap leading-relaxed">
                    {selectedVolunteer.previous_experience || "No previous experience recorded."}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-forest mb-1">Motivation for Joining</h4>
                  <div className="p-3 bg-ivory/60 border border-forest/10 whitespace-pre-wrap leading-relaxed">
                    {selectedVolunteer.motivation || "No statement provided."}
                  </div>
                </div>

                <div className="pt-4 border-t border-forest/10 flex justify-between items-center text-[11px] text-charcoal/60">
                  <span>Consent Affirmed: Yes (1)</span>
                  <span>Registered: {new Date(selectedVolunteer.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-forest/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedVolunteer(null)}
                  className="px-5 py-2 bg-forest text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
