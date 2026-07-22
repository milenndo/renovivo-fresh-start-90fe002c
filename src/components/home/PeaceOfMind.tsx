import { User, Calculator, FileText, Sparkles, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const PeaceOfMind = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: User,
      titleKey: 'peace.manager.title',
      descKey: 'peace.manager.desc',
      gradient: 'from-primary/20 to-primary/5',
    },
    {
      icon: Calculator,
      titleKey: 'peace.budget.title',
      descKey: 'peace.budget.desc',
      gradient: 'from-primary/15 to-primary/5',
    },
    {
      icon: FileText,
      titleKey: 'peace.contract.title',
      descKey: 'peace.contract.desc',
      gradient: 'from-primary/20 to-primary/5',
    },
    {
      icon: Sparkles,
      titleKey: 'peace.clean.title',
      descKey: 'peace.clean.desc',
      gradient: 'from-primary/15 to-primary/5',
    },
    {
      icon: Shield,
      titleKey: 'peace.warranty.title',
      descKey: 'peace.warranty.desc',
      gradient: 'from-primary/20 to-primary/5',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Гаранции</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('peace.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon with animated ring */}
                  <div className="relative mb-5 inline-flex">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <reason.icon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Animated ring */}
                    <div className="absolute -inset-1 rounded-2xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(reason.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeaceOfMind;
