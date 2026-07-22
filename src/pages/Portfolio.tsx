import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getProjects, getCategories } from "@/data/projects";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const PortfolioPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = getProjects(language);
  const categories = getCategories(language);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.categoryId === activeCategory);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('breadcrumb.home'), "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": t('portfolio.page.title'), "item": "https://renovivo.bg/portfolio" }
    ]
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": language === 'bg' ? "Renovivo Портфолио - Завършени ремонти в София" : "Renovivo Portfolio - Completed Renovations in Sofia",
    "description": language === 'bg' ? "Галерия със завършени ремонтни проекти - бани, кухни, апартаменти" : "Gallery of completed renovation projects - bathrooms, kitchens, apartments",
    "numberOfItems": projects.length
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bg' ? 'Портфолио | Renovivo - Завършени ремонти София' : 'Portfolio | Renovivo - Completed Renovations Sofia'}</title>
        <meta
          name="description"
          content={language === 'bg'
            ? "Разгледайте 127 завършени ремонти в София - бани, кухни, апартаменти. Снимки преди и след ремонт."
            : "Browse 127 completed renovations in Sofia - bathrooms, kitchens, apartments. Before and after photos."
          }
        />
        <link rel="canonical" href="https://renovivo.bg/portfolio" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(gallerySchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <VisualBreadcrumb
              items={[{ label: t('portfolio.page.title') }]}
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <div className="max-w-2xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">{t('portfolio.page.title')}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-background mt-3 mb-6">
                {t('portfolio.page.subtitle')}
              </h1>
              <p className="text-background/80 text-lg">
                {t('portfolio.page.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b sticky top-[72px] bg-background z-40">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                className={activeCategory === "all" ? "bg-primary text-primary-foreground" : ""}
                onClick={() => setActiveCategory("all")}
              >
                {t('portfolio.filter.all')}
              </Button>
              {categories.filter(c => c.id !== "all").map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={activeCategory === category.id ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.id}`}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                >
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-primary text-sm font-medium mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-background text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-background/70 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.location} • {project.area}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Eye className="h-5 w-5 text-primary-foreground" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('portfolio.page.noResults')}</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default PortfolioPage;
