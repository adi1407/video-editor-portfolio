import Link from "next/link";
import { EmptyState } from "@/components/shared";
import { buttonClassName, Container } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <Container size="sm" className="py-24">
      <EmptyState
        title="Page not found"
        description="That route does not exist. Head back home or open a feature page from the navigation."
        action={
          <Link href={ROUTES.home} className={buttonClassName()}>
            Go home
          </Link>
        }
      />
    </Container>
  );
}
