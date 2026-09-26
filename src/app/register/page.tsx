"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";

type FormData = {
  fullName: string;
  mobile: string;
  email: string;
  gender: string;
  dob: string;
  studentId: string;
  programme: string;
  department: string;
  year: string;
  section: string;
  interests: string[];
  previousExperience: string;
  experienceDescription: string;
};

const initialData: FormData = {
  fullName: "", mobile: "", email: "", gender: "", dob: "",
  studentId: "", programme: "", department: "", year: "", section: "",
  interests: [], previousExperience: "", experienceDescription: ""
};

const INTERESTS = [
  "Community Service", "Environment", "Education", "Health & Awareness",
  "Social Awareness", "Event Management", "Digital / Technical Support",
  "Photography / Media", "Other"
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [error, setError] = useState("");

  const updateForm = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      nextStep();
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      
      setApplicationId(data.applicationId);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-nss-bg flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-bold text-nss-dark mb-4">APPLICATION SUBMITTED</h1>
          <p className="text-nss-text mb-6">
            &#10003; Your application has been successfully submitted.
          </p>
          <div className="bg-nss-bg p-4 rounded-lg mb-6">
            <p className="text-sm text-nss-muted mb-1">Application ID:</p>
            <p className="text-xl font-bold text-nss-primary">{applicationId}</p>
            <p className="text-sm text-nss-muted mt-3 mb-1">Status:</p>
            <p className="font-semibold text-nss-secondary">SUBMITTED</p>
          </div>
          <p className="text-sm text-red-500 font-medium mb-8">
            Please save your Application ID for future reference.
          </p>
          <Link href="/" className="inline-block bg-nss-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-nss-secondary transition-colors">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nss-bg py-12 px-4 flex flex-col items-center">
      <Link href="/" className="absolute top-6 left-6 text-nss-muted hover:text-nss-primary flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Back
      </Link>
      
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-nss-dark mb-2">BECOME A VOLUNTEER</h1>
          <p className="text-nss-muted">Join the NSS volunteer programme at Vignan's Institute of Information Technology.</p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative z-10">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  step >= i ? "bg-nss-primary border-nss-primary text-white" : "bg-white border-gray-300 text-gray-400"
                }`}>
                  {i}
                </div>
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-300 -z-10">
              <div 
                className="h-full bg-nss-primary transition-all duration-300"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-center mt-4 font-semibold text-nss-primary text-sm uppercase tracking-wider">
            {step === 1 && "Personal Details"}
            {step === 2 && "Academic Details"}
            {step === 3 && "Interests"}
            {step === 4 && "Experience"}
            {step === 5 && "Declaration"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name *</label>
                      <input required type="text" value={formData.fullName} onChange={e => updateForm({ fullName: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                        <input required type="tel" value={formData.mobile} onChange={e => updateForm({ mobile: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address *</label>
                        <input required type="email" value={formData.email} onChange={e => updateForm({ email: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Gender *</label>
                        <select required value={formData.gender} onChange={e => updateForm({ gender: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                        <input required type="date" value={formData.dob} onChange={e => updateForm({ dob: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Student ID / Roll Number *</label>
                      <input required type="text" value={formData.studentId} onChange={e => updateForm({ studentId: e.target.value.toUpperCase() })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary uppercase" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Programme *</label>
                        <select required value={formData.programme} onChange={e => updateForm({ programme: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary">
                          <option value="">Select</option>
                          <option value="UG">UG</option>
                          <option value="PG">PG</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Department *</label>
                        <input required type="text" value={formData.department} onChange={e => updateForm({ department: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Year *</label>
                        <select required value={formData.year} onChange={e => updateForm({ year: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary">
                          <option value="">Select</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Section</label>
                        <input type="text" value={formData.section} onChange={e => updateForm({ section: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <label className="block text-lg font-semibold mb-4 text-center">Which areas are you interested in?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INTERESTS.map(interest => (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          formData.interests.includes(interest) 
                          ? "border-nss-primary bg-nss-primary/10 font-medium text-nss-primary" 
                          : "border-gray-200 hover:border-nss-primary/50 text-gray-700"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <label className="block text-lg font-semibold mb-4">Have you participated in NSS/community service activities before?</label>
                  <div className="flex gap-4 mb-6">
                    <label className={`flex-1 p-4 border rounded-xl text-center cursor-pointer transition-all ${formData.previousExperience === 'Yes' ? 'border-nss-primary bg-nss-primary/10 text-nss-primary font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      <input type="radio" name="exp" className="hidden" checked={formData.previousExperience === 'Yes'} onChange={() => updateForm({ previousExperience: 'Yes' })} />
                      Yes
                    </label>
                    <label className={`flex-1 p-4 border rounded-xl text-center cursor-pointer transition-all ${formData.previousExperience === 'No' ? 'border-nss-primary bg-nss-primary/10 text-nss-primary font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      <input type="radio" name="exp" className="hidden" checked={formData.previousExperience === 'No'} onChange={() => updateForm({ previousExperience: 'No' })} />
                      No
                    </label>
                  </div>
                  
                  {formData.previousExperience === 'Yes' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-sm font-medium mb-1">Briefly describe previous experience (Optional)</label>
                      <textarea rows={4} value={formData.experienceDescription} onChange={e => updateForm({ experienceDescription: e.target.value })} className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-nss-primary focus:ring-1 focus:ring-nss-primary resize-none"></textarea>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                    <h3 className="font-bold text-nss-dark mb-3">Declaration</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief. I understand that my selection as an NSS volunteer is subject to the rules and regulations of Vignan's Institute of Information Technology and the National Service Scheme.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input required type="checkbox" className="mt-1 w-5 h-5 accent-nss-primary" />
                      <span className="text-sm font-medium text-nss-text">
                        I confirm that the information provided by me is accurate and I agree to participate in NSS activities according to the instructions of the authorized NSS team.
                      </span>
                    </label>
                  </div>
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-6 border border-red-100 text-sm font-medium">
                      {error}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex justify-between">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-2.5 rounded-full font-semibold text-nss-text bg-gray-100 hover:bg-gray-200 transition-colors">
                  Back
                </button>
              ) : <div></div>}
              
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center gap-2 bg-nss-primary text-white px-8 py-2.5 rounded-full font-semibold shadow-md hover:bg-nss-secondary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : step === 5 ? "SUBMIT APPLICATION" : "Next"}
                {step < 5 && <ChevronRight size={18} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
