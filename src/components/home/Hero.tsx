import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroPoster from "@/assets/images/hero-poster.jpg";
import heroBackground from "@/assets/images/projects/living-room-detail.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { openModal } = useInspectionRequest();
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => { mq.removeEventListener("change", handler); clearTimeout(timer); };
  }, []);

  // Background video: desktop only, and only after the page has had time to paint,
  // so it never competes with the hero image for bandwidth on mobile / first load.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const timer = window.setTimeout(() => setAllowVideo(true), 2500);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative bg-background text-foreground min-h-screen flex items-center justify-center px-4 md:px-8 py-10 md:py-14 overflow-hidden"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-0 border border-primary/20 bg-background">
        {/* Vertical editorial sidebar */}
        <aside className="hidden lg:flex lg:col-span-1 border-r border-primary/20 flex-col items-center justify-between py-12">
          <div className="[writing-mode:vertical-lr] rotate-180 text-[10px] tracking-[0.5em] text-primary uppercase font-medium">
            EST. 2024 / СОФИЯ
          </div>
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <div className="[writing-mode:vertical-lr] text-[10px] tracking-[0.5em] text-primary uppercase font-medium">
            RENOVIVO
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-11 flex flex-col relative">
          {/* Cinematic backdrop for the top panel only */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={heroBackground}
              alt="Renovivo — луксозен интериор след ремонт"
              width={1920}
              height={1071}
              fetchPriority="high"
              decoding="sync"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
            />
            {allowVideo && (
              <video
                autoPlay muted loop playsInline preload="metadata"
                width={1920} height={1080} poster={heroPoster}
                onCanPlay={() => setVideoLoaded(true)}
                aria-label="Интериор след ремонт"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  videoLoaded ? "opacity-30" : "opacity-0"
                }`}
              >
                <source src="/videos/hero-background.webm?v=2" type="video/webm" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Editorial header */}
          <div className={`relative p-8 md:p-16 border-b border-primary/20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-primary" />
                  <h1 className="eyebrow">{t('hero.badge') || 'Ремонт на жилища'}</h1>
                </div>
                <p aria-label="Renovivo" className="text-6xl sm:text-7xl md:text-[9rem] lg:text-[10rem] display-serif text-foreground tracking-tight">
                  <span className="text-primary">R</span>eno<br /><span className="text-primary">v</span>ivo
                </p>
                <p className="text-sm md:text-base tracking-[0.5em] uppercase font-medium pt-2 wordmark-tagline">
                  Every Detail Matters
                </p>
              </div>

              <div className="max-w-sm space-y-8">
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base font-light">
                  Ремонт на апартаменти и къщи в София и региона. Работим по
                  ясен план, с фиксирана цена и договор, и поемаме целия
                  процес — от огледа до предаването на готовия обект.
                </p>
                <div className="flex flex-col gap-4">
                  <Button size="lg" onClick={openModal} className="w-fit px-8 font-semibold">
                    Заявете безплатен оглед
                  </Button>
                  <Link to="/portfolio" className="group inline-flex items-center gap-4 w-fit">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/70 group-hover:text-primary transition-colors">
                      Вижте портфолиото
                    </span>
                    <span className="w-8 h-px bg-primary/50 transition-all duration-500 group-hover:w-20 group-hover:bg-primary" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature magazine grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[420px]">
            {/* Featured project tile */}
            <Link to="/portfolio" className="relative group border-r border-b lg:border-b-0 border-primary/20 overflow-hidden min-h-[280px] bg-secondary">
              <img
                src={heroPoster}
                alt="Проект на Renovivo"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] text-primary tracking-[0.3em] uppercase mb-2 block">Актуален проект</span>
                <h3 className="text-2xl font-bold text-foreground">Апартамент №42</h3>
              </div>
            </Link>

            {/* Services */}
            <div className="p-10 flex flex-col justify-between border-r border-b lg:border-b-0 border-primary/20 bg-card">
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-primary text-4xl font-thin italic">01.</span>
                  <h4 className="text-lg font-bold tracking-widest text-foreground uppercase">Планиране</h4>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    Оглед на място, ясен план на работата, детайлна оферта
                    с материали, количества и срокове.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-primary text-4xl font-thin italic">02.</span>
                  <h4 className="text-lg font-bold tracking-widest text-foreground uppercase">Изпълнение</h4>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    Постоянен екип майстори, ежедневни снимки от обекта
                    и един отговорен ръководител.
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <Link to="/services" className="text-[10px] text-primary border-b border-primary/40 pb-1 tracking-[0.2em] uppercase font-bold hover:border-primary transition-colors">
                  Вижте всички услуги
                </Link>
              </div>
            </div>

            {/* Peace of mind */}
            <div className="p-10 flex flex-col bg-background">
              <div className="flex-1 flex flex-col justify-center text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <h2 className="text-3xl font-light tracking-tight text-foreground">
                  Ремонт без <span className="text-primary italic">изненади</span>
                </h2>
                <p className="text-sm text-foreground/60 max-w-xs mx-auto">
                  Фиксирана цена по договор, спазени срокове и един контакт
                  за всички въпроси. Вие получавате готовия обект навреме.
                </p>
                <div className="pt-2">
                  <div className="inline-block p-4 border border-primary/20">
                    <p className="text-[10px] tracking-[0.4em] text-primary uppercase font-bold">2 години гаранция</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
