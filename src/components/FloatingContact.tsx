import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { useCookieConsentContext } from "@/contexts/CookieConsentContext";
import { cn } from "@/lib/utils";

const PHONE = "+359893712919";
const VIBER_URL = `viber://chat?number=${encodeURIComponent(PHONE)}`;
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}`;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
);

const ViberIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11.4 0C9.473.028 5.333.344 3.02 2.451 1.302 4.163.7 6.68.633 9.797.57 12.909.488 18.752 6.116 20.334v2.42s-.037.98.607 1.18c.782.243 1.24-.502 1.986-1.305l1.4-1.577c3.85.323 6.807-.417 7.143-.526.775-.252 5.166-.816 5.881-6.646.736-6.012-.359-9.815-2.328-11.533l-.011-.005c-.596-.549-2.987-2.29-8.32-2.309 0 0-.393-.026-1.075-.033m.068 1.688c.577.002.925.028.925.028 4.512.014 6.671 1.375 7.175 1.833 1.665 1.434 2.518 4.861 1.895 9.881-.598 4.87-4.155 5.179-4.81 5.39-.28.09-2.882.736-6.156.523l-3.72 4.169s-.514.638-.807.63c-.264-.007-.256-.475-.256-.475l.031-4.02C.986 18.325 1.29 13.348 1.344 10.75c.056-2.598.545-4.729 1.998-6.16 1.955-1.755 5.472-2.02 7.098-2.075.003 0 .18-.017.928-.023h.1m.489 2.093a.375.375 0 000 .75c1.598.023 2.918.545 3.966 1.556 1.048 1.011 1.586 2.383 1.6 4.114a.375.375 0 10.75-.008c-.014-1.933-.622-3.516-1.83-4.68-1.208-1.163-2.712-1.766-4.486-1.732m-6.646.436c-.208.023-.4.144-.53.315l-.583.735c-.283.336-.302.752-.038 1.147.283.422 3.088 4.585 3.088 4.585s2.804 4.162 3.087 4.583c.264.395.639.487 1.06.204l.734-.583c.171-.13.291-.322.315-.53.023-.209-.09-.408-.234-.617-.144-.209-1.375-2.032-1.62-2.4-.244-.368-.643-.406-.966-.196-.323.21-.796.517-.796.517s-.68.51-1.798-1.147c-1.117-1.658-.606-2.34-.606-2.34s.307-.472.517-.796c.21-.323.172-.722-.196-.966-.368-.244-2.191-1.475-2.4-1.62-.15-.104-.294-.203-.435-.192-.037.003-.073.008-.11.014m6.665.784a.375.375 0 000 .75c1.155.024 2.086.404 2.83 1.148.744.744 1.124 1.675 1.148 2.83a.375.375 0 10.75-.008c-.024-1.355-.484-2.487-1.368-3.372-.885-.884-2.017-1.344-3.36-1.348m.023 1.5a.375.375 0 000 .75c.696.014 1.263.221 1.716.677.454.456.661 1.024.675 1.72a.375.375 0 10.75-.008c-.014-.874-.297-1.63-.892-2.229-.595-.599-1.351-.883-2.249-.91" />
  </svg>
);

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const { showBanner } = useCookieConsentContext();

  return (
    <div
      className={cn(
        "fixed right-4 md:right-6 z-40 flex flex-col items-end gap-3 transition-all duration-300",
        showBanner ? "bottom-40 md:bottom-28" : "bottom-6",
      )}
    >
      {open && (
        <div className="flex flex-col items-end gap-3 animate-fade-in">
          <a
            href={VIBER_URL}
            className="group flex items-center gap-3 bg-background border border-border shadow-lg pl-4 pr-3 py-2.5 rounded-full hover:shadow-xl transition-shadow"
            aria-label="Свържете се във Viber"
          >
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground">
              Viber
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7360F2] text-white">
              <ViberIcon className="h-5 w-5" />
            </span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-background border border-border shadow-lg pl-4 pr-3 py-2.5 rounded-full hover:shadow-xl transition-shadow"
            aria-label="Свържете се в WhatsApp"
          >
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground">
              WhatsApp
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Затвори бърз контакт" : "Отвори бърз контакт"}
        aria-expanded={open}
        className={cn(
          "h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "ring-1 ring-primary/40",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default FloatingContact;
