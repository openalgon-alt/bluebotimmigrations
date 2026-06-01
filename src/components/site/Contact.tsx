import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const { error } = await supabase.from("enquiries").insert([data]);
      if (error) throw error;
      
      toast.success("Inquiry sent! Our team will reach out within 24 hours.");
      form.reset();
    } catch (error) {
      toast.error("Failed to send inquiry. Please check your connection and try again.");
      console.error("Supabase submission error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Contact
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Let's plan your move abroad
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us about your goals — we'll get back within 24 hours with a clear next step.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-8 shadow-elegant">
              <h3 className="text-xl font-semibold">Get in touch</h3>
              <p className="mt-2 text-primary-foreground/85 text-sm">
                We respond to every inquiry personally.
              </p>
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs uppercase text-primary-foreground/70">Email</div>
                    <a href="mailto:hello@bluedotimmigration.com" className="text-sm font-medium">
                      hello@bluedotimmigration.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs uppercase text-primary-foreground/70">Phone</div>
                    <a href="tel:+917075509602" className="text-sm font-medium">
                      +91 7075509602
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs uppercase text-primary-foreground/70">Office</div>
                    <div className="text-sm font-medium">
                      Hyderabad, India
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="text-sm font-semibold text-foreground">Office hours</div>
              <div className="mt-2 text-sm text-muted-foreground">Mon — Fri · 9:00 AM – 6:00 PM</div>
              <div className="text-sm text-muted-foreground">Sat · 10:00 AM – 2:00 PM</div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-8 shadow-card space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="jane@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your immigration goals…"
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
              <Send className="h-4 w-4" />
              {loading ? "Sending…" : "Send Inquiry"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
