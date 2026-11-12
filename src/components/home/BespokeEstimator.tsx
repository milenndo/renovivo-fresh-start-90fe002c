import { useState, useMemo } from "react";
import { Home, Building2, TrendingUp, Bath, ArrowRight, Sparkles } from "lucide-react";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useLanguage } from "@/contexts/LanguageContext";

type Scope = {
  id: string;
  labelBg: string;
  labelEn: string;
  subBg: string;
  subEn: string;
  icon: any;
};

type Tier = {
  id: string;
  labelBg: string;
  labelEn: string;
  noteBg: string;
  noteEn: string;
  minEur: number;
  maxEur: number | null;
};

const scopes: Scope[] = [
  {
    id: "full",
    labelBg: "Цялостен ремонт",
    labelEn: "Full Turnkey Renovation",
    subBg: "Старо строителство до ключ",
    subEn: "Old construction A to Z",
    icon: Home,
  },
  {
    id: "bds",
    labelBg: "Довършване по БДС",
    labelEn: "New Build (BDS) Finishing",
    subBg: "Ново строителство (Акт 16)",
    subEn: "Shell & core to move-in",
    icon: Building2,
  },
  {
    id: "invest",
    labelBg: "Инвестиционен имот",
    labelEn: "Investment Property",
    subBg: "За наем или препродажба",
    subEn: "Optimized for ROI & speed",
    icon: TrendingUp,
  },
  {
    id: "bath",
    labelBg: "Цялостна баня",
    labelEn: "Complete Bathroom",
    subBg: "ВиК, плочки / микроцимент",
    subEn: "Plumbing, tiles / microcement",
    icon: Bath,
  },
];

const tiers: Tier[] = [
  {
    id: "base",
    labelBg: "Базово ниво",
    labelEn: "Essential Standard",
    noteBg:
      "Цялостни довършителни работи с високо качество на изпълнението. Сертифицирани материали от среден клас — идеално за инвестиционни имоти.",
    noteEn:
      "High-quality finishing works with reliable mid-range materials — ideal for rental and investment properties in Sofia.",
    minEur: 100,
    maxEur: 300,
  },
  {
    id: "turnkey",
    labelBg: "Завършване до ключ",
    labelEn: "Turnkey Comfort",
    noteBg:
      "Базово + подови настилки, интериорни врати, климатизация, ел. ключове и контакти, осветителни тела и баня до ключ. Материали от среден до висок клас.",
    noteEn:
      "Essential + flooring, interior doors, HVAC, switches, lighting, and complete bathroom. Mid-to-high-end materials.",
    minEur: 301,
    maxEur: 500,
  },
  {
    id: "premium",
    labelBg: "Премиум (с мебели)",
    labelEn: "Bespoke Premium",
    noteBg:
      "Напълно завършен имот от А до Я с включени кухни и корпусни мебели по поръчка, дизайнерски безшевни покрития и премиум клас материали.",
    noteEn:
      "Fully completed property with bespoke custom kitchen & cabinetry, seamless coatings (microcement/terrazzo), and luxury materials.",
    minEur: 500,
    maxEur: null,
  },
];

const fmt = (n: number, isEn: boolean) =>
  new Intl.NumberFormat(isEn ? "en-US" : "bg-BG", {
    maximumFractionDigits: 0,
  }).format(n);

const BespokeEstimator = () => {
  const { openModal } = useInspectionRequest();
  const { language } = useLanguage();
  const isEn = language === "en";

  const [area, setArea] = useState(85);
  const [scopeId, setScopeId] = useState<string>("full");
  const [tierId, setTierId] = useState<string>("turnkey");

  const scope = scopes.find((s) => s.id === scopeId)!;
  const tier = tiers.find((t) => t.id === tierId)!;
  const isBathroom = scopeId === "bath";

  const estimate = useMemo(() => {
    if (isBathroom) return null;
    const lowEur = tier.minEur * area;
    const highEur = tier.maxEur ? tier.maxEur * area : null;
    return { lowEur, highEur };
  }, [area, tier, isBathroom]);

  return (
    <section
      id="estimator"
      aria-labelledby="estimator-heading"
      className="relative bg-background py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-primary" />
            <span className="eyebrow flex items-center gap-2">
              <Sparkles className="w-3 h-3" />{" "}
              {isEn ? "Instant Budget Calculator" : "Калкулатор за цялостен ремонт"}
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2
            id="estimator-heading"
            className="display-serif text-4xl md:text-6xl text-foreground mb-6"
          >
            {isEn ? (
              <>
                Indicative <span className="text-primary italic">Budget</span> & Prices
              </>
            ) : (
              <>
                Ориентировъчна <span className="text-primary italic">оферта</span> и цени
              </>
            )}
          </h2>
          <p className="text-foreground/60 text-base md:text-lg font-light leading-relaxed">
            {isEn
              ? "In 30 seconds, calculate a realistic budget range for your apartment or house renovation in Sofia based on property type, area, and finishing level. Exact fixed price follows a free on-site inspection."
              : "За 30 секунди изчислете ориентировъчен бюджет за цялостен ремонт или довършителни работи по БДС в София според квадратурата и нивото на завършване. Точната КСС оферта изготвяме след безплатен оглед."}
          </p>
        </div>

        <div className="relative border border-primary/25 bg-card/70 backdrop-blur-sm">
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
            (pos) => (
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
            ),
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 md:p-12 space-y-10 border-b lg:border-b-0 lg:border-r border-primary/20">
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow">
                    {isEn ? "01 · Project Type" : "01 · Тип на проекта"}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {isEn ? "Select renovation scope" : "Изберете обхват на ремонта"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {scopes.map((s) => {
                    const active = s.id === scopeId;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setScopeId(s.id)}
                        className={`group text-left p-4 border transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 hover:border-primary/60 bg-transparent"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 mb-3 transition-colors ${
                            active
                              ? "text-primary"
                              : "text-foreground/60 group-hover:text-primary"
                          }`}
                        />
                        <span className="block text-sm font-semibold tracking-tight text-foreground">
                          {isEn ? s.labelEn : s.labelBg}
                        </span>
                        <span className="block text-[11px] text-foreground/50 mt-1">
                          {isEn ? s.subEn : s.subBg}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow">
                    {isEn ? "02 · Property Area" : "02 · Квадратура на имота"}
                  </span>
                  <span className="text-sm text-primary font-semibold tabular-nums">
                    {area} {isEn ? "m²" : "м²"}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={250}
                  step={5}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-primary/20 rounded-none appearance-none cursor-pointer"
                  aria-label={isEn ? "Property area in square meters" : "Квадратура в кв.м"}
                />
                <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase text-foreground/40 mt-2">
                  <span>20 {isEn ? "m²" : "м²"}</span>
                  <span>100 {isEn ? "m²" : "м²"}</span>
                  <span>250 {isEn ? "m²" : "м²"}</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="eyebrow">
                    {isEn ? "03 · Finishing Level" : "03 · Ниво на завършване"}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {isEn ? "Labor + Materials included" : "Включен труд и материали"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tiers.map((t) => {
                    const active = t.id === tierId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTierId(t.id)}
                        disabled={isBathroom}
                        className={`text-left p-4 border transition-all duration-300 ${
                          isBathroom
                            ? "border-primary/10 opacity-40 cursor-not-allowed"
                            : active
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 hover:border-primary/60"
                        }`}
                      >
                        <span
                          className={`block text-base font-bold tracking-tight ${
                            active && !isBathroom ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {isEn ? t.labelEn : t.labelBg}
                        </span>
                        <span className="block text-[11px] text-foreground/50 mt-1 leading-relaxed">
                          {isEn ? t.noteEn : t.noteBg}
                        </span>
                        <span className="block text-[11px] text-primary/80 mt-2 tabular-nums font-semibold">
                          {t.maxEur
                            ? `${t.minEur}–${t.maxEur} €/${isEn ? "m²" : "м²"}`
                            : `${isEn ? "from" : "от"} ${t.minEur} €/${isEn ? "m²" : "м²"}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 md:p-12 bg-background/70 flex flex-col justify-between gap-8">
              <div>
                <span className="eyebrow block mb-4">
                  {isEn ? "Estimated Investment" : "Ориентировъчна инвестиция"}
                </span>

                {isBathroom ? (
                  <div className="space-y-3">
                    <div className="display-serif text-2xl md:text-3xl text-primary leading-tight">
                      {isEn ? "Custom Quote After Inspection" : "По индивидуален проект"}
                    </div>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed">
                      {isEn
                        ? "Bathroom renovation costs depend on plumbing complexity, waterproofing, tile format or microcement, and sanitary ware class. Exact fixed price is provided after a free site inspection in Sofia."
                        : "При ремонт на баня цената зависи от ВиК разводките, формата на плочките или микроцимента и вградената санитария. Точната фиксирана стойност се определя след безплатен оглед в София."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="display-serif text-3xl md:text-4xl text-primary tabular-nums leading-none">
                      {estimate!.highEur
                        ? `${fmt(estimate!.lowEur, isEn)} – ${fmt(estimate!.highEur, isEn)} €`
                        : `${isEn ? "from" : "от"} ${fmt(estimate!.lowEur, isEn)} €`}
                    </div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 pt-1">
                      {isEn
                        ? "excl. VAT · labor + materials"
                        : "без ДДС · труд + материали"}
                    </div>
                  </div>
                )}

                <div className="hairline h-px my-8" />

                <ul className="space-y-3 text-sm text-foreground/70 font-light">
                  <li className="flex justify-between">
                    <span>{isEn ? "Project Type" : "Тип проект"}</span>
                    <span className="text-foreground font-medium">
                      {isEn ? scope.labelEn : scope.labelBg}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>{isEn ? "Property Area" : "Квадратура"}</span>
                    <span className="text-foreground font-medium">
                      {area} {isEn ? "m²" : "м²"}
                    </span>
                  </li>
                  {!isBathroom && (
                    <li className="flex justify-between">
                      <span>{isEn ? "Finishing Level" : "Ниво на изпълнение"}</span>
                      <span className="text-foreground font-medium">
                        {isEn ? tier.labelEn : tier.labelBg}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="group w-full flex items-center justify-between px-5 py-4 bg-primary text-primary-foreground font-bold text-xs tracking-[0.3em] uppercase hover:bg-primary/90 transition-colors"
                >
                  <span>
                    {isEn ? "Request Free Inspection & BOQ" : "Заяви безплатен оглед и КСС"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] leading-relaxed text-foreground/45">
                  {isEn
                    ? "The range is indicative. Your final fixed price is locked in a written contract after a free on-site inspection and approved Bill of Quantities (BOQ) in Sofia."
                    : "Диапазонът е ориентировъчен. Финалната фиксирана цена се записва в договор след безплатен оглед на място в София и одобрена количествено-стойностна сметка (КСС)."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sr-only">
          <h3>Ориентировъчни цени за цялостен ремонт на апартамент в София (2026 г.)</h3>
          <table>
            <caption>Цени за цялостен ремонт до ключ и довършителни работи в гр. София (труд и материали, без ДДС)</caption>
            <thead>
              <tr>
                <th>Пакет / Ниво на завършване</th>
                <th>Цена на кв.м (€/м²)</th>
                <th>Двустаен апартамент (65 м²)</th>
                <th>Тристаен апартамент (100 м²)</th>
                <th>Какво включва</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Базово ниво (Довършителни работи / Инвестиционен стандарт)</td>
                <td>100 – 300 €/м²</td>
                <td>6 500 – 19 500 €</td>
                <td>10 000 – 30 000 €</td>
                <td>Шпакловки, боядисване, базови довършителни работи с материали от среден клас.</td>
              </tr>
              <tr>
                <td>Завършване до ключ (Renovivo Comfort)</td>
                <td>301 – 500 €/м²</td>
                <td>19 565 – 32 500 €</td>
                <td>30 100 – 50 000 €</td>
                <td>Цялостен ремонт до ключ: ВиК и Ел., настилки, врати, баня, климатизация, осветление с материали среден към висок клас.</td>
              </tr>
              <tr>
                <td>Премиум изпълнение (Renovivo Premium с мебели по поръчка)</td>
                <td>от 500 €/м²</td>
                <td>от 32 500 €</td>
                <td>от 50 000 €</td>
                <td>Пълно управление от А до Я, интериорен дизайн, микроцимент/терацо, кухня и корпусни мебели по поръчка, премиум материали.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BespokeEstimator;
