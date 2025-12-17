import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { projects, categories } from "@/data/projects";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.categoryId === activeCategory);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": "Портфолио", "item": "https://renovivo.bg/portfolio" }
    ]
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Renovivo Портфолио - Завършени ремонти в София",
    "description": "Галерия със завършени ремонтни проекти - бани, кухни, апартаменти",
    "numberOfItems": projects.length
  };

  return (
    <>
      <Helmet>
        <title>Портфолио | Renovivo - Завършени ремонти София, снимки преди и след</title>
        <meta 
          name="description" 
          content="Разгледайте 500+ завършени ремонти в София - бани, кухни, апартаменти. Снимки преди и след ремонт. Вижте качеството на нашата работа!" 
        />
        <meta name="keywords" content="портфолио ремонти, снимки ремонт, ремонт преди след, завършени проекти София, ремонт баня снимки, ремонт апартамент галерия" />
        <link rel="canonical" href="https://renovivo.bg/portfolio" />
        <meta property="og:title" content="Портфолио | Renovivo - Завършени ремонти" />
        <meta property="og:description" content="Галерия със завършени ремонтни проекти в София." />
        <meta property="og:url" content="https://renovivo.bg/portfolio" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(gallerySchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Портфолио</span>
              <h1 className="text-4xl md:text-5xl font-bold text-background mt-3 mb-6">
                Нашите проекти
              </h1>
              <p className="text-background/80 text-lg">
                Разгледайте някои от нашите завършени проекти и се убедете в качеството на нашата работа.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b sticky top-[72px] bg-background z-40">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={activeCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : ""}
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
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Content */}
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

                  {/* Hover icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Eye className="h-5 w-5 text-primary-foreground" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Няма намерени проекти в тази категория.</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default PortfolioPage;
