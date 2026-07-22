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
      { "@type": "ListItem", position: 1, name: "Начало", item: "https://renovivo.bg" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Колко струва ремонт на апартамент в София?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Цената за цялостен ремонт на апартамент се определя индивидуално и зависи от квадратурата, обхвата на работа и избраните материали. Renovivo прави безплатен оглед и изготвя подробна писмена оферта, съобразена с вашия конкретен проект.",
        },
      },
      {
        "@type": "Question",
        name: "Колко време отнема ремонт на баня?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Стандартен ремонт на баня в София отнема между 15 и 25 работни дни в зависимост от размера и обхвата на работата - демонтаж, ВиК, електро, зидария, шпакловка, плочки и монтаж на санитария.",
        },
      },
      {
        "@type": "Question",
        name: "Давате ли гаранция на извършените ремонти?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. Renovivo предоставя писмена гаранция от 24 месеца за всички извършени строително-монтажни работи и гаранция от производителя за вложените материали.",
        },
      },
      {
        "@type": "Question",
        name: "В кои райони на София работите?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Renovivo извършва ремонти във всички райони на София - Център, Лозенец, Изток, Витоша, Младост, Люлин, Дружба, Овча Купел, Красно село, Студентски град, както и в градовете от София-област.",
        },
      },
      {
        "@type": "Question",
        name: "Правите ли безплатен оглед и оферта?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, огледът на място и изготвянето на подробна оферта са напълно безплатни и без ангажимент. Свържете се с нас на +359 89 371 29 19 или чрез формата на сайта.",
        },
      },
      {
        "@type": "Question",
        name: "С какви услуги се занимава Renovivo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Renovivo предлага цялостен ремонт на апартаменти, ремонт на бани и кухни, боядисване, шпакловка, полагане на подови настилки, микроцимент, теразо, ВиК и електро услуги, интериорен дизайн и иновативни покрития.",
        },
      },
      {
        "@type": "Question",
        name: "Работите ли с една бригада от началото до края?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да. За разлика от повечето фирми, Renovivo използва един координиран екип от специалисти през целия ремонт - от демонтажа до финалното почистване. Това осигурява по-бърз срок, ясна отговорност и качество.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Ремонти в София | Цялостен ремонт до ключ – Renovivo</title>
        <meta
          name="description"
          content="Ремонти в София от един координиран екип от А до Я. Цялостен ремонт на апартаменти, бани и кухни. Безплатен оглед и писмена оферта."
        />
        <link rel="canonical" href="https://renovivo.bg/" />
        <meta property="og:title" content="Ремонти в София | Цялостен ремонт до ключ – Renovivo" />
        <meta
          property="og:description"
          content="Цялостни ремонти в София от един координиран екип. Безплатен оглед и писмена оферта."
        />
        <meta property="og:url" content="https://renovivo.bg/" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
