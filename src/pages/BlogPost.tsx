import BlogContent from '@/components/BlogContent';
import { findRenovationPost, renovationPosts2026 } from '@/data/blog-posts-2026';
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, ArrowLeft, Phone, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { getPlanningRenovationPost, getMicrocementPost } from "@/data/blog-posts-local";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug, language],
    initialData: findRenovationPost(slug) as any,
    queryFn: async () => {
      const editorialPost = findRenovationPost(slug);
      if (editorialPost) return editorialPost;
      // Локалните статии са винаги налични — показваме ги дори ако базата
      // е недостъпна (важно и за статичния prerender по време на build).
      const planningPost = getPlanningRenovationPost(language);
      const microcementPostData = getMicrocementPost(language);
      const localFallback =
        slug === planningPost.slug ? planningPost :
        slug === microcementPostData.slug ? microcementPostData : null;

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
        if (error) throw error;
        return (data ?? localFallback) as any;
      } catch (e) {
        if (localFallback) return localFallback as any;
        throw e;
      }
    },
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.category, slug, language],
    queryFn: async () => {
      if (findRenovationPost(slug)) return renovationPosts2026.filter(p => p.slug !== slug).slice(0, 3);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("category", post?.category)
        .neq("slug", slug)
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!post?.category,
  });

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
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-16">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t('blogPost.notFound.title')}</h1>
          <p className="text-muted-foreground mb-6">
            {t('blogPost.notFound.desc')}
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('blogPost.notFound.button')}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

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
        name: t('blogPost.breadcrumb'),
        item: "https://renovivo.bg/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://renovivo.bg/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "Renovivo",
    },
    publisher: {
      "@type": "Organization",
      name: "Renovivo",
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: `https://renovivo.bg/blog/${post.slug}`,
    ...(post.image_url ? { image: `https://renovivo.bg${post.image_url}` } : {}),
  };

  return (
    <>
      <Helmet>
        <title>{`${(post.meta_title || post.title).replace(/\s*\|\s*Renovivo\s*$/i, "")} | Renovivo`}</title>
        <meta
          name="description"
          content={post.meta_description || post.excerpt}
        />
        <meta
          name="keywords"
          content={post.tags?.join(", ") || (language === 'bg' ? "ремонти, съвети" : "renovations, tips")}
        />
        <link rel="canonical" href={`https://renovivo.bg/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:url"
          content={`https://renovivo.bg/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        {post.image_url && <meta property="og:image" content={`https://renovivo.bg${post.image_url}`} />}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      <Layout>
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-16">
          <div className="container-custom">
            {/* Breadcrumb */}
            <VisualBreadcrumb
              items={[
                { label: t('blogPost.breadcrumb'), href: "/blog" },
                { label: post.title }
              ]}
              className="mb-6"
            />

            <Badge className={`${getCategoryColor(post.category)} mb-4`}>
              {post.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.reading_time} {t('blogPost.readTime')}
              </span>
              <span>{t('blogPost.by')} {post.author}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-2 prose prose-lg max-w-none">
                <div className="bg-primary/5 p-6 rounded-lg mb-8">
                  <p className="text-lg text-foreground font-medium m-0">
                    {post.excerpt}
                  </p>
                </div>
                {post.image_url && <figure className="mb-8"><img src={post.image_url} alt={post.image_alt || post.title} width={1536} height={1024} className="w-full rounded-xl" />{post.image_caption && <figcaption className="text-xs text-muted-foreground">{post.image_caption}</figcaption>}</figure>}
                <BlogContent content={post.content} />
                <Link to="/contact" className="not-prose inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">Заявете безплатен оглед</Link>
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* CTA Card */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">
                      {t('blogPost.sidebar.help')}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {t('blogPost.sidebar.helpDesc')}
                    </p>
                    <a
                      href="tel:+359893712919"
                      className="flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                    >
                      <Phone className="h-4 w-4" />
                      +359 89 371 29 19
                    </a>
                  </CardContent>
                </Card>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{t('blogPost.sidebar.tags')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {t('blogPost.sidebar.related')}
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.id}
                          to={`/blog/${related.slug}`}
                          className="block group"
                        >
                          <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {related.reading_time} {t('blogPost.readTime')}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BlogPost;