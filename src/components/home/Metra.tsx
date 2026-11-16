import { useLanguage } from "@/contexts/LanguageContext";

export default function Metra() {
  const { language } = useLanguage();

  return (
    <section aria-labelledby="metra-title" className="bg-[#F6F4F0] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="metra-title" className="text-3xl font-bold tracking-tight md:text-4xl">
          {language === "en"
            ? "See what’s happening with your renovation. Every day."
            : "Виждате какво се случва с ремонта ви. Всеки ден."}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {language === "en"
            ? "With Metra, Renovivo’s client portal, you can track your renovation progress online. Whether you’re at work, in another city, or abroad, you can check what’s happening on site."
            : "С Metra, клиентския портал на Renovivo, следите напредъка на обекта си онлайн. Дори когато сте на работа, в друг град или в чужбина, можете да проверите какво се случва с ремонта ви."}
        </p>
      </div>
    </section>
  );
}
