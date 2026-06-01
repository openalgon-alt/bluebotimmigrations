import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import { useState, useEffect, useRef } from "react";
import { User, Target, MapPin, GraduationCap, Briefcase, CalendarCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    consultation_type: "",
    destination: "",
    qualification: "",
    field_of_study: "",
    employment_status: "",
    job_title: "",
    industry: "",
    experience_years: "",
    goal_description: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Re-init Calendly with prefilled data after form submit
  useEffect(() => {
    if (submitted && calendlyRef.current && (window as any).Calendly) {
      calendlyRef.current.innerHTML = "";
      (window as any).Calendly.initInlineWidget({
        url: "https://calendly.com/bluedotimmigrations2000/30min?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1",
        parentElement: calendlyRef.current,
        prefill: { name: form.full_name, email: form.email },
      });
      calendlyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert([form]);
      if (error) {
        toast.error("Something went wrong. Please try again.");
        return;
      }
      toast.success("Details saved! Now pick your appointment time below.");
      setSubmitted(true);
    } catch {
      toast.error("Could not connect. Please check your internet.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Schedule Your Immigration Consultation
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Fill out your details and book a convenient time to meet our experts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1 — Personal Information */}
              <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><User className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input id="full_name" required value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="John Doe" className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@example.com" className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Current City *</Label>
                    <Input id="city" required value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Hyderabad" className="rounded-xl h-12" />
                  </div>
                </div>
              </section>

              {/* 2 — Consultation Type & Destination */}
              <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Target className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-foreground">Service & Destination</h2>
                </div>
                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Select the service you need: *</p>
                    <RadioGroup value={form.consultation_type} onValueChange={(v) => set("consultation_type", v)} required className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Work Visa Consultation",
                        "Job Assistance Abroad",
                        "Permanent Residency (PR)",
                        "Study Visa",
                        "Visit Visa",
                        "Dependent Visa",
                        "Immigration Eligibility Check",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-3 bg-secondary/30 p-3.5 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                          <RadioGroupItem value={type} id={`ct-${type}`} />
                          <Label htmlFor={`ct-${type}`} className="cursor-pointer font-medium text-sm">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <Label>Target Country *</Label>
                    </div>
                    <Input required value={form.destination} onChange={(e) => set("destination", e.target.value)} placeholder="e.g. Canada, Germany, Australia" className="rounded-xl h-12" />
                  </div>
                </div>
              </section>

              {/* 3 — Education & Career */}
              <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><GraduationCap className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-foreground">Education & Career</h2>
                </div>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Highest Qualification *</Label>
                      <Select value={form.qualification} onValueChange={(v) => set("qualification", v)} required>
                        <SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select Qualification" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                          <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study *</Label>
                      <Input required value={form.field_of_study} onChange={(e) => set("field_of_study", e.target.value)} placeholder="Computer Science" className="rounded-xl h-12" />
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Briefcase className="w-5 h-5" /></div>
                      <h3 className="text-base font-bold text-foreground">Work Experience</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Employment Status *</Label>
                        <RadioGroup value={form.employment_status} onValueChange={(v) => set("employment_status", v)} required className="flex flex-wrap gap-3">
                          {["Student", "Employed", "Self-Employed", "Unemployed"].map((s) => (
                            <div key={s} className="flex items-center space-x-2 bg-secondary/30 px-4 py-2.5 rounded-xl">
                              <RadioGroupItem value={s} id={`es-${s}`} />
                              <Label htmlFor={`es-${s}`} className="font-medium text-sm cursor-pointer">{s}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-5">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input value={form.job_title} onChange={(e) => set("job_title", e.target.value)} placeholder="Software Engineer" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label>Industry</Label>
                          <Input value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="Technology" className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label>Experience *</Label>
                          <Select value={form.experience_years} onValueChange={(v) => set("experience_years", v)} required>
                            <SelectTrigger className="rounded-xl h-12"><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Fresher">Fresher</SelectItem>
                              <SelectItem value="1–2 Years">1–2 Years</SelectItem>
                              <SelectItem value="3–5 Years">3–5 Years</SelectItem>
                              <SelectItem value="5+ Years">5+ Years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4 — Goal */}
              <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Target className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-foreground">Immigration / Career Goal</h2>
                </div>
                <div className="space-y-2">
                  <Label>Describe your goal *</Label>
                  <Textarea
                    required
                    value={form.goal_description}
                    onChange={(e) => set("goal_description", e.target.value)}
                    className="rounded-2xl min-h-[150px] p-4"
                    placeholder="Example: I am looking for software developer opportunities in Germany with visa sponsorship."
                  />
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || submitted}
                  className="w-full md:w-auto px-12 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  {submitting ? "Saving..." : submitted ? "✓ Details Submitted" : (
                    <><Send className="w-5 h-5 mr-2" /> Submit & Book Appointment</>
                  )}
                </Button>
              </div>
            </form>

            {/* 5 — Calendly Booking */}
            <section className={`mt-10 transition-all duration-500 ${submitted ? "opacity-100 translate-y-0" : "opacity-40 pointer-events-none translate-y-2"}`}>
              <div className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 p-8 pb-0">
                  <div className={`p-2.5 rounded-xl ${submitted ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"}`}>
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Book Your Appointment</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {submitted
                        ? "✓ Name & email pre-filled — just pick a time!"
                        : "Submit the form above to unlock booking"}
                    </p>
                  </div>
                </div>
                <div
                  ref={calendlyRef}
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/bluedotimmigrations2000/30min?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1"
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </section>
          </div>
        </div>
      </section>
      <Toaster richColors position="top-center" />
    </PageLayout>
  );
}
