import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import ScrollProgress from "../components/ScrollProgress";
import Hero from "../components/Hero";
import WelcomeSection from "../components/WelcomeSection";
import StaySection from "../components/StaySection";
import RoomFeature from "../components/RoomFeature";
import ExperiencesSection from "../components/ExperiencesSection";
import FeatureExperience from "../components/FeatureExperience";
import DiningSection from "../components/DiningSection";
import WellnessSection from "../components/WellnessSection";
import StorySection from "../components/StorySection";
import StatsSection from "../components/StatsSection";
import GalleryGrid from "../components/GalleryGrid";
import OffersSection from "../components/OffersSection";
import LocationSection from "../components/LocationSection";
import FAQAccordion from "../components/FAQAccordion";
import BookingSection from "../components/BookingSection";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import PolicyPage from "../components/PolicyPage";
import Preloader from "../components/Preloader";
import { policies } from "../data/policies";

export default function Home() {
  const [presetRoom, setPresetRoom] = useState("");
  const [policy, setPolicy] = useState(null);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        <StaySection onBookRoom={setPresetRoom} />
        <RoomFeature />
        <ExperiencesSection />
        <FeatureExperience />
        <DiningSection />
        <WellnessSection />
        <StorySection />
        <StatsSection />
        <GalleryGrid />
        <OffersSection />
        <LocationSection />
        <FAQAccordion />
        <BookingSection presetRoom={presetRoom} />
        <Newsletter />
      </main>
      <Footer onOpenPolicy={setPolicy} />

      <AnimatePresence>
        {policy && (
          <PolicyPage key={policy} policy={policies[policy]} onClose={() => setPolicy(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
