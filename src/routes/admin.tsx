import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  LogOut, Mail, Phone, MessageSquare, User, Clock, RefreshCw, 
  ShieldAlert, Calendar, MapPin, Briefcase, GraduationCap, Target, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

type Appointment = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  city: string;
  country: string;
  consultation_type: string;
  destination: string;
  qualification: string;
  field_of_study: string;
  employment_status: string;
  job_title?: string;
  industry?: string;
  experience_years: string;
  goal_description: string;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setAuthed(true);
        sessionStorage.setItem("admin_authed", "true");
      } else if (typeof window !== "undefined" && sessionStorage.getItem("admin_authed") === "true") {
        setAuthed(true);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(error.message);
    } else {
      setAuthed(true);
      setLoginError("");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_authed", "true");
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_authed");
    }
    setAuthed(false);
    setEnquiries([]);
    setAppointments([]);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, appRes] = await Promise.all([
        supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("appointments").select("*").order("created_at", { ascending: false })
      ]);
      
      if (enqRes.data) setEnquiries(enqRes.data);
      if (appRes.data) setAppointments(appRes.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/90 to-primary flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">bluedotImmigration — Enquiries Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Email</label>
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter admin email"
      required
    />
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Password</label>
    <Input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter admin password"
      required
    />
  </div>
  {loginError && (
    <p className="text-sm text-red-500 font-medium">{loginError}</p>
  )}
  <Button type="submit" className="w-full" size="lg">
    Login to Dashboard
  </Button>
</form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 sticky top-0 z-50 flex items-center justify-between shadow-lg backdrop-blur-md bg-primary/95">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Blue Admin</h1>
            <p className="text-xs text-primary-foreground/70 font-medium">Control Center</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="text-white border-white/30 hover:bg-white/10 bg-transparent gap-2 rounded-lg"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Sync
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/10 gap-2 rounded-lg"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="appointments" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl border shadow-sm">
            <TabsList className="bg-slate-100 p-1 rounded-xl h-auto">
              <TabsTrigger value="appointments" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Appointments <Badge className="ml-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">{appointments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="enquiries" className="rounded-lg py-2.5 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Quick Enquiries <Badge className="ml-2 bg-slate-200 text-slate-600 hover:bg-slate-300 border-none">{enquiries.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-muted-foreground font-medium">Today's Traffic</div>
                <div className="text-2xl font-bold text-primary">
                  {appointments.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString()).length + 
                   enquiries.filter(e => new Date(e.created_at).toDateString() === new Date().toDateString()).length}
                </div>
              </div>
            </div>
          </div>

          <TabsContent value="appointments" className="mt-0">
            {loading && appointments.length === 0 ? (
              <div className="grid gap-6">
                {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white rounded-3xl animate-pulse border" />)}
              </div>
            ) : appointments.length === 0 ? (
              <Card className="border-dashed border-2 bg-transparent shadow-none rounded-[2rem]">
                <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Calendar className="h-16 w-16 mb-4 opacity-20" />
                  <p className="text-xl font-semibold">No appointments yet</p>
                  <p className="text-sm">New consultation requests will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {appointments.map((app) => (
                  <Card key={app.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center text-xl font-black shadow-inner">
                            {app.full_name.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold tracking-tight">{app.full_name}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-none rounded-lg px-3">
                                {app.consultation_type}
                              </Badge>
                              <span className="text-xs font-medium flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(app.created_at).toLocaleString()}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <Badge className="bg-green-100 text-green-700 border-none hover:bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider">New Lead</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                             <User className="h-3.5 w-3.5" /> Contact Details
                          </h4>
                          <div className="space-y-2.5">
                            <a href={`mailto:${app.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100"><Mail className="h-4 w-4 text-slate-400" /></div>
                              {app.email}
                            </a>
                            <a href={`tel:${app.phone}`} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100"><Phone className="h-4 w-4 text-slate-400" /></div>
                              {app.phone}
                            </a>
                            <div className="flex items-center gap-3 text-sm font-medium">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100"><MapPin className="h-4 w-4 text-slate-400" /></div>
                              {app.city}
                            </div>
                          </div>
                        </div>

                        {/* Background Info */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                             <GraduationCap className="h-3.5 w-3.5" /> Education & Career
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                              <div className="text-xs text-muted-foreground font-bold uppercase tracking-tight mb-1">Education</div>
                              <div className="text-sm font-bold text-foreground">{app.qualification}</div>
                              <div className="text-xs font-medium text-slate-500">{app.field_of_study}</div>
                            </div>
                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                              <div className="text-xs text-muted-foreground font-bold uppercase tracking-tight mb-1">Professional</div>
                              <div className="text-sm font-bold text-foreground">{app.employment_status} • {app.experience_years}</div>
                              <div className="text-xs font-medium text-slate-500">{app.job_title} {app.industry ? `(${app.industry})` : ""}</div>
                            </div>
                          </div>
                        </div>

                        {/* Goal */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                             <Target className="h-3.5 w-3.5" /> Immigration Goal
                          </h4>
                          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                              <MapPin className="h-12 w-12" />
                            </div>
                            <div className="text-xs text-primary font-bold uppercase tracking-tight mb-2">Destination: {app.destination}</div>
                            <p className="text-sm font-medium text-foreground leading-relaxed italic">
                              "{app.goal_description}"
                            </p>
                          </div>
                          <Button className="w-full rounded-xl bg-slate-900 hover:bg-black text-white gap-2 h-11">
                            Process Lead <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="enquiries" className="mt-0">
            <div className="grid gap-4">
              {enquiries.map((enquiry) => (
                <div key={enquiry.id} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-lg font-bold shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {enquiry.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="font-bold text-foreground flex items-center gap-1.5">
                            {enquiry.name}
                          </span>
                          <a href={`mailto:${enquiry.email}`} className="text-primary text-sm font-medium flex items-center gap-1.5 hover:underline">
                            <Mail className="h-3.5 w-3.5" /> {enquiry.email}
                          </a>
                          <a href={`tel:${enquiry.phone}`} className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 hover:underline">
                            <Phone className="h-3.5 w-3.5" /> {enquiry.phone}
                          </a>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">
                           {new Date(enquiry.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 bg-slate-50/50 rounded-xl px-4 py-3 border border-slate-100/50 leading-relaxed italic">
                        "{enquiry.message}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
