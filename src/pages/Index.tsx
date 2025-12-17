import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import PeaceOfMind from "@/components/home/PeaceOfMind";
import Services from "@/components/home/Services";
import AIConsultant from "@/components/home/AIConsultant";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import WhyUs from "@/components/home/WhyUs";
import HowWeWork from "@/components/home/HowWeWork";
import BlogPreview from "@/components/home/BlogPreview";
import CTA from "@/components/home/CTA";

const Index = () => {
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

  return (
    <>
      <Helmet>
        <title>Renovivo | Цялостен ремонт на апартаменти в София и района</title>
        <meta
          name="description"
          content="Renovivo - цялостни ремонти в София и района. Тясно специализирани експерти, един екип от А до Я. Поискайте безплатен оглед и оферта."
        />
        <meta
          name="keywords"
          content="ремонт София, цялостен ремонт на апартамент, ремонт на баня София, ремонт на кухня София, ремонтна фирма София, строителни услуги София"
        />
        <link rel="canonical" href="https://renovivo.bg" />
        <meta property="og:title" content="Renovivo | Цялостен ремонт в София и района" />
        <meta
          property="og:description"
          content="Цялостни ремонти в София. Тясно специализирани експерти, един екип от А до Я."
        />
        <meta property="og:url" content="https://renovivo.bg" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Layout>
        <Hero />
        <PeaceOfMind />
        <Services />
        <AIConsultant />
        <About />
        <Projects />
        <WhyUs />
        <HowWeWork />
        <BlogPreview />
        <CTA />
      </Layout>
    </>
  );
};

export default Index;
