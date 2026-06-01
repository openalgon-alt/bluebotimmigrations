import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import { Contact as ContactSection } from "@/components/site/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — bluedotImmigration" },
      {
        name: "description",
        content:
          "Get in touch with our licensed immigration consultants. We respond within 24 hours.",
      },
      { property: "og:title", content: "Contact — bluedotImmigration" },
      {
        property: "og:description",
        content: "Reach out to plan your move abroad with expert guidance from bluedotImmigration.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageLayout>
      <ContactSection />
    </PageLayout>
  );
}
