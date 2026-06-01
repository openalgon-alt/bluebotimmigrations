import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import { ConsultationForm } from "@/components/site/ConsultationForm";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule Your Consultation — bluedotImmigration" },
      {
        name: "description",
        content:
          "Book an expert immigration consultation. Expert guidance for work, study, PR, and more.",
      },
      { property: "og:title", content: "Schedule Consultation — bluedotImmigration" },
      {
        property: "og:description",
        content: "Expert immigration consultation for global opportunities.",
      },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <PageLayout>
      <ConsultationForm />
    </PageLayout>
  );
}
