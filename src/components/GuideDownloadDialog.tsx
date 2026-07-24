import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const GUIDE_URL = "/guides/renovivo-luxury-renovation-guide.pdf";

interface GuideDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GuideDownloadDialog = ({ open, onOpenChange }: GuideDownloadDialogProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const copy =
    language === "en"
      ? {
          title: "Download the Client Handbook",
          desc: "Enter your email and we'll open the PDF for you.",
          name: "Name (optional)",
          email: "Email",
          emailPh: "you@example.com",
          submit: "Get the handbook",
          sending: "Sending…",
          okTitle: "Handbook opened",
          okDesc: "Check the new tab. We also received your details.",
          errTitle: "Something went wrong",
          errDesc: "Please try again in a moment.",
          invalidEmail: "Please enter a valid email.",
        }
      : {
          title: "Изтеглете ръководството за възложителя",
          desc: "Въведете имейла си и ще отворим PDF-а за вас.",
          name: "Име (по желание)",
          email: "Имейл",
          emailPh: "vashiat@primer.bg",
          submit: "Изпрати и отвори",
          sending: "Изпращане…",
          okTitle: "Ръководството е отворено",
          okDesc: "Проверете новия таб. Получихме и данните ви.",
          errTitle: "Възникна грешка",
          errDesc: "Моля опитайте отново след момент.",
          invalidEmail: "Моля въведете валиден имейл.",
        };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailValid) {
      toast({ title: copy.invalidEmail, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: trimmedName || (language === "en" ? "Guide download" : "Заявка за ръководство"),
          email: trimmedEmail,
          message:
            language === "en"
              ? "Requested the Client Handbook PDF via the homepage form."
              : "Заявка за изтегляне на „Ръководство за възложителя" от началната страница.",
          source: "guide-download",
        },
      });
      if (error) throw error;

      window.open(GUIDE_URL, "_blank", "noopener,noreferrer");
      toast({ title: copy.okTitle, description: copy.okDesc });
      setName("");
      setEmail("");
      onOpenChange(false);
    } catch (err) {
      console.error("Guide lead submit failed", err);
      toast({ title: copy.errTitle, description: copy.errDesc, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-none border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{copy.title}</DialogTitle>
          <DialogDescription>{copy.desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label htmlFor="guide-name" className="block text-xs uppercase tracking-[0.2em] font-semibold mb-2">
              {copy.name}
            </label>
            <Input
              id="guide-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="guide-email" className="block text-xs uppercase tracking-[0.2em] font-semibold mb-2">
              {copy.email} *
            </label>
            <Input
              id="guide-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPh}
              maxLength={255}
              autoComplete="email"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-none px-8 py-6 tracking-wider uppercase text-xs"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-3 animate-spin" />
                {copy.sending}
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-3" />
                {copy.submit}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuideDownloadDialog;
