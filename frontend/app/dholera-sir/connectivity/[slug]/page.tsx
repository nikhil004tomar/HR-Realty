import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getConnectivity,
} from "@/lib/connectivity";

/* =========================================================
   PAGE PROPS
========================================================= */

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   DETAIL PAGE
========================================================= */

export default async function ConnectivityDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /* =======================================================
     LOAD FROM BACKEND
  ======================================================= */

  const data =
    await getConnectivity(slug);

  /* =======================================================
     INVALID SLUG
  ======================================================= */

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">

      {/* ===================================================
          HEADING
      =================================================== */}

      <section className="bg-white px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-14 lg:pt-24">

        <div className="mx-auto max-w-7xl">

          {/* Small Label */}

          <div className="flex items-center gap-3">

            <span className="h-px w-10 bg-[#C9A45C]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#043927]">
              Dholera SIR Connectivity
            </span>

          </div>

          {/* Main Heading */}

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          {/* Gold Accent */}

          <div className="mt-6 h-1 w-14 rounded-full bg-[#C9A45C]" />

          {/* Description */}

          {data.description && (
            <p className="mt-6 max-w-3xl text-base leading-7 text-gray-600">
              {data.description}
            </p>
          )}

        </div>

      </section>

      {/* ===================================================
          IMAGES
      =================================================== */}

      <section className="bg-white px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">

        <div className="mx-auto max-w-7xl">

          {data.images.length === 0 ? (

            /* =================================================
               NO IMAGES
            ================================================= */

            <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f7f7f4] px-6 py-20 text-center">

              <h2 className="text-xl font-bold text-[#043927]">
                Images Coming Soon
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Images for this connectivity
                section will be available soon.
              </p>

            </div>

          ) : (

            /* =================================================
               IMAGE GALLERY
            ================================================= */

            <div className="space-y-8">

              {data.images.map(
                (image, index) => (

                  <div
                    key={image.id}
                    className="relative w-full overflow-hidden rounded-2xl bg-[#f5f5f2]"
                  >

                    <div className="relative min-h-[300px] w-full sm:min-h-[450px] lg:min-h-[650px]">

                      <Image
                        src={image.image_url}
                        alt={
                          image.original_name ||
                          `${data.title} image ${
                            index + 1
                          }`
                        }
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        unoptimized
                        className="object-contain object-center"
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}