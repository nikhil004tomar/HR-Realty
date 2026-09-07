import ChannelPartnerHero from "@/components/channel-partners/ChannelPartnerHero"
import ChannelPartnerIntro from "@/components/channel-partners/ChannelPartnerIntro"
import WhyJoinUs from "@/components/channel-partners/WhyJoinUs"
import WhoCanJoin from "@/components/channel-partners/WhoCanJoin"
import ChannelPartnerForm from "@/components/channel-partners/ChannelPartnerForm"

export default function ChannelPartnerPage() {
  return (
    <main className="min-h-screen bg-[#043927]">
      <ChannelPartnerHero />

      <ChannelPartnerIntro />

      <WhyJoinUs />

      <WhoCanJoin />

      <ChannelPartnerForm />
    </main>
  );
}