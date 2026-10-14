"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, CheckCircle2, AlertCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  badge?: string;
  highlight?: "positive" | "negative" | "neutral";
}

const faqs: FaqItem[] = [
  {
    question: "Will I get academic attendance / On-Duty (OD) permissions for NSS drives?",
    answer:
      "Yes. Official academic On-Duty (OD) attendance is sanctioned for all verified NSS community service drives, blood donation camps, rural village adaptation programs, and ceremonial events in strict accordance with VIIT autonomous academic regulations.",
    badge: "Official College Policy",
    highlight: "positive",
  },
  {
    question: "Do volunteers receive government / university certificates upon registering?",
    answer:
      "No. Initial induction into the volunteer cohort does not immediately grant a certificate. Official Government of India (Ministry of Youth Affairs & Sports) and University NSS Certificates are conferred exclusively upon fulfilling the mandatory 120 regular service hours per year and actively completing the 7-day Special Rural Camp over two academic years.",
    badge: "Service Criterion",
    highlight: "negative",
  },
  {
    question: "Which academic years and programs are eligible to apply?",
    answer:
      "For the 2026 recruitment drive, eligibility is defined as follows:\n• Undergraduate (UG): 2nd Year and 3rd Year students across all branches (CSE, ECE, EEE, MECH, CIVIL, IT, AI&DS, etc.).\n• Postgraduate (PG): 1st Year and 2nd Year students in MCA and MBA programs.\nNote: 1st Year UG students are exempted to allow focus on foundational curriculum, while final 4th Year UG students are exempted for capstone projects and placement cycles.",
    badge: "Branch Eligibility",
    highlight: "neutral",
  },
  {
    question: "Is there any registration or annual membership fee?",
    answer:
      "No. NSS enrollment is 100% free of cost. As a flagship national youth initiative, all training materials, badges, camp logistics, and orientation activities are sponsored by the institution and government cells.",
    badge: "Zero Cost",
    highlight: "positive",
  },
  {
    question: "How will I know if I'm selected?",
    answer:
      "No need to wait for email letters; your department's NSS Joint Secretary (JS) will contact you directly regarding your selection and the orientation schedule.",
    badge: "Department NSS JS Contact",
    highlight: "positive",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-white border-b border-forest/10"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold mb-3">
            <span>SECTION 05</span>
            <span className="w-4 h-px bg-gold" aria-hidden="true" />
            <span>CLARIFICATIONS &amp; DIRECTIVES</span>
          </div>

          <h2
            id="faq-heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest mb-4 leading-tight"
          >
            Frequently Asked Questions.
          </h2>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
            Essential information regarding academic attendance, service certification standards, and student eligibility.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xs transition-colors overflow-hidden ${
                  isOpen ? "border-forest/40 bg-ivory/30 shadow-2xs" : "border-forest/15 bg-white hover:border-forest/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-ivory border border-forest/20 flex items-center justify-center font-mono text-xs font-bold text-forest">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-editorial text-base sm:text-lg font-bold text-forest leading-snug">
                        {faq.question}
                      </h3>
                      {faq.badge && (
                        <span className="inline-block mt-1 font-mono text-[10px] uppercase tracking-wider font-semibold text-gold">
                          {faq.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border border-forest/15 flex items-center justify-center text-forest transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-forest text-white" : "bg-ivory"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 border-t border-forest/10 animate-in fade-in duration-200">
                    <div className="text-sm sm:text-base text-charcoal/85 leading-relaxed whitespace-pre-line pt-2">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
