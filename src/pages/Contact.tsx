import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+359 89 371 29 19",
    href: "tel:+359893712919",
  },
  {
    icon: Mail,
    title: "Имейл",
    value: "renovivo.bg@gmail.com",
    href: "mailto:renovivo.bg@gmail.com",
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "гр. София, България",
    href: null,
  },
  {
    icon: Clock,
    title: "Работно време",
    value: "Пон - Пет: 08:00 - 18:00",
    href: null,
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Съобщението е изпратено!",
        description: "Ще се свържем с вас възможно най-скоро.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": "Контакти", "item": "https://renovivo.bg/contact" }
    ]
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Контакти Renovivo",
    "description": "Свържете се с Renovivo за безплатна консултация за ремонт в София",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Renovivo",
      "telephone": "+359893712919",
      "email": "renovivo.bg@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "София",
        "addressCountry": "BG"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Контакти | Renovivo - Безплатна консултация за ремонт София</title>
        <meta 
          name="description" 
          content="Свържете се с Renovivo за безплатна консултация и оглед. ☎️ +359 89 371 29 19. Ремонтни услуги в София и околността. Работно време: Пон-Пет 08:00-18:00." 
        />
        <meta name="keywords" content="контакти Renovivo, ремонт София телефон, безплатен оглед ремонт, консултация ремонт, ремонтна фирма контакт" />
        <link rel="canonical" href="https://renovivo.bg/contact" />
        <meta property="og:title" content="Контакти | Renovivo" />
        <meta property="og:description" content="Свържете се за безплатна консултация. ☎️ +359 89 371 29 19" />
        <meta property="og:url" content="https://renovivo.bg/contact" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Контакти</span>
              <h1 className="text-4xl md:text-5xl font-bold text-background mt-3 mb-6">
                Свържете се с нас
              </h1>
              <p className="text-background/80 text-lg">
                Имате въпроси или искате да започнете проект? Ние сме тук, за да помогнем.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Контактна информация</h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <Card key={info.title} className="border-0 shadow-md">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.title}</p>
                          {info.href ? (
                            <a href={info.href} className="font-medium hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium">{info.value}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-primary rounded-xl text-center">
                  <Phone className="h-10 w-10 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-foreground mb-2">
                    Обадете се директно
                  </h3>
                  <p className="text-primary-foreground/90 text-sm mb-4">
                    За бърза връзка и консултация
                  </p>
                  <a href="tel:+359893712919">
                    <Button className="bg-background text-foreground hover:bg-background/90 font-semibold w-full">
                      +359 89 371 29 19
                    </Button>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2">Изпратете запитване</h2>
                    <p className="text-muted-foreground mb-6">
                      Попълнете формата и ще се свържем с вас в рамките на 24 часа.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Вашето име *
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Иван Иванов"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Имейл адрес *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ivan@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Телефонен номер
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+359 89 371 29 19"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Вашето съобщение *
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Опишете накратко вашия проект..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Изпращане..."
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Изпратете съобщение
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-96 bg-secondary">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188820.79635051927!2d23.187798799999997!3d42.69535175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia!5e0!3m2!1sen!2sbg!4v1699999999999!5m2!1sen!2sbg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Renovivo локация"
          />
        </section>
      </Layout>
    </>
  );
};

export default ContactPage;
