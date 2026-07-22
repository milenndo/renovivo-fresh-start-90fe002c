import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, 
  Scan, 
  Box, 
  Eye, 
  Ruler, 
  Building2, 
  Layers, 
  Camera, 
  ArrowRight,
  CheckCircle2,
  Play,
  Smartphone,
  Monitor,
  Globe,
  Zap,
  Shield,
  Clock,
  Target,
  FileText,
  Users,
  TrendingUp,
  Cpu,
  Share2
} from "lucide-react";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";

const VirtualTours = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Eye,
      title: language === 'bg' ? '360° Виртуални турове' : '360° Virtual Tours',
      description: language === 'bg' 
        ? 'Потопете се в пространството сякаш сте там. Интерактивни обиколки с висока резолюция.'
        : 'Immerse yourself in the space as if you were there. Interactive high-resolution tours.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Box,
      title: language === 'bg' ? '3D Дигитален близнак' : '3D Digital Twin',
      description: language === 'bg'
        ? 'Точна цифрова реплика на вашето пространство с милиметрова прецизност.'
        : 'Precise digital replica of your space with millimeter accuracy.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Ruler,
      title: language === 'bg' ? 'BIM Ready данни' : 'BIM Ready Data',
      description: language === 'bg'
        ? 'Експортирайте директно към Revit, AutoCAD и други BIM платформи.'
        : 'Export directly to Revit, AutoCAD and other BIM platforms.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Layers,
      title: language === 'bg' ? 'Point Cloud заснемане' : 'Point Cloud Capture',
      description: language === 'bg'
        ? 'Милиони точки на данни за перфектно 3D моделиране.'
        : 'Millions of data points for perfect 3D modeling.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const useCases = [
    {
      icon: Building2,
      title: language === 'bg' ? 'Недвижими имоти' : 'Real Estate',
      items: language === 'bg' 
        ? ['Виртуални огледи 24/7', 'Привличане на чуждестранни купувачи', 'Намаляване на физически огледи с 50%', 'По-бързи сделки']
        : ['Virtual viewings 24/7', 'Attract foreign buyers', 'Reduce physical viewings by 50%', 'Faster transactions']
    },
    {
      icon: Ruler,
      title: language === 'bg' ? 'Архитектура & Дизайн' : 'Architecture & Design',
      items: language === 'bg'
        ? ['Прецизни измервания от разстояние', 'Планиране на ремонти', 'Съществуващи условия as-built', 'Интеграция с CAD/BIM']
        : ['Precise remote measurements', 'Renovation planning', 'As-built existing conditions', 'CAD/BIM integration']
    },
    {
      icon: Camera,
      title: language === 'bg' ? 'Документиране' : 'Documentation',
      items: language === 'bg'
        ? ['Архивиране на състояние', 'Застрахователни цели', 'Проследяване на строителство', 'Историческа документация']
        : ['Condition archiving', 'Insurance purposes', 'Construction tracking', 'Historical documentation']
    },
    {
      icon: Users,
      title: language === 'bg' ? 'Маркетинг & Продажби' : 'Marketing & Sales',
      items: language === 'bg'
        ? ['Интерактивни презентации', 'Уебсайт интеграция', 'Социални медии съдържание', 'VR/AR готовност']
        : ['Interactive presentations', 'Website integration', 'Social media content', 'VR/AR readiness']
    }
  ];

  const stats = [
    { value: '99.5%', label: language === 'bg' ? 'Точност' : 'Accuracy', suffix: '' },
    { value: '50', label: language === 'bg' ? 'По-малко огледи' : 'Fewer Viewings', suffix: '%' },
    { value: '4K', label: language === 'bg' ? 'Резолюция' : 'Resolution', suffix: '' },
    { value: '24/7', label: language === 'bg' ? 'Достъпност' : 'Accessibility', suffix: '' }
  ];

  const processSteps = [
    {
      step: '01',
      title: language === 'bg' ? 'Заснемане' : 'Capture',
      description: language === 'bg'
        ? 'Сканираме пространството с професионално оборудване. Процесът отнема 1-3 часа в зависимост от площта.'
        : 'We scan the space with professional equipment. The process takes 1-3 hours depending on the area.',
      icon: Scan
    },
    {
      step: '02',
      title: language === 'bg' ? 'Обработка' : 'Processing',
      description: language === 'bg'
        ? 'AI алгоритми създават перфектен 3D модел и виртуален тур от суровите данни.'
        : 'AI algorithms create a perfect 3D model and virtual tour from the raw data.',
      icon: Cpu
    },
    {
      step: '03',
      title: language === 'bg' ? 'Доставка' : 'Delivery',
      description: language === 'bg'
        ? 'Получавате достъп до вашия виртуален тур, 3D модел и всички необходими файлове.'
        : 'You receive access to your virtual tour, 3D model and all necessary files.',
      icon: Share2
    }
  ];

  const deliverables = [
    { icon: Globe, text: language === 'bg' ? 'Уеб линк за виртуален тур' : 'Web link for virtual tour' },
    { icon: Box, text: language === 'bg' ? '3D модел (.obj, .fbx, .dae)' : '3D model (.obj, .fbx, .dae)' },
    { icon: Layers, text: language === 'bg' ? 'Point Cloud (.e57, .las, .xyz)' : 'Point Cloud (.e57, .las, .xyz)' },
    { icon: FileText, text: language === 'bg' ? 'CAD чертежи (DWG, PDF)' : 'CAD drawings (DWG, PDF)' },
    { icon: Building2, text: language === 'bg' ? 'BIM модел (Revit .rvt)' : 'BIM model (Revit .rvt)' },
    { icon: Camera, text: language === 'bg' ? '4K HDR снимки' : '4K HDR photos' }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": language === 'bg' ? "Начало" : "Home", "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": language === 'bg' ? "3D сканиране" : "3D Scanning", "item": "https://renovivo.bg/3d-scanning" }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === 'bg' ? "3D Сканиране и Виртуални Турове" : "3D Scanning and Virtual Tours",
    "description": language === 'bg' 
      ? "Професионални услуги за 3D сканиране, 360° виртуални турове и BIM моделиране"
      : "Professional 3D scanning, 360° virtual tours and BIM modeling services",
    "provider": {
      "@type": "Organization",
      "name": "Renovivo",
      "url": "https://renovivo.bg"
    },
    "areaServed": {
      "@type": "City",
      "name": "Sofia"
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{language === 'bg' ? '3D Сканиране & Виртуални Турове | 360° BIM - Renovivo' : '3D Scanning & Virtual Tours | 360° BIM - Renovivo'}</title>
        <meta name="description" content={language === 'bg' 
          ? 'Професионални 3D сканиране, 360° виртуални турове и BIM моделиране в София. Цифрови близнаци за недвижими имоти, архитектура и строителство.'
          : 'Professional 3D scanning, 360° virtual tours and BIM modeling in Sofia. Digital twins for real estate, architecture and construction.'
        } />
        <meta name="keywords" content="3D scanning Sofia, virtual tours, Matterport, BIM, digital twin, 360 tour, point cloud, Revit" />
        <link rel="canonical" href="https://renovivo.bg/3d-scanning" />
        <meta property="og:title" content={language === 'bg' ? '3D Сканиране & Виртуални Турове | Renovivo' : '3D Scanning & Virtual Tours | Renovivo'} />
        <meta property="og:description" content={language === 'bg' 
          ? 'Професионални 3D сканиране и 360° виртуални турове за недвижими имоти и строителство.'
          : 'Professional 3D scanning and 360° virtual tours for real estate and construction.'
        } />
        <meta property="og:url" content="https://renovivo.bg/3d-scanning" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Hero Section - Dark Tech Theme */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 179, 53, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 179, 53, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* 3D floating elements */}
        <div className="absolute top-20 right-20 opacity-30">
          <Box className="w-16 h-16 text-primary animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20">
          <Scan className="w-12 h-12 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <VisualBreadcrumb 
            items={[{ label: language === 'bg' ? "3D Сканиране" : "3D Scanning" }]} 
            className="mb-8"
          />
          
          <div className="max-w-5xl">
            <Badge className="mb-6 px-6 py-2 text-sm bg-primary/10 text-primary border-primary/30 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              {language === 'bg' ? 'Нова услуга' : 'New Service'}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-50 mb-6 leading-tight">
              <span className="block">{language === 'bg' ? 'Дигитализирайте' : 'Digitize'}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-primary">
                {language === 'bg' ? 'пространството' : 'your space'}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              {language === 'bg' 
                ? '360° виртуални турове, 3D сканиране и BIM моделиране с технология от ново поколение. Перфектни дигитални близнаци за вашия бизнес.'
                : '360° virtual tours, 3D scanning and BIM modeling with next-generation technology. Perfect digital twins for your business.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group">
                <a href="tel:+359893712919" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  {language === 'bg' ? 'Безплатна консултация' : 'Free Consultation'}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-200 hover:bg-slate-800 px-8 py-6 text-lg">
                <Play className="mr-2 h-5 w-5" />
                {language === 'bg' ? 'Вижте демо' : 'View Demo'}
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              {language === 'bg' ? 'Възможности' : 'Capabilities'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'bg' ? 'Технологии от бъдещето' : 'Future-Ready Technology'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'bg' 
                ? 'Комбинираме най-съвременното хардуерно оборудване с интелигентен софтуер'
                : 'We combine cutting-edge hardware with intelligent software'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <CardContent className="p-8 relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              {language === 'bg' ? 'Приложения' : 'Applications'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'bg' ? 'За кого е полезно?' : 'Who Benefits?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'bg' 
                ? '3D сканирането трансформира начина на работа в множество индустрии'
                : '3D scanning transforms the way of working across multiple industries'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-card border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <useCase.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{useCase.title}</h3>
                  <ul className="space-y-3">
                    {useCase.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - Matterport Showcase */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-6 py-2 bg-primary/10 text-primary border-primary/30">
              <Play className="w-4 h-4 mr-2" />
              {language === 'bg' ? 'Демонстрация' : 'Live Demo'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
              {language === 'bg' ? 'Вижте на живо' : 'See It Live'}
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {language === 'bg' 
                ? 'Разгледайте реален виртуален тур. Навигирайте свободно в пространството и изпитайте технологията.'
                : 'Explore a real virtual tour. Navigate freely in the space and experience the technology.'}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-2 md:p-4 shadow-2xl">
              {/* Browser mockup header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 rounded-t-2xl border-b border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700/50 rounded-lg px-4 py-1.5 text-sm text-slate-400 text-center max-w-md mx-auto">
                    my.matterport.com/show
                  </div>
                </div>
              </div>
              
              {/* Matterport iframe */}
              <div className="aspect-video rounded-b-2xl overflow-hidden">
                <iframe
                  src="https://my.matterport.com/show/?m=v7p9gNck42P&play=1&mls=2"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="fullscreen; vr"
                  className="w-full h-full"
                  title={language === 'bg' ? 'Виртуален тур демо' : 'Virtual tour demo'}
                />
              </div>
            </div>
            
            <p className="text-center text-slate-500 mt-6 text-sm">
              {language === 'bg' 
                ? 'Използвайте мишката или докоснете екрана за навигация. Натиснете бутона за цял екран за по-добро изживяване.'
                : 'Use mouse or touch to navigate. Click fullscreen button for better experience.'}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30 text-primary">
              {language === 'bg' ? 'Ценообразуване' : 'Pricing'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'bg' ? 'Изберете пакет' : 'Choose a Package'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'bg' 
                ? 'Гъвкави решения за всеки проект. Цените са без ДДС.'
                : 'Flexible solutions for every project. Prices are VAT exclusive.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <Card className="relative bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Basic</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {language === 'bg' ? 'За малки пространства' : 'For small spaces'}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">1.5</span>
                    <span className="text-xl text-muted-foreground">€/m²</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? '360° виртуален тур' : '360° virtual tour'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'Уеб линк за споделяне' : 'Web link for sharing'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'HD снимки' : 'HD photos'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'До 500 m²' : 'Up to 500 m²'}</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full py-6" asChild>
                  <a href="tel:+359893712919">
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'bg' ? 'Свържете се' : 'Contact Us'}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Package - Featured */}
            <Card className="relative bg-gradient-to-b from-primary/10 to-card border-primary/50 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-primary/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  {language === 'bg' ? 'Популярен' : 'Popular'}
                </Badge>
              </div>
              <CardContent className="p-8 pt-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {language === 'bg' ? 'За професионалисти' : 'For professionals'}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">2.5</span>
                    <span className="text-xl text-muted-foreground">€/m²</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'Всичко от Basic' : 'Everything in Basic'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? '3D модел (.obj, .fbx)' : '3D model (.obj, .fbx)'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? '4K HDR снимки' : '4K HDR photos'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'Схематичен план' : 'Schematic floor plan'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'До 500 m²' : 'Up to 500 m²'}</span>
                  </li>
                </ul>
                
                <Button className="w-full py-6" asChild>
                  <a href="tel:+359893712919">
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'bg' ? 'Свържете се' : 'Contact Us'}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Package */}
            <Card className="relative bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {language === 'bg' ? 'Пълен пакет' : 'Full package'}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">4</span>
                    <span className="text-xl text-muted-foreground">€/m²</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'Всичко от Pro' : 'Everything in Pro'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'Point Cloud данни' : 'Point Cloud data'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'CAD чертежи (DWG)' : 'CAD drawings (DWG)'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'BIM модел (Revit)' : 'BIM model (Revit)'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{language === 'bg' ? 'До 500 m²' : 'Up to 500 m²'}</span>
                  </li>
                </ul>
                
                <Button variant="outline" className="w-full py-6" asChild>
                  <a href="tel:+359893712919">
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'bg' ? 'Свържете се' : 'Contact Us'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Over 500m² notice */}
          <div className="mt-12 text-center">
            <Card className="inline-block bg-muted/30 border-border/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">
                    {language === 'bg' ? 'Над 500 m²?' : 'Over 500 m²?'}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {language === 'bg' 
                      ? 'Цената е по договаряне. Свържете се с нас за индивидуална оферта.'
                      : 'Price is negotiable. Contact us for a custom quote.'}
                  </p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href="tel:+359893712919">
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'bg' ? 'Обадете се' : 'Call Us'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              {language === 'bg' ? 'Процес' : 'Process'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'bg' ? 'Как работи?' : 'How It Works?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'bg' 
                ? 'От сканиране до готов дигитален близнак за 48 часа'
                : 'From scanning to a ready digital twin in 48 hours'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
            
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-card/80 backdrop-blur border-border/50 text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-6 relative z-10">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-5xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30 text-primary">
                {language === 'bg' ? 'Какво получавате' : 'What You Get'}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
                {language === 'bg' ? 'Пълен пакет данни' : 'Complete Data Package'}
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                {language === 'bg' 
                  ? 'Всичко необходимо за вашия проект в различни формати'
                  : 'Everything you need for your project in various formats'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {deliverables.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-slate-200 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Access Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 px-4 py-2">
                {language === 'bg' ? 'Платформа' : 'Platform'}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {language === 'bg' ? 'Достъп отвсякъде' : 'Access From Anywhere'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {language === 'bg' 
                  ? 'Вашият виртуален тур е достъпен от всяко устройство - компютър, таблет или телефон. Споделяйте с клиенти, партньори и екип с един клик.'
                  : 'Your virtual tour is accessible from any device - computer, tablet or phone. Share with clients, partners and team with one click.'}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <Monitor className="w-8 h-8 text-primary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Desktop</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Mobile</span>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Web</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{language === 'bg' ? 'Вграждане в уебсайт' : 'Website embedding'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{language === 'bg' ? 'Споделяне чрез линк' : 'Sharing via link'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{language === 'bg' ? 'VR headset съвместимост' : 'VR headset compatibility'}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mockup device frame */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-950 rounded-b-xl" />
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-slate-800 to-cyan-500/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                      <Play className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-slate-400">{language === 'bg' ? 'Интерактивен 3D тур' : 'Interactive 3D Tour'}</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 animate-bounce" style={{ animationDuration: '2s' }}>
                <Box className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-bounce" style={{ animationDuration: '2.5s' }}>
                <Scan className="w-7 h-7 text-slate-950" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-6 py-2 bg-primary/10 text-primary border-primary/30">
              <Target className="w-4 h-4 mr-2" />
              {language === 'bg' ? 'Готови да започнете?' : 'Ready to Start?'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {language === 'bg' 
                ? 'Дигитализирайте вашето пространство днес'
                : 'Digitize Your Space Today'}
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {language === 'bg' 
                ? 'Свържете се с нас за безплатна консултация. Ще обсъдим вашите нужди и ще предложим най-доброто решение.'
                : 'Contact us for a free consultation. We will discuss your needs and propose the best solution.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-10 py-6 text-lg group" asChild>
                <a href="tel:+359893712919">
                  <Phone className="mr-2 h-5 w-5" />
                  {language === 'bg' ? 'Обадете се' : 'Call Us'}
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg" asChild>
                <Link to="/contact">
                  {language === 'bg' ? 'Изпратете запитване' : 'Send Inquiry'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>{language === 'bg' ? 'Гаранция за качество' : 'Quality Guarantee'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{language === 'bg' ? 'Бърза доставка' : 'Fast Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>{language === 'bg' ? 'Професионален резултат' : 'Professional Result'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VirtualTours;
