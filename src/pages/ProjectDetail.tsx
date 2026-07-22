import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, ArrowLeft, ArrowRight, MapPin, Clock, Maximize, Check, Star, TrendingUp, Trophy } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectByIdWithLanguage, getProjects } from "@/data/projects";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = id ? getProjectByIdWithLanguage(id, language) : undefined;
  const projects = getProjects(language);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const relatedProjects = projects
    .filter((p) => p.categoryId === project.categoryId && p.id !== project.id)
    .slice(0, 3);

  // Case Study Schema
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.description,
    image: project.mainImage,
    author: {
      "@type": "Organization",
      name: "Renovivo"
    },
    publisher: {
      "@type": "Organization",
      name: "Renovivo",
      url: "https://renovivo.bg"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://renovivo.bg/portfolio/${id}`
    },
    about: {
      "@type": "CreativeWork",
      name: `Case Study: ${project.title}`,
      abstract: project.description
    }
  };

  return (
    <>
      <Helmet>
        <title>{project.title} | Renovivo - Case Study</title>
        <meta name="description" content={`${project.description} ${language === 'bg' ? 'Вижте как решихме предизвикателството:' : 'See how we solved the challenge:'} ${project.challenge}`} />
        <link rel="canonical" href={`https://renovivo.bg/portfolio/${id}`} />
        <script type="application/ld+json">{JSON.stringify(caseStudySchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <img
            src={project.mainImage}
            alt={project.title}
            width={1200}
            height={600}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-12">
            {/* Breadcrumb */}
            <VisualBreadcrumb
              items={[
                { label: t('projectDetail.breadcrumb'), href: "/portfolio" },
                { label: project.title }
              ]}
              className="mb-4 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <span className="block text-primary font-medium text-sm mb-2">{project.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-background">
              {project.title}
            </h1>
          </div>
        </section>

        {/* Project Info Bar */}
        <section className="bg-secondary py-6">
          <div className="container-custom">
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm">{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">{project.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-primary" />
                <span className="text-sm">{project.area}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t('projectDetail.about')}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Before & After Slider */}
                {project.beforeImage && project.afterImage && (
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                  />
                )}

                {/* Challenge & Solution - Case Study Format */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    {t('projectDetail.problemSolutionResult')}
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Problem Card */}
                    <Card className="border-l-4 border-l-destructive shadow-md">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 text-destructive flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-sm font-bold">1</span>
                          {t('projectDetail.challenge')}
                        </h3>
                        <p className="text-muted-foreground">{project.challenge}</p>
                      </CardContent>
                    </Card>

                    {/* Solution Card */}
                    <Card className="border-l-4 border-l-primary shadow-md">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 text-primary flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">2</span>
                          {t('projectDetail.solution')}
                        </h3>
                        <p className="text-muted-foreground">{project.solution}</p>
                      </CardContent>
                    </Card>

                    {/* Result Card - Only if result data exists */}
                    {project.result && (
                      <Card className="border-l-4 border-l-green-500 shadow-md bg-green-50/50 dark:bg-green-950/20">
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm font-bold">3</span>
                            <Trophy className="h-5 w-5" />
                            {t('projectDetail.result')}
                          </h3>
                          <p className="text-muted-foreground mb-4">{project.result.summary}</p>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {project.result.metrics.map((metric, idx) => (
                              <div key={idx} className="bg-background rounded-lg p-3 text-center">
                                <p className="text-xs text-muted-foreground">{metric.label}</p>
                                <p className="font-bold text-primary">{metric.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Client Satisfaction */}
                          {project.result.clientSatisfaction && (
                            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
                              <span className="text-sm text-muted-foreground">{t('projectDetail.clientRating')}:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < project.result!.clientSatisfaction! ? 'fill-primary text-primary' : 'text-muted'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Project Stages - Storytelling */}
                {project.stages && project.stages.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">{t('projectDetail.stages')}</h2>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />

                      <div className="space-y-6">
                        {project.stages.map((stage, index) => (
                          <div key={index} className="relative pl-12">
                            {/* Timeline dot */}
                            <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                              {index + 1}
                            </div>
                            <Card className="border-0 shadow-md">
                              <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-2">{stage.title}</h3>
                                <p className="text-muted-foreground text-sm">{stage.description}</p>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('projectDetail.features')}</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('projectDetail.gallery')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        width={index === 0 ? 800 : 400}
                        height={index === 0 ? 320 : 192}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover rounded-lg hover:opacity-90 transition-opacity ${index === 0 ? "md:col-span-2 h-64 md:h-80" : "h-48"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{t('projectDetail.cta.title')}</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {t('projectDetail.cta.desc')}
                    </p>
                    <a href="tel:+359893712919" className="block mb-4">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <Phone className="h-4 w-4 mr-2" />
                        {t('projectDetail.cta.call')}
                      </Button>
                    </a>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full">
                        {t('projectDetail.cta.inquiry')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Project Details */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">{t('projectDetail.details')}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">{t('projectDetail.details.category')}</span>
                        <span className="font-medium text-sm">{project.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">{t('projectDetail.details.location')}</span>
                        <span className="font-medium text-sm">{project.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">{t('projectDetail.details.duration')}</span>
                        <span className="font-medium text-sm">{project.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">{t('projectDetail.details.area')}</span>
                        <span className="font-medium text-sm">{project.area}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="mt-16 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-8">{t('projectDetail.related')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProjects.map((p) => (
                    <Link
                      key={p.id}
                      to={`/portfolio/${p.id}`}
                      className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                    >
                      <img
                        src={p.mainImage}
                        alt={p.title}
                        width={400}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <span className="text-primary text-xs font-medium mb-1">{p.category}</span>
                        <h3 className="text-background font-semibold group-hover:text-primary transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t">
              {prevProject ? (
                <Link
                  to={`/portfolio/${prevProject.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm hidden sm:inline">{prevProject.title}</span>
                  <span className="text-sm sm:hidden">{t('projectDetail.nav.prev')}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextProject && (
                <Link
                  to={`/portfolio/${nextProject.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-sm hidden sm:inline">{nextProject.title}</span>
                  <span className="text-sm sm:hidden">{t('projectDetail.nav.next')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProjectDetail;