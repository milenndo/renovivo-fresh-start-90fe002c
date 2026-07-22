import { Helmet } from "react-helmet-async";
import { Check, CheckCircle2, Award, Shield, Phone, Heart, Handshake, Clock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import aboutTeamImg from "@/assets/images/about-team.jpg";
import qualityWorkImg from "@/assets/images/quality-work.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { openModal } = useInspectionRequest();
  const { language, t } = useLanguage();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t('breadcrumb.home'), item: "https://renovivo.bg" },
      { "@type": "ListItem", position: 2, name: t('aboutPage.breadcrumb'), item: "https://renovivo.bg/about" },
    ],
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: language === 'bg' ? "За Renovivo" : "About Renovivo",
    description: t('aboutPage.metaDesc'),
    mainEntity: {
      "@type": "Organization",
      name: "Renovivo",
      foundingDate: "2025",
      slogan: language === 'bg' ? "Ремонт без хаос. Само спокойствие." : "Renovation without chaos. Just peace of mind.",
    },
  };

  const approachItems = [
    { icon: MessageSquare, text: t('aboutPage.approach.item1') },
    { icon: Clock, text: t('aboutPage.approach.item2') },
    { icon: Handshake, text: t('aboutPage.approach.item3') },
  ];

  const valueItems = [
    t('aboutPage.values.item1'),
    t('aboutPage.values.item2'),
    t('aboutPage.values.item3'),
    t('aboutPage.values.item4'),
    t('aboutPage.values.item5'),
    t('aboutPage.values.item6'),
  ];

  return (
    <>
      <Helmet>
        <title>{t('aboutPage.title')}</title>
        <meta name="description" content={t('aboutPage.metaDesc')} />
        <meta
          name="keywords"
          content={language === 'bg' 
            ? "ремонтна фирма София, Renovivo, ремонти без стрес, надеждни майстори, ремонти с гаранция София"
            : "renovation company Sofia, Renovivo, stress-free renovations, reliable contractors, renovations with warranty Sofia"
          }
        />
        <link rel="canonical" href="https://renovivo.bg/about" />
        <meta property="og:title" content={t('aboutPage.title')} />
        <meta property="og:description" content={t('aboutPage.metaDesc')} />
        <meta property="og:url" content="https://renovivo.bg/about" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            {/* Breadcrumb */}
            <VisualBreadcrumb 
              items={[{ label: t('aboutPage.breadcrumb') }]} 
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <div className="max-w-3xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">{t('aboutPage.hero.label')}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-background mt-3 mb-6">
                {t('aboutPage.hero.title')}
              </h1>
              <p className="text-background/90 text-lg leading-relaxed mb-4">
                {t('aboutPage.hero.p1')}
              </p>
              <p className="text-background/80 text-lg leading-relaxed font-medium">
                {t('aboutPage.hero.p2')}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Stats */}
        <section className="py-12 bg-secondary/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">127</span>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{t('aboutPage.stats.projects')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">94%</span>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{t('aboutPage.stats.recommend')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">{language === 'bg' ? '5 години' : '5 years'}</span>
                </div>
                <p className="text-muted-foreground text-sm font-medium">{t('aboutPage.stats.warranty')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach - Image Left */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative">
                <img 
                  src={aboutTeamImg} 
                  alt={t('aboutPage.imgAlt.team')} 
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl shadow-xl w-full" 
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              </div>

              {/* Content */}
              <div>
                <span className="text-primary font-medium text-sm uppercase tracking-wider">{t('aboutPage.approach.label')}</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                  {t('aboutPage.approach.title')}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t('aboutPage.approach.p1')}
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('aboutPage.approach.p2')}
                </p>

                <div className="space-y-4">
                  {approachItems.map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Image Right */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div className="order-2 lg:order-1">
                <span className="text-primary font-medium text-sm uppercase tracking-wider">{t('aboutPage.values.label')}</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                  {t('aboutPage.values.title')}
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t('aboutPage.values.p1')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {valueItems.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative order-1 lg:order-2">
                <img 
                  src={qualityWorkImg} 
                  alt={t('aboutPage.imgAlt.quality')} 
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl shadow-xl w-full" 
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Strong CTA */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <Heart className="h-10 w-10 text-primary mx-auto mb-6" />
              <p className="text-background/70 text-base mb-4 leading-relaxed">
                {t('aboutPage.cta.p1')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-primary">
                {t('aboutPage.cta.title')}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={openModal}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t('aboutPage.cta.button')}
                </Button>
                <Link to="/portfolio">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-background/30 bg-transparent text-background hover:bg-background/10 font-semibold px-8 py-6"
                  >
                    {t('aboutPage.cta.portfolio')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AboutPage;