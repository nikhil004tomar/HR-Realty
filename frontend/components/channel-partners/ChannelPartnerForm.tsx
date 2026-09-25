"use client";

import { FormEvent, useState } from "react";
import {
  User,
  Building2,
  BriefcaseBusiness,
  Users,
  ArrowRight,
} from "lucide-react";

import API_URL from "@/lib/api";

export default function ChannelPartnerForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      /*
       * Your current backend stores:
       * name
       * email
       * phone
       * city
       * company
       * experience
       * message
       */

      const payload = {
        name: String(
          formData.get("first_name") || ""
        ).trim(),

        email:
          String(
            formData.get("email_address") || ""
          ).trim() || null,

        phone: String(
          formData.get("contact_no_display") || ""
        ).trim(),

        city:
          String(
            formData.get("city") || ""
          ).trim() || null,

        company:
          String(
            formData.get("company_name") || ""
          ).trim() || null,

        experience:
          String(
            formData.get(
              "years_of_experience_in_real_estate"
            ) || ""
          ).trim() || null,

        message: [
          `Alternate Phone: ${
            String(
              formData.get(
                "contact_no_display_2"
              ) || ""
            ).trim() || "Not provided"
          }`,

          `Aadhar Number: ${
            String(
              formData.get("aadhar_no") || ""
            ).trim() || "Not provided"
          }`,

          `PAN Number: ${
            String(
              formData.get("pan_no") || ""
            ).trim() || "Not provided"
          }`,

          `Company Type: ${
            String(
              formData.get("company_type") || ""
            ).trim() || "Not provided"
          }`,

          `Business Address: ${
            String(
              formData.get("address") || ""
            ).trim() || "Not provided"
          }`,

          `State: ${
            String(
              formData.get("state") || ""
            ).trim() || "Not provided"
          }`,

          `Pincode: ${
            String(
              formData.get("pincode") || ""
            ).trim() || "Not provided"
          }`,

          `Company Website: ${
            String(
              formData.get("company_url") || ""
            ).trim() || "Not provided"
          }`,

          `GST Number: ${
            String(
              formData.get("gst_no") || ""
            ).trim() || "Not provided"
          }`,

          `Previous Projects / Developers: ${
            String(
              formData.get(
                "previous_projects_developers_worked_with"
              ) || ""
            ).trim() || "Not provided"
          }`,

          `Primary Areas of Operation: ${
            String(
              formData.get(
                "primary_areas_of_operation"
              ) || ""
            ).trim() || "Not provided"
          }`,

          `Nature of Business: ${
            String(
              formData.get("nature_of_business") || ""
            ).trim() || "Not provided"
          }`,

          `Average Monthly Sales: ${
            String(
              formData.get(
                "average_monthly_sales"
              ) || ""
            ).trim() || "Not provided"
          }`,

          `Reference Name: ${
            String(
              formData.get("reference_name") || ""
            ).trim() || "Not provided"
          }`,

          `Reference Number: ${
            String(
              formData.get(
                "reference_number_display"
              ) || ""
            ).trim() || "Not provided"
          }`,
        ].join("\n"),
      };

      // ======================================================
      // VALIDATION
      // ======================================================

      if (!payload.name) {
        throw new Error(
          "Please enter your name."
        );
      }

      if (!payload.phone) {
        throw new Error(
          "Please enter your phone number."
        );
      }

      // ======================================================
      // SUBMIT TO API
      // ======================================================

      const response = await fetch(
        `${API_URL}/api/channel-partners`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      // ======================================================
      // RESPONSE
      // ======================================================

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Channel partner API error:",
          response.status,
          data
        );

        throw new Error(
          data.detail ||
            "Unable to submit application."
        );
      }

      console.log(
        "Channel partner created:",
        data
      );

      setSuccess(
        "Your Channel Partner application has been submitted successfully!"
      );

      form.reset();
    } catch (error) {
      console.error(
        "Channel partner submit error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit application."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#043927] py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
            Partner With Us
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Become a{" "}
            <span className="text-[#b2965d]">
              Channel Partner
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            Fill in your details and our team will
            connect with you to discuss the
            partnership opportunity.
          </p>

        </div>

        {/* =====================================================
            SUCCESS
        ===================================================== */}

        {success && (
          <div className="mb-6 rounded-2xl border border-green-300 bg-green-50 p-5 text-center text-green-700">
            {success}
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-5 text-center text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10"
        >

          {/* ===================================================
              SECTION 1
          =================================================== */}

          <FormSection
            number="1"
            title="Personal Details"
            icon={<User size={20} />}
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Full Name"
                name="first_name"
                required
              />

              <Input
                label="Email"
                name="email_address"
                type="email"
                required
              />

              <Input
                label="Phone Number"
                name="contact_no_display"
                type="tel"
                maxLength={10}
                required
              />

              <Input
                label="Alternate Phone Number"
                name="contact_no_display_2"
                type="tel"
                maxLength={10}
              />

              <Input
                label="Aadhar Number"
                name="aadhar_no"
              />

              <Input
                label="PAN Number"
                name="pan_no"
              />

            </div>

          </FormSection>

          {/* ===================================================
              SECTION 2
          =================================================== */}

          <FormSection
            number="2"
            title="Company Details (If Applicable)"
            icon={<Building2 size={20} />}
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Select
                label="Company Type"
                name="company_type"
                options={[
                  "Proprietorship",
                  "Partnership",
                  "Pvt. Ltd",
                  "LLP",
                  "Others",
                ]}
              />

              <Input
                label="Company Name"
                name="company_name"
              />

              <Input
                label="Registered Business Address"
                name="address"
              />

              <Input
                label="City"
                name="city"
              />

              <Input
                label="State"
                name="state"
              />

              <Input
                label="Pincode"
                name="pincode"
                type="tel"
              />

              <Input
                label="Company Website"
                name="company_url"
              />

              <Input
                label="GST Number"
                name="gst_no"
                className="md:col-span-2"
              />

            </div>

          </FormSection>

          {/* ===================================================
              SECTION 3
          =================================================== */}

          <FormSection
            number="3"
            title="Business Experience & Real Estate Background"
            icon={
              <BriefcaseBusiness size={20} />
            }
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Select
                label="Years of Experience in Real Estate"
                name="years_of_experience_in_real_estate"
                options={[
                  "1 - 3 Years",
                  "3 - 5 Years",
                  "5 - 10 Years",
                  "10+ Years",
                ]}
              />

              <Input
                label="Previous Projects / Developers Worked With"
                name="previous_projects_developers_worked_with"
              />

              <Input
                label="Primary Areas of Operation"
                name="primary_areas_of_operation"
              />

              <Select
                label="Nature of Business"
                name="nature_of_business"
                options={[
                  "Broker",
                  "Consultant",
                  "Firm",
                  "Agency",
                  "Investment Firm",
                  "Other",
                ]}
              />

              <Select
                label="Average Monthly Sales"
                name="average_monthly_sales"
                options={[
                  "< 5 Cr",
                  "5-10 Cr",
                  "10-20 Cr",
                  "20+ Cr",
                ]}
              />

            </div>

          </FormSection>

          {/* ===================================================
              SECTION 4
          =================================================== */}

          <FormSection
            number="4"
            title="Referee Details"
            icon={<Users size={20} />}
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Reference Name"
                name="reference_name"
              />

              <Input
                label="Reference Contact Number"
                name="reference_number_display"
                type="tel"
                maxLength={10}
              />

            </div>

          </FormSection>

          {/* ===================================================
              AGREEMENT
          =================================================== */}

          <div className="mt-8 flex items-start gap-3">

            <input
              type="checkbox"
              id="agree_tandc_display"
              name="agree_tandc_display"
              required
              className="mt-1 h-4 w-4 accent-[#043927]"
            />

            <label
              htmlFor="agree_tandc_display"
              className="text-sm leading-6 text-gray-600"
            >
              I confirm that the information
              provided by me is true, accurate,
              and complete. I acknowledge and
              agree to comply with all applicable
              terms and conditions, policies, and
              guidelines of HR Realty
              International Pvt. Ltd. as a
              Channel Partner.
            </label>

          </div>

          {/* ===================================================
              SUBMIT
          =================================================== */}

          <div className="mt-8">

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#043927] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#b2965d] hover:text-[#043927] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >

              {loading
                ? "Submitting..."
                : "Submit Application"}

              {!loading && (
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}

            </button>

          </div>

        </form>

      </div>

    </section>
  );
}

/* ============================================================
   FORM SECTION
============================================================ */

function FormSection({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 py-8 first:pt-0 last:border-b-0">

      <div className="mb-7 flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#043927] text-[#b2965d]">
          {icon}
        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-[#b2965d]">
            Section {number}
          </p>

          <h3 className="mt-1 text-xl font-semibold text-[#043927]">
            {title}
          </h3>

        </div>

      </div>

      {children}

    </div>
  );
}

/* ============================================================
   INPUT
============================================================ */

function Input({
  label,
  name,
  type = "text",
  required = false,
  maxLength,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={className}>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#043927]"
      >

        {label}

        {required && (
          <span className="ml-1 text-[#b2965d]">
            *
          </span>
        )}

      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-[#b2965d] focus:ring-2 focus:ring-[#b2965d]/20"
      />

    </div>
  );
}

/* ============================================================
   SELECT
============================================================ */

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#043927]"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-[#b2965d] focus:ring-2 focus:ring-[#b2965d]/20"
      >

        <option value="" disabled>
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}