import { Check, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import aboutTeamImg from "@/assets/images/about-team.jpg";

const features = [
  "Тясно специализирани експерти",
  "Фокус върху детайла",
  "Ясна комуникация",
  "Предвидимост на бюджета",
  "Спазване на сроковете",
"Разумни цени"];

const About = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={aboutTeamImg}
                alt="Renovivo екип на работа"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">За нас</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              Вашият надежден партньор за ремонт в София
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Renovivo е вашият партньор за цялостни ремонти в София и района. 
              Със страст към детайлите и стремеж към качество, ние трансформираме 
              вашите идеи в реалност – от първия оглед до последния щрих.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Нашият екип от тясно специализирани експерти във всяко звено на ремонтните 
              дейности работи координирано, за да гарантира резултати, които надминават 
              вашите очаквания.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-6 mb-8 p-6 bg-secondary/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <span className="font-semibold block">Специализиран екип</span>
                  <span className="text-sm text-muted-foreground">Експерти във всяко звено</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <span className="font-semibold block">Гаранция</span>
                  <span className="text-sm text-muted-foreground">На всички услуги</span>
                </div>
              </div>
            </div>

            <Link to="/about">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Научете повече за нас
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
