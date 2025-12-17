import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Страницата не е намерена | Renovivo</title>
        <meta name="description" content="Страницата, която търсите, не съществува. Върнете се към началната страница на Renovivo." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Страницата не е намерена</h2>
          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            Съжаляваме, но страницата, която търсите, не съществува или е била преместена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Начална страница
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+359893712919">
                <Phone className="h-4 w-4 mr-2" />
                Обадете се
              </a>
            </Button>
          </div>
          <div className="mt-8">
            <Link to="/services" className="text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вижте нашите услуги
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
