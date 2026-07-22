import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { getPlanningRenovationPost, getMicrocementPost } from "@/data/blog-posts-local";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

// Blog images
import apartmentRenovationImg from "@/assets/images/blog/apartment-renovation.jpg";
import bathroomRenovationImg from "@/assets/images/blog/bathroom-renovation.jpg";
import microcementImg from "@/assets/images/blog/microcement-technology.jpg";
import renovationMistakesImg from "@/assets/images/blog/renovation-mistakes.jpg";
import bathroomCostImg from "@/assets/images/blog/bathroom-cost.jpg";
import interiorDesignTrends2026Img from "@/assets/images/blog/interior-design-trends-2026.png";
import planningRenovation2026Img from "@/assets/images/blog/planning-renovation-2026.jpg";
import microcementBathroom2026Img from "@/assets/images/blog/microcement-bathroom-2026.jpg";

const blogImages: Record<string, string> = {
  "remont-na-apartament-sofia-2024": apartmentRenovationImg,
  "remont-na-banya-sofia-cena": bathroomRenovationImg,
  "microcement-moderna-tehnologiya": microcementImg,
  "mikrociment-moderno-reshenie-steni-podove": microcementBathroom2026Img,
  "chesti-greshki-pri-remont": renovationMistakesImg,
  "kolko-struva-remont-na-banya": bathroomCostImg,
  "tendentsii-v-interiorniya-dizain-za-2026": interiorDesignTrends2026Img,
  "kak-da-planirate-remont-step-by-step-2026": planningRenovation2026Img,
};

const Blog = () => {
  const { t, language } = useLanguage();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      const allPosts = data || [];
      const existingSlugs = new Set(allPosts.map((p: any) => p.slug));
      const planningPost = getPlanningRenovationPost(language);
      const microcementPostData = getMicrocementPost(language);

      if (!existingSlugs.has(planningPost.slug)) {
        allPosts.push(planningPost as any);
      }
      if (!existingSlugs.has(microcementPostData.slug)) {
        allPosts.push(microcementPostData as any);
      }
      return allPosts.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t('breadcrumb.home'),
        item: "https://renovivo.bg",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t('blog.page.title'),
        item: "https://renovivo.bg/blog",
      },
    ],
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'bg' ? "bg-BG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    switch (cat) {
      case "съвети":
      case "tips":
        return "bg-blue-100 text-blue-700";
      case "бани":
      case "bathrooms":
        return "bg-cyan-100 text-cyan-700";
      case "иновации":
      case "innovations":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPostImage = (slug: string) => {
    return blogImages[slug] || null;
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bg' ? 'Полезно | Съвети и информация за ремонти | Renovivo' : 'Useful Tips | Renovation Advice | Renovivo'}</title>
        <meta
          name="description"
          content={language === 'bg'
            ? "Полезни статии и съвети за ремонт на апартаменти, бани и кухни в София. Научете за цени, материали и как да планирате успешен ремонт през 2026 г."
            : "Helpful articles and tips for apartment, bathroom and kitchen renovations in Sofia. Learn about prices, materials and how to plan a successful renovation."
          }
        />
        <link rel="canonical" href="https://renovivo.bg/blog" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
          <div className="container-custom">
            <VisualBreadcrumb
              items={[{ label: t('blog.page.title') }]}
              className="mb-8"
            />
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium text-sm uppercase tracking-wider">
                  {t('blog.page.title')}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {t('blog.page.subtitle')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('blog.page.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-4" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-32" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const postImage = getPostImage(post.slug);
                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                        <div className="relative h-48 overflow-hidden cursor-pointer">
                          {postImage ? (
                            <img
                              src={postImage}
                              alt={post.title}
                              width={400}
                              height={192}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <BookOpen className="h-16 w-16 text-primary/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                          <Badge
                            className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}
                          >
                            {post.category}
                          </Badge>
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.reading_time} {t('blog.page.min')}
                            </span>
                          </div>

                          <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>

                          <p className="text-muted-foreground text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {t('blog.page.empty')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('blog.page.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('blog.page.cta.description')}
            </p>
            <a
              href="tel:+359893712919"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              +359 89 371 29 19
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
