"use client";

import { FormEvent, useState } from "react";
import API_URL from "@/lib/api";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const name = String(
        formData.get("client_name") || ""
      ).trim();

      const email = String(
        formData.get("email_address") || ""
      ).trim();

      const phone = String(
        formData.get("client_contact_no_display") || ""
      ).trim();

      const message = String(
        formData.get("message") || ""
      ).trim();

      /* =====================================================
         VALIDATION
      ===================================================== */

      if (!name) {
        throw new Error("Please enter your name.");
      }

      if (!email) {
        throw new Error("Please enter your email.");
      }

      if (!phone) {
        throw new Error(
          "Please enter your phone number."
        );
      }

      if (!/^\d{10}$/.test(phone)) {
        throw new Error(
          "Please enter a valid 10-digit phone number."
        );
      }

      /* =====================================================
         BACKEND PAYLOAD
      ===================================================== */

      const payload = {
        project_id: null,
        name,
        email,
        phone,
        city: null,
        message: message || null,
      };

      /* =====================================================
         SUBMIT INQUIRY
      ===================================================== */

      const response = await fetch(
        `${API_URL}/api/inquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      /* =====================================================
         HANDLE RESPONSE
      ===================================================== */

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        console.error(
          "Inquiry API error:",
          response.status,
          data
        );

        throw new Error(
          data?.detail ||
            data?.message ||
            "Unable to submit your inquiry."
        );
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      setSubmitted(true);
      setError("");

      form.reset();

    } catch (error) {
      console.error(
        "Inquiry submission error:",
        error
      );

      setSubmitted(false);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit your inquiry."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="transition-all duration-500">

            {/* Small Label */}

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Get in Touch
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
              Inquire{" "}
              <span className="text-[#043927]">
                Now
              </span>
            </h2>

            {/* Gold Accent */}

            <div className="mt-5 h-1 w-16 rounded-full bg-[#C9A45C]" />

            {/* Description */}

            <p className="mt-6 max-w-md text-sm leading-7 text-black/60 sm:text-base">
              Have questions about our properties?
              Share your details and our team will
              get in touch with you shortly.
            </p>

            {/* =================================================
                FEATURES
            ================================================= */}

            <div className="mt-8 space-y-4">

              {/* Feature 1 */}

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#043927] text-sm text-white">
                  ✓
                </span>

                <span className="text-sm text-[#111111]/70">
                  Expert property guidance
                </span>
              </div>

              {/* Feature 2 */}

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#043927] text-sm text-white">
                  ✓
                </span>

                <span className="text-sm text-[#111111]/70">
                  Site visit assistance
                </span>
              </div>

              {/* Feature 3 */}

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#043927] text-sm text-white">
                  ✓
                </span>

                <span className="text-sm text-[#111111]/70">
                  Transparent property information
                </span>
              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - FORM
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-black/10
              bg-white
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              transition-shadow
              duration-300
              hover:shadow-[0_15px_45px_rgba(0,0,0,0.10)]
              sm:p-8
              lg:p-10
            "
          >

            {/* Form Header */}

            <div className="mb-8">

              <h3 className="text-2xl font-semibold text-[#111111]">
                Send Us Your Inquiry
              </h3>

              <p className="mt-2 text-sm text-black/50">
                Fill in the details below and our team
                will contact you.
              </p>

            </div>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {submitted && (
              <div className="mb-6 rounded-lg border border-[#043927]/20 bg-[#043927]/5 px-4 py-3 text-sm text-[#043927]">
                ✓ Your inquiry has been submitted
                successfully. Our team will contact you
                soon.
              </div>
            )}

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              id="header_inquiry_form"
              name="header_inquiry_form"
              onSubmit={handleSubmit}
            >

              <div className="grid gap-6 sm:grid-cols-2">

                {/* =================================================
                    NAME
                ================================================= */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#111111]"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="client_name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    required
                    className="
                      w-full
                      rounded-lg
                      border
                      border-black/15
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#111111]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-black/35
                      focus:border-[#043927]
                      focus:ring-2
                      focus:ring-[#043927]/10
                    "
                  />

                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>

                  <label
                    htmlFor="email_address"
                    className="mb-2 block text-sm font-medium text-[#111111]"
                  >
                    Email
                  </label>

                  <input
                    id="email_address"
                    type="email"
                    name="email_address"
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    className="
                      w-full
                      rounded-lg
                      border
                      border-black/15
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#111111]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-black/35
                      focus:border-[#043927]
                      focus:ring-2
                      focus:ring-[#043927]/10
                    "
                  />

                </div>

                {/* =================================================
                    PHONE
                ================================================= */}

                <div className="sm:col-span-2">

                  <label
                    htmlFor="client_contact_no"
                    className="mb-2 block text-sm font-medium text-[#111111]"
                  >
                    Phone Number
                  </label>

                  <div className="flex">

                    {/* Country Code */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-l-lg
                        border
                        border-r-0
                        border-black/15
                        bg-[#043927]
                        px-4
                        text-sm
                        text-white
                      "
                    >
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>

                    {/* Phone */}

                    <input
                      id="client_contact_no"
                      type="tel"
                      name="client_contact_no_display"
                      minLength={10}
                      maxLength={10}
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="Enter 10-digit phone number"
                      required
                      className="
                        min-w-0
                        flex-1
                        rounded-r-lg
                        border
                        border-black/15
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-[#111111]
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-black/35
                        focus:border-[#043927]
                        focus:ring-2
                        focus:ring-[#043927]/10
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div className="sm:col-span-2">

                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#111111]"
                  >
                    Message{" "}
                    <span className="font-normal text-black/40">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us what you're looking for..."
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-black/15
                      bg-white
                      px-4
                      py-3
                      text-sm
                      leading-6
                      text-[#111111]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-black/35
                      focus:border-[#043927]
                      focus:ring-2
                      focus:ring-[#043927]/10
                    "
                  />

                </div>

              </div>

              {/* =================================================
                  TERMS
              ================================================= */}

              <div className="mt-6 flex items-start gap-3">

                <input
                  type="checkbox"
                  id="agree_tandc"
                  name="agree_tandc_display"
                  defaultChecked
                  required
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    cursor-pointer
                    accent-[#043927]
                  "
                />

                <label
                  htmlFor="agree_tandc"
                  className="cursor-pointer text-xs leading-5 text-black/50"
                >
                  By clicking the button, you agree to
                  our Terms & Conditions.
                </label>

              </div>

              {/* =================================================
                  BUTTON
              ================================================= */}

              <div className="mt-8">

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    bg-[#043927]
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#032d20]
                    hover:shadow-lg
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:w-auto
                  "
                >
                  <span>
                    {loading
                      ? "Submitting..."
                      : submitted
                        ? "Submitted ✓"
                        : "Submit Inquiry"}
                  </span>

                  {!loading && (
                    <span className="transition-transform duration-300">
                      →
                    </span>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}