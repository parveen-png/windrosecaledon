import { Footer } from "@/components/Footer";
import { Header, MobileStickyCta } from "@/components/Header";
import {
  BuyerSupport,
  Builders,
  DirectAnswer,
  Faq,
  FinalCta,
  Hero,
  HomeTypes,
  Location,
  Pricing,
  Snapshot,
  WhyRegister,
} from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <div id="top" />
        <Hero />
        <DirectAnswer />
        <Snapshot />
        <WhyRegister />
        <HomeTypes />
        <Pricing />
        <Location />
        <Builders />
        <BuyerSupport />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
