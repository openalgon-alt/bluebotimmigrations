import { Plane, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary-foreground/10">
                <Plane className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-wide">bluedotImmigration</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              Expert guidance for visas, study abroad, work permits, and permanent residency worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground transition-colors">Services</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary-foreground transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-primary-foreground/50" />
                <span>Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary-foreground/50" />
                <span>+91 7075509602</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary-foreground/50" />
                <span>hello@bluedotimmigration.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} bluedotImmigration. All rights reserved. | Developed by <a href="https://openalgon.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors underline">OpenAlgon</a>
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
