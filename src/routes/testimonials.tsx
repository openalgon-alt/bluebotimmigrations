import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import { Testimonials as TestimonialsSection } from "@/components/site/Testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials — bluedotImmigration" },
      {
        name: "description",
        content:
          "Read real reviews from clients who successfully moved abroad with bluedotImmigration's expert guidance.",
      },
      { property: "og:title", content: "Testimonials — bluedotImmigration" },
      {
        property: "og:description",
        content: "Trusted by thousands of clients worldwide for visa and immigration services.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <PageLayout>
      <TestimonialsSection />
    </PageLayout>
  );
}
