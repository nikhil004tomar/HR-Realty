export default function ContactCTA() {
  return (
    <section className="bg-[#043927] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 px-7 py-12 text-white md:px-14 md:py-16">

          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full border border-white/5" />

          <div className="relative z-10 max-w-3xl">

            <p className="text-lg leading-8 text-white/70 md:text-xl">
              Prefer connecting directly? Get in touch with us via phone,
              email, or visit us at our office — we're here to help.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="tel:+917096961250"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/80"
              >
                Call Us
              </a>

              <a
                href="mailto:hrrealtyinternational@gmail.com"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Send Email
              </a>

              <a
                href="https://www.google.com/maps/place/Galaxy+Blue+Sapphire+Plaza/@28.6070745,77.4233031,3301m/data=!3m1!1e3!4m6!3m5!1s0x390ce557777b7b45:0x69870f8fa7e1f92e!8m2!3d28.6072436!4d77.4354386!16s%2Fg%2F11c5h5383n?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Visit Our Office
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}