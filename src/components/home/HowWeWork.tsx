import { Eye, FileText, Hammer, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const HowWeWork = () => {
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

  const steps = [
    {
      icon: Eye,
      number: "01",
      titleKey: 'howWeWork.step1.title',
      descKey: 'howWeWork.step1.desc',
    },
    {
      icon: FileText,
      number: "02",
      titleKey: 'howWeWork.step2.title',
      descKey: 'howWeWork.step2.desc',
    },
    {
      icon: Hammer,
      number: "03",
      titleKey: 'howWeWork.step3.title',
      descKey: 'howWeWork.step3.desc',
    },
    {
      icon: ShieldCheck,
      number: "04",
      titleKey: 'howWeWork.step4.title',
      descKey: 'howWeWork.step4.desc',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-muted/30 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Hammer className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Процес</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('howWeWork.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('howWeWork.subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-14 left-[55%] w-[90%] items-center">
                  <div 
                    className={`h-0.5 bg-gradient-to-r from-primary/50 to-border flex-grow transition-all duration-1000 ${
                      isVisible ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ 
                      transformOrigin: 'left',
                      transitionDelay: `${(index + 1) * 200}ms`
                    }}
                  />
                  <ArrowRight 
                    className={`h-4 w-4 text-primary/50 flex-shrink-0 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 200 + 300}ms` }}
                  />
                </div>
              )}
              
              {/* Card */}
              <div className="relative bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden h-full">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Number & Icon Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                        <step.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      {/* Animated ring */}
                      <div className="absolute -inset-1 rounded-2xl border-2 border-primary/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <span className="text-5xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors" aria-hidden="true">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(step.descKey)}
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

export default HowWeWork;
