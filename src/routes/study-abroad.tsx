import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site/PageLayout";
import {
  ShieldCheck,
  GraduationCap,
  ArrowLeft,
  BookOpen,
  Building2,
  Landmark,
  Compass,
  Award,
  Briefcase,
  LandmarkIcon,
  Wallet,
  Calendar,
  UserCheck,
  Flag,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/study-abroad")({
  component: StudyAbroadPage,
});

// Comprehensive educational program data with dual currency values (Local + INR)
const destinations = [
  {
    country: "Canada",
    tagline: "Pathway to Global Career Opportunities",
    description:
      "Canada combines highly ranked institutional research frameworks with a supportive ecosystem for international talents looking for robust Post-Graduation Work Permits (PGWP).",
    universities: [
      { name: "University of Toronto", rank: "#21 Global" },
      { name: "McGill University", rank: "#30 Global" },
      { name: "University of British Columbia", rank: "#34 Global" },
    ],
    courses: [
      "Advanced Computer Science",
      "Data Analytics & AI",
      "Healthcare & Biomedical Sciences",
      "Executive MBA",
    ],
    tuition: "CAD 20k – 42k (₹13.7L – 28.8L) / year",
    costOfLiving: "CAD 15k – 20k (₹10.3L – 13.7L) / year",
    stayBack: "Up to 3 Years (PGWP Route)",
  },
  {
    country: "United States",
    tagline: "The Epicenter of Innovation & Research",
    description:
      "The premier destination for cross-disciplinary research paradigms, market disruptive innovation, and access to the world's highest concentration of Fortune 500 tech hubs.",
    universities: [
      { name: "Massachusetts Institute of Technology", rank: "#1 Global" },
      { name: "Stanford University", rank: "#4 Global" },
      { name: "Harvard University", rank: "#5 Global" },
    ],
    courses: [
      "Machine Learning & Robotics",
      "Quantitative Finance",
      "Aerospace Engineering",
      "Biotechnology Systems",
    ],
    tuition: "USD 28k – 60k (₹27L – 57.8L) / year",
    costOfLiving: "USD 18k – 24k (₹17.3L – 23.1L) / year",
    stayBack: "Up to 36 Months (STEM OPT)",
  },
  {
    country: "United Kingdom",
    tagline: "Time-Honored Excellence & Accelerated Degrees",
    description:
      "Offering high-impact, fast-tracked degree timelines alongside elite historical lineage, recognized instantly across international corporate hierarchies.",
    universities: [
      { name: "University of Oxford", rank: "#3 Global" },
      { name: "University of Cambridge", rank: "#2 Global" },
      { name: "Imperial College London", rank: "#6 Global" },
    ],
    courses: [
      "Corporate Law & Jurisprudence",
      "International Finance",
      "Global Public Health",
      "FinTech Systems",
    ],
    tuition: "GBP 18k – 38k (₹23.5L – 49.5L) / year",
    costOfLiving: "GBP 12k – 16k (₹15.6L – 20.9L) / year",
    stayBack: "2 Years (Graduate Visa Route)",
  },
  {
    country: "Germany",
    tagline: "Engineering Excellence & Free Public Education",
    description:
      "The industrial engine of Europe, delivering unparalleled technical training virtually tuition-free in public state academies, backed by structural career access options.",
    universities: [
      { name: "Technical University of Munich", rank: "#28 Global" },
      { name: "Heidelberg University", rank: "#84 Global" },
      { name: "RWTH Aachen University", rank: "#99 Global" },
    ],
    courses: [
      "Automotive & Systems Engineering",
      "Sustainable Energy Systems",
      "Cybersecurity Architecture",
      "Mechatronics",
    ],
    tuition: "€0 – €3k (₹0 – 3.3L) / year",
    costOfLiving: "€11k – 13k (₹12.1L – 14.4L) / year",
    stayBack: "18 Months Job Seeking Visa",
  },
  {
    country: "Australia",
    tagline: "High-Tier Standard of Living & Applied Research",
    description:
      "Boasting unparalleled global liveability scales combined with comprehensive regional visa pathways, industry-embedded internships, and vibrant campus communities.",
    universities: [
      { name: "University of Melbourne", rank: "#14 Global" },
      { name: "University of Sydney", rank: "#19 Global" },
      { name: "Australian National University", rank: "#30 Global" },
    ],
    courses: [
      "Information Technology Architecture",
      "Mining & Environmental Engineering",
      "Hospitality Management",
      "Nursing & Allied Health",
    ],
    tuition: "AUD 25k – 48k (₹16.8L – 32.3L) / year",
    costOfLiving: "AUD 22k – 26k (₹14.8L – 17.5L) / year",
    stayBack: "2 to 4 Years (Post-Study Work)",
  },
  {
    country: "Ireland",
    tagline: "Europe's Fast-Growing Technology Hub",
    description:
      "The tech capital of Europe, providing critical operational hubs for international tech giants alongside structured English-speaking postgraduate professional opportunities.",
    universities: [
      { name: "Trinity College Dublin", rank: "#81 Global" },
      { name: "University College Dublin", rank: "#126 Global" },
      { name: "University of Galway", rank: "#289 Global" },
    ],
    courses: [
      "Cloud Computing Systems",
      "Biopharmaceutical Science",
      "Digital Marketing Strategy",
      "Data Science Engineering",
    ],
    tuition: "€12k – 26k (₹13.2L – 28.7L) / year",
    costOfLiving: "€12k – 15k (₹13.2L – 16.6L) / year",
    stayBack: "2 Years (Third Level Graduate)",
  },
];

// Interactive tool data matrices
const comparisonData: Record<
  string,
  { tuition: string; living: string; partTime: string; stayBack: string }
> = {
  Canada: {
    tuition: "20k – 42k (₹13.7L – 28.8L)",
    living: "15k – 20k (₹10.3L – 13.7L)",
    partTime: "CAD 16.55 (₹1,130) / hr",
    stayBack: "Up to 3 Years (PGWP)",
  },
  "United States": {
    tuition: "28k – 60k (₹27L – 57.8L)",
    living: "18k – 24k (₹17.3L – 23.1L)",
    partTime: "USD 15.00 (₹1,440) / hr",
    stayBack: "Up to 36 Mos (STEM OPT)",
  },
  "United Kingdom": {
    tuition: "18k – 38k (₹23.5L – 49.5L)",
    living: "12k – 16k (₹15.6L – 20.9L)",
    partTime: "GBP 11.44 (₹1,490) / hr",
    stayBack: "2 Years (Graduate Route)",
  },
  Germany: {
    tuition: "€0 – €3k (₹0 – 3.3L)",
    living: "11k – 13k (₹12.1L – 14.4L)",
    partTime: "EUR 12.41 (₹1,370) / hr",
    stayBack: "18 Months Job Seek Visa",
  },
  Australia: {
    tuition: "25k – 48k (₹16.8L – 32.3L)",
    living: "22k – 26k (₹14.8L – 17.5L)",
    partTime: "AUD 23.23 (₹1,560) / hr",
    stayBack: "2 to 4 Years (Post-Study)",
  },
  Ireland: {
    tuition: "12k – 26k (₹13.2L – 28.7L)",
    living: "12k – 15k (₹13.2L – 16.6L)",
    partTime: "EUR 12.70 (₹1,400) / hr",
    stayBack: "2 Years (Third Level Scheme)",
  },
};

const timelines: Record<string, Array<{ title: string; desc: string; icon: any }>> = {
  Canada: [
    {
      title: "Study Period",
      desc: "Enroll in an eligible Designated Learning Institution (DLI) full-time.",
      icon: Calendar,
    },
    {
      title: "PGWP Issuance",
      desc: "Graduate and secure a Post-Graduation Work Permit valid up to 3 years.",
      icon: Award,
    },
    {
      title: "Express Entry Base",
      desc: "Accumulate 1 year of Canadian skilled work experience (TEER 0/1/2/3).",
      icon: UserCheck,
    },
    {
      title: "PR Invitation",
      desc: "Apply via Canadian Experience Class (CEC) for permanent residency.",
      icon: Flag,
    },
  ],
  "United States": [
    {
      title: "F-1 Study Phase",
      desc: "Maintain full-time academic enrolment under F-1 visa parameters.",
      icon: Calendar,
    },
    {
      title: "Initial OPT",
      desc: "Obtain 12 months of standard Optional Practical Training authorization.",
      icon: Award,
    },
    {
      title: "STEM Extension",
      desc: "Utilize a 24-month extension if your degree qualifies under STEM rules.",
      icon: UserCheck,
    },
    {
      title: "H-1B Cap/PR",
      desc: "Transition into corporate sponsorship frameworks (H-1B, EB-2, EB-3).",
      icon: Flag,
    },
  ],
  "United Kingdom": [
    {
      title: "Student Route",
      desc: "Complete an undergraduate or postgraduate qualification full-time.",
      icon: Calendar,
    },
    {
      title: "Graduate Visa",
      desc: "Activate a 2-year unsponsored stay-back work permit (3 years for PhD).",
      icon: Award,
    },
    {
      title: "Skilled Worker",
      desc: "Transition to corporate sponsorship with a licensed employer framework.",
      icon: UserCheck,
    },
    {
      title: "ILR Status",
      desc: "Achieve Indefinite Leave to Remain after meeting permanent tenure rules.",
      icon: Flag,
    },
  ],
  Germany: [
    {
      title: "Degree Enrolment",
      desc: "Complete state or recognized academic modules (free or low fee).",
      icon: Calendar,
    },
    {
      title: "Job Seeking Visa",
      desc: "Access a structured 18-month residence permit to find professional work.",
      icon: Award,
    },
    {
      title: "EU Blue Card",
      desc: "Convert status into an EU Blue Card or standard national settlement path.",
      icon: UserCheck,
    },
    {
      title: "Permanent Settlement",
      desc: "Apply for permanent settlement after 21-24 months of working.",
      icon: Flag,
    },
  ],
  Australia: [
    {
      title: "Higher Education",
      desc: "Complete a minimum of 2 academic years registered under CRICOS.",
      icon: Calendar,
    },
    {
      title: "Subclass 485",
      desc: "Secure a Temporary Graduate Visa lasting between 2 and 4 years.",
      icon: Award,
    },
    {
      title: "Skill Assessment",
      desc: "Pass formal point matrix testing and vocational occupational pathways.",
      icon: UserCheck,
    },
    {
      title: "PR (189/190)",
      desc: "Submit Expressions of Interest for permanent point-tested pathways.",
      icon: Flag,
    },
  ],
  Ireland: [
    {
      title: "Academic Safe",
      desc: "Acquire an honors degree or postgraduate diploma on Stamp 2.",
      icon: Calendar,
    },
    {
      title: "Stamp 1G Entry",
      desc: "Utilize the Third Level Graduate Scheme for a 24-month work window.",
      icon: Award,
    },
    {
      title: "Critical Skills",
      desc: "Obtain a Critical Skills Employment Permit with an approved employer.",
      icon: UserCheck,
    },
    {
      title: "Stamp 4 Residency",
      desc: "Acquire permanent long-term immigration autonomy after 2 years.",
      icon: Flag,
    },
  ],
};

export function StudyAbroadPage() {
  const [countryA, setCountryA] = useState("Canada");
  const [countryB, setCountryB] = useState("United States");
  const [selectedTimeline, setSelectedTimeline] = useState("Canada");

  const dataA = comparisonData[countryA];
  const dataB = comparisonData[countryB];
  const activeTimelineSteps = timelines[selectedTimeline];

  // Smart Navigation Handler
  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Dynamic Context Back Link */}
        <div className="mb-8 animate-fade-up">
          <button
            onClick={handleBackNavigation}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group bg-transparent border-none p-0 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
        </div>

        {/* Header Section */}
        <header className="page-header animate-fade-up">
          <span className="page-header__badge">
            <GraduationCap className="h-3.5 w-3.5" />
            Study Abroad Services
          </span>
          <h1 className="page-header__title">Your Pathway to Global Education</h1>
          <p className="page-header__desc">
            Expert guidance for university admissions, student visas, and post-study work pathways.
            From shortlisting the right college to securing your visa, our team turns complex
            paperwork into clear, confident next steps.
          </p>
        </header>

        {/* MOVED TO TOP: Side-by-Side Comparison Matrix */}
        <section className="bg-card text-card-foreground border border-border/60 rounded-2xl shadow-card p-6 sm:p-8 mt-12 animate-fade-up [animation-delay:150ms]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold tracking-tight">
              Side-by-Side Budget & Opportunity Matrix
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Select two destinations to evaluate core financial and post-study parameters
              dynamically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Destination A
              </label>
              <select
                value={countryA}
                onChange={(e) => setCountryA(e.target.value)}
                className="w-full bg-secondary border border-border/60 rounded-xl p-2.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {Object.keys(comparisonData).map((c) => (
                  <option key={c} value={c} disabled={c === countryB}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Destination B
              </label>
              <select
                value={countryB}
                onChange={(e) => setCountryB(e.target.value)}
                className="w-full bg-secondary border border-border/60 rounded-xl p-2.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {Object.keys(comparisonData).map((c) => (
                  <option key={c} value={c} disabled={c === countryA}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            {[
              {
                label: "Annual Tuition Base",
                icon: Landmark,
                valA: dataA.tuition,
                valB: dataB.tuition,
              },
              {
                label: "Annual Living Capital",
                icon: Wallet,
                valA: dataA.living,
                valB: dataB.living,
              },
              {
                label: "Avg. Part-Time Wage",
                icon: LandmarkIcon,
                valA: dataA.partTime,
                valB: dataB.partTime,
              },
              {
                label: "Post-Study Work Permit",
                icon: Briefcase,
                valA: dataA.stayBack,
                valB: dataB.stayBack,
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 gap-2 py-3 border-b border-border/40 last:border-none items-center"
              >
                <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs sm:text-sm">
                  <row.icon className="h-4 w-4 text-primary shrink-0" />
                  <span>{row.label}</span>
                </div>
                <div
                  className="text-center font-bold text-foreground bg-secondary/40 py-2 rounded-lg border border-border/20 px-1 truncate"
                  title={row.valA}
                >
                  {row.valA}
                </div>
                <div
                  className="text-center font-bold text-foreground bg-secondary/40 py-2 rounded-lg border border-border/20 px-1 truncate"
                  title={row.valB}
                >
                  {row.valB}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Country Details Grid Section (Now in the middle) */}
        <main className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up [animation-delay:200ms]">
          {destinations.map((dest) => (
            <article
              key={dest.country}
              className="bg-card text-card-foreground border border-border/60 rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div className="p-6 sm:p-8 bg-gradient-to-b from-muted to-transparent border-b border-border/40">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                    <Compass className="h-5 w-5 text-primary" />
                    {dest.country}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified Pathway
                  </span>
                </div>

                {/* The new Strategic Advantage block */}
                <div className="mt-6 relative bg-secondary/50 rounded-xl p-4 sm:p-5 border border-border/50 overflow-hidden group/insight hover:bg-secondary/80 transition-colors duration-300">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-primary/10 group-hover/insight:from-primary transition-all duration-300" />
                  <div className="flex items-start gap-3.5">
                    <div className="shrink-0 mt-0.5 p-2 bg-background rounded-lg border border-border/40 shadow-sm text-primary group-hover/insight:scale-110 transition-transform duration-300">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                        Strategic Advantage
                      </span>
                      <h4 className="text-sm font-bold text-foreground leading-snug">
                        {dest.tagline}
                      </h4>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        {dest.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-primary/60" /> Elite Target Universities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {dest.universities.map((uni) => (
                      <div
                        key={uni.name}
                        className="p-3 bg-secondary/80 rounded-xl border border-border/40"
                      >
                        <p className="text-xs font-bold text-foreground leading-tight line-clamp-2">
                          {uni.name}
                        </p>
                        <p className="text-[10px] font-medium text-primary mt-1">{uni.rank}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-primary/60" /> High-Impact Strategic
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.courses.map((course) => (
                      <span
                        key={course}
                        className="text-xs px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border/30 font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-secondary/50 border-t border-border/40 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="space-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center mb-1">
                      <LandmarkIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Tuition Base
                    </p>
                  </div>
                  <p className="text-xs font-bold text-foreground leading-normal px-1">
                    {dest.tuition}
                  </p>
                </div>
                <div className="space-y-1 border-x border-border/60 px-1 sm:px-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center mb-1">
                      <Landmark className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Living Capital
                    </p>
                  </div>
                  <p className="text-xs font-bold text-foreground leading-normal px-1">
                    {dest.costOfLiving}
                  </p>
                </div>
                <div className="space-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center mb-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Post-Study Work
                    </p>
                  </div>
                  <p className="text-xs font-bold text-primary leading-normal px-1">
                    {dest.stayBack}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </main>

        {/* 3. Visa Transition Roadmap */}
        <section className="bg-card text-card-foreground border border-border/60 rounded-2xl shadow-card p-6 sm:p-8 mt-12 animate-fade-up [animation-delay:250ms]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Visa Transition Roadmap</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track your pathway from day one of your classes through to permanent settlement
                status.
              </p>
            </div>
            <div className="shrink-0">
              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="bg-secondary border border-border/60 rounded-xl p-2.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-48 cursor-pointer"
              >
                {Object.keys(timelines).map((c) => (
                  <option key={c} value={c}>
                    {c === "United States" ? "USA" : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {activeTimelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center md:items-start md:text-left group"
                >
                  {index < 3 && (
                    <div className="hidden md:block absolute top-6 left-12 w-full h-[2px] bg-border/60 group-hover:bg-primary/40 transition-colors" />
                  )}

                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-4 shrink-0 border border-primary/20 transition-transform group-hover:scale-105">
                    <StepIcon className="h-5 w-5" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary/80 block mb-1">
                    Step 0{index + 1}
                  </span>
                  <h4 className="text-sm font-bold text-foreground mb-1.5">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Global Strategy Callout Block */}
        <footer className="mt-16 p-8 bg-primary text-primary-foreground rounded-2xl border border-primary/20 shadow-elegant text-center relative overflow-hidden group animate-fade-up [animation-delay:300ms]">
          <div className="absolute inset-0 bg-radial at-top-right from-primary-glow/40 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <Award className="h-8 w-8 mx-auto text-primary-glow animate-pulse" />
            <h3 className="text-2xl font-bold tracking-tight">
              Structured End-to-End Counsel Execution
            </h3>
            <p className="text-sm text-primary-foreground/85 leading-relaxed">
              Every international educational path demands robust integration across visa
              acquisition timelines, financial planning, and university application deadlines.
              Connect through our secure communication networks to map your trajectory.
            </p>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
}
