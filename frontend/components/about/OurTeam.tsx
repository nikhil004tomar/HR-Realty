"use client";

import Image from "next/image";
import { Mail, Phone, Users, RefreshCw } from "lucide-react";
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

  useEffect(() => {
    let mounted = true;

    async function loadTeam() {
      try {
        const data = await getTeamMembers();

        if (!mounted) return;

        setTeamMembers(
          Array.isArray(data)
            ? data.filter((member) => member.is_published)
            : []
        );
      } catch (error) {
        console.error("Failed to load team members:", error);

        if (mounted) {
          setTeamMembers([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTeam();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      aria-labelledby="our-team-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* HEADER */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              className="h-px w-10 bg-[#C9A45C]"
              aria-hidden="true"
            />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#043927]">
              Our Team
            </span>

            <span
              className="h-px w-10 bg-[#C9A45C]"
              aria-hidden="true"
            />
          </div>

          <h2
            id="our-team-heading"
            className="
              text-3xl font-bold leading-tight tracking-tight
              text-[#111111]
              sm:text-4xl
              md:text-5xl
            "
          >
            Meet the{" "}
            <span className="text-[#043927]">People</span>{" "}
            Behind HR Realty
          </h2>

          <div
            className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#C9A45C]"
            aria-hidden="true"
          />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
            Our team works together with a shared vision of delivering
            quality, transparency and long-term value to our clients.
          </p>
        </header>

        {/* LOADING STATE */}
        {loading && (
          <div
            className="flex min-h-[300px] items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div className="text-center">
              <RefreshCw
                size={32}
                className="mx-auto animate-spin text-[#043927] motion-reduce:animate-none"
                aria-hidden="true"
              />

              <p className="mt-4 text-sm text-gray-500">
                Loading our team...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && teamMembers.length === 0 && (
          <div className="mt-12 flex min-h-[250px] items-center justify-center rounded-2xl border border-black/10 bg-gray-50">
            <div className="text-center">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#043927]/5"
                aria-hidden="true"
              >
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

        {/* TEAM GRID */}
        {!loading && teamMembers.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {teamMembers.map((member) => {
              const imageUrl = getImageUrl(member.profile_image);

              return (
                <article
                  key={member.id}
                  className="
                    overflow-hidden rounded-2xl
                    border border-black/10
                    bg-white
                    shadow-[0_6px_25px_rgba(0,0,0,0.05)]
                  "
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#043927]/5">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${member.name}, ${member.designation} at HR Realty International`}
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          25vw
                        "
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full items-center justify-center"
                        aria-label="No profile image available"
                      >
                        <Users
                          size={48}
                          className="text-[#043927]/30"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
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
                    <div
                      className="mt-3 h-px w-10 bg-[#C9A45C]"
                      aria-hidden="true"
                    />

                    {/* BIO */}
                    {member.bio && (
                      <p className="mt-4 text-sm leading-6 text-black/55">
                        {member.bio}
                      </p>
                    )}

                    {/* CONTACT */}
                    {(member.linkedin_url ||
                      member.email ||
                      member.phone) && (
                      <div className="mt-5 flex items-center gap-2">
                        {/* LINKEDIN */}
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="
                              flex h-9 w-9 items-center justify-center
                              rounded-full border border-black/10
                              text-[#043927]
                              transition-colors duration-200
                              hover:border-[#043927]
                              hover:bg-[#043927]
                              hover:text-white
                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-[#C9A45C]
                              focus-visible:ring-offset-2
                              motion-reduce:transition-none
                            "
                          >
                            <span
                              className="text-xs font-bold leading-none"
                              aria-hidden="true"
                            >
                              in
                            </span>
                          </a>
                        )}

                        {/* EMAIL */}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="
                              flex h-9 w-9 items-center justify-center
                              rounded-full border border-black/10
                              text-[#043927]
                              transition-colors duration-200
                              hover:border-[#043927]
                              hover:bg-[#043927]
                              hover:text-white
                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-[#C9A45C]
                              focus-visible:ring-offset-2
                              motion-reduce:transition-none
                            "
                          >
                            <Mail
                              size={16}
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {/* PHONE */}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            aria-label={`Call ${member.name}`}
                            className="
                              flex h-9 w-9 items-center justify-center
                              rounded-full border border-black/10
                              text-[#043927]
                              transition-colors duration-200
                              hover:border-[#043927]
                              hover:bg-[#043927]
                              hover:text-white
                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-[#C9A45C]
                              focus-visible:ring-offset-2
                              motion-reduce:transition-none
                            "
                          >
                            <Phone
                              size={16}
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}