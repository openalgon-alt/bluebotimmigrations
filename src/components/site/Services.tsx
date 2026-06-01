import { Globe, MapPin, Landmark } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "New Zealand — AEWV Process",
    country: "New Zealand",
    desc: "Complete assistance with the Accredited Employer Work Visa (AEWV) process. We guide you from employer accreditation verification and job check approval through to visa application, documentation, and post-approval settlement support.",
    highlights: [
      "Employer accreditation check",
      "Job check & token submission",
      "Visa application & documentation",
      "Post-arrival settlement guidance",
    ],
  },
  {
    icon: MapPin,
    title: "Canada — Provincial Nominee Program",
    country: "Canada",
    desc: "Expert guidance through Canada's Provincial Nominee Program (PNP). We help you identify the right province, prepare your Expression of Interest, and navigate nomination to permanent residency with a streamlined process.",
    highlights: [
      "Province & stream selection",
      "Expression of Interest (EOI)",
      "Provincial nomination support",
      "PR application filing",
    ],
  },
  {
    icon: Landmark,
    title: "Europe — D-Type Visa",
    country: "Europe",
    desc: "End-to-end support for European D-Type (long-stay) national visas. Whether it's for work, study, or family reunion across Schengen and EU countries, we handle documentation, embassy appointments, and follow-ups.",
    highlights: [
      "Country-specific requirements",
      "Document preparation & legalization",
      "Embassy appointment booking",
      "Visa interview preparation",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Immigration solutions, tailored to you
          </h2>
          <p className="mt-4 text-muted-foreground">
            From your first consultation to landing in your new country, we
            handle every step with clarity and care.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-hero text-primary-foreground shadow-card group-hover:scale-110 transition-transform">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {s.country}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
              <ul className="mt-5 space-y-2">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary shrink-0">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <span className="absolute top-6 right-6 text-xs font-mono text-muted-foreground/40 hidden">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
