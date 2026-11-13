import { CalendarDays, Phone } from "lucide-react";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useLanguage } from "@/contexts/LanguageContext";

/** Fixed mobile actions, never replaces a form submission. */
const MobileActionBar = () => {
  const { openModal } = useInspectionRequest();
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <nav aria-label={en ? "Quick contact" : "Бърз контакт"} className="fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#303D33] px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_28px_rgba(20,35,25,0.17)] md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a href="tel:+359893712919" aria-label={en ? "Call Renovivo" : "Обади се"} className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/10 text-white">
          <Phone className="h-5 w-5" />
        </a>
        <button type="button" onClick={openModal} className="min-h-11 flex-1 rounded-md bg-[#78866F] px-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#87987B]">
          {en ? "Book a free site visit" : "Заяви безплатен оглед"}
        </button>
        <button type="button" onClick={openModal} aria-label={en ? "Schedule site visit" : "Насрочи оглед"} className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white/10 text-white">
          <CalendarDays className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default MobileActionBar;
