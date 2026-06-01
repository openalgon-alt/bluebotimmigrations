import { useState, useEffect } from "react";
import { Calendar, X, Sparkles, MessageSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SchedulePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    // Just ensure the widget is loaded, but keep it closed
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && step === 0) {
      setStep(1); // Start typing
      
      const timer1 = setTimeout(() => {
        setStep(2); // Show message
      }, 1500);
      
      const timer2 = setTimeout(() => {
        setStep(3); // Show button
      }, 2300);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  if (!hasLoaded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Bubble */}
      <div className={`transition-all duration-500 ease-in-out origin-bottom-right pointer-events-auto ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 shadow-none pointer-events-none'}`}>
        <div className="bg-white/95 backdrop-blur-xl border border-primary/20 shadow-[0_20px_50px_-15px_rgba(var(--primary-rgb),0.3)] rounded-[32px] rounded-br-sm p-6 w-[calc(100vw-2rem)] sm:w-[360px] relative overflow-hidden group/card">
          {/* Top accent glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full pointer-events-none group-hover/card:bg-primary/20 transition-colors duration-500"></div>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-500"></div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors bg-secondary/50 hover:bg-primary/10 p-1.5 rounded-full"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex flex-col gap-5 mt-1 relative z-10">
            <div className="flex gap-4 items-center">
              <div className="relative animate-chatbot-float">
                <div className="w-14 h-14 rounded-2xl border-2 border-primary/20 overflow-hidden shadow-md bg-white flex items-center justify-center p-1">
                  <img src="/chatbot-icon.png" alt="Chatbot" className="w-full h-full object-contain" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 border-2 border-white rounded-full bg-green-500 shadow-sm"></span>
              </div>
              <div>
                <p className="font-extrabold text-foreground text-lg flex items-center gap-2">
                  Blue Assistant <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </p>
                <p className="text-xs text-primary/80 font-bold uppercase tracking-widest">
                  Immigration Specialist
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 min-h-[60px]">
              {/* Typing indicator */}
              {step === 1 && (
                <div className="bg-primary/5 border border-primary/10 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm inline-flex items-center justify-center gap-1.5 animate-fade-up self-start h-11" style={{ animationDuration: '300ms' }}>
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '-150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '-300ms' }}></div>
                </div>
              )}

              {/* Actual Message */}
              {step >= 2 && (
                <div className="bg-gradient-to-br from-primary/5 to-blue-50/30 border border-primary/10 rounded-2xl rounded-tl-sm p-4 text-[15px] text-foreground/90 leading-relaxed shadow-sm animate-fade-up" style={{ animationDuration: '400ms' }}>
                  Hi! Ready to start your immigration journey? ✈️ <br />
                  <span className="font-semibold text-primary">I'm here to help you schedule your expert consultation!</span>
                </div>
              )}

              {/* Action Button */}
              {step >= 3 && (
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_10px_30px_-5px_rgba(var(--primary-rgb),0.4)] group mt-2 rounded-2xl h-14 animate-fade-up border-b-4 border-primary/40 active:border-b-0 active:translate-y-0.5 transition-all">
                  <Link to="/schedule" className="flex items-center justify-center gap-2">
                    <Calendar className="h-5 w-5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300" />
                    <span className="font-black text-base tracking-wide">BOOK APPOINTMENT NOW</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Button (FAB) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-16 px-6 rounded-full bg-primary text-white shadow-[0_12px_40px_rgba(var(--primary-rgb),0.35)] hover:scale-105 hover:shadow-[0_15px_50px_rgba(var(--primary-rgb),0.45)] transition-all duration-500 flex items-center gap-4 pointer-events-auto group border-2 border-white/30 backdrop-blur-md relative overflow-hidden ${!isOpen ? 'animate-chatbot-float' : ''}`}
        aria-label="Toggle chat"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
        
        <div className="relative z-10">
          {isOpen ? (
            <div className="bg-white/20 p-2 rounded-xl">
              <X className="h-6 w-6 animate-in spin-in-90 duration-300" />
            </div>
          ) : (
            <div className="relative bg-white p-1 rounded-xl shadow-inner border border-primary/10">
              <img src="/chatbot-icon.png" alt="Icon" className="h-9 w-9 object-contain" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 border-2 border-primary rounded-full bg-green-500 shadow-sm">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-start leading-tight relative z-10">
          <span className="font-black text-xs tracking-[0.15em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            {isOpen ? 'Close' : 'Quick Action'}
          </span>
          <span className="font-extrabold text-[15px] tracking-tight">
            {isOpen ? 'Minimize Chat' : 'Schedule Appointment'}
          </span>
        </div>
      </button>
    </div>
  );
}
