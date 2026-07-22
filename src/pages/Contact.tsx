import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    { icon: Phone, title: t('contact.info.phone'), value: "+359 89 371 29 19", href: "tel:+359893712919" },
    { icon: Mail, title: t('contact.info.email'), value: "office@renovivo.bg", href: "mailto:office@renovivo.bg" },
    { icon: MapPin, title: t('contact.info.address'), value: t('contact.info.addressValue'), href: null },
    { icon: Clock, title: t('contact.info.hours'), value: t('contact.info.hoursValue'), href: null },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
        },
      });

      if (error) throw error;

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDesc'),
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error sending contact email:", error);
      toast({
        title: t('contact.form.error'),
        description: t('contact.form.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('breadcrumb.home'), "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": t('contact.page.title'), "item": "https://renovivo.bg/contact" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bg' ? 'Контакти | Renovivo - Безплатна консултация за ремонт София' : 'Contact | Renovivo - Free Renovation Consultation Sofia'}</title>
        <meta 
          name="description" 
          content={language === 'bg' 
            ? "Свържете се с Renovivo за безплатна консултация и оглед. ☎️ +359 89 371 29 19. Ремонтни услуги в София и околността."
            : "Contact Renovivo for a free consultation and inspection. ☎️ +359 89 371 29 19. Renovation services in Sofia and surroundings."
          } 
        />
        <link rel="canonical" href="https://renovivo.bg/contact" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <VisualBreadcrumb 
              items={[{ label: t('contact.page.title') }]} 
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <div className="max-w-2xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">{t('contact.page.title')}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-background mt-3 mb-6">
                {t('contact.page.subtitle')}
              </h1>
              <p className="text-background/80 text-lg">
                {t('contact.page.description')}
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
                <h2 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h2>
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
                    {t('contact.cta.title')}
                  </h3>
                  <p className="text-primary-foreground/90 text-sm mb-4">
                    {t('contact.cta.desc')}
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
                <Card id="contact-form" className="border-0 shadow-lg scroll-mt-24">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2">{t('contact.form.title')}</h2>
                    <p className="text-muted-foreground mb-6">
                      {t('contact.form.desc')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            {t('contact.form.name')} {t('contact.required')}
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t('contact.form.namePlaceholder')}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            {t('contact.form.email')} {t('contact.required')}
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={t('contact.form.emailPlaceholder')}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          {t('contact.form.phone')}
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t('contact.form.phonePlaceholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          {t('contact.form.message')} {t('contact.required')}
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('contact.form.messagePlaceholder')}
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
                          t('contact.form.sending')
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            {t('contact.form.submit')}
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
            title={language === 'bg' ? "Renovivo локация" : "Renovivo location"}
          />
        </section>
      </Layout>
    </>
  );
};

export default ContactPage;
