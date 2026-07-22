import { useState, useEffect, useRef } from "react";
import { Calculator, FolderOpen, CheckCircle2, Award, Shield, Sparkles, ChevronDown } from "lucide-react";
import heroPoster from "@/assets/images/hero-poster.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
      clearTimeout(timer);
    };
  }, []);

  const stats = [
    { icon: CheckCircle2, value: "127", labelKey: 'hero.stats.projects' },
    { icon: Award, value: "94%", labelKey: 'hero.stats.recommend' },
    { icon: Shield, value: "5", labelKey: 'hero.stats.warranty' },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* LCP Poster image */}
        <img
          src={heroPoster}
          alt="Renovivo - professional renovations in Sofia"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="sync"
          loading="eager"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            videoLoaded && !prefersReducedMotion ? "opacity-0 scale-105" : "opacity-50"
          }`}
          style={{ aspectRatio: '16/9' }}
        />
        
        {/* Video with enhanced reveal */}
        {!prefersReducedMotion && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width={1920}
            height={1080}
            poster={heroPoster}
            onCanPlay={() => setVideoLoaded(true)}
            aria-label="Luxury penthouse interior transformation video"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              videoLoaded ? "opacity-50 scale-100" : "opacity-0 scale-110"
            }`}
            style={{ aspectRatio: '16/9' }}
          >
            <source src="/videos/hero-background.webm?v=2" type="video/webm" />
            <track kind="captions" src="" label="No subtitles" default />
          </video>
        )}
        
        {/* Premium Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/40 to-foreground/90" />
        
        {/* Radial spotlight effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,transparent_20%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Premium Badge with Shine Effect */}
          <div 
            className={`inline-flex items-center gap-2.5 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 backdrop-blur-xl px-6 py-3 rounded-full mb-10 border border-primary/40 shadow-2xl shadow-primary/20 relative overflow-hidden transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full animate-shimmer" />
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary text-sm font-bold tracking-widest uppercase relative z-10">
              {t('hero.badge')}
            </span>
          </div>

          {/* Epic Headline with Staggered Animation */}
          <h1 className="mb-8 sm:mb-10">
            <span 
              className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <span className="text-primary drop-shadow-[0_0_60px_rgba(212,175,55,0.5)] relative">
                {t('hero.title1')}
                {/* Glowing underline */}
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              </span>
            </span>
            <span 
              className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] mt-4 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <span className="text-background drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] bg-clip-text">
                {t('hero.title2')}
              </span>
            </span>
          </h1>

          {/* Elegant Subtitle with Decorative Lines */}
          <div 
            className={`flex items-center justify-center gap-6 mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="hidden sm:block h-[2px] w-24 bg-gradient-to-r from-transparent via-primary/60 to-primary" />
            <p className="text-lg sm:text-xl md:text-2xl text-background/90 font-medium tracking-wide max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="hidden sm:block h-[2px] w-24 bg-gradient-to-l from-transparent via-primary/60 to-primary" />
          </div>

          {/* CTA Buttons with Premium Styling */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/pricing" className="w-full sm:w-auto group">
              <Button
                size="lg"
                className="relative w-full overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 h-auto rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-500 hover:shadow-primary/50 hover:scale-105 hover:-translate-y-1"
              >
                {/* Button shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 mr-3 group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">{t('hero.cta.pricing')}</span>
              </Button>
            </Link>
            
            <Link to="/portfolio" className="w-full sm:w-auto group">
              <Button
                size="lg"
                variant="outline"
                className="relative w-full overflow-hidden border-2 border-background/50 bg-background/10 text-background hover:bg-background hover:text-foreground font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 h-auto rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:border-background"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-3 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">{t('hero.cta.portfolio')}</span>
              </Button>
            </Link>
          </div>

          {/* Premium Stats Cards */}
          <div 
            className={`grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-[800ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-background/10 via-background/5 to-transparent backdrop-blur-xl border border-background/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                {/* Card shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="h-5 w-5 sm:h-7 sm:w-7 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-primary tabular-nums">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-background/70 group-hover:text-background/90 text-xs sm:text-sm font-medium tracking-wide transition-colors">
                    {t(stat.labelKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent z-10 pointer-events-none" />
      
      {/* Animated Scroll Indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button 
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          className="flex flex-col items-center gap-3 group cursor-pointer"
          aria-label={t('hero.scroll')}
        >
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            {t('hero.scroll')}
          </span>
          <div className="relative w-7 h-12 rounded-full border-2 border-primary/40 group-hover:border-primary/70 transition-colors flex justify-center overflow-hidden">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
          </div>
          <ChevronDown className="h-5 w-5 text-primary/60 group-hover:text-primary animate-bounce transition-colors" style={{ animationDelay: '0.2s' }} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
