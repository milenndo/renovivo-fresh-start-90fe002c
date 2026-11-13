import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects as allProjects } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

// Lead with whole-home renovation rather than specialty coatings.
// Case-study photos, dates and project statistics must be verified before promotion as completed work.
const displayProjects = [
  ...allProjects.filter((project) => project.categoryId === "full"),
  ...allProjects.filter((project) => project.categoryId === "bathroom"),
  ...allProjects.filter((project) => project.categoryId === "kitchen"),
  ...allProjects.filter((project) => project.categoryId === "living"),
  ...allProjects.filter((project) => !["full", "bathroom", "kitchen", "living"].includes(project.categoryId)),
].slice(0, 4);

const Projects = () => {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <section id="projects" className="border-b border-border bg-background py-20 md:py-28">
      <div className="container-custom">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow mb-5">{en ? "Portfolio / Spaces" : "Портфолио / Пространства"}</p>
            <h2 className="max-w-3xl text-[clamp(2.25rem,4.5vw,4.5rem)] font-semibold leading-[1.12] tracking-[-0.05em] text-foreground">
              {en ? "Craft is in the details." : "Качеството се вижда в детайлите."}
            </h2>
          </div>
          <div className="md:col-span-4 md:pb-2">
            <p className="mb-6 max-w-sm text-base leading-[1.7] text-muted-foreground">
              {en
                ? "Explore spaces, finishes and the design decisions behind renovation projects."
                : "Разгледайте пространства, материали и решения — от цялостния интериор до най-малкия довършителен детайл."}
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-3 border-b border-foreground pb-2 text-sm font-semibold transition-colors hover:text-[#6A746B]">
              {en ? "All projects" : "Всички проекти"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2">
          {displayProjects.map((project, index) => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6A746B]">
              <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width={1100}
                  height={880}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-reduce:transform-none group-hover:scale-[1.035]"
                />
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-background text-foreground opacity-90 transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-border py-5">
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">{project.title}</h3>
                </div>
                <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">{en ? "Explore" : "Разгледай"}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
