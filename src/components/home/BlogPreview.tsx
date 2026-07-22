import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { planningRenovationPost, microcementPost } from "@/data/blog-posts-local";
import { useEffect, useRef, useState } from "react";

const apartmentRenovationImg = "/images/blog/apartment-renovation.jpg";
const bathroomRenovationImg = "/images/blog/bathroom-renovation.jpg";
const microcementImg = "/images/blog/microcement-technology.jpg";
const renovationMistakesImg = "/images/blog/renovation-mistakes.jpg";
const bathroomCostImg = "/images/blog/bathroom-cost.jpg";

const blogImages: Record<string, string> = {
  "kak-da-planirate-remont-na-apartament-sofia-2025": apartmentRenovationImg,
  "remont-na-banya-sofia-cena": bathroomRenovationImg,
  "microcement-moderna-tehnologiya": microcementImg,
  "chesti-greshki-pri-remont": renovationMistakesImg,
  "kolko-struva-remont-na-banya": bathroomCostImg,
};

const BlogPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      const allPosts = data || [];
      const existingSlugs = new Set(allPosts.map((p: any) => p.slug));

      if (!existingSlugs.has(planningRenovationPost.slug)) {
        allPosts.push(planningRenovationPost as any);
      }
      if (!existingSlugs.has(microcementPost.slug)) {
        allPosts.push(microcementPost as any);
      }

      return allPosts
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3);
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "съвети":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "бани":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300";
      case "иновации":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPostImage = (slug: string) => {
    return blogImages[slug] || null;
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-secondary/20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div 
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Блог
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Полезни съвети и статии
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Научете повече за ремонтите, материалите и как да планирате успешен
            проект за вашия дом.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const postImage = getPostImage(post.slug);
            return (
              <Card
                key={post.id}
                className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {postImage ? (
                    <img
                      src={postImage}
                      alt={post.title}
                      width={400}
                      height={180}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ aspectRatio: '16/9' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <Badge
                    className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </Badge>
                  
                  {/* Sparkle icon on hover */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {post.reading_time} мин.
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-semibold text-sm group/link"
                    aria-label={`Прочетете статията: ${post.title}`}
                  >
                    Прочетете повече
                    <ArrowRight className="h-4 w-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link to="/blog">
            <Button size="lg" variant="outline" className="group font-semibold rounded-xl border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground px-8 transition-all duration-300">
              Вижте всички статии
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
