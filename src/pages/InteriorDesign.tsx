import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, Palette, Lightbulb, Layers, Eye, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const designServices = [
  {
    icon: Palette,
    title: "Цветови концепции",
    description: "Избор на цветова палитра, която отразява вашия стил и създава желаната атмосфера."
  },
  {
    icon: Layers,
    title: "Материали и текстури",
    description: "Подбор на материали, настилки и текстури за хармоничен и функционален интериор."
  },
  {
    icon: Eye,
    title: "3D визуализация",
    description: "Реалистични 3D изображения, които показват как ще изглежда вашият дом преди ремонта."
  },
  {
    icon: Lightbulb,
    title: "Осветление",
    description: "Проектиране на осветителна система - естествено и изкуствено осветление."
  },
];

const processSteps = [
  { step: 1, title: "Среща и бриф", description: "Обсъждаме вашите желания, начин на живот и бюджет." },
  { step: 2, title: "Анализ и концепция", description: "Изготвяме цялостна концепция с мудборд и цветови схеми." },
  { step: 3, title: "3D проект", description: "Създаваме реалистична 3D визуализация на всяко помещение." },
  { step: 4, title: "Техническа документация", description: "Подготвяме подробни чертежи и спецификации за изпълнение." },
  { step: 5, title: "Авторски надзор", description: "Наблюдаваме изпълнението, за да гарантираме съответствие с проекта." },
];

const InteriorDesign = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://renovivo.bg/services" },
      { "@type": "ListItem", "position": 3, "name": "Интериорен дизайн", "item": "https://renovivo.bg/services/interior-design" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Интериорен дизайн София | Renovivo - 3D проектиране и визуализация</title>
        <meta 
          name="description" 
          content="Професионален интериорен дизайн в София - цялостна концепция, 3D визуализация, избор на материали и цветове. Превърнете мечтите си в реалност с Renovivo." 
        />
        <meta name="keywords" content="интериорен дизайн София, 3D визуализация, проектиране на интериор, дизайн на апартамент, интериорен проект" />
        <link rel="canonical" href="https://renovivo.bg/services/interior-design" />
        <meta property="og:title" content="Интериорен дизайн София | Renovivo" />
        <meta property="og:description" content="Цялостна концепция за вашия интериор - от идея до реализация с 3D визуализация." />
        <meta property="og:url" content="https://renovivo.bg/services/interior-design" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Дизайн услуги</span>
              <h1 className="text-4xl md:text-5xl font-bold text-background mt-3 mb-6">
                Интериорен дизайн
              </h1>
              <p className="text-background/80 text-lg">
                Цялостна концепция за вашия дом. От първоначалната идея до реализация - 
                с внимание към всеки детайл и вашия уникален стил.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Какво включва услугата</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Предлагаме пълен спектър от дизайнерски услуги за вашия дом или бизнес пространство.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designServices.map((service, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-secondary/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Как работим</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Структуриран процес за безпроблемно и ефективно изпълнение на вашия проект.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Защо да изберете нашите дизайн услуги</h2>
                <div className="space-y-4">
                  {[
                    "Спестявате време от безкрайно търсене на материали и мебели",
                    "Виждате резултата преди да започне ремонтът",
                    "Избягвате скъпи грешки при избор на цветове и материали",
                    "Получавате функционално и естетично пространство",
                    "Координираме всички доставчици и изпълнители",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="border-0 shadow-xl bg-foreground text-background">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Безплатна консултация</h3>
                  <p className="text-background/80 mb-6">
                    Обсъдете вашия проект с нашите дизайнери. Ще ви помогнем да определите стила, 
                    бюджета и сроковете за вашия интериор.
                  </p>
                  <a href="tel:+359893712919">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      <Phone className="h-5 w-5 mr-2" />
                      Обадете се сега
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-12 bg-secondary/30">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-6">Свързани услуги</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/services/full-renovation" className="group">
                <Card className="hover:border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-5 flex items-center justify-between">
                    <span className="font-medium group-hover:text-primary transition-colors">Цялостен ремонт</span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
              <Link to="/services/painting" className="group">
                <Card className="hover:border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-5 flex items-center justify-between">
                    <span className="font-medium group-hover:text-primary transition-colors">Боядисване</span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
              <Link to="/innovative-coatings" className="group">
                <Card className="hover:border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-5 flex items-center justify-between">
                    <span className="font-medium group-hover:text-primary transition-colors">Иновативни покрития</span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Готови да започнем?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Свържете се с нас за безплатна консултация и индивидуална оферта за вашия интериорен проект.
            </p>
            <a href="tel:+359893712919">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-semibold">
                <Phone className="h-5 w-5 mr-2" />
                +359 89 371 29 19
              </Button>
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default InteriorDesign;