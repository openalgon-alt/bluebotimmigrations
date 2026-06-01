import { useState } from "react";
import { Star, Quote, X } from "lucide-react";

const items = [
  {
    name: "Sampath Edunoori",
    country: "New Zealand e-Visa",
    review: "Approved effortlessly! Thank you for the seamless visa process.",
    rating: 5,
    image: "/nz-evisa-sampath.png",
  },
  {
    name: "Sampath Edunoori",
    country: "New Zealand Work Visa",
    review: "Got my work visa sponsor approval without any hassle.",
    rating: 5,
    image: "/nz-approval-sampath.png",
  },
  {
    name: "Dasari Shashikanth",
    country: "USA B1/B2 Visa",
    review: "Got my US B1/B2 Visa approved effortlessly! Huge thanks to the expert team.",
    rating: 5,
    image: "/us-visa-dasari.png",
  },
];

export function Testimonials() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="testimonials" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-foreground">
            Trusted by clients worldwide
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real stories from people who started a new chapter abroad with us.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure
              key={t.name}
              className="relative bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-8 shadow-card hover:shadow-elegant transition-shadow"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
              {t.image && (
                <div 
                  className="mb-5 relative w-full h-52 md:h-64 bg-white/40 rounded-xl overflow-hidden border border-border/50 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer group/img"
                  onClick={() => setSelectedImage(t.image)}
                >
                  <img 
                    src={t.image} 
                    alt={`${t.country} for ${t.name}`} 
                    className="absolute inset-0 w-full h-full object-contain p-1" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover/img:opacity-100 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md transition-opacity shadow-lg">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              )}
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm text-foreground/80 leading-relaxed italic">
                "{t.review}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.country}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6 md:h-8 md:w-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
