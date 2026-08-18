import Hero from "@/components/Hero";
import FullscreenButton from "@/components/FullscreenButton";
import BrandInfo from "@/components/BrandInfo";
import Rotations from "@/components/Rotations";
import BlogPreview from "@/components/BlogPreview";
import RightsNotice from "@/components/RightsNotice";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FullscreenButton />
      <main className="flex-1">
        <Hero />
        <BrandInfo />
        <Rotations />
        <BlogPreview />
        <RightsNotice />
      </main>
      <Footer />
    </>
  );
}
