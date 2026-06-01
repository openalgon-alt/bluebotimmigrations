import { useEffect, useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page, use transparent/scrolled logic. On other pages, always use the "scrolled" (solid) style.
  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-hero text-primary-foreground shadow-card">
            <Plane className="h-4 w-4" />
          </span>
          <span className={`font-semibold tracking-tight text-lg ${solid ? "text-foreground" : "text-primary-foreground"}`}>
            bluedot<span className={solid ? "text-gradient-scrolled" : "text-gradient"}>Immigration</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors ${
                location.pathname === l.href
                  ? solid
                    ? "text-primary"
                    : "text-primary-foreground"
                  : solid
                    ? "text-foreground/80 hover:text-primary"
                    : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link to="/schedule">Get Consultation</Link>
          </Button>
        </nav>

        <button
          aria-label="Toggle menu"
          className={`md:hidden ${solid ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  location.pathname === l.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild size="sm">
              <Link to="/schedule" onClick={() => setOpen(false)}>Get Consultation</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
