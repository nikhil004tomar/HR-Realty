import BulkLandHero from "@/components/bulk-land/BulkLandHero";
import BulkLandIntro from "@/components/bulk-land/BulkLandIntro";
import WhyChooseBulkLand from "@/components/bulk-land/WhyChooseBulkLand";
import PrimeLocations from "@/components/bulk-land/PrimeLocations"
import InquiryForm from "@/components/InquiryForm";
// import OngoingProjects from "@/components/about/OngoingProjects";

export default function BulkLandPage() {
  return (
    <main className="bg-[#043927] text-[#111827]">
      <BulkLandHero />

      <BulkLandIntro />

      <WhyChooseBulkLand />

      <PrimeLocations />

      <InquiryForm />

      {/* <OngoingProjects /> */}
    </main>
  );
}