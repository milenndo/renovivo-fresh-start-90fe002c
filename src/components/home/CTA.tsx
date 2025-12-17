import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import ctaBackground from "@/assets/images/cta-background.jpg";

// Hand-drawn sketchy arrow SVG component
const SketchyArrow = () => (
  <svg
    className="absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-10 text-primary-foreground/70 hidden md:block animate-[bounce_2s_infinite]"
    viewBox="0 0 60 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main arrow body - hand-drawn style with imperfect curves */}
    <path
      d="M5 22 C8 20, 12 24, 18 21 C24 18, 28 25, 35 20 C42 15, 45 23, 50 20"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      style={{ filter: 'url(#roughen)' }}
    />
    {/* Arrow head - sketchy style */}
    <path
      d="M45 14 C48 17, 50 19, 52 20 C50 21, 48 24, 46 28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Extra sketchy line for hand-drawn effect */}
    <path
      d="M8 24 C14 22, 20 26, 28 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    <defs>
      <filter id="roughen">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
      </filter>
    </defs>
  </svg>
);

const CTA = () => {
  const { openModal } = useInspectionRequest();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Готови ли сте да започнете?
        </h2>
        <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
          Свържете се с нас днес за безплатен оглед и оферта в София и района. 
          Нашият екип е готов да превърне вашите идеи в реалност.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Button with hand-drawn arrow pointing to it */}
          <div className="relative">
            <SketchyArrow />
            <Button
              size="lg"
              onClick={openModal}
              className="bg-background text-foreground hover:bg-background/90 font-semibold"
            >
              <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
              Заяви оглед
            </Button>
          </div>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
              Изпратете запитване
              <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;