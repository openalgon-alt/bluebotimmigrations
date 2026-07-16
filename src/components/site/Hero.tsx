import heroImg from "@/assets/hero-airport.jpg";
import { ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  // Define services with their respective routes to keep button styling uniform
  const services = [
    { name: "Study Abroad", path: "/study-abroad" },
    { name: "New Zealand — AEWV Process", path: "/services" },
    { name: "Canada — Provincial Nominee Program", path: "/services" },
    { name: "Europe — D-Type Visa", path: "/services" },
    { name: "Israel — B1 Visa", path: "/services" },
    { name: "USA — Cap-Exempt H-1B Visa", path: "/services" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Travelers walking through a modern international airport at sunset"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />

      <div className="relative container mx-auto px-6 py-32 text-primary-foreground flex justify-center">
        <div className="max-w-3xl animate-fade-up text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur px-4 py-1.5 text-xs font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            Licensed Immigration Consultancy
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
            Your Trusted Partner for{" "}
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Global Immigration
            </span>{" "}
            Solutions
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-2xl">
            Expert guidance for visas, study abroad, work permits, and permanent
            residency — backed by a team that turns complex paperwork into clear,
            confident next steps.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col gap-2 sm:gap-3 sm:max-w-md w-full mx-auto">
            {services.map((service) => (
              <Link 
                key={service.name} 
                to={service.path} 
                className="bg-primary-foreground text-primary rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-md hover:shadow-lg font-semibold text-sm sm:text-base flex items-center justify-between group transition-all hover:-translate-y-0.5"
              >
                <span>{service.name}</span>
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}