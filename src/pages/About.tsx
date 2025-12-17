import { Helmet } from "react-helmet-async";
import { Check, Award, Users, Shield, Target, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import aboutTeamImg from "@/assets/images/about-team.jpg";
import qualityWorkImg from "@/assets/images/quality-work.jpg";

const values = [
  {
    icon: Target,
    title: "Прецизност",
    description: "Внимание към всеки детайл във всеки проект.",
  },
  {
    icon: Shield,
    title: "Качество",
    description: "Използваме само висококачествени материали.",
  },
  {
    icon: Heart,
    title: "Отдаденост",
    description: "Работим с любов към занаята.",
  },
  {
    icon: Users,
    title: "Екипност",
    description: "Силен екип от опитни професионалисти.",
  },
];


const AboutPage = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Начало", item: "https://renovivo.bg" },
      { "@type": "ListItem", position: 2, name: "За нас", item: "https://renovivo.bg/about" },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "За Renovivo",
    description: "Над 10 години опит na екипа в ремонтните услуги в София и района",
    mainEntity: {
      "@type": "Organization",
      name: "Renovivo",
      foundingDate: "2025",
      numberOfEmployees: "15+",
      slogan: "Every Deta Matters",
    },
  };

  return (
    <>
      <Helmet>
        <title>За нас | Renovivo - Ремонтна фирма София изградена от екип с над 10 години опит</title>
        <meta
          name="description"
          content="Renovivo фирма основа през 2025 г. в София. Екип от 15+ професионалисти с над 10 години опит всеки тесен специалист в своята област , 200+ завършени проекта от екипа. Качество и гаранция на всяка услуга."
        />
        <meta
          name="keywords"
          content="ремонтна фирма София, Renovivo, строителна фирма София, професионални майстори, ремонти с гаранция"
        />
        <link rel="canonical" href="https://renovivo.bg/about" />
        <meta property="og:title" content="За нас | Renovivo - Ремонтна фирма София" />
        <meta
          property="og:description"
          content="Над 10 години опит на екипа в ремонтните услуги. 200+ завършени проекта."
        />
        <meta property="og:url" content="https://renovivo.bg/about" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">За нас</span>
              <h1 className="text-3xl md:text-4xl font-bold text-background mt-3 mb-6">
                Вашият надежден партньор за ремонти в София
              </h1>
              <p className="text-background/90 text-lg leading-relaxed mb-4">
                RENOVIVO е нова фирма за ремонти и довършителни работи, изградена от екип с дългогодишен опит в
                строителния бранш. Специализирани сме в изпълнението на качествени ремонти на жилищни и офис помещения в
                град София и региона.
              </p>
              <p className="text-background/70 text-base leading-relaxed">
                Ние сме екип от отдадени професионалисти, които могат да реализират всеки проект независимо от
                сложността.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative">
                <img src={aboutTeamImg} alt="Renovivo екип" className="rounded-2xl shadow-xl w-full" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              </div>

              {/* Content */}
              <div>
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Нашата история</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                  Над 10 години опит в създаването на мечтани домове
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Renovivo е основана през 2025 година с една проста мисия - да предоставяме ремонтни услуги с качество,
                  което надминава очакванията. Специализирани сме в изпълнението на качествени ремонти на жилищни и офис
                  помещения в град София и региона.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Нашият подход е прост - слушаме внимателно нуждите на клиентите, планираме детайлно всеки проект и
                  изпълняваме с прецизност всяка задача. "Every Detail Matters" не е просто слоган - това е нашата
                  философия. Визията ни е да станем водеща компания за ремонти и довършителни работи в София и района,
                  познаваема с нашия професионализъм, качество и отношение към клиентите. Нашата цел е да превърнем
                  ремонта в приятно, гладко и безпроблемно преживяване, от което клиентът да остане напълно удовлетворен
                  и спокоен.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <span className="text-3xl font-bold text-primary">10+</span>
                    <p className="text-muted-foreground text-sm mt-1">Години опит</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-primary">200+</span>
                    <p className="text-muted-foreground text-sm mt-1">Проекти</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-primary">15+</span>
                    <p className="text-muted-foreground text-sm mt-1">Специалисти</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Нашите ценности</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">Какво ни движи</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="text-center border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

       

        {/* Why Choose Us */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Защо да изберете нас</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Качество, на което можете да разчитате</h2>
                <p className="text-background/80 mb-8">
                  Избирайки Renovivo, вие избирате партньор, който се грижи за вашия проект като за свой собствен.
                </p>

                <div className="space-y-4">
                  {[
                    "Гаранция на всички извършени услуги",
                    "Използване на висококачествени материали",
                    "Прозрачно ценообразуване без скрити такси",
                    "Спазване на договорените срокове",
                    "Почистване след приключване на работа",
                    "Безплатна консултация и оглед",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <span className="text-background/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <img src={qualityWorkImg} alt="Качествена работа" className="rounded-2xl" />
                <div className="absolute -bottom-4 -left-4 bg-primary rounded-xl p-6">
                  <Award className="h-8 w-8 text-primary-foreground mb-2" />
                  <span className="text-primary-foreground font-bold text-2xl block">98%</span>
                  <span className="text-primary-foreground/90 text-sm">Доволни клиенти</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AboutPage;
