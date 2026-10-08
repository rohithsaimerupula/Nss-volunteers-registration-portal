"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { registrationSchema, type RegistrationData as FormData } from "@/lib/validations";

const interestsList = [
  "Community Service",
  "Environment",
  "Education",
  "Health",
  "Event Management",
  "Technology",
  "Photography / Media",
  "Social Awareness",
  "Other",
];

export function RegistrationSection() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationId, setRegistrationId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      interests: [],
    },
  });

  const selectedInterests = watch("interests") || [];

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setRegistrationId(result.registrationId);
      setSubmitStatus("success");
      // Reset form after a slight delay if needed, or keep success state
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message);
    }
  };

  const handleReset = () => {
    reset();
    setSubmitStatus("idle");
    setErrorMessage("");
    setRegistrationId("");
  };

  return (
    <section id="register" className="py-24 relative bg-surface/50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 text-foreground"
          >
            Become an NSS Volunteer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Take the first step toward serving your community.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-background border border-black/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow in the form card */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-4xl font-black mb-2 text-foreground">You're In!</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Thank you for stepping forward to serve with NSS.
                </p>
                <div className="bg-surface border border-black/10 rounded-xl p-6 mb-8 w-full max-w-md">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Registration Status</p>
                  <p className="text-lg font-bold text-primary mb-4">Successful</p>
                  {registrationId && (
                    <>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Registration ID</p>
                      <p className="font-mono text-xl text-foreground bg-slate-100 py-2 rounded-lg">{registrationId}</p>
                    </>
                  )}
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-surface text-foreground font-semibold hover:bg-surface/80 border border-black/10 transition-all"
                >
                  Register Another Volunteer
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3">
                    <AlertCircle size={20} className="shrink-0" />
                    <div>
                      <p className="font-semibold">{errorMessage}</p>
                      {errorMessage.includes("already registered") ? (
                        <p className="text-sm opacity-80">Our records show this roll number or email is already registered.</p>
                      ) : (
                        <p className="text-sm opacity-80">Please check your network and try again. Your data has been preserved.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Section 1: Personal Info */}
                <div>
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b border-black/10 text-foreground">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Full Name <span className="text-red-500">*</span></label>
                      <input
                        {...register("fullName")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground", errors.fullName ? "border-red-500" : "border-black/10")}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Roll Number <span className="text-red-500">*</span></label>
                      <input
                        {...register("rollNumber")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground uppercase", errors.rollNumber ? "border-red-500" : "border-black/10")}
                        placeholder="e.g. 21L31A0500"
                      />
                      {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        {...register("email")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground", errors.email ? "border-red-500" : "border-black/10")}
                        placeholder="student@viit.ac.in"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Mobile Number <span className="text-red-500">*</span></label>
                      <input
                        {...register("phone")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground", errors.phone ? "border-red-500" : "border-black/10")}
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Academic Info */}
                <div>
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b border-black/10 text-foreground">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Program / Degree <span className="text-red-500">*</span></label>
                      <input
                        {...register("program")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground", errors.program ? "border-red-500" : "border-black/10")}
                        placeholder="B.Tech, MBA, etc."
                      />
                      {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Department / Branch <span className="text-red-500">*</span></label>
                      <input
                        {...register("department")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground", errors.department ? "border-red-500" : "border-black/10")}
                        placeholder="CSE, ECE, IT, etc."
                      />
                      {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Year <span className="text-red-500">*</span></label>
                      <select
                        {...register("year")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground appearance-none", errors.year ? "border-red-500" : "border-black/10")}
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                      {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Section (Optional)</label>
                      <input
                        {...register("section")}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                        placeholder="A, B, C, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">UG / PG <span className="text-red-500">*</span></label>
                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value="UG" {...register("ugPg")} className="text-primary focus:ring-primary h-4 w-4 accent-primary" />
                          <span className="text-foreground">UG</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value="PG" {...register("ugPg")} className="text-primary focus:ring-primary h-4 w-4 accent-primary" />
                          <span className="text-foreground">PG</span>
                        </label>
                      </div>
                      {errors.ugPg && <p className="text-red-500 text-xs mt-1">{errors.ugPg.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 3: Volunteer Info */}
                <div>
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b border-black/10 text-foreground">Volunteer Information</h3>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground/80">Areas of Interest <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {interestsList.map((interest) => (
                          <label key={interest} className={cn("flex items-center p-3 rounded-xl border cursor-pointer transition-all", selectedInterests.includes(interest) ? "border-primary bg-primary/10" : "border-black/10 bg-surface hover:bg-surface/80")}>
                            <input
                              type="checkbox"
                              value={interest}
                              {...register("interests")}
                              className="hidden"
                            />
                            <span className={cn("text-sm", selectedInterests.includes(interest) ? "text-primary font-medium" : "text-foreground/80")}>{interest}</span>
                          </label>
                        ))}
                      </div>
                      {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Previous Volunteering Experience (Optional)</label>
                      <textarea
                        {...register("previousExperience")}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground min-h-[80px]"
                        placeholder="Briefly describe any past volunteering work..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Why do you want to join NSS? <span className="text-red-500">*</span></label>
                      <textarea
                        {...register("motivation")}
                        className={cn("w-full px-4 py-3 rounded-xl bg-surface border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground min-h-[100px]", errors.motivation ? "border-red-500" : "border-black/10")}
                        placeholder="Share your motivation..."
                      />
                      {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 4: Consent */}
                <div className="pt-4 border-t border-black/10">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="peer appearance-none w-5 h-5 border border-black/20 rounded cursor-pointer checked:bg-primary checked:border-primary transition-all"
                      />
                      <CheckCircle2 size={14} className="absolute text-background opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      I confirm that the information provided above is accurate and I agree to participate in NSS activities as required.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-xs mt-2 ml-8">{errors.consent.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                >
                  {submitStatus === "submitting" ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    "REGISTER AS A VOLUNTEER"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
