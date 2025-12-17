import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, ArrowLeft, ArrowRight, MapPin, Clock, Maximize, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectById, projects, categories } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const relatedProjects = projects
    .filter((p) => p.categoryId === project.categoryId && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{project.title} | Renovivo - Портфолио</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Обратно към портфолиото
            </Link>
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
                  <h2 className="text-2xl font-bold mb-4">За проекта</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 text-destructive">Предизвикателство</h3>
                      <p className="text-muted-foreground text-sm">{project.challenge}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 text-primary">Решение</h3>
                      <p className="text-muted-foreground text-sm">{project.solution}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Основни характеристики</h2>
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
                  <h2 className="text-2xl font-bold mb-6">Галерия</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className={`w-full object-cover rounded-lg hover:opacity-90 transition-opacity ${
                          index === 0 ? "md:col-span-2 h-64 md:h-80" : "h-48"
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
                    <h3 className="text-xl font-bold mb-4">Харесва ви този проект?</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Свържете се с нас, за да обсъдим как можем да реализираме вашата идея.
                    </p>
                    <a href="tel:+359893712919" className="block mb-4">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <Phone className="h-4 w-4 mr-2" />
                        Обадете се
                      </Button>
                    </a>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full">
                        Изпратете запитване
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Project Details */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Детайли</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Категория</span>
                        <span className="font-medium text-sm">{project.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Локация</span>
                        <span className="font-medium text-sm">{project.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Продължителност</span>
                        <span className="font-medium text-sm">{project.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Площ</span>
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
                <h2 className="text-2xl font-bold mb-8">Подобни проекти</h2>
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
                  <span className="text-sm sm:hidden">Предишен</span>
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
                  <span className="text-sm sm:hidden">Следващ</span>
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
