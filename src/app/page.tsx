import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { WhyJoinSection } from "@/sections/WhyJoinSection";
import { ActivitiesSection } from "@/sections/ActivitiesSection";
import { CampaignSection } from "@/sections/CampaignSection";
import { TargetSection } from "@/sections/TargetSection";
import { RegistrationSection } from "@/sections/RegistrationSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhyJoinSection />
      <ActivitiesSection />
      <CampaignSection />
      <TargetSection />
      <RegistrationSection />
    </>
  );
}
