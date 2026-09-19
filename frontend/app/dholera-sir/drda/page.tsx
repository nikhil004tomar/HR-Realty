import DRDA from "@/components/dholera/DRDA";
import InquiryForm from "@/components/about/InquiryForm";

export default function DRDAPage() {
  return (
    <>
      <DRDA />
      <section id="inquiry-form" className="scroll-mt-24">
        <InquiryForm />
      </section>
    </>
  );
}