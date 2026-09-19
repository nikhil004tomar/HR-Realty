"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  Users,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getImageUrl,
  getTeamMembers,
} from "@/lib/team";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio: string | null;
  profile_image: string | null;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // LOAD TEAM MEMBERS FROM BACKEND
  // ==========================================================

  useEffect(() => {
    async function loadTeam() {
      try {
        setLoading(true);

        const data = await getTeamMembers();

        setTeamMembers(
          Array.isArray(data)
            ? data.filter(
                (member) => member.is_published
              )
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load team members:",
          error
        );

        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    }

    loadTeam();
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-[#C9A45C]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Our Team
            </span>

            <span className="h-px w-10 bg-[#C9A45C]" />

          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
            Meet the{" "}
            <span className="text-[#043927]">
              People
            </span>{" "}
            Behind HR Realty
          </h2>

          <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#C9A45C]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
            Our experienced team works together with a shared
            vision of delivering quality, transparency and
            long-term value to our clients.
          </p>

        </div>

        {/* ==================================================
            LOADING STATE
        ================================================== */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <RefreshCw
                size={32}
                className="mx-auto animate-spin text-[#043927]"
              />

              <p className="mt-4 text-sm text-gray-500">
                Loading our team...
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {!loading && teamMembers.length === 0 && (
          <div className="mt-12 flex min-h-[250px] items-center justify-center rounded-2xl border border-black/10 bg-gray-50">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#043927]/5">

                <Users
                  size={28}
                  className="text-[#043927]"
                />

              </div>

              <p className="mt-4 text-sm font-medium text-gray-700">
                Our team information will be available soon.
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            TEAM GRID
        ================================================== */}

        {!loading && teamMembers.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">

            {teamMembers.map((member) => {

              const imageUrl = getImageUrl(
                member.profile_image
              );

              return (
                <div
                  key={member.id}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-black/10
                    bg-white
                    shadow-[0_6px_25px_rgba(0,0,0,0.05)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A45C]/60
                    hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)]
                  "
                >

                  {/* =========================================
                      IMAGE
                  ========================================== */}

                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#043927]/5">

                    <Image
                      src={imageUrl}
                      alt={`${member.name} - ${member.designation}`}
                      fill
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        25vw
                      "
                      unoptimized
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-[1.03]
                      "
                    />

                    {/* Bottom overlay */}

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-24
                        bg-gradient-to-t
                        from-black/40
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                  </div>

                  {/* =========================================
                      CONTENT
                  ========================================== */}

                  <div className="p-5">

                    {/* DESIGNATION */}

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A45C]">
                      {member.designation}
                    </p>

                    {/* NAME */}

                    <h3 className="mt-2 text-xl font-bold text-[#111111]">
                      {member.name}
                    </h3>

                    {/* GOLD LINE */}

                    <div className="mt-3 h-px w-10 bg-[#C9A45C] transition-all duration-300 group-hover:w-16" />

                    {/* BIO */}

                    {member.bio && (
                      <p className="mt-4 text-sm leading-6 text-black/55">
                        {member.bio}
                      </p>
                    )}

                    {/* =========================================
                        SOCIAL / CONTACT
                    ========================================== */}

                    <div className="mt-5 flex items-center gap-2">

                      {/* =====================================
                          LINKEDIN
                      ====================================== */}

                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/10
                            text-[#043927]
                            transition-all
                            duration-200
                            hover:border-[#043927]
                            hover:bg-[#043927]
                            hover:text-white
                          "
                        >
                          <span className="text-xs font-bold leading-none">
                            in
                          </span>
                        </a>
                      )}

                      {/* =====================================
                          EMAIL
                      ====================================== */}

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/10
                            text-[#043927]
                            transition-all
                            duration-200
                            hover:border-[#043927]
                            hover:bg-[#043927]
                            hover:text-white
                          "
                        >
                          <Mail size={16} />
                        </a>
                      )}

                      {/* =====================================
                          PHONE
                      ====================================== */}

                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          aria-label={`Call ${member.name}`}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/10
                            text-[#043927]
                            transition-all
                            duration-200
                            hover:border-[#043927]
                            hover:bg-[#043927]
                            hover:text-white
                          "
                        >
                          <Phone size={16} />
                        </a>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}