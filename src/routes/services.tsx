import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import { Services as ServicesSection } from "@/components/site/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — bluedotImmigration" },
      {
        name: "description",
        content:
          "Study visas, work permits, PR guidance, tourist visas, and documentation support — explore our full range of immigration services.",
      },
      { property: "og:title", content: "Immigration Services — bluedotImmigration" },
      {
        property: "og:description",
        content: "Explore our full range of immigration services tailored to your goals.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageLayout>
      <ServicesSection />
    </PageLayout>
  );
}
