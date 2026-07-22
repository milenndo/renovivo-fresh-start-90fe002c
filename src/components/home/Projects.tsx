import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects as allProjects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";

const displayProjects = allProjects.slice(0, 4);

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-primary/15"
    >
      <div className="container-custom relative z-10">
        {/* Editorial masthead */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-primary" />
              <span className="eyebrow">Портфолио · N°01 — N°04</span>
            </div>
            <h2 className="display-serif text-4xl md:text-6xl lg:text-7xl text-foreground">
              Живи <span className="italic text-primary">пространства.</span>
              <br />
              Реални истории.
            </h2>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="text-foreground/60 font-light text-base md:text-lg leading-relaxed mb-6">
              Всеки проект е авторска работа — от избора на камъка до последния
              шев в тапицерията. Разгледайте селекция от последните ни завършени
              резиденции в София.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-foreground group-hover:text-primary transition-colors">
                Пълен архив
              </span>
              <span className="w-12 h-px bg-primary transition-all duration-500 group-hover:w-24" />
            </Link>
          </div>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {displayProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, "0");
            const materials = project.features?.slice(0, 3) ?? [];
            return (
              <Link
                key={project.id}
                to={`/portfolio/${project.id}`}
                className={`group block transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/5] bg-secondary border border-primary/15">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70" />
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="display-serif text-primary text-4xl leading-none">
                      N°{num}
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 w-11 h-11 border border-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-background/40">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>

                {/* Story block */}
                <div className="pt-6 md:pt-8 grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-8 space-y-3">
                    <span className="eyebrow">
                      {project.category} · {project.location}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/60 font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:border-l md:border-primary/20 md:pl-4 space-y-2">
                    <span className="eyebrow block">Спецификации</span>
                    <div className="text-xs text-foreground/70 space-y-1 font-light">
                      <div className="flex justify-between border-b border-primary/10 pb-1">
                        <span className="text-foreground/45">Площ</span>
                        <span>{project.area}</span>
                      </div>
                      <div className="flex justify-between border-b border-primary/10 pb-1">
                        <span className="text-foreground/45">Срок</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Materials strip */}
                {materials.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-primary/15 flex flex-wrap gap-x-4 gap-y-2">
                    {materials.map((m) => (
                      <span
                        key={m}
                        className="text-[10px] tracking-[0.2em] uppercase text-foreground/50"
                      >
                        · {m}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
