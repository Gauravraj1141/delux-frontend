import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandInfo from "@/components/BrandInfo";
import RightsNotice from "@/components/RightsNotice";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <BrandInfo />
        <RightsNotice />
      </main>
      <Footer />
    </>
  );
}
