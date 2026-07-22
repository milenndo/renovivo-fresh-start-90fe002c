import { Link } from "react-router-dom";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects as allProjects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";

const displayProjects = allProjects.slice(0, 4);

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-secondary/30 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          className={`flex flex-col md:flex-row md:items-end justify-between mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Портфолио</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Нашите скорошни проекти
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Разгледайте някои от нашите завършени проекти и се убедете в качеството на нашата работа.
            </p>
          </div>
          <Link to="/portfolio" className="mt-6 md:mt-0">
            <Button variant="outline" className="group font-semibold rounded-xl border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground px-6 transition-all duration-300">
              Всички проекти
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className={`group relative overflow-hidden rounded-2xl block transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`, 
                aspectRatio: '4/5',
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Image */}
              <img
                src={project.mainImage}
                alt={project.title}
                width={400}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                style={{ aspectRatio: '4/5' }}
              />
              
              {/* Multi-layer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500" />
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-primary text-sm font-semibold mb-2 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.category}
                </span>
                <h3 className="text-background text-xl font-bold group-hover:text-primary transition-all duration-300 transform translate-y-0 group-hover:-translate-y-1">
                  {project.title}
                </h3>
                
                {/* View more text */}
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-background/80 text-sm font-medium">Разгледай проекта</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Hover icon badge */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 shadow-lg shadow-primary/30">
                <Eye className="h-5 w-5 text-primary-foreground" />
              </div>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
