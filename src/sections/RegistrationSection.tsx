"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationData,
} from "@/lib/validations";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Search,
  Printer,
  Sparkles,
} from "lucide-react";
import { RegistrationSlip, type VolunteerSlipData } from "@/components/printable/RegistrationSlip";
import { StatusLookupModal } from "@/components/interactive/StatusLookupModal";

const availableInterests = [
  "Community Service & Village Adoption",
  "Environmental Protection & Tree Plantation",
  "Literacy & School Outreach",
  "Blood Donation & Health Camps",
  "Event Coordination & Logistics",
  "Digital Media, Tech & Documentation",
  "Disaster Preparedness & Relief",
  "Social Awareness & Public Campaigns",
];

export function RegistrationSection() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);
  const [confirmedData, setConfirmedData] = useState<VolunteerSlipData | null>(null);
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);
  const [showStatusLookup, setShowStatusLookup] = useState<boolean>(false);

  // Check campaign gate status on mount
  useEffect(() => {
    async function checkCampaignStatus() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isRegistrationOpen === "boolean") {
            setIsRegistrationOpen(data.isRegistrationOpen);
          }
        }
      } catch (err) {
        console.warn("Could not check campaign status", err);
      }
    }
    checkCampaignStatus();
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      rollNumber: "",
      email: "",
      phone: "",
      ugPg: "UG",
      program: "B.Tech",
      department: "",
      year: "2",
      section: "",
      interests: [],
      previousExperience: "",
      motivation: "",
      consent: false as any,
    },
  });

  const selectedUgPg = watch("ugPg");
  const selectedInterests = watch("interests") || [];

  // Update default year when switching between UG and PG
  useEffect(() => {
    if (selectedUgPg === "UG") {
      setValue("year", "2");
      setValue("program", "B.Tech");
    } else {
      setValue("year", "1");
      setValue("program", "MCA");
    }
  }, [selectedUgPg, setValue]);

  // Validate Step 1 before allowing advance to Step 2
  const handleContinueToStepTwo = async () => {
    const isStepOneValid = await trigger([
      "fullName",
      "rollNumber",
      "email",
      "phone",
      "ugPg",
      "program",
      "department",
      "year",
      "section",
    ]);

    if (isStepOneValid) {
      setCurrentStep(2);
      window.scrollTo({
        top: (document.getElementById("register")?.offsetTop ?? 0) - 80,
        behavior: "smooth",
      });
    }
  };

  const handleBackToStepOne = () => {
    setCurrentStep(1);
    window.scrollTo({
      top: (document.getElementById("register")?.offsetTop ?? 0) - 80,
      behavior: "smooth",
    });
  };

  const onSubmit = async (data: RegistrationData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");
    setIsDuplicate(false);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409 || result.duplicate) {
          setIsDuplicate(true);
          throw new Error(result.error || "This student is already registered.");
        }
        if (response.status === 403 || result.closed) {
          setIsRegistrationOpen(false);
          throw new Error(result.error || "Registrations are currently closed.");
        }
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      setConfirmedData({
        registrationId: result.registrationId,
        fullName: data.fullName,
        rollNumber: data.rollNumber.toUpperCase(),
        email: data.email,
        phone: data.phone,
        program: data.program,
        department: data.department.toUpperCase(),
        year: data.year,
        section: data.section || "",
        ugPg: data.ugPg,
        interests: data.interests,
        createdAt: new Date().toISOString(),
        status: "Registered / Under Review",
      });
      setSubmitStatus("success");
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage(err.message || "An error occurred during submission.");
    }
  };

  const handleResetForm = () => {
    reset({
      fullName: "",
      rollNumber: "",
      email: "",
      phone: "",
      ugPg: "UG",
      program: "B.Tech",
      department: "",
      year: "2",
      section: "",
      interests: [],
      previousExperience: "",
      motivation: "",
      consent: false as any,
    });
    setCurrentStep(1);
    setSubmitStatus("idle");
    setErrorMessage("");
    setIsDuplicate(false);
    setConfirmedData(null);
  };

  return (
    <section
      id="register"
      className="py-20 md:py-28 bg-ivory border-b border-forest/10"
      aria-labelledby="register-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-3">
            <span>SECTION 06</span>
            <span className="w-4 h-px bg-gold" aria-hidden="true" />
            <span>ENROLLMENT PORTAL</span>
          </div>

          <h2
            id="register-heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest mb-4 leading-tight"
          >
            Your Journey Starts Here.
          </h2>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal mb-5">
            Take the first step towards joining the dedicated cohort of 100 NSS student volunteers.
          </p>

          {/* Quick Status Lookup Banner Button */}
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowStatusLookup(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-forest border border-forest/30 hover:bg-forest hover:text-white transition-colors text-xs font-bold uppercase tracking-wider shadow-2xs cursor-pointer"
            >
              <Search size={14} />
              <span>Already Registered? Check Status &bull; Find Slip</span>
            </button>
          </div>
        </div>

        {/* Multi-Step Form Container */}
        <div className="bg-white border border-forest/15 rounded-xs p-6 sm:p-10 shadow-sm relative">
          {/* A. If Campaign is Closed */}
          {!isRegistrationOpen && submitStatus !== "success" ? (
            <div className="py-10 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4 border border-amber-300 shadow-2xs">
                <AlertCircle size={28} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-gold font-bold mb-2">
                COHORT 2026 REGISTRATION NOTICE
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest mb-3">
                Recruitment Currently Paused / Concluded
              </h3>
              <p className="text-sm text-charcoal/80 max-w-lg mx-auto mb-6 leading-relaxed">
                New volunteer registrations are temporarily paused by the VIIT NSS administration as the campaign quota has been attained. If you have already applied, you can verify your application status and reprint your voucher below.
              </p>
              <button
                type="button"
                onClick={() => setShowStatusLookup(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white text-xs font-bold uppercase tracking-widest hover:bg-forest-light transition-colors shadow-xs cursor-pointer"
              >
                <Search size={14} />
                <span>Check My Application Status</span>
              </button>
            </div>
          ) : submitStatus === "success" && confirmedData ? (
            /* B. Successful Registration Confirmation */
            <div className="py-8 sm:py-12 flex flex-col items-center text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-forest text-white flex items-center justify-center mb-6 shadow-xs">
                <CheckCircle2 size={36} strokeWidth={2} />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-2">
                APPLICATION ACCEPTED
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-forest mb-3">
                Thank you for stepping forward.
              </h3>

              <p className="text-base text-charcoal/80 max-w-lg mb-8">
                Your volunteer registration has been recorded in the official Vignan&apos;s Institute of Information Technology NSS database.
              </p>

              {/* Official Confirmation Card */}
              <div className="w-full max-w-md p-6 bg-ivory border-2 border-forest/20 rounded-xs text-left mb-8 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-forest/15">
                  <span className="text-xs font-mono uppercase tracking-wider text-charcoal/60">
                    Registration ID
                  </span>
                  <span className="font-mono text-sm font-bold text-forest bg-white px-2.5 py-1 border border-forest/20">
                    {confirmedData.registrationId}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal/80">
                  <span>Student Name:</span>
                  <span className="font-semibold text-charcoal">{confirmedData.fullName}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal/80">
                  <span>Roll Number:</span>
                  <span className="font-semibold text-charcoal font-mono uppercase">{confirmedData.rollNumber}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal/80">
                  <span>Department &amp; Year:</span>
                  <span className="font-semibold text-charcoal">{confirmedData.department} &bull; Year {confirmedData.year}</span>
                </div>

                <div className="pt-3 border-t border-forest/15 text-[11px] text-charcoal/70 flex items-start gap-2">
                  <ShieldCheck size={14} className="text-forest shrink-0 mt-0.5" />
                  <span>
                    Download or print your official voucher slip below. Bring it with your student ID card to the upcoming orientation briefing.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSlipModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest text-white hover:bg-forest-light font-bold text-xs uppercase tracking-widest transition-colors shadow-xs cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Download / Print Official Voucher</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-ivory text-charcoal/80 font-bold text-xs uppercase tracking-widest border border-forest/20 transition-colors cursor-pointer"
                >
                  Register Another Student
                </button>
              </div>
            </div>
          ) : (
            /* C. Multi-Step Form */
            <div>
              {/* Visible Two-Step Progress Bar */}
              <div className="mb-10 pb-6 border-b border-forest/10">
                <div className="flex items-center justify-between max-w-xs mx-auto mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep === 1 ? "bg-forest text-white" : "bg-forest text-white"
                      }`}
                    >
                      1
                    </span>
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold ${
                        currentStep === 1 ? "text-forest" : "text-charcoal/60"
                      }`}
                    >
                      Student Details
                    </span>
                  </div>

                  <div className="w-12 h-px bg-forest/20" />

                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep === 2
                          ? "bg-forest text-white"
                          : "bg-ivory text-charcoal/60 border border-forest/20"
                      }`}
                    >
                      2
                    </span>
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold ${
                        currentStep === 2 ? "text-forest" : "text-charcoal/60"
                      }`}
                    >
                      Volunteer Profile
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-gold font-bold">
                    STEP {currentStep} OF 2 &bull;{" "}
                    {currentStep === 1 ? "ACADEMIC IDENTIFICATION" : "INTERESTS & CONSENT"}
                  </span>
                </div>
              </div>

              {/* Error & Duplicate Alerts */}
              {submitStatus === "error" && (
                <div
                  className={`p-4 mb-8 border flex items-start gap-3 rounded-xs ${
                    isDuplicate
                      ? "bg-amber-50 border-amber-300 text-amber-900"
                      : "bg-red-50 border-red-300 text-red-900"
                  }`}
                  role="alert"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">
                      {isDuplicate ? "Duplicate Registration Detected" : "Submission Notice"}
                    </p>
                    <p className="text-xs leading-relaxed">{errorMessage}</p>
                    {isDuplicate && (
                      <button
                        type="button"
                        onClick={() => setShowStatusLookup(true)}
                        className="mt-2 text-xs font-bold text-forest underline cursor-pointer"
                      >
                        Click here to lookup and print your existing voucher &rarr;
                      </button>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* STEP 1: Student Details */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="border-b border-forest/10 pb-2 mb-4">
                      <h3 className="text-base font-editorial font-bold text-forest">
                        Step 1 &mdash; Student Identification
                      </h3>
                      <p className="text-xs text-charcoal/70">
                        Please provide your institutional or official college details.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("fullName")}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                          aria-invalid={errors.fullName ? "true" : "false"}
                        />
                        {errors.fullName && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Roll Number */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Roll Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("rollNumber")}
                          placeholder="e.g. 22L31A0501"
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm uppercase rounded-none focus:bg-white transition-colors font-mono"
                          aria-invalid={errors.rollNumber ? "true" : "false"}
                        />
                        {errors.rollNumber && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.rollNumber.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Institutional or Personal Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          placeholder="e.g. student@vignan.ac.in"
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Mobile Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          {...register("phone")}
                          placeholder="10-digit mobile number"
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors font-mono"
                          aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* UG / PG Radio Selection with Policy Note */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Program Category <span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center gap-6 pt-2">
                          <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium">
                            <input
                              type="radio"
                              value="UG"
                              {...register("ugPg")}
                              className="accent-forest w-4 h-4 cursor-pointer"
                            />
                            <span>Undergraduate (UG)</span>
                          </label>
                          <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium">
                            <input
                              type="radio"
                              value="PG"
                              {...register("ugPg")}
                              className="accent-forest w-4 h-4 cursor-pointer"
                            />
                            <span>Postgraduate (PG)</span>
                          </label>
                        </div>
                        <p className="text-[11px] text-charcoal/60 mt-1">
                          {selectedUgPg === "UG"
                            ? "UG Eligibility: 2nd & 3rd Year students (All Branches)"
                            : "PG Eligibility: 1st & 2nd Year students (MCA & MBA)"}
                        </p>
                        {errors.ugPg && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.ugPg.message}
                          </p>
                        )}
                      </div>

                      {/* Degree / Program */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Degree / Program <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("program")}
                          placeholder={selectedUgPg === "UG" ? "e.g. B.Tech" : "e.g. MCA, MBA"}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                          aria-invalid={errors.program ? "true" : "false"}
                        />
                        {errors.program && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.program.message}
                          </p>
                        )}
                      </div>

                      {/* Department / Branch */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Department / Branch <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("department")}
                          placeholder="e.g. CSE, ECE, EEE, MECH, CIVIL, IT, AI&DS"
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm uppercase rounded-none focus:bg-white transition-colors font-mono"
                          aria-invalid={errors.department ? "true" : "false"}
                        />
                        {errors.department && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.department.message}
                          </p>
                        )}
                      </div>

                      {/* Academic Year (Strictly Filtered to College Eligibility) */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Academic Year <span className="text-red-600">*</span>
                        </label>
                        <select
                          {...register("year")}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                          aria-invalid={errors.year ? "true" : "false"}
                        >
                          {selectedUgPg === "UG" ? (
                            <>
                              <option value="2">2nd Year (Eligible)</option>
                              <option value="3">3rd Year (Eligible)</option>
                            </>
                          ) : (
                            <>
                              <option value="1">1st Year (Eligible)</option>
                              <option value="2">2nd Year (Eligible)</option>
                            </>
                          )}
                        </select>
                        <span className="text-[10px] text-charcoal/60 block font-mono">
                          {selectedUgPg === "UG"
                            ? "Excludes 1st yr (foundational) & 4th yr (placements)"
                            : "Applicable for 2-year Master programs (MCA / MBA)"}
                        </span>
                        {errors.year && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.year.message}
                          </p>
                        )}
                      </div>

                      {/* Section (Optional) */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Section (Optional, if applicable)
                        </label>
                        <input
                          type="text"
                          {...register("section")}
                          placeholder="e.g. A, B, C"
                          className="w-full max-w-xs px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm uppercase rounded-none focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Step 1 Actions */}
                    <div className="pt-6 border-t border-forest/10 flex justify-end">
                      <button
                        type="button"
                        onClick={handleContinueToStepTwo}
                        className="inline-flex items-center gap-2 px-7 py-3 bg-forest text-white font-bold text-xs uppercase tracking-widest hover:bg-forest-light transition-colors border border-forest active:translate-y-px cursor-pointer"
                      >
                        <span>Continue to Step 2</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Volunteer Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="border-b border-forest/10 pb-2 mb-4">
                      <h3 className="text-base font-editorial font-bold text-forest">
                        Step 2 &mdash; Volunteer Profile &amp; Consent
                      </h3>
                      <p className="text-xs text-charcoal/70">
                        Specify your volunteering interests and confirm recruitment consent.
                      </p>
                    </div>

                    {/* Areas of Interest Multi-Select */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Areas of Interest <span className="text-red-600">*</span>
                        </label>
                        <span className="text-[11px] text-charcoal/60">
                          Select one or more categories
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {availableInterests.map((interest) => {
                          const isChecked = selectedInterests.includes(interest);
                          return (
                            <label
                              key={interest}
                              className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors text-xs select-none ${
                                isChecked
                                  ? "bg-forest/5 border-forest text-forest font-semibold"
                                  : "bg-ivory/40 border-forest/15 text-charcoal/85 hover:bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                value={interest}
                                {...register("interests")}
                                className="accent-forest w-4 h-4 mt-0.5 cursor-pointer"
                              />
                              <span>{interest}</span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.interests && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.interests.message}
                        </p>
                      )}
                    </div>

                    {/* Previous Experience (Optional) */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                        Previous Volunteering Experience (Optional)
                      </label>
                      <textarea
                        {...register("previousExperience")}
                        rows={2}
                        placeholder="Briefly describe any past community service, school clubs, or social drives (if any)..."
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                      />
                      {errors.previousExperience && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.previousExperience.message}
                        </p>
                      )}
                    </div>

                    {/* Motivation for Joining (Optional) */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                        Motivation for Joining (Optional)
                      </label>
                      <textarea
                        {...register("motivation")}
                        rows={3}
                        placeholder="Why do you wish to join the NSS volunteer drive at VIIT?"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-forest/20 text-charcoal text-sm rounded-none focus:bg-white transition-colors"
                      />
                      {errors.motivation && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.motivation.message}
                        </p>
                      )}
                    </div>

                    {/* Required Consent Checkbox */}
                    <div className="p-4 bg-ivory border border-forest/20 rounded-xs space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="accent-forest w-4 h-4 mt-0.5 cursor-pointer shrink-0"
                        />
                        <span className="text-xs text-charcoal leading-relaxed">
                          I consent to the collection and use of the submitted information exclusively for the Vignan&apos;s Institute of Information Technology NSS Volunteer Recruitment Campaign, and I affirm my willingness to participate in service initiatives. <span className="text-red-600">*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-red-600 text-xs ml-7">
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    {/* Step 2 Actions */}
                    <div className="pt-6 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handleBackToStepOne}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-charcoal hover:bg-ivory font-bold text-xs uppercase tracking-widest border border-forest/20 transition-colors cursor-pointer"
                      >
                        <ArrowLeft size={14} aria-hidden="true" />
                        <span>Back to Student Details</span>
                      </button>

                      <button
                        type="submit"
                        disabled={submitStatus === "submitting"}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-forest text-white hover:bg-forest-light disabled:opacity-60 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-widest border border-forest transition-all shadow-xs cursor-pointer"
                      >
                        {submitStatus === "submitting" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                            <span>Verifying &amp; Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Registration</span>
                            <CheckCircle2 size={15} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Status Lookup Modal */}
      <StatusLookupModal
        isOpen={showStatusLookup}
        onClose={() => setShowStatusLookup(false)}
      />

      {/* Slip Print Modal on Success */}
      {showSlipModal && confirmedData && (
        <RegistrationSlip
          volunteer={confirmedData}
          onClose={() => setShowSlipModal(false)}
        />
      )}
    </section>
  );
}
