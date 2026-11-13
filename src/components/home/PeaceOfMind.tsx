import { UserRound, FileText, Handshake, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PeaceOfMind = () => {
  const { language } = useLanguage();
  const en = language === "en";
  const points = [
    { Icon: UserRound, bg: "Един отговорен ръководител", en: "One project lead" },
    { Icon: FileText, bg: "Подробна оферта", en: "Detailed estimate" },
    { Icon: Handshake, bg: "Договорени условия и срокове", en: "Agreed terms and deadlines" },
    { Icon: ShieldCheck, bg: "Гаранция по договор", en: "Contractual warranty" },
    { Icon: MapPin, bg: "София и Софийска област", en: "Sofia and Sofia region" },
  ];

  return (
    <section aria-label={en ? "Renovivo commitments" : "Нашите ангажименти"} className="border-b border-[#E5E4DD] bg-[#FAF9F6]">
      <div className="container-custom grid grid-cols-2 gap-y-0 py-2 sm:grid-cols-3 lg:grid-cols-5 lg:py-4">
        {points.map(({ Icon, bg, en: english }, index) => (
          <div key={bg} className={"flex min-h-[84px] items-center gap-3 border-[#E6E3DC] px-2 py-4 sm:px-4 lg:px-5 " + (index > 0 ? "lg:border-l" : "")}>
            <Icon className="h-6 w-6 shrink-0 text-[#64715F]" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-[11px] font-medium leading-[1.35] text-[#343B34] sm:text-xs">{en ? english : bg}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PeaceOfMind;
