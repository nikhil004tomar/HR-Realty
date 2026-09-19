"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
  Users,
} from "lucide-react";

export default function RealEstateSalesPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    city: "",
    state: "",
    experience: "",
    currentCompany: "",
    designation: "",
    qualification: "",
    expectedSalary: "",
    noticePeriod: "",
    salesExperience: "",
    realEstateExperience: "",
    linkedin: "",
    portfolio: "",
    source: "",
    whyJoin: "",
    salesStrengths: "",
    coverLetter: "",
    consent: false,
  });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleResumeChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setError("");

    const file = e.target.files?.[0];

    if (!file) {
      setResume(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload your resume in PDF, DOC or DOCX format."
      );
      e.target.value = "";
      setResume(null);
      return;
    }

    if (file.size > maxSize) {
      setError("Resume size must be less than 5 MB.");
      e.target.value = "";
      setResume(null);
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!form.consent) {
      setError(
        "Please confirm that the information provided is accurate."
      );
      return;
    }

    if (!resume) {
      setError("Please upload your resume/CV.");
      return;
    }

    const phoneNumber = form.phone.replace(/\D/g, "");

    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      formData.append("position", "Real Estate Sales");
      formData.append("resume", resume);

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://127.0.0.1:8000";

      const response = await fetch(
        `${API_URL}/api/career-applications`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let message =
          "Unable to submit your application. Please try again.";

        try {
          const data = await response.json();

          if (data?.detail) {
            message =
              typeof data.detail === "string"
                ? data.detail
                : message;
          }
        } catch {
          // Ignore invalid JSON response
        }

        throw new Error(message);
      }

      setSuccess(
        "Your application has been submitted successfully. Our team will review your profile and contact you if your application matches the opportunity."
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        whatsapp: "",
        city: "",
        state: "",
        experience: "",
        currentCompany: "",
        designation: "",
        qualification: "",
        expectedSalary: "",
        noticePeriod: "",
        salesExperience: "",
        realEstateExperience: "",
        linkedin: "",
        portfolio: "",
        source: "",
        whyJoin: "",
        salesStrengths: "",
        coverLetter: "",
        consent: false,
      });

      setResume(null);

      const fileInput = document.getElementById(
        "resume"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="bg-[#043927]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">

          <Link
            href="/careers"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-white/70
              transition-colors
              duration-300
              hover:text-[#C9A45C]
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>

          <div className="mt-8 max-w-4xl">

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Career Opportunity
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Real Estate Sales
              <span className="block text-[#C9A45C]">
                Application
              </span>
            </h1>

            <div className="mt-6 h-1 w-14 rounded-full bg-[#C9A45C]" />

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Interested in building your career in real estate sales?
              Complete the application form and share your professional
              profile with our team.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          APPLICATION
      ===================================================== */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.5fr]">

            {/* =================================================
                JOB INFORMATION
            ================================================= */}
            <aside className="lg:sticky lg:top-24">

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#043927] text-white">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-[#111111]">
                  Real Estate Sales
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Join our sales team and help clients discover suitable
                  real estate opportunities while building strong and
                  professional customer relationships.
                </p>

                {/* JOB DETAILS */}
                <div className="mt-7 space-y-4">

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#043927]" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#111111]">
                        Gujarat / Ahmedabad / Dholera
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-[#043927]" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Department
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#111111]">
                        Sales
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#043927]" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#111111]">
                        Real Estate Sales
                      </p>
                    </div>
                  </div>

                </div>

                <div className="my-7 h-px bg-gray-200" />

                {/* WHAT WE LOOK FOR */}
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#043927]">
                  What We Look For
                </h3>

                <ul className="mt-4 space-y-3">

                  {[
                    "Strong communication skills",
                    "Customer relationship skills",
                    "Positive and professional attitude",
                    "Sales and negotiation skills",
                    "Target-oriented mindset",
                    "Willingness to learn",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A45C]" />

                      <span className="text-sm leading-6 text-gray-600">
                        {item}
                      </span>
                    </li>
                  ))}

                </ul>

              </div>
            </aside>

            {/* =================================================
                FORM
            ================================================= */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">

              {/* FORM HEADER */}
              <div className="border-b border-gray-200 pb-6">

                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A45C]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#043927]">
                    Apply Now
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold text-[#111111] sm:text-3xl">
                  Submit Your Application
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Please provide accurate information. Fields marked with
                  <span className="text-red-500"> *</span> are required.
                </p>

              </div>

              {/* SUCCESS */}
              {success && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#043927]" />

                  <p className="text-sm leading-6 text-[#043927]">
                    {success}
                  </p>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm leading-6 text-red-700">
                    {error}
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-8"
              >

                {/* =================================================
                    PERSONAL DETAILS
                ================================================= */}
                <FormSection
                  number="01"
                  title="Personal Details"
                >

                  <div className="grid gap-5 sm:grid-cols-2">

                    <InputField
                      label="Full Name"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      icon={<User className="h-4 w-4" />}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      icon={<Mail className="h-4 w-4" />}
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      icon={<Phone className="h-4 w-4" />}
                    />

                    <InputField
                      label="WhatsApp Number"
                      name="whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={handleChange}
                      placeholder="Enter WhatsApp number"
                      icon={<Phone className="h-4 w-4" />}
                    />

                    <InputField
                      label="Current City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Ahmedabad"
                      required
                    />

                    <InputField
                      label="State"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="e.g. Gujarat"
                      required
                    />

                  </div>

                </FormSection>

                {/* =================================================
                    PROFESSIONAL DETAILS
                ================================================= */}
                <FormSection
                  number="02"
                  title="Professional Details"
                >

                  <div className="grid gap-5 sm:grid-cols-2">

                    <SelectField
                      label="Total Experience"
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      required
                      options={[
                        "Fresher",
                        "Less than 1 year",
                        "1 - 2 years",
                        "2 - 5 years",
                        "5 - 10 years",
                        "10+ years",
                      ]}
                    />

                    <InputField
                      label="Current / Previous Company"
                      name="currentCompany"
                      value={form.currentCompany}
                      onChange={handleChange}
                      placeholder="Company name"
                    />

                    <InputField
                      label="Current / Previous Designation"
                      name="designation"
                      value={form.designation}
                      onChange={handleChange}
                      placeholder="e.g. Sales Executive"
                    />

                    <InputField
                      label="Highest Qualification"
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      placeholder="e.g. MBA / BBA / Graduate"
                      required
                    />

                    <InputField
                      label="Expected Salary"
                      name="expectedSalary"
                      value={form.expectedSalary}
                      onChange={handleChange}
                      placeholder="e.g. ₹5 LPA"
                    />

                    <SelectField
                      label="Notice Period"
                      name="noticePeriod"
                      value={form.noticePeriod}
                      onChange={handleChange}
                      options={[
                        "Immediate",
                        "15 Days",
                        "30 Days",
                        "45 Days",
                        "60 Days",
                        "90 Days",
                        "Other",
                      ]}
                    />

                  </div>

                </FormSection>

                {/* =================================================
                    SALES EXPERIENCE
                ================================================= */}
                <FormSection
                  number="03"
                  title="Sales Experience"
                >

                  <div className="grid gap-5 sm:grid-cols-2">

                    <SelectField
                      label="Sales Experience"
                      name="salesExperience"
                      value={form.salesExperience}
                      onChange={handleChange}
                      required
                      options={[
                        "No sales experience",
                        "Less than 1 year",
                        "1 - 2 years",
                        "2 - 5 years",
                        "5 - 10 years",
                        "10+ years",
                      ]}
                    />

                    <SelectField
                      label="Real Estate Experience"
                      name="realEstateExperience"
                      value={form.realEstateExperience}
                      onChange={handleChange}
                      options={[
                        "No real estate experience",
                        "Less than 1 year",
                        "1 - 2 years",
                        "2 - 5 years",
                        "5 - 10 years",
                        "10+ years",
                      ]}
                    />

                  </div>

                </FormSection>

                {/* =================================================
                    PROFESSIONAL PROFILE
                ================================================= */}
                <FormSection
                  number="04"
                  title="Professional Profiles"
                >

                  <div className="grid gap-5 sm:grid-cols-2">

                    <InputField
                      label="LinkedIn Profile"
                      name="linkedin"
                      type="url"
                      value={form.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                    />

                    <InputField
                      label="Portfolio / Website"
                      name="portfolio"
                      type="url"
                      value={form.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />

                    <SelectField
                      label="How did you hear about us?"
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      options={[
                        "LinkedIn",
                        "Instagram",
                        "Facebook",
                        "Google",
                        "Company Website",
                        "Friend / Referral",
                        "Job Portal",
                        "Other",
                      ]}
                    />

                  </div>

                </FormSection>

                {/* =================================================
                    RESUME
                ================================================= */}
                <FormSection
                  number="05"
                  title="Resume / CV"
                >

                  <label
                    htmlFor="resume"
                    className="
                      group
                      flex
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border-2
                      border-dashed
                      border-gray-300
                      bg-gray-50
                      px-5
                      py-10
                      text-center
                      transition-all
                      duration-300
                      hover:border-[#C9A45C]
                      hover:bg-[#C9A45C]/5
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#043927]
                        text-white
                        transition-all
                        duration-300
                        group-hover:bg-[#C9A45C]
                        group-hover:text-[#111111]
                      "
                    >
                      <Upload className="h-6 w-6" />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-[#111111]">
                      {resume
                        ? resume.name
                        : "Upload your Resume / CV"}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      PDF, DOC or DOCX • Maximum 5 MB
                    </p>

                    <span className="mt-4 rounded-full bg-[#043927] px-5 py-2 text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-[#C9A45C] group-hover:text-[#111111]">
                      Choose File
                    </span>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                    />

                  </label>

                </FormSection>

                {/* =================================================
                    ABOUT APPLICANT
                ================================================= */}
                <FormSection
                  number="06"
                  title="About You"
                >

                  <div className="space-y-5">

                    <TextareaField
                      label="Why do you want to join us?"
                      name="whyJoin"
                      value={form.whyJoin}
                      onChange={handleChange}
                      placeholder="Tell us about your interest in real estate sales and why you want to join our team..."
                      required
                    />

                    <TextareaField
                      label="What are your sales strengths?"
                      name="salesStrengths"
                      value={form.salesStrengths}
                      onChange={handleChange}
                      placeholder="Tell us about your communication, sales, negotiation or customer relationship strengths..."
                      required
                    />

                    <TextareaField
                      label="Cover Letter"
                      name="coverLetter"
                      value={form.coverLetter}
                      onChange={handleChange}
                      placeholder="Introduce yourself and explain how your experience can contribute to the role..."
                      rows={7}
                    />

                  </div>

                </FormSection>

                {/* =================================================
                    CONSENT
                ================================================= */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      className="
                        mt-1
                        h-4
                        w-4
                        shrink-0
                        rounded
                        border-gray-300
                        accent-[#043927]
                      "
                    />

                    <span className="text-sm leading-6 text-gray-600">
                      I confirm that the information provided in this
                      application is accurate and complete. I understand
                      that the company may contact me regarding this
                      application.
                      <span className="ml-1 text-red-500">*</span>
                    </span>

                  </label>

                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}
                <div className="flex flex-col gap-4 border-t border-gray-200 pt-7 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileText className="h-4 w-4 text-[#043927]" />

                    <span>
                      Please ensure your resume is up to date.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#043927]
                      px-7
                      py-3.5
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-[#06543a]
                      hover:shadow-md
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Application"}

                    {!isSubmitting && (
                      <span
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-white/10
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ============================================================
   FORM SECTION
============================================================ */

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#043927] text-xs font-semibold text-white">
          {number}
        </span>

        <h3 className="text-lg font-bold text-[#111111] sm:text-xl">
          {title}
        </h3>

        <div className="h-px flex-1 bg-gray-200" />

      </div>

      {children}
    </section>
  );
}

/* ============================================================
   INPUT
============================================================ */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#111111]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">

        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            text-sm
            text-[#111111]
            outline-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:border-[#043927]
            focus:ring-2
            focus:ring-[#043927]/10
            ${icon ? "pl-10" : ""}
          `}
        />

      </div>

    </div>
  );
}

/* ============================================================
   SELECT
============================================================ */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLSelectElement>
  ) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#111111]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-[#111111]
          outline-none
          transition-all
          duration-300
          focus:border-[#043927]
          focus:ring-2
          focus:ring-[#043927]/10
        "
      >
        <option value="">
          Select an option
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

/* ============================================================
   TEXTAREA
============================================================ */

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 5,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#111111]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-[#111111]
          outline-none
          transition-all
          duration-300
          placeholder:text-gray-400
          focus:border-[#043927]
          focus:ring-2
          focus:ring-[#043927]/10
        "
      />

    </div>
  );
}