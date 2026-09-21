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
import BespokeEstimator from "@/components/home/BespokeEstimator";
import LuxuryGuide from "@/components/home/LuxuryGuide";
import CTA from "@/components/home/CTA";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
  // Бизнес schema-та е една, sitewide, в index.html (@id #organization).
  // Тук НЕ се дублира — преди имаше втори обект с измислен aggregateRating
  // (47 отзива), който нарушава правилата на Google за structured data.
  const seoContent = language === 'en' ? {
    title: "High-End Renovations & Finishing Works in Sofia | Renovivo",
    description: "Complete high-end renovations and finishing works for apartments and houses in Sofia. One accountable project lead, fixed price by contract. +359 89 371 29 19",
  } : {
    title: "Ремонти и довършителни работи от висок клас в София | Renovivo",
    description: "Цялостни ремонти и довършителни работи от висок клас за апартаменти и къщи в София. Един отговорен ръководител, фиксирана цена по договор. Тел. 089 371 2919",
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.description} />
        <link rel="canonical" href="https://renovivo.bg" />
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.description} />
        <meta property="og:url" content="https://renovivo.bg" />
        <meta property="og:locale" content={language === 'en' ? 'en_US' : 'bg_BG'} />
      </Helmet>
      <Layout>
        <Hero />
        <PeaceOfMind />
        <Services />
        <About />
        <Projects />
        <WhyUs />
        <HowWeWork />
        <BespokeEstimator />
        <LuxuryGuide />
        <BlogPreview />
        <CTA />
      </Layout>
    </>
  );
};

export default Index;
