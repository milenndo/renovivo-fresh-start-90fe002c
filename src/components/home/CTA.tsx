import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import ctaBackground from "@/assets/images/cta-background.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

// Hand-drawn sketchy arrow SVG component
const SketchyArrow = () => (
  <svg
    className="absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-10 text-primary-foreground/70 hidden md:block animate-[bounce_2s_infinite]"
    viewBox="0 0 60 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 22 C8 20, 12 24, 18 21 C24 18, 28 25, 35 20 C42 15, 45 23, 50 20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      style={{ filter: 'url(#roughen)' }}
    />
    <path
      d="M45 14 C48 17, 50 19, 52 20 C50 21, 48 24, 46 28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M8 24 C14 22, 20 26, 28 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    <defs>
      <filter id="roughen">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
      </filter>
    </defs>
  </svg>
);

const CTA = () => {
  const { openModal } = useInspectionRequest();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBackground}
          alt=""
          width={1920}
          height={600}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-foreground/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary-foreground) / 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary-foreground) / 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div 
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-primary-foreground/20">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground text-sm font-semibold tracking-wider uppercase">Безплатна консултация</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Primary CTA with hand-drawn arrow */}
            <div className="relative">
              <SketchyArrow />
              <Button
                size="lg"
                onClick={openModal}
                className="group relative overflow-hidden bg-background text-foreground hover:bg-background/95 font-bold text-lg px-10 py-7 h-auto rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Phone className="h-5 w-5 mr-3 group-hover:animate-pulse relative z-10" aria-hidden="true" />
                <span className="relative z-10">{t('cta.inspection')}</span>
              </Button>
            </div>
            
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="group border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground font-bold text-lg px-10 py-7 h-auto rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              >
                <span>{t('cta.inquiry')}</span>
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default CTA;
