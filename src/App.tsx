import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ComponentType, ReactNode } from "react";
import type { ComponentType, PropsWithChildren } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { InspectionRequestProvider } from "./contexts/InspectionRequestContext";
import { ChatProvider } from "./contexts/ChatContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import InspectionRequestModal from "./components/InspectionRequestModal";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import InteriorDesign from "./pages/InteriorDesign";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import InnovativeCoatings from "./pages/InnovativeCoatings";
import VirtualTours from "./pages/VirtualTours";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import OAuthConsent from "./pages/OAuthConsent";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

interface AppProps {
  Router?: ComponentType<PropsWithChildren>;
  helmetContext?: Record<string, unknown>;
}

const App = ({ Router = BrowserRouter, helmetContext }: AppProps = {}) => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <CookieConsentProvider>
            <InspectionRequestProvider>
              <ChatProvider>
                <Toaster />
                <Sonner />
                <InspectionRequestModal />
                <Router>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/interior-design" element={<InteriorDesign />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/innovative-coatings" element={<InnovativeCoatings />} />
                    <Route path="/3d-scanning" element={<VirtualTours />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/:id" element={<ProjectDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
                <Analytics />
              </ChatProvider>
            </InspectionRequestProvider>
          </CookieConsentProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
