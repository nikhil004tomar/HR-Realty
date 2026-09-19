export default function ContactCTA() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* MAIN CARD */}
        <div
          className="
            rounded-2xl
            border
            border-black/10
            bg-[#043927]
            px-6
            py-10
            shadow-[0_10px_35px_rgba(0,0,0,0.08)]
            transition-all
            duration-300
            hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]
            sm:px-10
            md:px-14
            md:py-14
            lg:px-16
          "
        >

          {/* CONTENT */}
          <div className="max-w-4xl">

            {/* LABEL */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A45C]" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                Contact Us
              </span>
            </div>


            {/* HEADING */}
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Let&apos;s Start a{" "}
              <span className="text-[#C9A45C]">
                Conversation
              </span>
            </h2>


            {/* GOLD LINE */}
            <div className="mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />


            {/* DESCRIPTION */}
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Prefer connecting directly? Get in touch
              with us via phone, email, or visit us at
              our office — we&apos;re here to help.
            </p>


            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

              {/* CALL */}
              <a
                href="tel:+917096961250"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#043927]
                  transition-all
                  duration-300
                  hover:bg-[#C9A45C]
                  hover:text-[#111111]
                  active:scale-[0.98]
                "
              >
                Call Us
              </a>


              {/* EMAIL */}
              <a
                href="mailto:hrrealtyinternational@gmail.com"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/30
                  bg-transparent
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#C9A45C]
                  hover:bg-[#C9A45C]
                  hover:text-[#111111]
                  active:scale-[0.98]
                "
              >
                Send Email
              </a>


              {/* OFFICE */}
              <a
                href="https://www.google.com/maps/place/Galaxy+Blue+Sapphire+Plaza/@28.6070745,77.4233031,3301m/data=!3m1!1e3!4m6!3m5!1s0x390ce557777b7b45:0x69870f8fa7e1f92e!8m2!3d28.6072436!4d77.4354386!16s%2Fg%2F11c5h5383n?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/30
                  bg-transparent
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#C9A45C]
                  hover:bg-[#C9A45C]
                  hover:text-[#111111]
                  active:scale-[0.98]
                "
              >
                Visit Our Office
              </a>

            </div>

          </div>


          {/* BOTTOM CONTACT INFO */}
          <div className="mt-10 grid gap-4 border-t border-white/15 pt-7 sm:grid-cols-3">

            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">
                Phone
              </p>

              <a
                href="tel:+917096961250"
                className="mt-1 block text-sm font-medium text-white transition-colors duration-200 hover:text-[#C9A45C]"
              >
                +91 70969 61250
              </a>
            </div>


            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">
                Email
              </p>

              <a
                href="mailto:hrrealtyinternational@gmail.com"
                className="mt-1 block break-all text-sm font-medium text-white transition-colors duration-200 hover:text-[#C9A45C]"
              >
                hrrealtyinternational@gmail.com
              </a>
            </div>


            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">
                Office
              </p>

              <a
                href="https://www.google.com/maps/place/Galaxy+Blue+Sapphire+Plaza/@28.6070745,77.4233031,3301m/data=!3m1!1e3!4m6!3m5!1s0x390ce557777b7b45:0x69870f8fa7e1f92e!8m2!3d28.6072436!4d77.4354386!16s%2Fg%2F11c5h5383n?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-medium text-white transition-colors duration-200 hover:text-[#C9A45C]"
              >
                View Location
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}