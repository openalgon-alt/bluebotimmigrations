import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Timeline } from "@/components/site/Timeline";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SchedulePopup } from "@/components/site/SchedulePopup";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
        content:
          "Licensed immigration consultancy for study, work, tourist, and PR visas worldwide.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Timeline />

        {/* Testimonials 3D Section */}
        <section
          ref={containerRef}
          className="bg-gradient-to-b from-[#f0f4f8] via-white to-white pt-32 pb-24 md:pb-32 relative z-10 -mt-20 overflow-hidden [perspective:1200px]"
        >
          {/* Decorative background blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] bg-blue-100 px-4 py-2 rounded-full">
                Testimonials
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Success Stories
              </h2>
            </motion.div>

            <motion.div
              style={{ rotateX }}
              className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto transform-gpu items-stretch"
            >
              {/* Testimonial Card 1 */}
              <Link to="/testimonials">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -5,
                    boxShadow: "0 30px 60px -12px rgba(12,42,92,0.3)",
                  }}
                  className="relative flex flex-col gap-6 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(12,42,92,0.1)] cursor-pointer group transition-all duration-300 transform-gpu h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative w-full h-56 md:h-72 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group-hover:border-blue-200 transition-colors shadow-inner">
                    <img
                      src="/visa-photo.jpg"
                      alt="US B1/B2 Visa Approved"
                      className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm border border-gray-100">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-center relative z-10">
                    <div className="flex text-yellow-400 mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-center text-gray-700 italic font-medium leading-relaxed max-w-sm">
                      "Got my US B1/B2 Visa approved effortlessly! Huge thanks to the expert team
                      for their guidance."
                    </p>
                    <p className="text-sm text-center font-bold text-primary mt-6 tracking-wide uppercase">
                      Dasari Shashikanth — US B1/B2 Visa
                    </p>
                  </div>
                </motion.div>
              </Link>

              <Link to="/testimonials">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateY: -5,
                    rotateX: -5,
                    boxShadow: "0 30px 60px -12px rgba(12,42,92,0.3)",
                  }}
                  className="relative flex flex-col gap-6 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(12,42,92,0.1)] cursor-pointer group transition-all duration-300 transform-gpu h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative w-full h-56 md:h-72 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group-hover:border-blue-200 transition-colors shadow-inner">
                    <img
                      src="/nz-evisa-sampath.png"
                      alt="New Zealand e-Visa Approved"
                      className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm border border-gray-100">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col items-center relative z-10">
                    <div className="flex text-yellow-400 mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-center text-gray-700 italic font-medium leading-relaxed max-w-sm">
                      "Approved effortlessly! Thank you for the seamless visa process."
                    </p>
                    <p className="text-sm text-center font-bold text-primary mt-6 tracking-wide uppercase">
                      Sampath Edunoori — New Zealand e-Visa
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 flex justify-center"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg"
              >
                <Link to="/testimonials">
                  View More{" "}
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <SchedulePopup />
      <Toaster richColors position="top-center" />
    </div>
  );
}
