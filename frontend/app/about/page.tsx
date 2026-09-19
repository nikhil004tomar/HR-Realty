import AboutHero from "@/components/about/AboutHero";
import FoundedSection from "@/components/about/FoundedSection";
import VisionMission from "@/components/about/VisionMission";
import DiscoverFuture from "@/components/about/DiscoverFuture";
import ValuesSection from "@/components/about/ValuesSection";
// import Leadership from "@/components/about/Leadership";
import ContactCTA from "@/components/about/ContactCTA";
import InquiryForm from "@/components/about/InquiryForm";
import OurTeam from "@/components/about/OurTeam";
// import OngoingProjects from "@/components/about/OngoingProjects";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#043927]">
      <AboutHero />
      <FoundedSection />
      <OurTeam />
      <VisionMission />
      <DiscoverFuture />
      <ValuesSection />
      {/* <Leadership /> */}
      <ContactCTA />
      <InquiryForm />
      {/* <OngoingProjects /> */}
    </main>
  );
}