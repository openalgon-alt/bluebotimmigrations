import heroImg from "@/assets/hero-airport.jpg";
import { ShieldCheck, Globe, Plane, Map, Search, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const backgrounds = [
  heroImg,
  "/hero_bg_1.png",
  "/hero_bg_2.png",
  "/hero_bg_3.png",
  "/hero_bg_4.png"
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden [perspective:1200px] pt-16"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 h-full w-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentBg}
            src={backgrounds[currentBg]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            alt="Travelers and global opportunities"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/75 to-primary/30" />
      </motion.div>

      <div className="relative container mx-auto px-4 py-20 text-primary-foreground flex justify-center mt-4">
        <motion.div style={{ rotateX, scale }} className="max-w-4xl text-center transform-gpu flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <ShieldCheck className="h-4 w-4 text-blue-300" />
              Licensed Global Immigration Experts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
          >
            Your Trusted Partner for{" "}
            <span className="bg-gradient-to-r from-blue-100 via-white to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] block mt-2">
              Global Immigration
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-blue-50/90 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Expert guidance for visas, study abroad, work permits, and permanent residency. We turn
            complex paperwork into clear, confident next steps.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-8"
          >
            <Button asChild size="lg" className="rounded-full h-12 px-6 text-base font-bold bg-white text-primary hover:bg-blue-50 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all hover:scale-105 active:scale-95 group">
              <Link to="/schedule">
                <Calendar className="mr-2 h-4 w-4 group-hover:-rotate-12 transition-transform" /> Book Free Consultation
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-8 bg-white/10 backdrop-blur-2xl border border-white/20 p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 w-full max-w-2xl"
          >
            <select className="flex-1 w-full h-12 bg-white/10 border border-white/20 rounded-xl md:rounded-full px-5 text-white placeholder-white/70 outline-none focus:bg-white/20 transition-colors appearance-none cursor-pointer">
              <option value="" disabled selected hidden>Destination Country</option>
              <option value="ca" className="text-gray-900">Canada</option>
              <option value="nz" className="text-gray-900">New Zealand</option>
              <option value="eu" className="text-gray-900">Europe</option>
              <option value="il" className="text-gray-900">Israel</option>
              <option value="us" className="text-gray-900">United States</option>
            </select>
            <select className="flex-1 w-full h-12 bg-white/10 border border-white/20 rounded-xl md:rounded-full px-5 text-white placeholder-white/70 outline-none focus:bg-white/20 transition-colors appearance-none cursor-pointer">
              <option value="" disabled selected hidden>Visa Type</option>
              <option value="study" className="text-gray-900">Study Visa</option>
              <option value="work" className="text-gray-900">Work Permit</option>
              <option value="pr" className="text-gray-900">Permanent Residency</option>
              <option value="tourist" className="text-gray-900">Tourist Visa</option>
            </select>
            <Button asChild size="lg" className="w-full md:w-auto h-12 rounded-xl md:rounded-full px-8 bg-blue-500 hover:bg-blue-400 text-white shadow-lg">
              <Link to="/services">
                <Search className="mr-2 h-4 w-4" /> Find Options
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl w-full mx-auto"
          >
            {[
              "Study Abroad",
              "New Zealand — AEWV Process",
              "Canada — Provincial Nominee Program",
              "Europe — D-Type Visa",
              "Israel — B1 Visa",
              "USA — Cap-Exempt H-1B Visa"
            ].map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/services" className="bg-white text-primary rounded-xl px-4 py-3 shadow-lg hover:shadow-2xl font-bold text-sm flex items-center justify-between group transition-all duration-300 border border-transparent hover:border-blue-200">
                  <span className="group-hover:text-blue-600 transition-colors">{service}</span>
                  <ShieldCheck className="h-4 w-4 text-primary/40 group-hover:text-blue-500 group-hover:scale-125 transition-all duration-300 shrink-0" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
