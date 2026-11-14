import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import EditorialHome from "@/components/home/EditorialHome";
import BespokeEstimator from "@/components/home/BespokeEstimator";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Homepage is governed by docs/RENOVIVO_APPROVED_MOCKUPS_2026-11-13.md.
 * Keep the working quote estimator available below the reference composition.
 */
export default function Index() {
  const { language } = useLanguage();
  const seoContent = language === "en" ? {
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
        <link rel="canonical" href="https://www.renovivo.bg" />
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.description} />
        <meta property="og:url" content="https://www.renovivo.bg" />
        <meta property="og:locale" content={language === "en" ? "en_US" : "bg_BG"} />
      </Helmet>
      <Layout>
        <EditorialHome />
        <BespokeEstimator />
      </Layout>
    </>
  );
}
