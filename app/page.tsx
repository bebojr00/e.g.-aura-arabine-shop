import Hero from "@/components/home/hero";
import BestSellers from "@/components/home/best-sellers";
import CollectionsPreview from "@/components/home/collections-preview";
import GiftSetsPreview from "@/components/home/gift-sets-preview";
import WhyChooseUs from "@/components/home/why-choose-us";
import Testimonials from "@/components/home/testimonials";
import InstagramGallery from "@/components/home/instagram-gallery";
import LimitedEditionBanner from "@/components/home/limited-edition-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <CollectionsPreview />
      <LimitedEditionBanner />
      <GiftSetsPreview />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
    </>
  );
}
