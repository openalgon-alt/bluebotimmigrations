import { useState } from "react";
import { Send, MapPin, GraduationCap, Briefcase, Target, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function ConsultationForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = Object.fromEntries(formData.entries());

    try {
      // Primary insertion into the newly created 'appointments' table
      const { error } = await supabase.from("appointments").insert([data]);
      
      if (error) {
        console.error("Submission error:", error);
        toast.error("Something went wrong. Please try again or contact us directly.");
        return;
      }
      
      toast.success("Consultation scheduled! Our expert will contact you soon.");
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Database submission error:", error);
      toast.error("Could not connect to the server. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Schedule Your Immigration Consultation
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below and our experts will help you navigate your journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information */}
            <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" name="full_name" required placeholder="John Doe" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="john@example.com" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Current City</Label>
                  <Input id="city" name="city" required placeholder="Hyderabad" className="rounded-xl h-12" />
                </div>
              </div>
            </section>

            {/* Consultation Type */}
            <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Consultation Type</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Select the service you need:</p>
                <RadioGroup name="consultation_type" required className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Work Visa Consultation",
                    "Job Assistance Abroad",
                    "Permanent Residency (PR)",
                    "Study Visa",
                    "Visit Visa",
                    "Dependent Visa",
                    "Immigration Eligibility Check"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type} className="cursor-pointer font-medium">{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </section>

            {/* Preferred Destination */}
            <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Preferred Destination Country</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">Target Country</Label>
                <Input id="destination" name="destination" required placeholder="e.g. Canada, Germany, Australia" className="rounded-xl h-12" />
              </div>
            </section>

            {/* Educational Background */}
            <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Educational Background</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification</Label>
                  <Select name="qualification" required>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Select Qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                      <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field_of_study">Specialization / Field of Study</Label>
                  <Input id="field_of_study" name="field_of_study" required placeholder="Computer Science" className="rounded-xl h-12" />
                </div>
              </div>
            </section>

            {/* Work Experience */}
            <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Current Employment Status</Label>
                  <RadioGroup name="employment_status" required className="flex flex-wrap gap-4">
                    {["Student", "Employed", "Self-Employed", "Unemployed"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <RadioGroupItem value={status} id={status} />
                        <Label htmlFor={status} className="font-medium">{status}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="job_title">Current Job Title</Label>
                    <Input id="job_title" name="job_title" placeholder="Software Engineer" className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" name="industry" placeholder="Technology" className="rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience_years">Years of Experience</Label>
                    <Select name="experience_years" required>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Select Experience" />
                      </SelectTrigger>
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
            </section>

            {/* Immigration / Career Goal */}
            <section className="bg-white/80 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Immigration / Career Goal</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal_description">Describe your goal</Label>
                <Textarea 
                  id="goal_description" 
                  name="goal_description" 
                  required 
                  className="rounded-2xl min-h-[150px] p-4"
                  placeholder="Example: I am looking for software developer opportunities in Germany with visa sponsorship."
                />
              </div>
            </section>

            <div className="flex justify-center pt-6">
              <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto px-12 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                {loading ? (
                  "Scheduling..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Consultation Request
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
