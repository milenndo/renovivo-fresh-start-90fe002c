import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import PeaceOfMind from "@/components/home/PeaceOfMind";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import WhyUs from "@/components/home/WhyUs";
import HowWeWork from "@/components/home/HowWeWork";
import BlogPreview from "@/components/home/BlogPreview";
import CTA from "@/components/home/CTA";
import Testimonials from "@/components/Testimonials";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
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
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://renovivo.bg/#business",
    name: "Renovivo",
    alternateName: "Реновиво",
    description: "Цялостни ремонти на апартаменти в София и района. Тясно специализирани експерти, един екип от А до Я.",
    url: "https://renovivo.bg",
    telephone: "+359893712919",
    email: "office@renovivo.bg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ж.к. Красно село",
      addressLocality: "София",
      addressRegion: "София-град",
      postalCode: "1000",
      addressCountry: "BG"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "42.6977",
      longitude: "23.3219"
    },
    areaServed: [
      {
        "@type": "City",
        name: "София"
      },
      {
        "@type": "AdministrativeArea",
        name: "София-област"
      }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      }
    ],
    priceRange: "$$",
    currenciesAccepted: "BGN",
    paymentAccepted: "Cash, Bank Transfer",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1"
    },
    sameAs: [
      "https://www.facebook.com/renovivo.bg",
      "https://www.instagram.com/renovivo.bg"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ремонтни услуги",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Цялостен ремонт на апартамент"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ремонт на баня"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ремонт на кухня"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Иновативни покрития - микроцимент, terrazzo"
          }
        }
      ]
    }
  };

  const seoContent = language === 'en' ? {
    title: "Renovivo | Complete Apartment Renovations in Sofia and Region",
    description: "Renovivo - complete renovations in Sofia and the region. Highly specialized experts, one team from A to Z. Request a free inspection and quote.",
    keywords: "renovation Sofia, complete apartment renovation, bathroom renovation Sofia, kitchen renovation Sofia, renovation company Sofia, construction services Sofia",
  } : {
    title: "Renovivo | Цялостен ремонт на апартаменти в София и района",
    description: "Renovivo - цялостни ремонти в София и района. Тясно специализирани експерти, един екип от А до Я. Поискайте безплатен оглед и оферта.",
    keywords: "ремонт София, цялостен ремонт на апартамент, ремонт на баня София, ремонт на кухня София, ремонтна фирма София, строителни услуги София",
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.description} />
        <meta name="keywords" content={seoContent.keywords} />
        <link rel="canonical" href="https://renovivo.bg" />
        <link rel="alternate" hrefLang="bg" href="https://renovivo.bg" />
        <link rel="alternate" hrefLang="en" href="https://renovivo.bg" />
        <link rel="alternate" hrefLang="x-default" href="https://renovivo.bg" />
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.description} />
        <meta property="og:url" content="https://renovivo.bg" />
        <meta property="og:locale" content={language === 'en' ? 'en_US' : 'bg_BG'} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <Layout>
        <Hero />
        <PeaceOfMind />
        <Services />
        <About />
        <Projects />
        <WhyUs />
        <HowWeWork />
        <BlogPreview />
              <Testimonials />
        <CTA />
      </Layout>
    </>
  );
};

export default Index;
