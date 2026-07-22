import { useState, useMemo, useEffect, useRef } from "react";
import { Home, Bath, ChefHat, Sofa, ArrowRight, Sparkles } from "lucide-react";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";

type Scope = { id: string; label: string; icon: any; factor: number };
type Tier = { id: string; label: string; note: string; multiplier: number };

const scopes: Scope[] = [
  { id: "full", label: "Цялостен ремонт", icon: Home, factor: 1.0 },
  { id: "bath", label: "Само баня", icon: Bath, factor: 0.35 },
  { id: "kitchen", label: "Само кухня", icon: ChefHat, factor: 0.4 },
  { id: "living", label: "Дневна / спалня", icon: Sofa, factor: 0.3 },
];

const tiers: Tier[] = [
  { id: "essential", label: "Essential", note: "Премиум завършеки, italian tiles", multiplier: 1 },
  { id: "signature", label: "Signature", note: "Микроцимент, дизайнерски осветителни тела", multiplier: 1.35 },
  { id: "bespoke", label: "Bespoke", note: "Авторски мебели, smart home, terrazzo", multiplier: 1.75 },
];

const format = (n: number) =>
  new Intl.NumberFormat("bg-BG", { maximumFractionDigits: 0 }).format(n);

const BespokeEstimator = () => {
  const { openModal } = useInspectionRequest();
  const [area, setArea] = useState(75);
  const [scopeId, setScopeId] = useState<string>("full");
  const [tierId, setTierId] = useState<string>("signature");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scope = scopes.find((s) => s.id === scopeId)!;
  const tier = tiers.find((t) => t.id === tierId)!;

  const { low, high } = useMemo(() => {
    // Base rate 850 BGN/m² essential, applied by scope factor & tier multiplier.
    const base = 850 * area * scope.factor * tier.multiplier;
    return { low: base * 0.9, high: base * 1.15 };
  }, [area, scope, tier]);

  return (
    <section
      ref={sectionRef}
      id="estimator"
      className="relative bg-background py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Editorial header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-primary" />
            <span className="eyebrow flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Bespoke estimator
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="display-serif text-4xl md:text-6xl text-foreground mb-6">
            Ориентировъчна <span className="text-primary italic">инвестиция</span>
          </h2>
          <p className="text-foreground/60 text-base md:text-lg font-light leading-relaxed">
            За 30 секунди получавате диапазон, основан на 127+ реализирани проекта
            в София. Точната оферта следва след безплатен архитектурен оглед.
          </p>
        </div>

        {/* Estimator card */}
        <div
          className={`relative border border-primary/25 bg-card/70 backdrop-blur-sm transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Corner marks */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} w-4 h-4 border-primary/60`}
              style={{
                borderTopWidth: pos.includes("top") ? "1px" : 0,
                borderBottomWidth: pos.includes("bottom") ? "1px" : 0,
                borderLeftWidth: pos.includes("left") ? "1px" : 0,
                borderRightWidth: pos.includes("right") ? "1px" : 0,
              }}
            />
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Inputs */}
            <div className="lg:col-span-3 p-8 md:p-12 space-y-10 border-b lg:border-b-0 lg:border-r border-primary/20">
              {/* Scope */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow">01 · Обхват</span>
                  <span className="text-xs text-foreground/50">Изберете тип проект</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {scopes.map((s) => {
                    const active = s.id === scopeId;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setScopeId(s.id)}
                        className={`group text-left p-4 border transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 hover:border-primary/60 bg-transparent"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 mb-3 transition-colors ${
                            active ? "text-primary" : "text-foreground/60 group-hover:text-primary"
                          }`}
                        />
                        <span className="block text-sm font-semibold tracking-tight text-foreground">
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Area */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow">02 · Квадратура</span>
                  <span className="text-sm text-primary font-semibold tabular-nums">
                    {area} м²
                  </span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={250}
                  step={5}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-primary/20 rounded-none appearance-none cursor-pointer"
                  aria-label="Квадратура"
                />
                <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase text-foreground/40 mt-2">
                  <span>25 м²</span>
                  <span>250 м²</span>
                </div>
              </div>

              {/* Tier */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow">03 · Ниво</span>
                  <span className="text-xs text-foreground/50">Материали и завършек</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tiers.map((t) => {
                    const active = t.id === tierId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTierId(t.id)}
                        className={`text-left p-4 border transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 hover:border-primary/60"
                        }`}
                      >
                        <span
                          className={`block text-lg font-bold tracking-tight ${
                            active ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {t.label}
                        </span>
                        <span className="block text-xs text-foreground/50 mt-1 leading-relaxed">
                          {t.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2 p-8 md:p-12 bg-background/70 flex flex-col justify-between gap-8">
              <div>
                <span className="eyebrow block mb-4">Ориентировъчна инвестиция</span>
                <div className="space-y-2">
                  <div className="display-serif text-4xl md:text-5xl text-primary tabular-nums leading-none">
                    {format(low)} – {format(high)}
                  </div>
                  <div className="text-xs tracking-[0.3em] uppercase text-foreground/50">
                    лв. без ДДС · труд + материали
                  </div>
                </div>

                <div className="hairline h-px my-8" />

                <ul className="space-y-3 text-sm text-foreground/70 font-light">
                  <li className="flex justify-between">
                    <span>Обхват</span>
                    <span className="text-foreground">{scope.label}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Квадратура</span>
                    <span className="text-foreground">{area} м²</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ниво</span>
                    <span className="text-foreground">{tier.label}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  onClick={openModal}
                  className="group w-full flex items-center justify-between px-5 py-4 bg-primary text-primary-foreground font-bold text-xs tracking-[0.3em] uppercase hover:bg-primary/90 transition-colors"
                >
                  <span>Заяви точна оферта</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] leading-relaxed text-foreground/45">
                  Диапазонът е ориентировъчен и не представлява оферта. Финалната
                  цена се формира след оглед на място и одобрен проектен обхват.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BespokeEstimator;
