import Link from "next/link";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[#043927] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">

          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-semibold tracking-tight">
                HR Realty
                <span className="ml-1 text-[#C9A45C]">
                  International Pvt. Ltd.
                </span>
              </h2>
            </Link>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">
              HR Realty International is a trusted real estate partner,
              connecting property owners and buyers with transparency,
              professional guidance, and informed investment decisions.
            </p>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
              We provide detailed property information, verified
              documentation, location insights, development potential,
              infrastructure details, and investment-focused guidance to
              help our clients make confident real estate decisions.
            </p>

            {/* Social Media */}
            <div className="mt-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
                Follow Us
              </p>

              <div className="flex items-center gap-3">

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/hr-realty-international-pvt-ltd/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-white/15
                    text-white/70
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:bg-[#C9A45C]
                    hover:text-[#043927]
                  "
                >
                  <FaLinkedinIn size={17} />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61592479960484"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-white/15
                    text-white/70
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:bg-[#C9A45C]
                    hover:text-[#043927]
                  "
                >
                  <FaFacebookF size={17} />                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/hrrealtygroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-white/15
                    text-white/70
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:bg-[#C9A45C]
                    hover:text-[#043927]
                  "
                >
                  <FaInstagram size={17} />                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-white/15
                    text-white/70
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:bg-[#C9A45C]
                    hover:text-[#043927]
                  "
                >
                  <FaYoutube size={17} />                </a>
                  {/* YouTube */}
                <a
                  href="https://x.com/HRREALTYT"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    border border-white/15
                    text-white/70
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]
                    hover:bg-[#C9A45C]
                    hover:text-[#043927]
                  "
                >
                  <FaTwitter size={17} />                </a>

              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
              Explore
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/65">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="transition hover:text-white"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/bulk-land"
                  className="transition hover:text-white"
                >
                  Bulk Land
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="transition hover:text-white"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/sell-your-property"
                  className="transition hover:text-white"
                >
                  Sell Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
              Services
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/65">
              <li>Land Investment</li>
              <li>Residential Projects</li>
              <li>Commercial Projects</li>
              <li>Project Marketing</li>
              <li>Investment Advisory</li>
              <li>Developer Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A45C]">
              Contact
            </h3>

            <div className="mt-6 space-y-5 text-sm text-white/65">

              {/* Phone */}
              <a
                href="tel:+919773892312"
                className="block transition hover:text-white"
              >
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/40">
                  Phone
                </span>
                +91 97738 92312
              </a>

              {/* Email */}
              <a
                href="mailto:hrrealtyinternational@gmail.com"
                className="block transition hover:text-white"
              >
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/40">
                  Email
                </span>
                hrrealtyinternational@gmail.com
              </a>

              {/* Office */}
              <a
                href="https://www.google.com/maps/place/Galaxy+Blue+Sapphire+Plaza/@28.6070745,77.4233031,3301m/data=!3m1!1e3!4m6!3m5!1s0x390ce557777b7b45:0x69870f8fa7e1f92e!8m2!3d28.6072436!4d28.4354386!16s%2Fg%2F11c5h5383n?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/40">
                  Office
                </span>
                OFFICE NO-1909 18TH FLOOR GALAXY BLUE SAPPHIRE PLAZA SECTOR-4 GREATER NOIDA WEST, 201309
              </a>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} HR Realty International Pvt. Ltd.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}