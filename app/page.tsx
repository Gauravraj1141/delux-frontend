import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FullscreenButton from "@/components/FullscreenButton";
import BrandInfo from "@/components/BrandInfo";
import Rotations from "@/components/Rotations";
import RightsNotice from "@/components/RightsNotice";
import Footer from "@/components/Footer";
import { PlaylistProvider } from "@/components/radio/PlaylistContext";

export default function Home() {
  return (
    <PlaylistProvider>
      <Header />
      <FullscreenButton />
      <main className="flex-1">
        <Hero />
        <BrandInfo />
        <Rotations />
        <RightsNotice />
      </main>
      <Footer />
    </PlaylistProvider>
  );
}
