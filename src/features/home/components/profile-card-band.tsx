"use client";

import { useRouter } from "next/navigation";
import ProfileCard from "@/components/ui/ProfileCard";
import { Container } from "@/components/ui";
import { profile } from "@/features/home/content";

export function ProfileCardBand() {
  const router = useRouter();

  return (
    <section
      aria-label="Profile card"
      className="border-y border-border bg-background py-16 sm:py-20"
    >
      <Container className="flex justify-center">
        <ProfileCard
          name={profile.name}
          title={profile.shortRole}
          handle="rajujha"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/lanyard/raju.jpeg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => {
            console.log("Contact clicked");
            router.push("/contact");
          }}
          iconUrl="/assets/demo/iconpattern.png"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
      </Container>
    </section>
  );
}
