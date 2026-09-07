"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface ProjectEnquiryFormProps {
  projectId: number;
  projectTitle: string;
}

export default function ProjectEnquiryForm({
  projectId,
  projectTitle,
}: ProjectEnquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: `I am interested in ${projectTitle}. Please share complete project details.`,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/inquiries",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            project_id: projectId,
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim() || null,
            city: form.city.trim() || null,
            message: form.message.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to submit your enquiry."
        );
      }

      setSuccess(
        "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly."
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        message: `I am interested in ${projectTitle}. Please share complete project details.`,
      });
    } catch (error) {
      console.error("Inquiry submission error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-2xl md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">

        {/* Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          disabled={loading}
          className="rounded-xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#b2965d] disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          disabled={loading}
          className="rounded-xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#b2965d] disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          disabled={loading}
          className="rounded-xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#b2965d] disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          disabled={loading}
          className="rounded-xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#b2965d] disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        {/* Message */}
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          disabled={loading}
          className="md:col-span-2 rounded-xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#b2965d] disabled:cursor-not-allowed disabled:bg-gray-50"
        />

      </div>

      {/* Success */}
      {success && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p>{success}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#043927] px-7 py-3.5 font-semibold text-white transition hover:bg-[#b2965d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            Submitting...
          </>
        ) : (
          <>
            Submit Enquiry

            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}