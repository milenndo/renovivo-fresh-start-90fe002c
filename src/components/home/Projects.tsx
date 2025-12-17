import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Модерен апартамент",
    category: "Цялостен ремонт",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Луксозна баня",
    category: "Баня",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Минималистична кухня",
    category: "Кухня",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Уютна спалня",
    category: "Спалня",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
  },
];

const Projects = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-amber-700 font-medium text-sm uppercase tracking-wider">Портфолио</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Нашите скорошни проекти
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Разгледайте някои от нашите завършени проекти и се убедете в качеството на нашата работа.
            </p>
          </div>
          <Link to="/portfolio" className="mt-6 md:mt-0">
            <Button variant="outline" className="font-semibold">
              Всички проекти
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to="/portfolio"
              className="group relative overflow-hidden rounded-xl aspect-[4/5] block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-primary text-sm font-medium mb-2">{project.category}</span>
                <h3 className="text-background text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Hover icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                <Eye className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
