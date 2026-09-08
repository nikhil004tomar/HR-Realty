import Link from "next/link";

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
                <span className="ml-1 text-[#d5b36a]">Infrastructure</span>
              </h2>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Building a smarter future through thoughtfully planned
              residential, commercial, and industrial developments in
              Dholera SIR.
            </p>


          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d5b36a]">
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

             
            </ul>
          </div>

         

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d5b36a]">
              Contact
            </h3>

            <div className="mt-6 space-y-5 text-sm text-white/65">
              <a
                href="tel:+91 97738 92312"
                className="block transition hover:text-white"
              >
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/40">
                  Phone
                </span>
                +91 97738 92312
              </a>

              <a
                href="mailto:hrrealtyinternational@gmail.com"
                className="block transition hover:text-white"
              >
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/40">
                  Email
                </span>
                hrrealtyinternational@gmail.com
              </a>

              <a
                href="https://www.google.com/maps/place/Galaxy+Blue+Sapphire+Plaza/@28.6070745,77.4233031,3301m/data=!3m1!1e3!4m6!3m5!1s0x390ce557777b7b45:0x69870f8fa7e1f92e!8m2!3d28.6072436!4d77.4354386!16s%2Fg%2F11c5h5383n?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/40">
                  Office
                </span>
                Visit Our Office
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

          <div className="flex items-center gap-6">
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