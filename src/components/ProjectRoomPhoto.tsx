import { Expand } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectRoomPhoto({ src, alt, label }: { src: string; alt: string; label: string }) {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" aria-label={`${en ? "Enlarge" : "Увеличи"}: ${label}`} className="group relative block w-full overflow-hidden rounded-[7px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#50614E]">
          <img src={src} alt={alt} loading="lazy" decoding="async" width={900} height={600} className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
          <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-[#FAF9F6]/95 text-[#344636] shadow-sm"><Expand size={17} aria-hidden="true" /></span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[94dvh] w-[94vw] max-w-5xl overflow-y-auto bg-[#FAF9F6] p-3 pt-12 sm:p-5 sm:pt-12">
        <DialogTitle className="rv-heading-serif text-xl">{label}</DialogTitle>
        <img src={src} alt={alt} width={1250} height={833} className="max-h-[70dvh] w-full rounded-[4px] object-contain" />
        <DialogDescription className="text-xs leading-relaxed text-[#586459]">{en ? "Explore the materials, colors and details of the room." : "Разгледайте материалите, цветовете и детайлите на помещението."}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
