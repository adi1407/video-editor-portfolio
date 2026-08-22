"use client";

import { usePathname } from "next/navigation";
import PillNav from "@/components/ui/PillNav";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import { useMediaQuery, useMounted } from "@/hooks";
import { ROUTES } from "@/lib/constants";

const pillItems = [
  { label: "Home", href: ROUTES.home },
  { label: "Work", href: ROUTES.work },
  { label: "Experience", href: ROUTES.experience },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: ROUTES.home },
  { label: "Work", ariaLabel: "View selected work", link: ROUTES.work },
  { label: "Experience", ariaLabel: "Experience", link: ROUTES.experience },
  { label: "About", ariaLabel: "About Raju", link: ROUTES.about },
  { label: "Contact", ariaLabel: "Get in touch", link: ROUTES.contact },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export function Header() {
  const pathname = usePathname();
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!mounted) {
    return <div className="pointer-events-none sticky top-0 z-50 h-0" aria-hidden />;
  }

  if (isDesktop) {
    return (
      <header className="pointer-events-none sticky top-0 z-50 h-0">
        <div className="pointer-events-auto">
          <PillNav
            logo="/logo.svg"
            logoAlt="Rjha Logo"
            items={pillItems}
            activeHref={pathname}
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="#000000"
            pillColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
          />
        </div>
      </header>
    );
  }

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      menuButtonColor="#fff"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen
      colors={["#B497CF", "#5227FF"]}
      logoUrl="/logo.svg"
      accentColor="#ff6b6b"
      isFixed
    />
  );
}
