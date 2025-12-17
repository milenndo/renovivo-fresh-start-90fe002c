import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Paintbrush,
  Droplets,
  Hammer,
  Layers,
  Grid3X3,
  Zap,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Service images
import fullRenovationImg from "@/assets/images/services/full-renovation.jpg";
import bathroomImg from "@/assets/images/services/bathroom.jpg";
import kitchenImg from "@/assets/images/services/kitchen.jpg";
import microcementImg from "@/assets/images/services/microcement.jpg";
import terrazzoImg from "@/assets/images/services/terrazzo.jpg";
import flakeFloorImg from "@/assets/images/services/flake-floor.jpg";
import stoneCarpetImg from "@/assets/images/services/stone-carpet.jpg";
import karteneImg from "@/assets/images/services/kartene.png";
import paintingImg from "@/assets/images/services/painting.jpg";
import flooringImg from "@/assets/images/services/flooring.jpg";
import electricalImg from "@/assets/images/services/electrical.jpg";
import plumbingImg from "@/assets/images/services/plumbing.jpg";

const categories = [
  {
    id: "full-renovations",
    title: "Цялостни ремонти",
    bgClass: "bg-background",
    services: [
      {
        id: "full-renovation",
        path: "/services/full-renovation",
        icon: Home,
        title: "Цялостен Ремонт",
        description: "Пълна трансформация на жилища - от проект до реализация с фиксиран бюджет.",
        image: fullRenovationImg,
      },
      {
        id: "bathroom",
        path: "/services/bathroom",
        icon: Droplets,
        title: "Ремонт на Баня",
        description: "Комплексно изпълнение с хидроизолация и професионален монтаж.",
        image: bathroomImg,
      },
      {
        id: "kitchen",
        path: "/services/kitchen",
        icon: Grid3X3,
        title: "Ремонт на Кухня",
        description: "Цялостна изработка на кухни по поръчка, съобразени с вашето помещение.",
        image: kitchenImg,
      },
    ],
  },
  {
    id: "specialized-coatings",
    title: "Специализирани покрития",
    bgClass: "bg-muted/30",
    services: [
      {
        id: "microcement",
        path: "/services/microcement",
        icon: Layers,
        title: "Микроцимент",
        description: "Безфугово покритие за стени и подове с модерен индустриален вид.",
        image: microcementImg,
      },
      {
        id: "terrazzo",
        path: "/services/terrazzo",
        icon: Layers,
        title: "Terrazzo",
        description: "Класическа елегантност с мраморни фрагменти в съвременно изпълнение.",
        image: terrazzoImg,
      },
      {
        id: "flake-floor",
        path: "/services/flake-floor",
        icon: Layers,
        title: "Flake Floor",
        description: "Декоративни подове с флейк ефект - издръжливи и естетични.",
        image: flakeFloorImg,
      },
      {
        id: "stone-carpet",
        path: "/services/stone-carpet",
        icon: Layers,
        title: "Каменен Килим",
        description: "Естествена красота от речни камъчета за външни и вътрешни пространства.",
        image: stoneCarpetImg,
      },
    ],
  },
  {
    id: "preparation-finishing",
    title: "Подготовка и довършване",
    bgClass: "bg-secondary/20",
    services: [
      {
        id: "demolition",
        path: "/services/demolition",
        icon: Hammer,
        title: "Къртене",
        description: "Професионално къртене и демонтаж с изнасяне на отпадъци.",
        image: karteneImg,
      },
      {
        id: "painting",
        path: "/services/shpaklovka",
        icon: Paintbrush,
        title: "Шпакловка и боя",
        description: "Перфектно гладки стени и безупречно боядисване.",
        image: paintingImg,
      },
      {
        id: "flooring",
        path: "/services/flooring",
        icon: Grid3X3,
        title: "Настилки",
        description: "Ламинат, винил, паркет и плочки с прецизен монтаж.",
        image: flooringImg,
      },
      {
        id: "electrical",
        path: "/services/electrical",
        icon: Zap,
        title: "Електро услуги",
        description: "Нови инсталации и ремонт от сертифицирани специалисти.",
        image: electricalImg,
      },
      {
        id: "plumbing",
        path: "/services/plumbing",
        icon: Wrench,
        title: "ВиК услуги",
        description: "Водопровод и канализация с гаранция за качество.",
        image: plumbingImg,
      },
    ],
  },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Услуги
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Какво можем да направим за вас
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Изберете категория, за да разгледате нашите услуги
          </p>
        </div>

        {/* Main Layout - Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar - Category Navigation */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group",
                    activeCategory === category.id
                      ? "bg-foreground text-background shadow-lg"
                      : "bg-muted/50 hover:bg-muted text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "block font-semibold text-base transition-colors",
                      activeCategory === category.id
                        ? "text-primary"
                        : "group-hover:text-primary"
                    )}
                  >
                    {category.title}
                  </span>
                  <span
                    className={cn(
                      "text-sm mt-1 block",
                      activeCategory === category.id
                        ? "text-background/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {category.services.length} услуги
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className={cn("flex-1 rounded-2xl p-6 md:p-8", currentCategory.bgClass)}>
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              {currentCategory.title}
            </h3>

            {/* Services Grid - Asymmetric Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentCategory.services.map((service, index) => (
                <Link
                  key={service.id}
                  to={service.path}
                  className={cn(
                    "group relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-xl transition-all duration-300",
                    // Make first item larger on larger screens
                    index === 0 && currentCategory.services.length > 2 && "md:col-span-2"
                  )}
                >
                  <div
                    className={cn(
                      "flex",
                      index === 0 && currentCategory.services.length > 2
                        ? "flex-col md:flex-row"
                        : "flex-col"
                    )}
                  >
                    {/* Image */}
                    <div
                      className={cn(
                        "relative overflow-hidden",
                        index === 0 && currentCategory.services.length > 2
                          ? "h-48 md:h-auto md:w-1/2"
                          : "h-40"
                      )}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div
                      className={cn(
                        "p-5",
                        index === 0 && currentCategory.services.length > 2
                          ? "md:w-1/2 md:flex md:flex-col md:justify-center"
                          : ""
                      )}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <service.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        <span>Научете повече</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="font-semibold">
              Разгледайте всички услуги
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
