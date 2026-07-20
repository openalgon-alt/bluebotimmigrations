import { motion } from "framer-motion";
import { MessageSquare, FileText, CheckCircle, Send, Users } from "lucide-react";

const steps = [
  {
    title: "Initial Consultation",
    description: "Meet with our experts to discuss your goals and assess your eligibility for various programs.",
    icon: MessageSquare,
  },
  {
    title: "Profile Assessment",
    description: "We deeply analyze your background and match you with the best immigration pathway.",
    icon: Users,
  },
  {
    title: "Documentation",
    description: "Gather and verify all necessary paperwork with our strict quality-check process.",
    icon: FileText,
  },
  {
    title: "Application Filing",
    description: "We submit your application to the respective authorities accurately and on time.",
    icon: Send,
  },
  {
    title: "Approval & Next Steps",
    description: "Celebrate your success! We guide you on post-arrival tasks and settlement.",
    icon: CheckCircle,
  },
];

export function Timeline() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            How It Works
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Your Journey to <span className="text-primary">Success</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We've streamlined the complex immigration process into 5 clear, confident steps.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100 via-primary to-blue-100 md:-translate-x-1/2 rounded-full"></div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-[45%]"></div>

                  {/* Icon Marker */}
                  <div className="absolute left-0 md:left-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border-4 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] md:-translate-x-1/2 flex items-center justify-center z-10">
                    <step.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-[45%]">
                    <div className={`bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden ${
                      isEven ? "md:text-right" : "text-left"
                    }`}>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      
                      <span className={`text-5xl md:text-7xl font-black text-blue-200/70 absolute -top-2 pointer-events-none select-none z-0 ${
                        isEven ? "right-4 md:right-auto md:left-4" : "right-4"
                      }`}>
                        0{index + 1}
                      </span>
                      
                      <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
