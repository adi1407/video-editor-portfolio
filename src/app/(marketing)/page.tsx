import {
  AboutBand,
  ExperienceBand,
  FeatureGrid,
  Hero,
  HomeCtaBand,
  LogoBand,
  PressureBand,
  SelectedWorkBand,
} from "@/features/home";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  description:
    "Raju Jha — Video Editor and Visual Designer crafting stories through motion, design, and creativity.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorkBand />
      <FeatureGrid />
      <LogoBand />
      <PressureBand />
      <AboutBand />
      <ExperienceBand />
      <HomeCtaBand />
    </>
  );
}
