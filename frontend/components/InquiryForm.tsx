"use client";

import { FormEvent, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

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
        formData.get(
          "client_contact_no_display"
        ) || ""
      ).trim();

      const message = String(
        formData.get("message") || ""
      ).trim();

      // --------------------------------------------------------
      // Validation
      // --------------------------------------------------------

      if (!name) {
        throw new Error(
          "Please enter your name."
        );
      }

      if (!email) {
        throw new Error(
          "Please enter your email."
        );
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

      // --------------------------------------------------------
      // Backend payload
      // --------------------------------------------------------

      const payload = {
        project_id: null,

        name,

        email,

        phone,

        city: null,

        message: message || null,
      };

      // --------------------------------------------------------
      // Submit
      // --------------------------------------------------------

      const response = await fetch(
        `${API_URL}/api/inquiries`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        console.error(
          "Inquiry API error:",
          response.status,
          data
        );

        throw new Error(
          data.detail ||
            "Unable to submit your inquiry."
        );
      }

      // --------------------------------------------------------
      // Success
      // --------------------------------------------------------

      setSubmitted(true);

      form.reset();

    } catch (error) {
      console.error(
        "Inquiry submission error:",
        error
      );

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
      className="scroll-mt-24 relative overflow-hidden bg-[#043927]"
    >
      {/* Subtle background detail */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#d8c9a3]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 -left-40 h-[450px] w-[450px] rounded-full bg-black/20 blur-3xl" />

      <div className="relative px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-20">

            {/* LEFT CONTENT */}

            <div className="lg:sticky lg:top-24">

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-10 bg-[#d8c9a3]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#d8c9a3] sm:text-xs">
                  Get in Touch
                </span>

              </div>

              <h2 className="sfpro-bold text-4xl leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">

                Inquire{" "}

                <span className="canela-reg-font font-normal text-[#d8c9a3]">
                  Now
                </span>

              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/60 sm:text-base">
                Share your details and we'll get back to you with expert
                guidance.
              </p>

            </div>

            {/* FORM */}

            <div className="relative">

              <form
                id="header_inquiry_form"
                name="header_inquiry_form"
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-7 lg:p-9"
              >

                {/* Top accent */}

                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8c9a3]/70 to-transparent" />

                {/* Success */}

                {submitted && (
                  <div className="mb-6 rounded-xl border border-green-300/30 bg-green-400/10 px-4 py-3 text-sm text-green-200">
                    ✓ Your inquiry has been submitted successfully. Our team
                    will contact you soon.
                  </div>
                )}

                {/* Error */}

                {error && (
                  <div className="mb-6 rounded-xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">

                  {/* NAME */}

                  <div className="group relative">

                    <input
                      id="name"
                      type="text"
                      name="client_name"
                      autoComplete="name"
                      placeholder=" "
                      required
                      className="peer w-full border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-6 text-sm text-white outline-none transition-all duration-300 placeholder-transparent focus:border-[#d8c9a3]"
                    />

                    <label
                      htmlFor="name"
                      className="pointer-events-none absolute left-0 top-5 origin-left text-sm text-white/45 transition-all duration-300 peer-focus:-translate-y-4 peer-focus:scale-[0.78] peer-focus:text-[#d8c9a3] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                    >
                      Name
                    </label>

                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d8c9a3] transition-all duration-500 group-focus-within:w-full" />

                  </div>

                  {/* EMAIL */}

                  <div className="group relative">

                    <input
                      id="email_address"
                      type="email"
                      name="email_address"
                      autoComplete="email"
                      placeholder=" "
                      required
                      className="peer w-full border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-6 text-sm text-white outline-none transition-all duration-300 placeholder-transparent focus:border-[#d8c9a3]"
                    />

                    <label
                      htmlFor="email_address"
                      className="pointer-events-none absolute left-0 top-5 origin-left text-sm text-white/45 transition-all duration-300 peer-focus:-translate-y-4 peer-focus:scale-[0.78] peer-focus:text-[#d8c9a3] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                    >
                      Email
                    </label>

                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d8c9a3] transition-all duration-500 group-focus-within:w-full" />

                  </div>

                  {/* PHONE */}

                  <div className="group relative sm:col-span-2">

                    <div className="flex items-end gap-4">

                      <div className="flex h-[48px] items-center gap-2 border-b border-white/20 pb-3 text-sm text-white/70">

                        <img
                          src="https://flagcdn.com/w40/in.webp"
                          alt="India"
                          width={24}
                          height={16}
                          className="h-4 w-6 rounded-[2px] object-cover"
                        />

                        <span>+91</span>

                      </div>

                      <div className="relative flex-1">

                        <input
                          id="client_contact_no"
                          type="tel"
                          name="client_contact_no_display"
                          minLength={10}
                          maxLength={10}
                          inputMode="numeric"
                          autoComplete="tel"
                          placeholder=" "
                          required
                          className="peer w-full border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-6 text-sm text-white outline-none transition-all duration-300 placeholder-transparent focus:border-[#d8c9a3]"
                        />

                        <label
                          htmlFor="client_contact_no"
                          className="pointer-events-none absolute left-0 top-5 origin-left text-sm text-white/45 transition-all duration-300 peer-focus:-translate-y-4 peer-focus:scale-[0.78] peer-focus:text-[#d8c9a3] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                        >
                          Phone Number
                        </label>

                        <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d8c9a3] transition-all duration-500 group-focus-within:w-full" />

                      </div>

                    </div>

                  </div>

                  {/* MESSAGE */}

                  <div className="group relative sm:col-span-2">

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder=" "
                      className="peer min-h-[120px] w-full resize-none border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-6 text-sm leading-7 text-white outline-none transition-all duration-300 placeholder-transparent focus:border-[#d8c9a3]"
                    />

                    <label
                      htmlFor="message"
                      className="pointer-events-none absolute left-0 top-5 origin-left text-sm text-white/45 transition-all duration-300 peer-focus:-translate-y-4 peer-focus:scale-[0.78] peer-focus:text-[#d8c9a3] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-[0.78]"
                    >
                      Comments
                    </label>

                    <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d8c9a3] transition-all duration-500 group-focus-within:w-full" />

                  </div>

                </div>

                {/* TERMS */}

                <div className="mt-7 flex items-start gap-3">

                  <input
                    type="checkbox"
                    id="agree_tandc"
                    name="agree_tandc_display"
                    defaultChecked
                    required
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-white/30 bg-transparent transition-all checked:border-[#d8c9a3] checked:bg-[#d8c9a3] focus:ring-1 focus:ring-[#d8c9a3]"
                  />

                  <label
                    htmlFor="agree_tandc"
                    className="cursor-pointer text-xs leading-5 text-white/45"
                  >
                    By clicking the button you agree to our T&C.
                  </label>

                </div>

                {/* SUBMIT */}

                <div className="mt-8">

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-4 rounded-full border border-[#d8c9a3] bg-[#d8c9a3] px-7 py-3.5 text-sm font-medium text-[#043927] transition-all duration-300 hover:bg-transparent hover:text-[#d8c9a3] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <span>
                      {loading
                        ? "Submitting..."
                        : submitted
                          ? "Submitted"
                          : "Submit"}
                    </span>

                    {!loading && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">

                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 12H19M13 6L19 12L13 18"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                      </span>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}