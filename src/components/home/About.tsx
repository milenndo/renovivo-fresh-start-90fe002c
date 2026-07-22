import { Check, Users, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import aboutTeamImg from "@/assets/images/about-team.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const About = () => {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    'about.feature1',
    'about.feature2',
    'about.feature3',
    'about.feature4',
    'about.feature5',
    'about.feature6',
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/50 rounded-full blur-[100px]" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side with Enhanced Styling */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative z-10 group">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={aboutTeamImg}
                  alt="Renovivo team at work"
                  width={665}
                  height={499}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ aspectRatio: '665/499' }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 md:right-6 bg-card p-5 rounded-2xl shadow-xl border border-border/50 backdrop-blur-sm z-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <span className="font-bold text-2xl text-foreground block">127+</span>
                    <span className="text-sm text-muted-foreground">{t('about.projects')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary rounded-2xl -z-10" />
            
            {/* Dotted pattern */}
            <div 
              className="absolute top-1/2 -left-12 w-24 h-24 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(hsl(var(--primary)) 2px, transparent 2px)',
                backgroundSize: '12px 12px'
              }}
            />
          </div>

          {/* Content Side */}
          <div 
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-0.5 bg-primary" />
              {t('about.label')}
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 leading-tight">
              {t('about.title')}
            </h2>
            
            <p className="text-muted-foreground mb-5 leading-relaxed text-lg">
              {t('about.p1')}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t('about.p2')}
            </p>

            {/* Features list with staggered animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((featureKey, index) => (
                <div 
                  key={featureKey} 
                  className={`flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:translate-x-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{t(featureKey)}</span>
                </div>
              ))}
            </div>

            {/* Benefits Card */}
            <div className="flex flex-wrap gap-6 mb-8 p-6 bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl border border-border/50">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="font-bold block text-lg">127 {t('about.projects')}</span>
                  <span className="text-sm text-muted-foreground">94% {t('about.recommend')}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="font-bold block text-lg">5 {t('about.warranty')}</span>
                  <span className="text-sm text-muted-foreground">{t('about.warrantyAll')}</span>
                </div>
              </div>
            </div>

            <Link to="/about">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1">
                {t('about.cta')}
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
