import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Phone, Sparkles, Check, ArrowRight, Shield, Droplets, Clock, Palette, Layers, ThermometerSun, Paintbrush, Hammer } from "lucide-react";
import PriceTable from "@/components/PriceTable";

const innovativeServices = services.filter(s => s.isInnovative);

const comparisonData = [
  {
    feature: "Дебелина",
    microcement: "2-3 мм",
    terrazzo: "15-25 мм",
    flakeFloor: "3-5 мм",
    stoneCarpet: "8-12 мм"
  },
  {
    feature: "Водоустойчивост",
    microcement: "Отлична",
    terrazzo: "Много добра",
    flakeFloor: "Отлична",
    stoneCarpet: "Пропусклив"
  },
  {
    feature: "Приложение",
    microcement: "Интериор",
    terrazzo: "Интериор",
    flakeFloor: "Интериор/Гаражи",
    stoneCarpet: "Екстериор"
  },
  {
    feature: "Подово отопление",
    microcement: "Да",
    terrazzo: "Да",
    flakeFloor: "Да",
    stoneCarpet: "Да"
  },
  {
    feature: "Издръжливост",
    microcement: "15+ години",
    terrazzo: "75+ години",
    flakeFloor: "10+ години",
    stoneCarpet: "20+ години"
  },
  {
    feature: "Време за полагане",
    microcement: "5-7 дни",
    terrazzo: "7-10 дни",
    flakeFloor: "2-3 дни",
    stoneCarpet: "1-2 дни"
  },
  {
    feature: "Ориентировъчна цена",
    microcement: "67 лв./кв.м",
    terrazzo: "133 лв./кв.м",
    flakeFloor: "95 лв./кв.м",
    stoneCarpet: "114 лв./кв.м"
  }
];

const benefits = [
  {
    icon: Shield,
    title: "Дълготрайност",
    description: "Издръжливи покрития с гаранция до 75 години"
  },
  {
    icon: Palette,
    title: "Безкрайни възможности",
    description: "Над 50 цвята и текстури за уникален дизайн"
  },
  {
    icon: Droplets,
    title: "Лесна поддръжка",
    description: "Безшевни повърхности - лесно почистване"
  },
  {
    icon: Clock,
    title: "Бързо полагане",
    description: "От 1 до 10 дни в зависимост от покритието"
  },
  {
    icon: ThermometerSun,
    title: "Подово отопление",
    description: "Съвместимост с всички отоплителни системи"
  },
  {
    icon: Layers,
    title: "Без демонтаж",
    description: "Полагане директно върху съществуващи покрития"
  }
];

const InnovativeCoatings = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": "Иновативни покрития", "item": "https://renovivo.bg/innovative-coatings" }
    ]
  };

  const coatingsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Иновативни покрития",
    "description": "Модерни безшевни покрития - микроцимент, Terrazzo, Flake Floor, каменен килим",
    "itemListElement": innovativeServices.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": service.title,
        "description": service.shortDescription,
        "url": `https://renovivo.bg/services/${service.id}`
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>Иновативни покрития София | Микроцимент, Terrazzo, Flake Floor - Renovivo</title>
        <meta name="description" content="Модерни безшевни покрития в София - микроцимент, Terrazzo, Flake Floor и каменен килим. Иновативни решения за под и стени. Дълготрайност до 75 години!" />
        <meta name="keywords" content="микроцимент София, Terrazzo под, Flake Floor, каменен килим, безшевни подове, декоративни покрития, иновативни настилки" />
        <link rel="canonical" href="https://renovivo.bg/innovative-coatings" />
        <meta property="og:title" content="Иновативни покрития София | Renovivo" />
        <meta property="og:description" content="Микроцимент, Terrazzo, Flake Floor и каменен килим - модерни безшевни покрития." />
        <meta property="og:url" content="https://renovivo.bg/innovative-coatings" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(coatingsSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Иновативни решения
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Модерни покрития за
              <span className="text-primary"> бъдещето</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Открийте иновативни безшевни покрития, които трансформират пространства с минималистична елегантност и изключителна издръжливост.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+359893712919">
                  <Phone className="mr-2 h-5 w-5" />
                  Безплатна консултация
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#comparison">
                  Сравни покрития
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-none bg-background/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Нашите иновативни покрития
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Всяко покритие има своите уникални характеристики и приложения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovativeServices.map((service) => {
              // Technical specs for blueprint overlay
              const techSpecs: Record<string, { thickness: string; adhesion: string; grade: string; durability: string }> = {
                microcement: { thickness: "2-3mm", adhesion: "High", grade: "A+", durability: "15+ yrs" },
                terrazzo: { thickness: "15-25mm", adhesion: "Very High", grade: "A++", durability: "75+ yrs" },
                "flake-floor": { thickness: "3-5mm", adhesion: "High", grade: "A+", durability: "10+ yrs" },
                "stone-carpet": { thickness: "8-12mm", adhesion: "Medium", grade: "B+", durability: "20+ yrs" },
              };
              const specs = techSpecs[service.id] || { thickness: "3mm", adhesion: "High", grade: "A+", durability: "10+ yrs" };

              return (
                <Card key={service.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Technical Blueprint Overlay - appears on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      {/* Grid overlay */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '30px 30px'
                        }}
                      />
                      {/* Gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
                      
                      {/* Technical specs in monospace font */}
                      <div className="absolute bottom-4 left-4 right-4 font-mono text-xs text-primary-foreground/90 space-y-1">
                        <div className="flex justify-between border-b border-primary-foreground/20 pb-1">
                          <span className="opacity-70">THICKNESS:</span>
                          <span className="font-medium">{specs.thickness}</span>
                        </div>
                        <div className="flex justify-between border-b border-primary-foreground/20 pb-1">
                          <span className="opacity-70">ADHESION:</span>
                          <span className="font-medium">{specs.adhesion}</span>
                        </div>
                        <div className="flex justify-between border-b border-primary-foreground/20 pb-1">
                          <span className="opacity-70">CLASS:</span>
                          <span className="font-medium text-primary">{specs.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">DURABILITY:</span>
                          <span className="font-medium">{specs.durability}</span>
                        </div>
                      </div>
                      
                      {/* Corner technical markers */}
                      <div className="absolute top-4 right-4 font-mono text-[10px] text-primary-foreground/60 text-right">
                        <div>REF: {service.id.toUpperCase()}</div>
                        <div>SPEC v2.0</div>
                      </div>
                    </div>
                    
                    <Badge className="absolute top-4 left-4 bg-primary z-10">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Иновация
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                        <p className="text-muted-foreground text-sm">{service.shortDescription}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/services/${service.id}`}>
                        Научете повече
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Ценоразпис
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Цени на иновативни покрития
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Прозрачни цени за всички видове безшевни покрития
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <PriceTable categorySlug="inovativni-pokritia" title="Иновативни покрития" />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Сравнение на покрития
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Изберете идеалното покритие според вашите нужди
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-6 py-4 text-left font-semibold">Характеристика</th>
                  <th className="px-6 py-4 text-center font-semibold">Микроцимент</th>
                  <th className="px-6 py-4 text-center font-semibold">Terrazzo</th>
                  <th className="px-6 py-4 text-center font-semibold">Flake Floor</th>
                  <th className="px-6 py-4 text-center font-semibold">Каменен килим</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                    <td className="px-6 py-4 font-medium text-foreground">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.microcement}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.terrazzo}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.flakeFloor}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.stoneCarpet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Галерия проекти
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Вижте как иновативните покрития трансформират пространства
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {innovativeServices.flatMap(service => 
              service.gallery.map((img, index) => (
                <div 
                  key={`${service.id}-${index}`} 
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${service.title} галерия`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                    <Badge className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.title}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готови за иновация?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Свържете се с нас за безплатна консултация и оферта за вашия проект с иновативни покрития.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+359893712919">
                <Phone className="mr-2 h-5 w-5" />
                Обадете се сега
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">
                Форма за контакт
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InnovativeCoatings;
