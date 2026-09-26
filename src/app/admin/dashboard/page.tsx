"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download, LogOut, Check, X, RefreshCw } from "lucide-react";

type Application = {
  id: string;
  application_id: string;
  full_name: string;
  student_id: string;
  programme: string;
  department: string;
  year: string;
  status: string;
  created_at: string;
};

type Stats = {
  total: number;
  ug: number;
  pg: number;
  pending: number;
  selected: number;
  rejected: number;
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  
  const router = useRouter();

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications?search=${search}&status=${filter}`);
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setApplications(data.applications);
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, filter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchApplications();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

  const exportCSV = () => {
    if (applications.length === 0) return;
    const headers = ["Application ID", "Name", "Student ID", "Programme", "Department", "Year", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...applications.map(a => 
        [a.application_id, `"${a.full_name}"`, a.student_id, a.programme, `"${a.department}"`, a.year, a.status, new Date(a.created_at).toLocaleDateString()].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nss_applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-nss-primary text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-nss-primary flex items-center justify-center font-bold text-sm">
              NSS
            </div>
            <h1 className="font-bold text-lg tracking-wide">ADMIN DASHBOARD</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium hover:text-red-200 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "UG", value: stats.ug, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "PG", value: stats.pg, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Pending", value: stats.pending, color: "text-yellow-600", bg: "bg-yellow-50" },
              { label: "Selected", value: stats.selected, color: "text-green-600", bg: "bg-green-50" },
              { label: "Rejected", value: stats.rejected, color: "text-red-600", bg: "bg-red-50" }
            ].map((s, i) => (
              <div key={i} className={`${s.bg} p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center`}>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{s.label}</p>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, ID..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nss-primary"
              />
            </div>
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="py-2.5 px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nss-primary bg-white"
            >
              <option value="">All Status</option>
              <option value="submitted">Pending</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchApplications} className="p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">App ID</th>
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Academic</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-nss-primary">{app.application_id}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{app.full_name}</p>
                      <p className="text-gray-500 text-xs">{app.student_id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{app.programme} • {app.department}</p>
                      <p className="text-gray-500 text-xs">Year {app.year}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        app.status === 'selected' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => updateStatus(app.id, 'selected')}
                        disabled={app.status === 'selected'}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50 transition-colors"
                        title="Select"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(app.id, 'rejected')}
                        disabled={app.status === 'rejected'}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
