import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, X, Send, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const inspectionSchema = z.object({
  client_name: z
    .string()
    .trim()
    .min(2, "Името трябва да е поне 2 символа")
    .max(100, "Името е твърде дълго"),
  client_phone: z
    .string()
    .trim()
    .min(8, "Невалиден телефонен номер")
    .max(20, "Телефонният номер е твърде дълъг"),
  client_email: z
    .string()
    .trim()
    .email("Невалиден имейл адрес")
    .max(255, "Имейлът е твърде дълъг")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .trim()
    .min(5, "Адресът трябва да е поне 5 символа")
    .max(255, "Адресът е твърде дълъг"),
  notes: z
    .string()
    .trim()
    .max(1000, "Описанието е твърде дълго")
    .optional()
    .or(z.literal("")),
});

const SITE_KEY = "f0f49628-5bd2-4a88-853e-db5a9758c6f2";

const InspectionRequestModal = () => {
  const { isOpen, closeModal } = useInspectionRequest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    client_phone: "",
    client_email: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha | null>(null);

  const handleClose = () => {
    setFormData({
      client_name: "",
      client_phone: "",
      client_email: "",
      address: "",
      notes: "",
    });
    setErrors({});
    setCaptchaToken(null);
    captchaRef.current?.resetCaptcha();
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    if (errors["captcha"]) {
      setErrors(prev => ({ ...prev, captcha: "" }));
    }
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = inspectionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!captchaToken) {
      setErrors(prev => ({
        ...prev,
        captcha: "Моля, потвърдете, че не сте робот.",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("inspection_requests").insert({
        client_name: formData.client_name.trim(),
        client_phone: formData.client_phone.trim(),
        client_email: formData.client_email.trim() || null,
        address: formData.address.trim(),
        notes: formData.notes.trim() || null,
      });

      if (error) throw error;

      toast.success("Заявката е изпратена успешно!", {
        description: "Ще се свържем с вас възможно най-скоро.",
      });

      handleClose();
    } catch (error) {
      toast.error("Грешка при изпращане на заявката", {
        description: "Моля, опитайте отново или се свържете с нас по телефона.",
      });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-full p-2 bg-background/80 hover:bg-background border border-border shadow-sm transition-colors"
          aria-label="Затвори"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-3 p-6 md:p-8 pt-12 md:pt-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">Заявете безплатен оглед</DialogTitle>
              <p className="text-muted-foreground text-sm mt-2">
                Попълнете формата и ще се свържем с вас в рамките на 24 часа.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">
                    Вашето име <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="client_name"
                    name="client_name"
                    placeholder="Иван Иванов"
                    value={formData.client_name}
                    onChange={handleChange}
                    className={errors.client_name ? "border-destructive" : ""}
                  />
                  {errors.client_name && (
                    <p className="text-destructive text-xs">{errors.client_name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_phone">
                    Телефон <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="client_phone"
                    name="client_phone"
                    type="tel"
                    placeholder="+359 888 123 456"
                    value={formData.client_phone}
                    onChange={handleChange}
                    className={errors.client_phone ? "border-destructive" : ""}
                  />
                  {errors.client_phone && (
                    <p className="text-destructive text-xs">{errors.client_phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_email">Имейл (по избор)</Label>
                <Input
                  id="client_email"
                  name="client_email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={formData.client_email}
                  onChange={handleChange}
                  className={errors.client_email ? "border-destructive" : ""}
                />
                {errors.client_email && (
                  <p className="text-destructive text-xs">{errors.client_email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Адрес в София <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="жк. Младост, ул. Примерна 10"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                  <p className="text-destructive text-xs">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Разкажете за проекта (по избор)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Каквито мисли имате - размер на банята, желан срок, специални изисквания..."
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className={errors.notes ? "border-destructive" : ""}
                />
                {errors.notes && (
                  <p className="text-destructive text-xs">{errors.notes}</p>
                )}
              </div>

              {/* hCaptcha */}
              <div className="space-y-2">
                <Label>Сигурност</Label>
                <HCaptcha
                  ref={captchaRef}
                  sitekey={SITE_KEY}
                  onVerify={handleCaptchaVerify}
                  onExpire={handleCaptchaExpire}
                />
                {errors.captcha && (
                  <p className="text-destructive text-xs">{errors.captcha}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Изпращане...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Изпратете заявка
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full md:hidden"
                onClick={handleClose}
              >
                Отказ
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 bg-primary p-6 md:p-8 text-primary-foreground">
            <h3 className="text-xl font-bold mb-6">Или се свържете директно</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Позвънете ни</p>
                  <a
                    href="tel:+359893712919"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  >
                    +359 89 371 29 19
                  </a>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Пон-Пет: 8:00 - 18:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Пишете ни</p>
                  <a
                    href="mailto:renovivo.bg@gmail.com"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  >
                    renovivo.bg@gmail.com
                  </a>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    Отговаряме до 24 часа
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Офис в София</p>
                  <p className="text-primary-foreground/90">София и района</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InspectionRequestModal;
