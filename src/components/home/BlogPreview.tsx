import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

// Blog images
import apartmentRenovationImg from "@/assets/images/blog/apartment-renovation.jpg";
import bathroomRenovationImg from "@/assets/images/blog/bathroom-renovation.jpg";
import microcementImg from "@/assets/images/blog/microcement-technology.jpg";
import renovationMistakesImg from "@/assets/images/blog/renovation-mistakes.jpg";
import bathroomCostImg from "@/assets/images/blog/bathroom-cost.jpg";

const blogImages: Record<string, string> = {
  "remont-na-apartament-sofia-2024": apartmentRenovationImg,
  "remont-na-banya-sofia-cena": bathroomRenovationImg,
  "microcement-moderna-tehnologiya": microcementImg,
  "chesti-greshki-pri-remont": renovationMistakesImg,
  "kolko-struva-remont-na-banya": bathroomCostImg,
};

const BlogPreview = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
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
        return "bg-blue-100 text-blue-700";
      case "бани":
        return "bg-cyan-100 text-cyan-700";
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
      <section className="section-padding bg-secondary/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
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
    <section className="section-padding bg-secondary/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium text-sm uppercase tracking-wider">
              Блог
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Полезни съвети и статии
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Научете повече за ремонтите, материалите и как да планирате успешен
            проект за вашия дом.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const postImage = getPostImage(post.slug);
            return (
              <Card
                key={post.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  {postImage ? (
                    <img 
                      src={postImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <Badge
                    className={`absolute top-3 left-3 ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {post.category}
                  </Badge>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.reading_time} мин.
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all"
                  >
                    Прочетете повече
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/blog">
            <Button size="lg" variant="outline" className="font-semibold">
              Вижте всички статии
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;