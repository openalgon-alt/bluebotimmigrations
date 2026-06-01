import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-bg">
      {/* Animated floating gradient orbs */}
      <div className="page-bg-orbs">
        <div className="page-bg-orb page-bg-orb--1" />
        <div className="page-bg-orb page-bg-orb--2" />
        <div className="page-bg-orb page-bg-orb--3" />
      </div>

      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  );
}
