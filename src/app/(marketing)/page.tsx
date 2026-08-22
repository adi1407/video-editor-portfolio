import {
  AboutBand,
  ContactBand,
  DriftWallBand,
  ExpandBand,
  ExperienceBand,
  FeatureGrid,
  Hero,
  LogoBand,
  MarqueeBand,
  OrbBand,
  PressureBand,
  StatsBand,
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
      <LogoBand />
      <ExpandBand />
      <DriftWallBand />
      <FeatureGrid />
      <OrbBand />
      <PressureBand />
      <ExperienceBand />
      <StatsBand />
      <AboutBand />
      <MarqueeBand />
      <ContactBand />
    </>
  );
}
