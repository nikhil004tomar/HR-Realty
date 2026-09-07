import Image from "next/image";
import Link from "next/link";
import ProjectEnquiryForm from "@/components/projects/ProjectEnquiryForm";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Ruler,
  Building2,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import {
  getProject,
  getImageUrl,
} from "@/lib/projects";


export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project;

  try {
    project = await getProject(slug);
  } catch (error) {
    console.error("Failed to load project:", error);

    return (
      <main className="min-h-screen bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">

          <h1 className="text-4xl font-semibold text-[#043927]">
            Project Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The project you are looking for does not exist.
          </p>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#043927] px-6 py-3 font-medium text-white transition hover:bg-[#b2965d]"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

        </div>
      </main>
    );
  }


  /*
   * ============================================================
   * PROJECT DATA
   * ============================================================
   */

  const primaryImage =
    project.images?.[0]
      ? getImageUrl(project.images[0].image_url)
      : "/images/placeholder.jpg";


  const galleryImages =
    project.images || [];


  /*
   * ============================================================
   * MAP URL
   * ============================================================
   */

  const mapUrl =
    project.map_url ||
    "https://www.google.com/maps?q=Dholera%20SIR%20Gujarat&output=embed";


  return (
    <main className="bg-white">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#043927]">

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">

          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-[#b2965d]"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>


          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Image */}

            <div className="relative overflow-hidden rounded-3xl">

              <Image
                src={primaryImage}
                alt={project.title}
                width={1200}
                height={750}
                priority
                className="h-auto w-full object-cover"
              />


              <div className="absolute left-5 top-5">

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-md ${
                    project.status === "Sold Out"
                      ? "bg-black/70 text-white"
                      : "bg-[#b2965d] text-white"
                  }`}
                >
                  {project.status}
                </span>

              </div>

            </div>


            {/* Content */}

            <div className="text-white">

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
                Residential Project
              </p>


              <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                {project.title}
              </h1>


              <div className="mt-5 flex items-center gap-2 text-white/75">

                <MapPin size={19} />

                <span>
                  {project.location}
                </span>

              </div>


              <div className="mt-8 flex flex-wrap gap-3">

                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 rounded-full bg-[#b2965d] px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#043927]"
                >
                  Enquire Now
                  <ArrowRight size={18} />
                </a>


                <a
                  href="#details"
                  className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-[#b2965d] hover:text-[#b2965d]"
                >
                  View Details
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          QUICK DETAILS
      ====================================================== */}

      <section
        id="details"
        className="border-b border-gray-100 bg-white py-12"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            <DetailCard
              icon={<Ruler size={22} />}
              title="Plot Size"
              value={project.plot_size}
            />


            <DetailCard
              icon={<Building2 size={22} />}
              title="Property Type"
              value={project.property_type}
            />


            <DetailCard
              icon={<MapPin size={22} />}
              title="Location"
              value={project.location}
            />


            <DetailCard
              icon={<CalendarDays size={22} />}
              title="Possession"
              value={project.possession}
            />

          </div>

        </div>

      </section>


      {/* ======================================================
          ABOUT
      ====================================================== */}

      <section className="py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

            <div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
                About Project
              </p>


              <h2 className="text-3xl font-semibold text-[#043927] md:text-4xl">
                About {project.title}
              </h2>


              <p className="mt-6 whitespace-pre-line text-base leading-8 text-gray-600">
                {project.description}
              </p>

            </div>


            {/* Price Card */}

            <div className="rounded-3xl bg-[#043927] p-7 text-white shadow-lg">

              <p className="text-sm text-white/60">
                Starting Price
              </p>


              <p className="mt-2 text-3xl font-semibold text-[#b2965d]">
                {project.price}
              </p>


              <div className="my-6 h-px bg-white/10" />


              <a
                href="#enquiry"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b2965d] px-5 py-3 font-semibold transition hover:bg-white hover:text-[#043927]"
              >
                Get Project Details
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          HIGHLIGHTS
      ====================================================== */}

      <section className="bg-gray-50 py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-10">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Project Benefits
            </p>


            <h2 className="text-3xl font-semibold text-[#043927] md:text-4xl">
              Project Highlights
            </h2>

          </div>


          {project.highlights?.length > 0 ? (

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {project.highlights.map(
                (item, index) => (

                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5"
                  >

                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-[#b2965d]"
                    />

                    <span className="text-gray-700">
                      {item}
                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="text-gray-500">
              Project highlights will be updated soon.
            </p>

          )}

        </div>

      </section>


      {/* ======================================================
          AMENITIES
      ====================================================== */}

      <section className="py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-10">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Facilities
            </p>


            <h2 className="text-3xl font-semibold text-[#043927] md:text-4xl">
              Project Amenities
            </h2>

          </div>


          {project.amenities?.length > 0 ? (

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

              {project.amenities.map(
                (amenity, index) => (

                  <div
                    key={`${amenity}-${index}`}
                    className="rounded-2xl border border-gray-200 p-5 text-center transition hover:-translate-y-1 hover:border-[#b2965d]"
                  >

                    <CheckCircle2
                      size={24}
                      className="mx-auto text-[#b2965d]"
                    />

                    <p className="mt-3 text-sm font-medium text-[#043927]">
                      {amenity}
                    </p>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="text-gray-500">
              Amenities will be updated soon.
            </p>

          )}

        </div>

      </section>


      {/* ======================================================
          GALLERY
      ====================================================== */}

      <section className="bg-gray-50 py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-10">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Project Gallery
            </p>


            <h2 className="text-3xl font-semibold text-[#043927] md:text-4xl">
              Explore the Project
            </h2>

          </div>


          {galleryImages.length > 0 ? (

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {galleryImages.map(
                (image, index) => (

                  <div
                    key={image.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  >

                    <Image
                      src={getImageUrl(
                        image.image_url
                      )}
                      alt={
                        image.alt_text ||
                        `${project.title} gallery ${index + 1}`
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
              Project gallery will be updated soon.
            </div>

          )}

        </div>

      </section>


      {/* ======================================================
          LOCATION
      ====================================================== */}

      <section className="py-16 md:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-10">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Location
            </p>


            <h2 className="text-3xl font-semibold text-[#043927] md:text-4xl">
              Project Location
            </h2>

          </div>


          <div className="overflow-hidden rounded-3xl border border-gray-200">

            <iframe
              src={mapUrl}
              className="h-[400px] w-full border-0"
              loading="lazy"
              title={`${project.title} location`}
            />

          </div>

        </div>

      </section>


      {/* ======================================================
          ENQUIRY
      ====================================================== */}

      <section
        id="enquiry"
        className="bg-[#043927] py-16 md:py-24"
      >

        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          <div className="mb-10 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b2965d]">
              Get In Touch
            </p>


            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              Interested in {project.title}?
            </h2>


            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">
              Submit your details and our team will contact you with complete
              project information.
            </p>

          </div>


          <ProjectEnquiryForm
  projectId={project.id}
  projectTitle={project.title}
/>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   DETAIL CARD
============================================================ */

function DetailCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#043927]/5 text-[#b2965d]">
          {icon}
        </div>


        <div>

          <p className="text-xs uppercase tracking-wide text-gray-400">
            {title}
          </p>


          <p className="mt-1 text-sm font-semibold text-[#043927]">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}