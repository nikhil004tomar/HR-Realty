"use client";

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  Home,
  LandPlot,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { FormEvent, useState } from "react";

/* ============================================================
   CURRENCY FORMATTER
============================================================ */

function formatIndianCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function SellYourLandPage() {
  const [landType, setLandType] = useState("");
  const [naStatus, setNaStatus] = useState("");
  const [tp, setTp] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    landSize: "",
    pricePerSqYard: "",
    expectedPrice: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ==========================================================
     HANDLE INPUT CHANGE
  ========================================================== */

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    let cleanValue = value;

    /*
     * Only allow numbers and decimal point
     * for land size and price.
     */
    if (
      name === "landSize" ||
      name === "pricePerSqYard"
    ) {
      cleanValue = value
        .replace(/,/g, "")
        .replace(/[^\d.]/g, "");
    }

    setForm((previous) => {
      const updatedForm = {
        ...previous,
        [name]: cleanValue,
      };

      /* ======================================================
         AUTOMATIC TOTAL PRICE CALCULATION

         Land Size × Price Per Sq. Yard
      ====================================================== */

      if (
        name === "landSize" ||
        name === "pricePerSqYard"
      ) {
        const landSize = parseFloat(
          updatedForm.landSize
        );

        const pricePerSqYard = parseFloat(
          updatedForm.pricePerSqYard
        );

        if (
          Number.isFinite(landSize) &&
          Number.isFinite(pricePerSqYard) &&
          landSize > 0 &&
          pricePerSqYard > 0
        ) {
          const totalPrice =
            landSize * pricePerSqYard;

          updatedForm.expectedPrice =
            formatIndianCurrency(totalPrice);
        } else {
          updatedForm.expectedPrice = "";
        }
      }

      return updatedForm;
    });

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  }

  /* ==========================================================
     HANDLE SUBMIT
  ========================================================== */

  function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Please enter your name.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    }

    if (!form.location.trim()) {
      newErrors.location =
        "Please enter the land location.";
    }

    if (!landType) {
      newErrors.landType =
        "Please select a land type.";
    }

    if (!form.landSize.trim()) {
      newErrors.landSize =
        "Please enter the land size.";
    }

    if (!form.pricePerSqYard.trim()) {
      newErrors.pricePerSqYard =
        "Please enter the price per sq. yard.";
    }

    if (!naStatus) {
      newErrors.naStatus =
        "Please select NA status.";
    }

    if (!tp) {
      newErrors.tp =
        "Please select TP.";
    }

    /* ========================================================
       PHONE VALIDATION
    ======================================================== */

    const phoneDigits =
      form.phone.replace(/\D/g, "");

    if (
      form.phone.trim() &&
      phoneDigits.length < 10
    ) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    /* ========================================================
       PRICE VALIDATION
    ======================================================== */

    const landSize =
      parseFloat(form.landSize);

    const pricePerSqYard =
      parseFloat(form.pricePerSqYard);

    if (
      form.landSize.trim() &&
      (!Number.isFinite(landSize) ||
        landSize <= 0)
    ) {
      newErrors.landSize =
        "Please enter a valid land size.";
    }

    if (
      form.pricePerSqYard.trim() &&
      (!Number.isFinite(pricePerSqYard) ||
        pricePerSqYard <= 0)
    ) {
      newErrors.pricePerSqYard =
        "Please enter a valid price.";
    }

    /* ========================================================
       STOP SUBMISSION IF ERRORS
    ======================================================== */

    if (
      Object.keys(newErrors).length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    /* ========================================================
       FINAL CALCULATION
    ======================================================== */

    const calculatedTotal =
      landSize * pricePerSqYard;

    const calculatedExpectedPrice =
      formatIndianCurrency(
        calculatedTotal
      );

    /* ========================================================
       BACKEND INTEGRATION

       IMPORTANT:
       The backend should recalculate this value
       before saving the enquiry.
    ======================================================== */

    console.log("Land Listing:", {
      ...form,
      expectedPrice:
        calculatedExpectedPrice,
      land_type: landType,
      na_status: naStatus,
      tp,
      land_size_sq_yard: landSize,
      price_per_sq_yard: pricePerSqYard,
      calculated_total_price:
        calculatedTotal,
    });

    setForm((previous) => ({
      ...previous,
      expectedPrice:
        calculatedExpectedPrice,
    }));

    setFormSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">

      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative overflow-hidden bg-[#043927]">

        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize:
                "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">

            {/* LEFT CONTENT */}

            <div className="max-w-3xl">

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A45C]" />

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A45C] sm:text-sm">
                  Sell With Confidence
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sell Your Land

                <span className="mt-2 block text-[#C9A45C]">
                  With HR Realty
                </span>
              </h1>

              <div className="mt-6 h-1 w-14 rounded-full bg-[#C9A45C]" />

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 lg:text-lg">
                Have land, a residential plot,
                commercial land or an investment
                parcel to sell? Share your land
                details with us and our team will
                help connect you with the right
                opportunity.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <a
                  href="#land-form"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A45C] px-6 py-3.5 text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Submit Your Land

                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#C9A45C] hover:text-[#C9A45C]"
                >
                  How It Works
                </a>

              </div>

              {/* TRUST POINTS */}

              <div className="mt-10 grid gap-3 sm:grid-cols-3">

                {[
                  {
                    icon: ShieldCheck,
                    text: "Trusted Process",
                  },
                  {
                    icon: BadgeCheck,
                    text: "Expert Assistance",
                  },
                  {
                    icon: TrendingUp,
                    text: "Market Opportunity",
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-all duration-300 hover:border-[#C9A45C]/50"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C9A45C]/10 text-[#C9A45C]">
                        <Icon className="h-4 w-4" />
                      </div>

                      <span className="text-xs font-medium text-white/70">
                        {item.text}
                      </span>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* RIGHT CARD */}

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">

              <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-xl sm:p-6">

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 sm:p-7">

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927]">
                      <Building2 className="h-6 w-6 text-[#C9A45C]" />
                    </div>

                    <span className="rounded-full bg-[#043927]/5 px-3 py-1 text-xs font-semibold text-[#043927]">
                      Land Opportunity
                    </span>

                  </div>

                  <p className="mt-8 text-sm text-gray-500">
                    Your Land
                  </p>

                  <h2 className="mt-2 text-2xl font-bold leading-tight text-[#111111] sm:text-3xl">
                    Deserves the

                    <span className="block text-[#043927]">
                      Right Opportunity.
                    </span>
                  </h2>

                  <div className="mt-7 space-y-3">

                    {[
                      "Residential Plots",
                      "Agricultural Land",
                      "Commercial Land",
                      "Investment Land",
                    ].map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all duration-300 hover:border-[#C9A45C]"
                      >

                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C9A45C]" />

                        <span className="text-sm text-gray-600">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>
                </div>
              </div>

              {/* FLOATING BADGE */}

              <div className="absolute -bottom-5 -left-3 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#043927]/5 text-[#043927]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Simple & Transparent
                    </p>

                    <p className="text-sm font-bold text-[#111111]">
                      Start Your Land Journey
                    </p>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SUCCESS MESSAGE
      ======================================================= */}

      {formSubmitted && (
        <section className="border-b border-green-100 bg-green-50">

          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">

            <div className="flex items-start gap-3">

              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#043927]" />

              <div>

                <h3 className="font-bold text-[#043927]">
                  Land details submitted successfully!
                </h3>

                <p className="mt-1 text-sm text-green-800/70">
                  Thank you for sharing your land
                  details. Our team will review the
                  information and contact you.
                </p>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          LAND FORM
      ======================================================= */}

      <section
        id="land-form"
        className="scroll-mt-20 bg-gray-50 py-16 sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] xl:gap-14">

            {/* FORM */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">

              <div className="mb-8">

                <div className="mb-3 flex items-center gap-3">

                  <span className="h-px w-8 bg-[#C9A45C]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                    Land Details
                  </span>

                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
                  Tell Us About Your Land
                </h2>

                <div className="mt-4 h-1 w-12 rounded-full bg-[#C9A45C]" />

                <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
                  Provide the land information below
                  so our team can understand your
                  requirements.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >

                {/* LAND TYPE */}

                <div>

                  <label
                    htmlFor="landType"
                    className="mb-2 block text-sm font-semibold text-[#111111]"
                  >
                    Land Type

                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <select
                      id="landType"
                      value={landType}
                      onChange={(e) => {

                        setLandType(
                          e.target.value
                        );

                        if (
                          errors.landType
                        ) {
                          setErrors(
                            (previous) => ({
                              ...previous,
                              landType: "",
                            })
                          );
                        }

                      }}
                      className={`w-full appearance-none rounded-lg border bg-white px-4 py-3.5 pr-11 text-sm text-[#111111] outline-none transition focus:border-[#C9A45C] focus:ring-4 focus:ring-[#C9A45C]/10 ${
                        errors.landType
                          ? "border-red-400"
                          : "border-gray-200"
                      }`}
                    >

                      <option value="">
                        Select land type
                      </option>

                      <option value="Residential Plot">
                        Residential Plot
                      </option>

                      <option value="Commercial Plot">
                        Commercial Plot
                      </option>

                      <option value="Agricultural Land">
                        Agricultural Land
                      </option>

                      <option value="Residential Land">
                        Residential Land
                      </option>

                      <option value="Commercial Land">
                        Commercial Land
                      </option>

                      <option value="Industrial Land">
                        Industrial Land
                      </option>

                      <option value="Other Land">
                        Other Land
                      </option>

                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  </div>

                  {errors.landType && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.landType}
                    </p>
                  )}

                </div>

                {/* LOCATION + LAND SIZE */}

                <div className="grid gap-6 md:grid-cols-2">

                  <FormField
                    label="Land Location"
                    name="location"
                    placeholder="e.g. Dholera SIR, Gujarat"
                    value={form.location}
                    onChange={handleChange}
                    icon={MapPin}
                    required
                    error={errors.location}
                  />

                  <FormField
                    label="Land Size (Sq. Yard)"
                    name="landSize"
                    type="number"
                    placeholder="e.g. 500"
                    value={form.landSize}
                    onChange={handleChange}
                    icon={LandPlot}
                    required
                    error={errors.landSize}
                  />

                </div>

                {/* PRICE */}

                <div className="grid gap-6 md:grid-cols-2">

                  <FormField
                    label="Price Per Sq. Yard"
                    name="pricePerSqYard"
                    type="number"
                    placeholder="e.g. 12000"
                    value={form.pricePerSqYard}
                    onChange={handleChange}
                    icon={TrendingUp}
                    required
                    error={errors.pricePerSqYard}
                  />

                  {/* =================================================
                      AUTOMATIC EXPECTED TOTAL PRICE
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="expectedPrice"
                      className="mb-2 block text-sm font-semibold text-[#111111]"
                    >
                      Expected Total Price
                    </label>

                    <div className="relative">

                      <TrendingUp className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#043927]" />

                      <input
                        id="expectedPrice"
                        name="expectedPrice"
                        type="text"
                        value={form.expectedPrice}
                        readOnly
                        placeholder="Calculated automatically"
                        className="w-full rounded-lg border border-[#C9A45C]/40 bg-[#fafaf8] py-3.5 pl-11 pr-4 text-sm font-semibold text-[#043927] outline-none"
                      />

                    </div>

                    <p className="mt-1.5 text-xs text-gray-400">
                      Automatically calculated from
                      land size × price per sq. yard.
                    </p>

                  </div>

                </div>

                {/* NA STATUS + TP */}

                <div className="grid gap-6 md:grid-cols-2">

                  <SelectField
                    label="NA Status"
                    required
                    value={naStatus}
                    error={errors.naStatus}
                    onChange={(value) => {

                      setNaStatus(value);

                      if (
                        errors.naStatus
                      ) {
                        setErrors(
                          (previous) => ({
                            ...previous,
                            naStatus: "",
                          })
                        );
                      }

                    }}
                    options={[
                      {
                        value: "Applied",
                        label: "Applied",
                      },
                      {
                        value: "Ready",
                        label: "Ready",
                      },
                    ]}
                    placeholder="Select NA Status"
                  />

                  <SelectField
                    label="TP"
                    required
                    value={tp}
                    error={errors.tp}
                    onChange={(value) => {

                      setTp(value);

                      if (errors.tp) {
                        setErrors(
                          (previous) => ({
                            ...previous,
                            tp: "",
                          })
                        );
                      }

                    }}
                    options={[
                      {
                        value: "1",
                        label: "TP 1",
                      },
                      {
                        value: "2",
                        label: "TP 2",
                      },
                      {
                        value: "3",
                        label: "TP 3",
                      },
                      {
                        value: "4",
                        label: "TP 4",
                      },
                      {
                        value: "5",
                        label: "TP 5",
                      },
                      {
                        value: "6",
                        label: "TP 6",
                      },
                      {
                        value: "Other",
                        label: "Other",
                      },
                    ]}
                    placeholder="Select TP"
                  />

                </div>

                {/* CONTACT DETAILS */}

                <div className="border-t border-gray-100 pt-7">

                  <div className="mb-6">

                    <div className="flex items-center gap-3">

                      <span className="h-px w-7 bg-[#C9A45C]" />

                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#043927]">
                        Contact Information
                      </span>

                    </div>

                    <h3 className="mt-3 text-xl font-bold text-[#111111]">
                      Your Contact Details
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      So our team can contact you
                      regarding your land.
                    </p>

                  </div>

                  <div className="grid gap-6 md:grid-cols-2">

                    <FormField
                      label="Full Name"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      icon={UserIcon}
                      required
                      error={errors.name}
                    />

                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      icon={Phone}
                      required
                      error={errors.phone}
                    />

                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      icon={MessageSquare}
                    />

                  </div>

                </div>

                {/* MESSAGE */}

                <div>

                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#111111]"
                  >
                    Additional Information
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us anything important about your land..."
                    className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition placeholder:text-gray-400 focus:border-[#C9A45C] focus:ring-4 focus:ring-[#C9A45C]/10"
                  />

                </div>

                {/* SUBMIT */}

                <div className="pt-2">

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#043927] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#032d20] sm:w-auto"
                  >
                    Submit Land Details

                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="mt-3 text-xs leading-5 text-gray-400">
                    By submitting this form, you agree
                    to be contacted by HR Realty
                    regarding your land enquiry.
                  </p>

                </div>

              </form>
            </div>

            {/* SIDEBAR */}

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

              {/* WHY HR REALTY */}

              <div className="rounded-2xl bg-[#043927] p-6 text-white shadow-lg sm:p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A45C] text-[#111111]">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Why Sell With HR Realty?
                </h3>

                <div className="mt-3 h-1 w-10 rounded-full bg-[#C9A45C]" />

                <p className="mt-4 text-sm leading-6 text-white/65">
                  Get professional assistance
                  throughout your land selling
                  journey.
                </p>

                <div className="mt-6 space-y-4">

                  {[
                    "Professional land guidance",
                    "Better market visibility",
                    "Dedicated assistance",
                    "Transparent communication",
                    "Land-specific consultation",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A45C]" />

                      <span className="text-sm text-white/75">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>
              </div>

              {/* TALK TO TEAM */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927]">
                  <Phone className="h-5 w-5" />
                </div>

                <h3 className="mt-4 font-bold text-[#111111]">
                  Prefer to Talk?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Our team is available to discuss
                  your land and understand your
                  requirements.
                </p>

                <a
                  href="tel:+919999999999"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-[#043927] transition-all duration-300 hover:border-[#C9A45C] hover:bg-[#C9A45C]/5"
                >
                  <Phone className="h-4 w-4" />
                  Talk To Our Team
                </a>

              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* ======================================================
          HOW IT WORKS
      ======================================================= */}

      <section
        id="how-it-works"
        className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                Simple Process
              </span>

              <span className="h-px w-8 bg-[#C9A45C]" />

            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
              How It Works
            </h2>

            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

            <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
              A simple way to introduce your land to
              our team.
            </p>

          </div>

          <div className="relative mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">

            <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-gray-200 md:block" />

            {[
              {
                number: "01",
                icon: Send,
                title: "Share Details",
                description:
                  "Tell us about your land, location, size and expected price.",
              },
              {
                number: "02",
                icon: MessageSquare,
                title: "Our Team Connects",
                description:
                  "Our land team reviews your information and gets in touch.",
              },
              {
                number: "03",
                icon: CheckCircle2,
                title: "Move Forward",
                description:
                  "Discuss the opportunity and decide the next step for your land.",
              },
            ].map((step) => {

              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md"
                >

                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-[#043927] text-[#C9A45C] shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="mt-5 block text-xs font-bold tracking-widest text-[#C9A45C]">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#111111]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ======================================================
          LAND TYPES
      ======================================================= */}

      <section className="bg-gray-50 py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-[#C9A45C]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
                  Land Categories
                </span>

              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
                Have Land to Sell?
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                Whether you own land, a residential
                plot, commercial land or another
                real-estate parcel, share your details
                with HR Realty and let our team
                understand your land.
              </p>

              <a
                href="#land-form"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#043927] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#032d20]"
              >
                Submit Your Land

                <ArrowRight className="h-4 w-4" />
              </a>

            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">

              {[
                {
                  icon: LandPlot,
                  title: "Plots",
                  text: "Residential & investment plots",
                },
                {
                  icon: Home,
                  title: "Residential Land",
                  text: "Residential land opportunities",
                },
                {
                  icon: Building2,
                  title: "Commercial Land",
                  text: "Commercial land opportunities",
                },
                {
                  icon: TrendingUp,
                  title: "Investment Land",
                  text: "Land & investment opportunities",
                },
              ].map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-md sm:p-6"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]/5 text-[#043927] transition-colors duration-300 group-hover:bg-[#043927] group-hover:text-[#C9A45C]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 font-bold text-[#111111]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      {item.text}
                    </p>

                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ======================================================= */}

      <section className="bg-[#043927] py-16 sm:py-20">

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A45C] text-[#111111]">
            <LandPlot className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Sell Your Land?
          </h2>

          <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-[#C9A45C]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Share your land details with HR Realty
            and take the first step toward your
            next real-estate opportunity.
          </p>

          <a
            href="#land-form"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C9A45C] px-7 py-4 text-sm font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Submit Land Details

            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </section>

    </main>
  );
}

/* ============================================================
   FORM FIELD COMPONENT
============================================================ */

function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  icon: React.ElementType;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#111111]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">

        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-white py-3.5 pl-11 pr-4 text-sm text-[#111111] outline-none transition placeholder:text-gray-400 focus:border-[#C9A45C] focus:ring-4 focus:ring-[#C9A45C]/10 ${
            error
              ? "border-red-400"
              : "border-gray-200"
          }`}
        />

      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

/* ============================================================
   SELECT FIELD COMPONENT
============================================================ */

function SelectField({
  label,
  value,
  options,
  placeholder,
  required = false,
  error,
  onChange,
}: {
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-[#111111]">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className={`w-full appearance-none rounded-lg border bg-white px-4 py-3.5 pr-11 text-sm text-[#111111] outline-none transition focus:border-[#C9A45C] focus:ring-4 focus:ring-[#C9A45C]/10 ${
            error
              ? "border-red-400"
              : "border-gray-200"
          }`}
        >

          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}

        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

/* ============================================================
   USER ICON
============================================================ */

function UserIcon(
  props: React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}