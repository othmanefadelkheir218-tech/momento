"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CostumButton from "@/components/CostumButton";
import { SuccessPopup } from "@/components/success-popup";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function BecomeClientPage() {
  const t = useTranslations("BecomeClientPage");

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const businessTypes = [
    t("businessTypes.restaurant"),
    t("businessTypes.cafe"),
    t("businessTypes.hotel"),
    t("businessTypes.retail"),
    t("businessTypes.caterer"),
    t("businessTypes.other"),
  ];

  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    businessType: businessTypes[0],
    quantity: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.from(formRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
      });

      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields) {
        tl.from(
          fields,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      if (benefitsRef.current) {
        tl.from(
          benefitsRef.current.children,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/momento-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type_etablissement: formData.businessType,
          nom_etablissement: formData.businessName,
          ville: formData.city,
          contact_personne: formData.contactName,
          telephone: formData.phone,
          email: formData.email,
          quantite_mensuelle: formData.quantity,
          informations: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Failed to send");
      }

      setSubmitStatus("success");
      setShowPopup(true);
      setFormData({
        businessName: "",
        contactName: "",
        phone: "",
        email: "",
        city: "",
        businessType: businessTypes[0],
        quantity: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    formRef.current?.requestSubmit();
  };

  const benefits = [t("benefits.item1"), t("benefits.item2"), t("benefits.item3"), t("benefits.item4")];

  return (
    <>
      <main className="min-h-screen bg-primary text-white">
        {/* Hero */}
        <div className="pt-32 pb-16 px-6 text-center">
          <Reveal rotate={false} delay={0.1}>
            <h1
              ref={headingRef}
              className="trispace-font text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6"
            >
              {t("heading")}
            </h1>
          </Reveal>
          <Reveal rotate={false} delay={0.3}>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("subheading")}
            </p>
          </Reveal>
        </div>

        {/* Main content */}
        <section
          ref={sectionRef}
          className="max-w-6xl mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20"
        >
          {/* Benefits sidebar */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <h2 className="text-xl md:text-2xl font-bold mb-8 tracking-wide text-white/90">
              {t("benefits.title")}
            </h2>
            <div ref={benefitsRef} className="space-y-4">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 shrink-0 rounded-full border-2 border-white/60 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white/80" />
                  </span>
                  <p className="text-white/80 text-base leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl md:text-2xl font-bold mb-8 tracking-wide text-white/90">
              {t("formTitle")}
            </h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Business type */}
              <div className="form-field">
                <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                  {t("labels.businessType")}
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0 center",
                    backgroundSize: "20px",
                  }}
                >
                  {businessTypes.map((opt) => (
                    <option key={opt} value={opt} className="text-primary">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Business name + City */}
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="form-field">
                  <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                    {t("labels.businessName")}
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                    placeholder={t("placeholders.businessName")}
                  />
                </div>
                <div className="form-field">
                  <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                    {t("labels.city")}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                    placeholder={t("placeholders.city")}
                  />
                </div>
              </div>

              {/* Contact name + Phone */}
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="form-field">
                  <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                    {t("labels.contactName")}
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                    placeholder={t("placeholders.contactName")}
                  />
                </div>
                <div className="form-field">
                  <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                    {t("labels.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                    placeholder={t("placeholders.phone")}
                  />
                </div>
              </div>

              {/* Email + Quantity */}
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="form-field">
                  <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                    {t("labels.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                    placeholder={t("placeholders.email")}
                  />
                </div>
                <div className="form-field">
                  <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                    {t("labels.quantity")}
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30"
                    placeholder={t("placeholders.quantity")}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-field">
                <label className="block text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                  {t("labels.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-transparent text-white text-sm md:text-base border-b-2 border-white/50 py-2 md:py-3 focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/30 resize-none"
                  placeholder={t("placeholders.message")}
                />
              </div>

              {/* Submit */}
              <div className="form-field pt-2 md:pt-4">
                <CostumButton
                  onClick={triggerSubmit}
                  disabled={isSubmitting}
                  backgroundColor="white"
                  hoverTextColor="#DB212F"
                  className={`md:w-45 md:h-12.5 w-40 h-12.5 rounded-none bg-primary text-white border-white border ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <p className="font-bold">
                    {isSubmitting ? t("sending") : t("button")}
                  </p>
                </CostumButton>
              </div>

              {submitStatus === "error" && (
                <div className="flex items-start gap-3 border border-white/40 bg-white/10 px-4 py-3">
                  <span className="mt-0.5 text-white text-lg leading-none">!</span>
                  <p className="text-white text-sm leading-snug">{t("error")}</p>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <SuccessPopup
        title={t("doneTitle")}
        message={t("doneMessage")}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}
