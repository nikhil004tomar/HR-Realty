import PillNav from "@/components/PillNav";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import OurProjects from "@/components/OurProjects";
// import FourthSection from "@/components/SmartCitySection";
// import Testimonials from "@/components/Testimonials";
// import TrustAndGrowth from "@/components/TrustAndGrowth";
import FAQSection from "@/components/FAQSection";
import InquiryForm from "@/components/InquiryForm";
export default function Page() {
  return (
    <main className="min-h-screen bg-[#043927]">
      <PillNav
        // logo="/logo.svg"
        // logoAlt="Company Logo"
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our Projects", href: "/projects" },
          // { label: "Bulk Land", href: "/bulk-land" },
          { label: "Channel Partners", href: "/channel-partners" },
          { label: "Contact", href: "#contact" },
        ]}
        activeHref="/"
        ease="power2.out"
        pillColor="#ffffff"
        pillTextColor="#111111"
        hoveredPillTextColor="#ffffff"
        initialLoadAnimation
      />

      <Hero/>
      <OurProjects/>
      <ProjectSection/>
     {/* <FourthSection/> */}
      {/* <Testimonials/> */}
      {/* <TrustAndGrowth/> */}
      <FAQSection/>
      <InquiryForm/>

    </main>
  );
}