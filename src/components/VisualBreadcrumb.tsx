import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface VisualBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const VisualBreadcrumb = ({ items, className = "" }: VisualBreadcrumbProps) => {
  const { t } = useLanguage();
  // Generate BreadcrumbList Schema.org structured data
  const baseUrl = "https://renovivo.bg";

  const schemaItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": t('breadcrumb.home'),
      "item": baseUrl
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": item.label,
      ...(item.href ? { "item": `${baseUrl}${item.href}` } : {})
    }))
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {/* Home link */}
          <BreadcrumbItemUI>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">{t('breadcrumb.home')}</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItemUI>

          {items.map((item, index) => (
            <span key={item.label} className="contents">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </BreadcrumbSeparator>
              <BreadcrumbItemUI>
                {index === items.length - 1 || !item.href ? (
                  <BreadcrumbPage className="text-foreground font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItemUI>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default VisualBreadcrumb;
