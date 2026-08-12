import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandInfo from "@/components/BrandInfo";
import Rotations from "@/components/Rotations";
import MusicLinks from "@/components/MusicLinks";
import RightsNotice from "@/components/RightsNotice";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <BrandInfo />
        <Rotations />
        <MusicLinks />
        <RightsNotice />
      </main>
      <Footer />
    </>
  );
}
