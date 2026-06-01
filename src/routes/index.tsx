import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SchedulePopup } from "@/components/site/SchedulePopup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "bluedotImmigration — Trusted Global Immigration Consultancy" },
      {
        name: "description",
        content:
          "Expert visa, study abroad, work permit, and PR guidance from licensed immigration consultants. Plan your move with bluedotImmigration.",
      },
      { property: "og:title", content: "bluedotImmigration — Global Immigration Solutions" },
      {
        property: "og:description",
        content: "Licensed immigration consultancy for study, work, tourist, and PR visas worldwide.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <section className="bg-gradient-to-b from-transparent via-white/80 to-white pt-32 pb-16 md:pb-20 relative z-10 -mt-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Testimonials
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
                Success Stories
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
              <Link to="/testimonials" className="flex flex-col gap-4 md:gap-5 bg-primary text-primary-foreground rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(12,42,92,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(12,42,92,0.5)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
                <div className="relative w-full h-48 md:h-64 bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-inner">
                  <img 
                    src="/us-visa-dasari.png" 
                    alt="US B1/B2 Visa Approved" 
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm border border-border/50">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex text-yellow-400 text-sm md:text-base mb-2 gap-0.5">
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <p className="text-sm text-center text-primary-foreground/90 italic font-medium leading-snug max-w-sm">
                    "Got my US B1/B2 Visa approved effortlessly! Huge thanks to the expert team for their guidance."
                  </p>
                  <p className="text-xs text-center font-semibold text-primary-foreground/70 mt-3 tracking-wide uppercase group-hover:text-primary-foreground transition-colors">
                    Dasari Shashikanth — US B1/B2 Visa
                  </p>
                </div>
              </Link>
              
              <Link to="/testimonials" className="flex flex-col gap-4 md:gap-5 bg-primary text-primary-foreground rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(12,42,92,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(12,42,92,0.5)] hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
                <div className="relative w-full h-48 md:h-64 bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-inner">
                  <img 
                    src="/nz-evisa-sampath.png" 
                    alt="New Zealand e-Visa Approved" 
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm border border-border/50">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex text-yellow-400 text-sm md:text-base mb-2 gap-0.5">
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <p className="text-sm text-center text-primary-foreground/90 italic font-medium leading-snug max-w-sm">
                    "Approved effortlessly! Thank you for the seamless visa process."
                  </p>
                  <p className="text-xs text-center font-semibold text-primary-foreground/70 mt-3 tracking-wide uppercase group-hover:text-primary-foreground transition-colors">
                    Sampath Edunoori — New Zealand e-Visa
                  </p>
                </div>
              </Link>
            </div>
            <div className="mt-12 flex justify-center">
              <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all group bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                <Link to="/testimonials">
                  View More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SchedulePopup />
      <Toaster richColors position="top-center" />
    </div>
  );
}
