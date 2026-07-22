import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Мария Георгиева',
    role: 'Апартамент в Лозенец',
    text: 'Изключително доволна съм от работата на екипа! Ремонтът на банята беше завършен точно в срок, без скрити такси. Мениджърът беше на разположение през цялото време и отговаряше на всички мои въпроси. Горещо препоръчвам!',
    rating: 5,
    date: '2025-11-15'
  },
  {
    id: 2,
    name: 'Георги Димитров',
    role: 'Цялостен ремонт, Младост',
    text: 'Направиха ни пълен ремонт на тристаен апартамент. Впечатлени сме от професионализма и вниманието към детайла. Екипът работи чисто и организирано. Резултатът надмина очакванията ни.',
    rating: 5,
    date: '2025-10-22'
  },
  {
    id: 3,
    name: 'Елена Петрова',
    role: 'Кухня и баня, Витоша',
    text: 'Страхотен опит! Микроциментът в банята изглежда невероятно. Екипът беше много внимателен към моите изисквания и предложи отлични решения. Определено ще се обърна към тях отново.',
    rating: 5,
    date: '2025-09-30'
  },
  {
    id: 4,
    name: 'Иван Стоянов',
    role: 'Освежителен ремонт, Център',
    text: 'Бърз и качествен освежителен ремонт за една седмица! Боядисването е перфектно, подмениха ни контактите и осветлението. Отлично съотношение цена-качество.',
    rating: 5,
    date: '2025-08-18'
  },
  {
    id: 5,
    name: 'Надежда Василева',
    role: 'Довършителни работи, Изток',
    text: 'Довършиха ни апартамент в ново строителство. От замазка до готов за нанасяне дом. Всичко беше координирано перфектно. Личният проектен мениджър ни спести много нерви!',
    rating: 5,
    date: '2025-07-05'
  },
  {
    id: 6,
    name: 'Петър Николов',
    role: 'Ремонт на къща, Бояна',
    text: 'Реновирахме стара къща с екипа на Renovivo. Сложен проект с много предизвикателства, но те се справиха отлично. Комуникацията беше безупречна от начало до край.',
    rating: 5,
    date: '2025-06-12'
  }
];

const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
const averageRating = (totalRating / testimonials.length).toFixed(1);

export default function Testimonials() {
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

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://renovivo.bg/#business",
    name: "Renovivo",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "1"
    },
    review: testimonials.map(testimonial => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name
      },
      datePublished: testimonial.date,
      reviewBody: testimonial.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
        bestRating: "5",
        worstRating: "1"
      },
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "Renovivo",
        "@id": "https://renovivo.bg/#business"
      }
    }))
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Отзиви</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">Какво казват нашите клиенти</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Стотици доволни клиенти ни се довериха за своите проекти. Ето какво споделят за работата с нас.
          </p>
          
          {/* Aggregate Rating Display */}
          <div className="flex items-center justify-center gap-3 mt-6 p-4 bg-card rounded-2xl shadow-lg inline-flex border border-border/50">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-bold text-2xl">{averageRating}</span>
            <span className="text-muted-foreground">/ 5 от {testimonials.length} отзива</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={`group relative border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative z-10 p-6">
                <Quote className="h-10 w-10 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border/50 pt-4 flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
