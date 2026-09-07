"use client";

import { FormEvent, useState } from "react";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Connect your existing FastAPI inquiry API here.
    setSubmitted(true);
  };

  return (
    <section className="text-neutral-50 bg-[#043927] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Get In Touch
          </p>

          <h2 className="mt-5 text-4xl font-medium tracking-tight text-white md:text-5xl">
            Inquire <span className="text-[#b2965d]">Now</span>
          </h2>

          <p className="mt-4 text-neutral-500">
            Share your details and we'll get back to you with expert guidance.
          </p>
        </div>

        {/* Form */}
        <form
          id="header_inquiry_form"
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-neutral-600"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                name="client_name"
                autoComplete="off"
                required
                placeholder="Your name"
                className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email_address"
                className="mb-2 block text-sm font-medium text-neutral-600"
              >
                Email
              </label>

              <input
                id="email_address"
                type="email"
                name="email_address"
                autoComplete="off"
                required
                placeholder="you@example.com"
                className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="client_contact_no"
                className="mb-2 block text-sm font-medium text-neutral-600"
              >
                Phone Number
              </label>

              <div className="flex border-b border-neutral-300">

                <span className="flex items-center pr-3 text-sm text-neutral-500">
                  +91
                </span>

                <input
                  id="client_contact_no"
                  type="tel"
                  name="client_contact_no_display"
                  minLength={10}
                  maxLength={10}
                  required
                  autoComplete="off"
                  placeholder="10 digit mobile number"
                  className="w-full bg-transparent py-3 text-neutral-900 outline-none placeholder:text-neutral-300"
                />

              </div>
            </div>

            {/* Comments */}
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-600"
              >
                Comments
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us how we can help..."
                className="w-full resize-none border-b border-neutral-300 bg-transparent px-0 py-3 text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900"
              />
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <label className="flex items-center gap-3 text-sm text-neutral-500">
              <input
                id="agree_tandc"
                type="checkbox"
                name="agree_tandc_display"
                defaultChecked
                required
                className="h-4 w-4 rounded border-neutral-300"
              />

              <span>
                By clicking the button you agree to our T&C.
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#043927] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Submit
              <span className="text-lg">→</span>
            </button>

          </div>

          {submitted && (
            <p className="mt-5 text-sm text-green-600">
              Thank you. Your inquiry has been submitted.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}