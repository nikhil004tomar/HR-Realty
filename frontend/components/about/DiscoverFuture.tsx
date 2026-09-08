import Image from "next/image";
import Link from "next/link";

export default function DiscoverFuture() {
  return (
    <section className="text-neutral-50 bg-[#043927] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-white md:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[540px]">
            <Image
              src="/images/bulk-land/master-plan-of-dholera.jpg"
              alt="Discover the future with Smart Homes"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
              Discover the Future
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
              Discover the Future with{" "}
              <span className="text-[#b2965d]">
                HR Realty International Pvt. Ltd.
              </span>
            </h2>

            <p className="mt-7 text-base leading-8 text-neutral-600">
              At HR Realty, our story is one of innovation, ambition, and
              dedication to shaping the future of urban living. As a pioneer
              in Dholera SIR , we are at the forefront of India's first GREENFIELD SMART CITY
              planned and futuristic city.
            </p>

            <p className="mt-4 text-base leading-8 text-neutral-600">
              We create spaces that combine modern living with sustainability,
              technology, and unmatched quality.
            </p>

         
          </div>
        </div>
      </div>
    </section>
  );
}