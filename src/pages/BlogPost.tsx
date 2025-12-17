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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.category],
    queryFn: async () => {
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
    return new Date(dateString).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "съвети":
        return "bg-blue-100 text-blue-700";
      case "бани":
        return "bg-cyan-100 text-cyan-700";
      case "иновации":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Convert markdown-like content to HTML
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        // Headers
        if (line.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="text-2xl font-bold mt-8 mb-4 text-foreground"
            >
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="text-xl font-semibold mt-6 mb-3 text-foreground"
            >
              {line.replace("### ", "")}
            </h3>
          );
        }

        // Horizontal rule
        if (line === "---") {
          return <hr key={index} className="my-8 border-border" />;
        }

        // Bold text handling
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={index} className="font-semibold mb-2">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }

        // List items
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4 mb-1 text-muted-foreground">
              {line.replace("- ", "")}
            </li>
          );
        }
        if (line.match(/^\d+\. /)) {
          return (
            <li
              key={index}
              className="ml-4 mb-1 text-muted-foreground list-decimal"
            >
              {line.replace(/^\d+\. /, "")}
            </li>
          );
        }

        // Table rows
        if (line.startsWith("|")) {
          return null; // Skip tables for now
        }

        // Empty lines
        if (line.trim() === "") {
          return <br key={index} />;
        }

        // Regular paragraphs
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>
        );
      })
      .filter(Boolean);
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
          <h1 className="text-2xl font-bold mb-4">Статията не е намерена</h1>
          <p className="text-muted-foreground mb-6">
            Статията, която търсите, не съществува или е била премахната.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Към блога
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
        name: "Начало",
        item: "https://renovivo.bg",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Блог",
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
    dateModified: post.updated_at,
  };

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | Renovivo</title>
        <meta
          name="description"
          content={post.meta_description || post.excerpt}
        />
        <meta
          name="keywords"
          content={post.tags?.join(", ") || "ремонти, съвети"}
        />
        <link rel="canonical" href={`https://renovivo.bg/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:url"
          content={`https://renovivo.bg/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
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
            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Обратно към блога
            </Link>

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
                {post.reading_time} мин. четене
              </span>
              <span>от {post.author}</span>
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
                {renderContent(post.content)}
              </article>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* CTA Card */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Нуждаете се от помощ?
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Екипът на Renovivo е готов да помогне с вашия ремонт.
                      Обадете се за безплатна консултация.
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
                    <h3 className="text-lg font-semibold mb-3">Тагове</h3>
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
                      Свързани статии
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
                            {related.reading_time} мин. четене
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
