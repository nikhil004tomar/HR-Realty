import DholeraSIR from "@/components/dholera/DholeraSIR";
import InquiryForm from "@/components/about/InquiryForm";

export default function DholeraSIRPage() {
  return (
    <>
      <DholeraSIR />

      <section id="inquiry-form" className="scroll-mt-24">
        <InquiryForm />
      </section>
    </>
  );
}