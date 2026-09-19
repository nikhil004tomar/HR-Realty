
import PillNav from "@/components/PillNav";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import OurProjects from "@/components/OurProjects";
// import FourthSection from "@/components/SmartCitySection";
 import Testimonials from "@/components/Testimonials";
// import TrustAndGrowth from "@/components/TrustAndGrowth";
import FAQSection from "@/components/FAQSection";
import InquiryForm from "@/components/InquiryForm";
import DholeraSIRMap from "@/components/DholeraSIRMap";
//import FeedbackSection from "@/components/FeedbackSection";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#043927]">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <PillNav
        items={[
          {
            label: "Home",
            href: "/",
          },

           {
            label: "About-us",
            href: "/about",
          },

          {
            label: "Bulk Land",
            href: "/bulk-land",
          },

          {
            label: "Dholera SIR",
            href: "/dholera-sir",
            children: [
              {
                label: "Connectivity",
                href: "/dholera-sir/connectivity",
              },
              {
                label: "About Dholera SIR",
                href: "/dholera-sir/projects",
              },
              {
                label: "Running & Completed Projects",
                href: "/dholera-sir/running-completed-projects",
              },
              {
                label: "DMIC",
                href: "/dholera-sir/dmic",
              },
              {
                label: "DFC",
                href: "/dholera-sir/dfc",
              },
              {
                label: "GIDB",
                href: "/dholera-sir/gidb",
              },
              {
                label: "DRDA",
                href: "/dholera-sir/drda",
              },
              {
                label: "Maps",
                href: "/dholera-sir/maps",
              },
            ],
          },

          {
            label: "Projects",
            href: "/projects",
          },

          {
            label: "Sell Your Property",
            href: "/sell-your-property",
          },

          {
            label: "Contact Us",
            href: "/contact",
            children: [
              {
                label: "Careers",
                href: "/careers",
              },
            ],
          },
        ]}
        activeHref="/"
        ease="power2.out"
        baseColor="#043927"
        pillColor="transparent"
        pillTextColor="#FFFFFF"
        hoveredPillTextColor="#C9A45C"
        initialLoadAnimation
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero />
      <DholeraSIRMap />

      {/* =====================================================
          OUR PROJECTS
      ===================================================== */}

      <OurProjects />

      {/* =====================================================
          PROJECT SECTION
      <FeedbackSection />
      ===================================================== */}
      <ProjectSection />


      {/* =====================================================
          FUTURE SECTIONS
      ===================================================== */}

      {/* <FourthSection /> */}
       <Testimonials /> 
      {/* <TrustAndGrowth /> */}

      {/* =====================================================
          FAQ
      ===================================================== */}
      <FAQSection />


      {/* =====================================================
          INQUIRY
      ===================================================== */}

      <InquiryForm />

    </main>
  );
}
