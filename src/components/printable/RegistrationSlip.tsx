"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Printer, X, Download, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface VolunteerSlipData {
  registrationId: string;
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  program: string;
  department: string;
  year: string;
  section?: string | null;
  ugPg: string;
  interests?: string[] | string;
  createdAt?: string;
  status?: string;
}

interface RegistrationSlipProps {
  volunteer: VolunteerSlipData;
  onClose?: () => void;
}

export function RegistrationSlip({ volunteer, onClose }: RegistrationSlipProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    async function generateQr() {
      try {
        const qrPayload = JSON.stringify({
          org: "VIIT-NSS",
          id: volunteer.registrationId,
          roll: volunteer.rollNumber,
          name: volunteer.fullName,
          dept: volunteer.department,
        });
        const url = await QRCode.toDataURL(qrPayload, {
          width: 140,
          margin: 1,
          color: {
            dark: "#1A3C29",
            light: "#FFFFFF",
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    }
    generateQr();
  }, [volunteer]);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = volunteer.createdAt
    ? new Date(volunteer.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const parsedInterests: string[] = Array.isArray(volunteer.interests)
    ? volunteer.interests
    : typeof volunteer.interests === "string"
    ? (() => {
        try {
          return JSON.parse(volunteer.interests);
        } catch {
          return [volunteer.interests];
        }
      })()
    : [];

  return (
    <>
      {/* SCREEN MODAL VIEW */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden">
        <div className="bg-white border border-forest/20 max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl flex flex-col">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between p-4 bg-forest text-white border-b border-forest/20 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-gold" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                Official Registration Acknowledgment Slip
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold hover:bg-gold-light text-forest font-bold text-xs uppercase tracking-wider rounded-none transition-colors shadow-2xs cursor-pointer"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                  aria-label="Close voucher preview"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Slip Screen Preview Body */}
          <div className="p-6 sm:p-8 bg-ivory/40">
            <VoucherContent
              volunteer={volunteer}
              qrCodeUrl={qrCodeUrl}
              formattedDate={formattedDate}
              parsedInterests={parsedInterests}
            />
          </div>

          {/* Modal Footer Note */}
          <div className="p-4 bg-white border-t border-forest/15 text-center text-xs text-charcoal/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              💡 In the print preview dialog, choose <strong>&ldquo;Save as PDF&rdquo;</strong> to store a digital copy.
            </span>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-forest-light transition-colors"
            >
              <Download size={13} />
              <span>Download Slip</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRINT-ONLY BODY (Strictly Formatted for A4 Paper Output) */}
      <div className="hidden print:block fixed inset-0 bg-white text-black p-8 z-[9999] print:m-0 print:p-6">
        <VoucherContent
          volunteer={volunteer}
          qrCodeUrl={qrCodeUrl}
          formattedDate={formattedDate}
          parsedInterests={parsedInterests}
          isPrintMode
        />
      </div>
    </>
  );
}

function VoucherContent({
  volunteer,
  qrCodeUrl,
  formattedDate,
  parsedInterests,
  isPrintMode = false,
}: {
  volunteer: VolunteerSlipData;
  qrCodeUrl: string;
  formattedDate: string;
  parsedInterests: string[];
  isPrintMode?: boolean;
}) {
  return (
    <div
      className={`bg-white border-2 border-forest/30 p-6 sm:p-8 text-charcoal relative rounded-xs ${
        isPrintMode ? "border-black shadow-none max-w-full" : "shadow-md"
      }`}
    >
      {/* Decorative Gold Top Rule */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-forest via-gold to-forest" />

      {/* Institutional Top Crest & Header */}
      <div className="flex items-center justify-between pb-5 border-b-2 border-forest/20 gap-4">
        {/* Emblem Triad */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-12 h-12 aspect-square rounded-full overflow-hidden border border-forest/20 bg-white p-0.5">
            <Image src="/viit-logo.png" alt="VIIT Logo" fill className="object-contain" sizes="48px" />
          </div>
          <div className="relative w-14 h-14 aspect-square rounded-full overflow-hidden border-2 border-gold bg-white p-0.5">
            <Image src="/nss-logo.png" alt="NSS Logo" fill className="object-contain" sizes="56px" />
          </div>
          <div className="relative w-12 h-12 aspect-square rounded-full overflow-hidden border border-forest/20 bg-white p-0.5">
            <Image src="/mybharat-logo.png" alt="MY BHARAT Logo" fill className="object-contain" sizes="48px" />
          </div>
        </div>

        {/* University Titles */}
        <div className="text-center flex-1 px-2">
          <h2 className="font-editorial text-lg sm:text-xl font-bold uppercase tracking-tight text-forest leading-tight">
            Vignan&apos;s Institute of Information Technology
          </h2>
          <p className="text-[10px] sm:text-[11px] font-mono text-charcoal/70 uppercase tracking-wider">
            (Autonomous &bull; Accredited by NAAC with &apos;A+&apos; Grade &bull; Affiliated to JNTUK)
          </p>
          <div className="inline-block px-3 py-0.5 mt-1 bg-forest/10 border border-forest/20 text-forest text-[11px] font-bold uppercase tracking-widest font-mono">
            NATIONAL SERVICE SCHEME (NSS) CELL &bull; REGISTRATION ACKNOWLEDGMENT
          </div>
        </div>

        {/* Scannable Verification QR Code */}
        <div className="shrink-0 flex flex-col items-center">
          {qrCodeUrl ? (
            <div className="p-1 border border-forest/20 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl} alt="Verification QR Code" className="w-20 h-20 object-contain" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-ivory border border-forest/20 flex items-center justify-center text-[10px] font-mono text-charcoal/50">
              Generating...
            </div>
          )}
          <span className="text-[9px] font-mono text-charcoal/60 uppercase tracking-widest mt-1">
            Scan to Verify
          </span>
        </div>
      </div>

      {/* Registration Badge Bar */}
      <div className="my-5 p-3.5 bg-ivory/80 border border-forest/15 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
            Official Registration Number
          </span>
          <span className="font-mono text-base font-bold text-forest">
            {volunteer.registrationId}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
            Submission Timestamp
          </span>
          <span className="font-mono text-xs font-semibold text-charcoal">
            {formattedDate}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
            Application Status
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-forest bg-white px-2 py-0.5 border border-forest/20">
            <CheckCircle2 size={12} className="text-forest" />
            <span>{volunteer.status || "Registered / Under Review"}</span>
          </span>
        </div>
      </div>

      {/* Student Academic & Personal Record Table */}
      <div className="mb-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-2 pb-1 border-b border-forest/15">
          Student Information Record
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Full Name</span>
            <span className="font-semibold text-charcoal text-sm">{volunteer.fullName}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Roll Number</span>
            <span className="font-mono font-bold text-forest text-sm uppercase">{volunteer.rollNumber}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Degree / Category</span>
            <span className="font-semibold text-charcoal">{volunteer.program} ({volunteer.ugPg})</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Department / Branch</span>
            <span className="font-semibold text-forest uppercase">{volunteer.department}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Academic Year</span>
            <span className="font-semibold text-charcoal">Year {volunteer.year}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Class Section</span>
            <span className="font-semibold text-charcoal">{volunteer.section || "N/A"}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Contact Mobile</span>
            <span className="font-mono text-charcoal">{volunteer.phone}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Registered Email</span>
            <span className="text-charcoal break-all">{volunteer.email}</span>
          </div>
        </div>
      </div>

      {/* Selected Volunteer Interest Domains */}
      {parsedInterests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-2 pb-1 border-b border-forest/15">
            Registered NSS Service Domains
          </h3>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {parsedInterests.map((interest, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-ivory border border-forest/20 text-[11px] font-medium text-forest"
              >
                &bull; {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Institutional Instructions & Orientation Guidelines */}
      <div className="p-3.5 bg-ivory/60 border border-forest/15 text-[11px] text-charcoal/80 space-y-1.5 mb-8">
        <div className="font-mono text-xs font-bold text-forest uppercase tracking-wider mb-1">
          Mandatory Volunteer Directives &bull; Orientation Guidelines
        </div>
        <p>
          1. <strong>Orientation Verification:</strong> Carry a printed copy of this acknowledgment slip along with your college photo ID card to the upcoming NSS Orientation Briefing.
        </p>
        <p>
          2. <strong>Academic On-Duty (OD):</strong> In accordance with VIIT autonomous regulations, authorized attendance for community service drives and rural camps qualifies for academic OD permissions.
        </p>
        <p>
          3. <strong>Certification Standard:</strong> The prestigious NSS University Certificate requires completion of 120 annual service hours and active participation in the annual 7-day Special Rural Camp.
        </p>
        <p>
          4. <strong>Selection &amp; Orientation:</strong> Your department&apos;s NSS Joint Secretary (JS) will contact you directly regarding selection confirmation and orientation schedule.
        </p>
      </div>

      {/* Signatures & Institutional Seal Block */}
      <div className="pt-8 border-t border-forest/20 grid grid-cols-3 gap-4 items-end text-center text-xs">
        <div>
          <div className="h-10 border-b border-charcoal/40 mb-1" />
          <span className="font-mono text-[10px] text-charcoal/70 uppercase">
            Signature of Student Volunteer
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-forest/40 flex items-center justify-center p-1 mb-1">
            <span className="text-[8px] font-mono text-forest/70 uppercase text-center font-bold">
              VIIT NSS CELL SEAL
            </span>
          </div>
          <span className="font-mono text-[9px] text-charcoal/60 uppercase">
            Official Verification Stamp
          </span>
        </div>

        <div>
          <div className="h-10 border-b border-charcoal/40 mb-1" />
          <span className="font-mono text-[10px] text-charcoal/70 uppercase">
            Program Officer / NSS Coordinator
          </span>
        </div>
      </div>
    </div>
  );
}
