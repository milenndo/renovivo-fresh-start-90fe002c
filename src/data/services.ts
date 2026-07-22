import { Home, Bath, ChefHat, Paintbrush, Layers, Wrench, Zap, Droplets, Square, Sparkles, Hexagon, Mountain, Lightbulb, DoorOpen, Sofa, Hammer, Timer, Frame } from "lucide-react";
import type { Language } from '@/contexts/LanguageContext';

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

// Import images
import fullRenovationImg from "@/assets/images/services/full-renovation.jpg";
import bathroomImg from "@/assets/images/services/bathroom.jpg";
import kitchenImg from "@/assets/images/services/minimalistchna_byala_kuhniya.png";
import paintingImg from "@/assets/images/services/painting.jpg";
import flooringImg from "@/assets/images/services/flooring.jpg";
import karteneImg from "@/assets/images/services/kartene.png";
import electricalImg from "@/assets/images/services/electrical.jpg";
import plumbingImg from "@/assets/images/services/plumbing.jpg";
import microcementImg from "@/assets/images/services/microcement-modern.jpg";
import microcementKitchenImg from "@/assets/images/services/microcement-kitchen.jpg";
import terrazzoImg from "@/assets/images/services/terrazzo-modern.jpg";
import terrazzoBathroomImg from "@/assets/images/services/terrazzo-bathroom.jpg";
import flakeFloorImg from "@/assets/images/services/flake-floor.jpg";
import flakeFloorShowroomImg from "@/assets/images/services/flake-floor-showroom.jpg";
import stoneCarpetImg from "@/assets/images/services/stone-carpet.jpg";
import stoneCarpetPoolImg from "@/assets/images/services/stone-carpet-pool.jpg";
import smartHomeImg from "@/assets/images/services/smart-home.jpg";
import drywallImg from "@/assets/images/services/drywall.jpg";
import doorsImg from "@/assets/images/services/doors.jpg";
import windowsImg from "@/assets/images/services/windows.jpg";
import apartmentRenovationImg from "@/assets/images/services/apartment-renovation.jpg";
import livingRoomImg from "@/assets/images/services/living-room.jpg";

export interface Service {
  id: string;
  icon: typeof Home;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  image: string;
  gallery: string[];
  isInnovative?: boolean;
  category?: 'full-renovation' | 'finishing-work' | 'partial-renovation' | 'special-solutions';
  colorVariants?: { name: string; description: string }[];
  vsTiles?: {
    advantages: string[];
    disadvantages: string[];
    comparison: { aspect: string; innovative: string; tiles: string }[];
  };
  faq?: { question: string; answer: string }[];
}

// FAQ данни за различните услуги - Bulgarian
const serviceFAQsBG: Record<string, { question: string; answer: string }[]> = {
  "full-renovation": [
    { question: "Колко време отнема цялостен ремонт на апартамент?", answer: "Цялостният ремонт обикновено отнема от 2 до 4 месеца, в зависимост от площта и сложността на проекта. За 80 кв.м. апартамент, стандартният срок е около 2.5-3 месеца." },
    { question: "Какво включва цената за цялостен ремонт?", answer: "Цената включва всички довършителни работи: шпакловка, замазка, настилки, боядисване, ел. и ВиК инсталации, монтаж на врати и санитария. Материалите се калкулират отделно или по договореност." },
    { question: "Трябва ли да присъствам по време на ремонта?", answer: "Не е необходимо. Осигуряваме личен проектен мениджър, който координира всичко и ви информира редовно. Може да посещавате обекта по всяко време." },
    { question: "Давате ли гаранция за работата?", answer: "Да, предлагаме гаранция за всички извършени работи. Срокът варира според вида работа - от 2 до 10 години за различните елементи." }
  ],
  "bathroom": [
    { question: "Колко време отнема ремонт на баня?", answer: "Стандартният ремонт на баня отнема 2-3 седмици. При по-сложни проекти с преместване на ВиК или разширяване - до 4 седмици." },
    { question: "Включена ли е хидроизолацията в цената?", answer: "Да, професионалната хидроизолация е задължителен етап и винаги е включена. Използваме многослойна система с 10-годишна гаранция." },
    { question: "Можете ли да монтирате подово отопление в банята?", answer: "Да, монтираме електрическо подово отопление, което е идеално за бани. Добавя комфорт и е енергийно ефективно." }
  ],
  "kitchen": [
    { question: "Правите ли кухни по поръчка?", answer: "Да, работим с водещи производители на кухненски мебели по поръчка. Предлагаме пълен сервиз - от 3D проект до монтаж и свързване на уреди." },
    { question: "Колко струва ремонт на кухня?", answer: "Цената зависи от площта, избраните материали и уреди. Средната цена за кухня от 12-15 кв.м. е между 8,000 и 20,000 лв. с мебели." }
  ],
  "microcement": [
    { question: "Колко издържа микроциментът?", answer: "При правилно нанасяне и поддръжка, микроциментът издържа над 20 години. Устойчив е на износване, вода и UV лъчи." },
    { question: "Може ли да се нанесе върху стари плочки?", answer: "Да, микроциментът може да се нанася директно върху стари плочки, ламинат или бетон, без нужда от демонтаж." },
    { question: "Подходящ ли е за баня и кухня?", answer: "Абсолютно. С правилното запечатване микроциментът е напълно водоустойчив и идеален за мокри помещения." }
  ],
  "terrazzo": [
    { question: "Каква е разликата между terrazzo и микроцимент?", answer: "Terrazzo съдържа естествени камъни и мрамор, които се шлифоват до огледален блясък. Издържа 75+ години и е по-луксозен, но и по-скъп от микроцимента." },
    { question: "Може ли да изберем дизайна на камъните?", answer: "Да, предлагаме широка гама от камъни, цветове и размери. Можете да създадете уникален дизайн, съобразен с вашия интериор." }
  ],
  "electrical": [
    { question: "Работите ли с проекти за умен дом?", answer: "Да, монтираме системи за умен дом - smart осветление, термостати, щори и централизирано управление." },
    { question: "Издавате ли сертификат за ел. инсталацията?", answer: "Да, след завършване издаваме протокол за електрически измервания, който е необходим за актуване на обекта." }
  ],
  "plumbing": [
    { question: "Работите ли с подово отопление?", answer: "Да, монтираме водно и електрическо подово отопление. Предлагаме цялостно решение - от проект до пускане в експлоатация." },
    { question: "Колко струва подмяна на ВиК инсталацията?", answer: "Цената зависи от дължината на тръбите и сложността. Ориентировъчно - от 1,500 до 4,000 лв. за стандартен апартамент." }
  ]
};

// FAQ data for different services - English
const serviceFAQsEN: Record<string, { question: string; answer: string }[]> = {
  "full-renovation": [
    { question: "How long does a complete apartment renovation take?", answer: "Complete renovation usually takes 2 to 4 months, depending on the area and project complexity. For an 80 sq.m. apartment, the standard timeframe is around 2.5-3 months." },
    { question: "What does the price for complete renovation include?", answer: "The price includes all finishing works: plastering, screed, flooring, painting, electrical and plumbing installations, door and sanitary ware installation. Materials are calculated separately or by agreement." },
    { question: "Do I need to be present during the renovation?", answer: "Not necessary. We provide a personal project manager who coordinates everything and keeps you regularly informed. You can visit the site anytime." },
    { question: "Do you provide warranty for the work?", answer: "Yes, we offer warranty for all work performed. The term varies depending on the type of work - from 2 to 10 years for different elements." }
  ],
  "bathroom": [
    { question: "How long does a bathroom renovation take?", answer: "Standard bathroom renovation takes 2-3 weeks. For more complex projects with plumbing relocation or expansion - up to 4 weeks." },
    { question: "Is waterproofing included in the price?", answer: "Yes, professional waterproofing is a mandatory stage and always included. We use a multi-layer system with 10-year warranty." },
    { question: "Can you install underfloor heating in the bathroom?", answer: "Yes, we install electric underfloor heating, which is ideal for bathrooms. It adds comfort and is energy efficient." }
  ],
  "kitchen": [
    { question: "Do you make custom kitchens?", answer: "Yes, we work with leading manufacturers of custom kitchen furniture. We offer full service - from 3D design to installation and appliance connection." },
    { question: "How much does a kitchen renovation cost?", answer: "The price depends on the area, selected materials and appliances. The average price for a 12-15 sq.m. kitchen is between 8,000 and 20,000 BGN with furniture." }
  ],
  "microcement": [
    { question: "How long does microcement last?", answer: "With proper application and maintenance, microcement lasts over 20 years. It's resistant to wear, water and UV rays." },
    { question: "Can it be applied over old tiles?", answer: "Yes, microcement can be applied directly over old tiles, laminate or concrete, without the need for demolition." },
    { question: "Is it suitable for bathroom and kitchen?", answer: "Absolutely. With proper sealing, microcement is completely waterproof and ideal for wet rooms." }
  ],
  "terrazzo": [
    { question: "What's the difference between terrazzo and microcement?", answer: "Terrazzo contains natural stones and marble, which are ground to a mirror shine. It lasts 75+ years and is more luxurious, but also more expensive than microcement." },
    { question: "Can we choose the stone design?", answer: "Yes, we offer a wide range of stones, colors and sizes. You can create a unique design tailored to your interior." }
  ],
  "electrical": [
    { question: "Do you work with smart home projects?", answer: "Yes, we install smart home systems - smart lighting, thermostats, blinds and centralized control." },
    { question: "Do you issue a certificate for electrical installation?", answer: "Yes, after completion we issue an electrical measurement protocol, which is required for property registration." }
  ],
  "plumbing": [
    { question: "Do you work with underfloor heating?", answer: "Yes, we install water and electric underfloor heating. We offer a complete solution - from design to commissioning." },
    { question: "How much does plumbing replacement cost?", answer: "The price depends on the length of pipes and complexity. Approximately - from 1,500 to 4,000 BGN for a standard apartment." }
  ]
};

export const getServiceFAQs = (language: Language): Record<string, { question: string; answer: string }[]> => {
  return language === 'bg' ? serviceFAQsBG : serviceFAQsEN;
};

// Legacy export for backward compatibility
export const serviceFAQs = serviceFAQsBG;

const servicesBG: Service[] = [
  // ========== ЦЯЛОСТНИ ДОВЪРШИТЕЛНИ РАБОТИ ==========
  // Ново строителство - готови към обитаване

  {
    id: "finishing-works",
    icon: Paintbrush,
    title: "Цялостни довършителни работи",
    category: "finishing-work",
    shortDescription: "Превръщаме новопостроени жилища в готови за обитаване домове с внимание към всеки детайл.",
    fullDescription: "Довършителните работи са финалният етап, който превръща сурова конструкция в завършен дом. Нашият екип поема целия процес - от първоначалната подготовка на повърхностите до финалния монтаж на врати и аксесоари. Работим с изпитани материали и съвременни технологии, за да гарантираме дълготрайност и безупречна естетика. Всеки проект се изпълнява по индивидуален план, съобразен с вашите изисквания и бюджет.",
    features: [
      "Шпакловане и грундиране на стени и тавани",
      "Полагане на подови настилки - ламинат, паркет, теракота",
      "Боядисване с висококачествени бои",
      "Монтаж на окачени тавани и осветление",
      "Изграждане на сухи конструкции",
      "Монтаж на врати и первази",
      "Монтаж на санитарно оборудване"
    ],
    process: [
      { step: 1, title: "Оглед и планиране", description: "Посещение на обекта и изготвяне на детайлен план за работа." },
      { step: 2, title: "Подготовка на повърхности", description: "Шпакловане, грундиране и подготовка на стени и тавани." },
      { step: 3, title: "Настилки и облицовки", description: "Полагане на подови настилки и стенни покрития." },
      { step: 4, title: "Монтаж", description: "Поставяне на врати, санитария и електрически аксесоари." },
      { step: 5, title: "Финализиране", description: "Боядисване, почистване и предаване на обекта." }
    ],
    image: paintingImg,
    gallery: [paintingImg, flooringImg],
    isInnovative: false
  },

  // Сухо строителство
  {
    id: "drywall-construction",
    icon: Layers,
    title: "Сухо строителство",
    category: "finishing-work",
    shortDescription: "Гипсокартон, окачени тавани и преградни стени - бързо и чисто изграждане на интериорни елементи.",
    fullDescription: "Сухото строителство е съвременна технология за бързо и ефективно изграждане на вътрешни стени, тавани и декоративни елементи без използване на мокри процеси. Гипсокартонените конструкции позволяват лесно скриване на инсталации, подобряване на звукоизолацията и създаване на уникални архитектурни форми. Ключови предимства включват: бързина на изпълнение (до 3 пъти по-бързо от зидария), чистота на работния процес, лесни последващи модификации и перфектна геометрия на повърхностите. Работим с качествени профили Knauf и плоскости с различни характеристики - стандартни, влагоустойчиви, огнеустойчиви и звукоизолационни.",
    features: [
      "Преградни стени от гипсокартон",
      "Окачени тавани - гладки и многонивелни",
      "Предстенни обшивки за скриване на инсталации",
      "Декоративни ниши и рафтове",
      "Скрито осветление и LED ленти",
      "Звуко- и топлоизолация",
      "Влагоустойчиви решения за бани"
    ],
    process: [
      { step: 1, title: "Консултация", description: "Обсъждане на идеите и технически възможности." },
      { step: 2, title: "Конструкция", description: "Монтаж на метална конструкция и обшивка." },
      { step: 3, title: "Изолация", description: "Полагане на изолационен материал при нужда." },
      { step: 4, title: "Довършване", description: "Шпакловане на фуги и подготовка за боядисване." }
    ],
    image: drywallImg,
    gallery: [drywallImg],
    isInnovative: false
  },

  // Изработка на мебели по поръчка
  {
    id: "custom-furniture",
    icon: Sofa,
    title: "Мебели по поръчка",
    category: "finishing-work",
    shortDescription: "Изработка на мебели по индивидуални размери и специфики - кухни, гардероби, шкафове.",
    fullDescription: "Мебелите по поръчка са перфектното решение за максимално оползотворяване на всеки сантиметър от вашето пространство. Работим с опитни мебелисти, които създават функционални и красиви изделия, съобразени с вашите нужди и стил. От кухненски мебели през вградени гардероби до специални решения за нестандартни ниши - всичко се изработва с прецизност и внимание към детайла.",
    features: [
      "Кухненски мебели по индивидуален проект",
      "Вградени гардероби и дрешници",
      "Шкафове за баня и антре",
      "Мебели за нестандартни пространства",
      "Избор от множество материали и покрития",
      "3D визуализация преди изработка",
      "Доставка и монтаж от нашия екип"
    ],
    process: [
      { step: 1, title: "Замерване", description: "Прецизно замерване на пространството." },
      { step: 2, title: "Проектиране", description: "Изготвяне на проект и 3D визуализация." },
      { step: 3, title: "Производство", description: "Изработка в мебелен цех по одобрен проект." },
      { step: 4, title: "Монтаж", description: "Доставка и професионален монтаж на място." }
    ],
    image: kitchenImg,
    gallery: [kitchenImg],
    isInnovative: false
  },

  // Смяна на дограма
  {
    id: "windows-doors",
    icon: Frame,
    title: "Смяна на дограма",
    category: "finishing-work",
    shortDescription: "Демонтаж на стара дограма и монтаж на нови прозорци и врати с професионална обработка.",
    fullDescription: "Смяната на дограма е инвестиция в комфорт и енергийна ефективност. Новите прозорци могат да намалят топлинните загуби с до 40%, което директно се отразява на сметките за отопление. Демонтираме старата дограма и монтираме нови PVC или алуминиеви прозорци и врати с прецизна обработка на отворите. Осигуряваме правилна хидро- и топлоизолация, запълване на фугите и довършване на вътрешни и външни первази. Работим с водещи марки като Rehau, Salamander, Veka и Schüco, гарантиращи дълготрайност и естетика.",
    features: [
      "Демонтаж на стара дограма",
      "Подготовка и корекция на отвори",
      "Монтаж на PVC или алуминиева дограма",
      "Хидро- и топлоизолация по контура",
      "Монтаж на вътрешни первази",
      "Изработка на външни первази",
      "Регулиране и настройка на механизми"
    ],
    process: [
      { step: 1, title: "Замерване", description: "Прецизно измерване на отворите." },
      { step: 2, title: "Демонтаж", description: "Внимателно премахване на старата дограма." },
      { step: 3, title: "Монтаж", description: "Професионално поставяне и нивелиране." },
      { step: 4, title: "Довършване", description: "Изолация, первази и финална настройка." }
    ],
    image: windowsImg,
    gallery: [windowsImg],
    isInnovative: false
  },

  // Монтаж на врати
  {
    id: "doors-installation",
    icon: DoorOpen,
    title: "Монтаж на интериорни и входни врати",
    category: "finishing-work",
    shortDescription: "Професионален монтаж на интериорни, плъзгащи и входни врати с перфектна обработка.",
    fullDescription: "Вратите са важен елемент от интериора, който съчетава функционалност и естетика. Правилният монтаж е критичен за безшумно отваряне, плътно затваряне и дълготрайност. Предлагаме професионален монтаж на всички видове врати - от стандартни интериорни през скрити системи със скрити панти до плъзгащи врати в стената и масивни входни врати с биометрично заключване. Работим с различни марки и модели, осигурявайки прецизно нивелиране (до 1мм толеранс), правилна обработка на каси и безупречен завършек с первази.",
    features: [
      "Монтаж на интериорни врати",
      "Плъзгащи и скрити системи",
      "Входни врати - стоманени и алуминиеви",
      "Стъклени врати и преградни системи",
      "Прецизна обработка на каси",
      "Монтаж на первази и лайсни",
      "Регулиране и настройка"
    ],
    process: [
      { step: 1, title: "Замерване", description: "Точни размери за правилен избор на врати." },
      { step: 2, title: "Подготовка", description: "Корекция на отвори при необходимост." },
      { step: 3, title: "Монтаж", description: "Поставяне на каси и криле." },
      { step: 4, title: "Довършване", description: "Первази, силикон и финална настройка." }
    ],
    image: doorsImg,
    gallery: [doorsImg],
    isInnovative: false
  },

  // ========== ОСНОВЕН РЕМОНТ ==========
  // Пълна реновация на жилища "Старо строителство"

  // Апартамент
  {
    id: "apartment-renovation",
    icon: Home,
    title: "Основен ремонт на апартамент",
    category: "full-renovation",
    shortDescription: "Пълна реновация на апартаменти в панелни, тухлени и ЕПК сгради - старо строителство.",
    fullDescription: "Основният ремонт на апартамент в старо строителство е комплексен процес, изискващ специализиран подход според типа конструкция. Панелните сгради имат свои особености - тънки стени (12-16 см), специфично разпределение на инсталации в канали, ограничени възможности за преместване на ВиК точки. Тухлените сгради предлагат повече възможности за преустройство, но често имат неравни стени и подове. ЕПК конструкциите изискват внимание при работа с носещи елементи и топлоизолация. При всички типове старо строителство препоръчваме пълна подмяна на инсталациите (средна възраст 40+ години), модерни решения за електричество (минимум 10kW входяща мощност), съвременна ВиК система с PPR тръби и професионална хидроизолация.",
    features: [
      "Къртене и демонтаж на стари настилки и облицовки",
      "Подмяна на ВиК инсталации",
      "Подмяна на електроинсталация",
      "Изравняване на стени и подове",
      "Хидроизолация на мокри помещения",
      "Полагане на нови настилки",
      "Боядисване и довършителни работи"
    ],
    process: [
      { step: 1, title: "Оглед и оценка", description: "Анализ на състоянието и тип на конструкцията." },
      { step: 2, title: "Планиране", description: "Изготвяне на бюджет и график." },
      { step: 3, title: "Демонтаж", description: "Къртене и подготовка за нови инсталации." },
      { step: 4, title: "Инсталации", description: "Подмяна на ВиК, ел. и отоплителни системи." },
      { step: 5, title: "Довършване", description: "Настилки, шпакловка, боя и монтаж." }
    ],
    image: apartmentRenovationImg,
    gallery: [apartmentRenovationImg, bathroomImg],
    isInnovative: false
  },

  // Къща
  {
    id: "house-renovation",
    icon: Home,
    title: "Основен ремонт на къща",
    category: "full-renovation",
    shortDescription: "Цялостна реновация на еднофамилни къщи - от основи до покрив.",
    fullDescription: "Ремонтът на къща е мащабен проект, който изисква координация на множество дейности - от укрепване на конструкцията до подмяна на покривна конструкция. Работим със стари къщи, при които често се налага саниране на фасади, подмяна на дървени конструкции и модернизиране на отоплителни системи. Нашият екип има опит с различни архитектурни стилове и материали, характерни за българското строителство.",
    features: [
      "Оценка на състоянието на конструкцията",
      "Укрепване при необходимост",
      "Подмяна на покривна конструкция",
      "Саниране и топлоизолация",
      "Подмяна на всички инсталации",
      "Вътрешни довършителни работи",
      "Подобряване на енергийна ефективност"
    ],
    process: [
      { step: 1, title: "Експертиза", description: "Оценка на носещата конструкция и състояние." },
      { step: 2, title: "Проектиране", description: "План за реновация и необходими разрешителни." },
      { step: 3, title: "Конструктивни работи", description: "Укрепване, покрив, фасада." },
      { step: 4, title: "Инсталации", description: "Нови ВиК, ел. и отоплителни системи." },
      { step: 5, title: "Довършване", description: "Интериорни работи и завършек." }
    ],
    image: fullRenovationImg,
    gallery: [fullRenovationImg],
    isInnovative: false
  },

  // ========== ЧАСТИЧНИ РЕМОНТИ ==========
  // Целеви решения за отделни помещения и зони

  // Ремонт на баня
  {
    id: "bathroom",
    icon: Bath,
    title: "Ремонт на баня",
    category: "partial-renovation",
    shortDescription: "Цялостна трансформация на банята - от хидроизолация до финални детайли.",
    fullDescription: "Банята е едно от най-натоварените помещения в дома и изисква безкомпромисен подход към качеството. Извършваме комплексно изпълнение: къртене на стари плочки, подмяна на инсталации, професионална хидроизолация с гаранция, монтаж на структури за вградено казанче, линейни сифони и луксозна санитария. Специализирани сме в сложни изпълнения като герунг рязане на плочки (45 градуса), изработка на ниши и скриване на тръби.",
    features: [
      "Демонтаж на стари покрития и санитария",
      "Подмяна на ВиК инсталации",
      "Многослойна хидроизолация с гаранция",
      "Структури за вградено казанче",
      "Линейни сифони и подово отводняване",
      "Герунг рязане на плочки (45°)",
      "Монтаж на душ кабини и вани"
    ],
    process: [
      { step: 1, title: "Демонтаж", description: "Внимателно премахване на стари елементи." },
      { step: 2, title: "Инсталации", description: "Нови ВиК точки по проект." },
      { step: 3, title: "Хидроизолация", description: "Многослойна защита срещу влага." },
      { step: 4, title: "Облицовка", description: "Полагане на плочки с прецизност." },
      { step: 5, title: "Монтаж", description: "Санитария, аксесоари и финални детайли." }
    ],
    image: bathroomImg,
    gallery: [bathroomImg],
    isInnovative: false
  },

  // Ремонт на кухня
  {
    id: "kitchen",
    icon: ChefHat,
    title: "Ремонт на кухня",
    category: "partial-renovation",
    shortDescription: "Модернизиране на кухненското пространство с внимание към функционалност и стил.",
    fullDescription: "Кухнята е сърцето на дома и изисква безкомпромисно планиране. Ние не предлагаме стандартни решения, а цялостна изработка на кухни, съобразени с ергономията и спецификата на вашето помещение. Поемаме целия процес: от демонтаж и корекция на ВиК и електрически инсталации до прецизния монтаж на мебелите и уредите. Създаваме пространства, които съчетават практичност с естетика.",
    features: [
      "Демонтаж на стара кухня",
      "Преместване на ВиК и ел. точки",
      "Подготовка на стени и подове",
      "Монтаж на кухненски мебели",
      "Вграждане на електроуреди",
      "Облицовка с плочки или друга защита",
      "Монтаж на осветление и аксесоари"
    ],
    process: [
      { step: 1, title: "Планиране", description: "Замерване и проектиране на новата кухня." },
      { step: 2, title: "Демонтаж", description: "Премахване на стари мебели и уреди." },
      { step: 3, title: "Инсталации", description: "Корекция на ВиК и електричество." },
      { step: 4, title: "Довършване", description: "Подготовка на повърхности и облицовки." },
      { step: 5, title: "Монтаж", description: "Поставяне на мебели и уреди." }
    ],
    image: kitchenImg,
    gallery: [kitchenImg],
    isInnovative: false
  },

  // Ремонт на всекидневна
  {
    id: "living-room",
    icon: Sofa,
    title: "Ремонт на всекидневна",
    category: "partial-renovation",
    shortDescription: "Трансформация на жилищното пространство в уютна и функционална зона за отдих.",
    fullDescription: "Всекидневната е мястото, където семейството прекарва най-много време заедно - средно 4-5 часа дневно. Затова е изключително важно това пространство да съчетава комфорт с елегантност и практичност. Работим по всички аспекти - от подмяна на настилки (паркет, ламинат, дъски) през изграждане на декоративни елементи от гипсокартон (TV стени, ниши, скрито осветление) до боядисване и монтаж на многоточково осветление. Обръщаме специално внимание на акустиката (важно за домашно кино), правилното зониране на пространството и ергономията за максимален комфорт.",
    features: [
      "Подмяна на подови настилки",
      "Шпакловане и боядисване на стени",
      "Декоративни елементи от гипсокартон",
      "Окачени тавани със скрито осветление",
      "Монтаж на електрически елементи",
      "Изграждане на ниши за техника",
      "Инсталиране на климатични системи"
    ],
    process: [
      { step: 1, title: "Концепция", description: "Обсъждане на визия и функционални нужди." },
      { step: 2, title: "Подготовка", description: "Премахване на стари елементи и подготовка." },
      { step: 3, title: "Изпълнение", description: "Настилки, стени, тавани." },
      { step: 4, title: "Детайли", description: "Осветление, аксесоари, завършек." }
    ],
    image: livingRoomImg,
    gallery: [livingRoomImg],
    isInnovative: false
  },

  // Бърз освежителен ремонт
  {
    id: "quick-refresh",
    icon: Timer,
    title: "Бърз освежителен ремонт",
    category: "partial-renovation",
    shortDescription: "Бързо обновяване на интериора до 1 седмица - боядисване, подмяна на настилки, малки корекции.",
    fullDescription: "Понякога домът се нуждае от бързо освежаване без мащабен ремонт. Нашият освежителен ремонт е идеален за наематели, собственици преди продажба или просто за обновяване на интериора. В рамките на до 1 седмица можем да боядисаме стени и тавани, да подменим стари настилки, да освежим фуги и силикони в баня, да сменим електрически ключове и контакти, да монтираме нови осветителни тела.",
    features: [
      "Боядисване на стени и тавани",
      "Подмяна или реновиране на настилки",
      "Освежаване на фуги и силикони",
      "Смяна на ключове и контакти",
      "Монтаж на осветителни тела",
      "Малки ремонти и корекции",
      "Почистване след ремонт"
    ],
    process: [
      { step: 1, title: "Оглед", description: "Бърза оценка и определяне на обхват." },
      { step: 2, title: "Подготовка", description: "Защита на мебели и повърхности." },
      { step: 3, title: "Изпълнение", description: "Бързо и ефективно обновяване." },
      { step: 4, title: "Предаване", description: "Почистване и готов за ползване дом." }
    ],
    image: paintingImg,
    gallery: [paintingImg],
    isInnovative: false
  },

  // ========== СПЕЦИАЛНИ ИНОВАТИВНИ РЕШЕНИЯ ==========
  // Премиум безшевни покрития и смарт инсталации

  // Микроцимент
  {
    id: "microcement",
    icon: Square,
    title: "Микроцимент",
    category: "special-solutions",
    shortDescription: "Монолитна повърхност без фуги - знак на истинска елегантност и съвършенство.",
    fullDescription: "Микроциментът въплъщава идеята за изчистен лукс - гладка повърхност без единствено видимо съединение. Революционен материал от премиум клас, който преобразява вашия дом чрез прозрачна елегантност, без да привлича ненужно внимание. Полага се директно върху съществуващи повърхности с дебелина само 2-3 мм. Перфектна гладкост, без видими фуги, без място за бактерии. Това е архитектура чрез простота - идеално решение за бани, където традиционните плочки изискват постоянна поддръжка на фугите.",
    features: [
      "Напълно безшевна монолитна повърхност",
      "Полага се върху съществуващи повърхности без демонтаж",
      "Водоустойчива - идеална за бани и кухни",
      "50+ цветови нюанса - от минималистичен бял до дълбок графит",
      "Съвместима с подово отопление",
      "Сертифицирана екологично",
      "Лесна за почистване - хигиенична повърхност"
    ],
    process: [
      { step: 1, title: "Консултация", description: "Посещение на място, анализ и избор на перфектния нюанс." },
      { step: 2, title: "Подготовка", description: "Грундиране и подготовка без необходимост от демонтаж." },
      { step: 3, title: "Нанасяне", description: "Експертно нанасяне на базов слой с прецизност." },
      { step: 4, title: "Финализиране", description: "Декоративен слой и защитен полиуретанов лак." },
      { step: 5, title: "Гаранция", description: "Пълна гаранция за надеждност на материала." }
    ],
    image: microcementImg,
    gallery: [microcementImg, microcementKitchenImg],
    isInnovative: true,
    vsTiles: {
      advantages: [
        "Без фуги - без почерняване и мухъл",
        "Полага се върху съществуващи плочки",
        "По-леко от плочки - без натоварване на конструкцията",
        "Модерен минималистичен вид"
      ],
      disadvantages: [
        "Изисква професионално нанасяне",
        "По-висока начална инвестиция"
      ],
      comparison: [
        { aspect: "Фуги", innovative: "Без фуги", tiles: "Много фуги, които се замърсяват" },
        { aspect: "Монтаж", innovative: "Върху съществуващи повърхности", tiles: "Изисква демонтаж" },
        { aspect: "Почистване", innovative: "Изключително лесно", tiles: "Фугите се чистят трудно" },
        { aspect: "Вид", innovative: "Монолитен, елегантен", tiles: "Традиционен" }
      ]
    }
  },

  // Terrazzo
  {
    id: "terrazzo",
    icon: Sparkles,
    title: "Terrazzo",
    category: "special-solutions",
    shortDescription: "Венецианската мозайка в модерна интерпретация - дълготрайна елегантност с естествени камъни.",
    fullDescription: "Terrazzo е признание на майсторството чрез материализиране на естеството. Висок клас декоративна настилка, съчетаваща естествени цветни камъни със свързващо вещество, създавайки монолитна повърхност, която не просто украсява, а разказва историята на вашия дом. Издържлива 75+ години - наследство за следващото поколение. Всеки Terrazzo под е уникален като снежинка.",
    features: [
      "100% уникален дизайн - всеки под е единствен и неповторим",
      "Издържливост 75+ години - семейно наследство",
      "Естествени камъни (мрамор, гранит) в съвършена композиция",
      "Напълно безфугов - хигиеничен и здравословен",
      "Може да се шлифова и възстановява многократно",
      "UV устойчив - гарантирана дълготрайност на цветовете",
      "Идеален за премиум жилища и луксозни обекти"
    ],
    process: [
      { step: 1, title: "Дизайн консултация", description: "Избор на естествени камъни и пигменти от международна палитра." },
      { step: 2, title: "Подготовка", description: "Изравняване на основата до идеална равнина." },
      { step: 3, title: "Смесване", description: "Прецизна комбинация от материали в ателиерни условия." },
      { step: 4, title: "Полагане", description: "Ръчно разстилане на сместа с експертна техника." },
      { step: 5, title: "Шлифоване", description: "Многоетапно диамантено шлифоване за огледална гладкост." }
    ],
    image: terrazzoImg,
    gallery: [terrazzoImg, terrazzoBathroomImg],
    isInnovative: true
  },

  // Flake Floor
  {
    id: "flake-floor",
    icon: Hexagon,
    title: "Flake Floor",
    category: "special-solutions",
    shortDescription: "Декоративно покритие с цветни частици - модерна алтернатива за тераси и балкони.",
    fullDescription: "Флейк подовото покритие съчетава хидроизолация и декорация в едно елегантно решение. Монолитна безшевна повърхност, която отвежда водата встрани, предотвратявайки застояване. Нито леда, нови пукнатини могат да повредят това покритие - то е съчетание на практичност и стил за външни пространства.",
    features: [
      "Хидроизолация и декорация в едно решение",
      "Морозоустойчива - без напукване и трески",
      "UV стабилна - цветовете остават идеални години наред",
      "Устойчива на автомобилни течности и масла",
      "Бърз монтаж без продължително изчакване",
      "Минимална поддръжка - гладка повърхност"
    ],
    process: [
      { step: 1, title: "Оценка", description: "Консултация и избор на цветова гама." },
      { step: 2, title: "Подготовка", description: "Почистване и грундиране на основата." },
      { step: 3, title: "Покритие", description: "Полагане на еластична основа." },
      { step: 4, title: "Декориране", description: "Поръсване на цветни частици." },
      { step: 5, title: "Защита", description: "Финална UV защита." }
    ],
    image: flakeFloorImg,
    gallery: [flakeFloorImg, flakeFloorShowroomImg],
    isInnovative: true
  },

  // Каменен килим
  {
    id: "stone-carpet",
    icon: Mountain,
    title: "Каменен килим",
    category: "special-solutions",
    shortDescription: "Естествени камъчета с отвеждане на водата - качествено решение за тераси и басейни.",
    fullDescription: "Каменният килим е решението за проблема с водата на балкони и тераси. За разлика от плочките, които задържат вода и лед, килимът е напълно водопропусклив и морозоустойчив. Природната красота на естествените камъчета с истинска практичност и спокойствие за години напред.",
    features: [
      "100% водопропусклив - без локви и застояла вода",
      "Морозоустойчив - ледът не причинява пукнатини",
      "Противохлъзгаща повърхност - безопасно около басейни",
      "Естествен вид с природни материали",
      "Лесен за почистване с вода под налягане",
      "Минимална поддръжка за дълги години"
    ],
    process: [
      { step: 1, title: "Консултация", description: "Избор на размер и цвят на камъчетата." },
      { step: 2, title: "Подготовка", description: "Грундиране на основата за максимално сцепление." },
      { step: 3, title: "Полагане", description: "Ръчно разстилане с дебелина 8-12 мм." },
      { step: 4, title: "Втвърдяване", description: "Пълно втвърдяване за 24-48 часа." }
    ],
    image: stoneCarpetImg,
    gallery: [stoneCarpetImg, stoneCarpetPoolImg],
    isInnovative: true
  },

  // Смарт инсталации
  {
    id: "smart-installations",
    icon: Lightbulb,
    title: "Смарт инсталации 2025",
    category: "special-solutions",
    shortDescription: "Домашна автоматизация с Matter протокол - интелигентно управление на целия дом.",
    fullDescription: "Смарт инсталациите от 2025 година превръщат вашия дом в интелигентна екосистема с Matter стандарт - новият универсален протокол, поддържан от Apple, Google, Amazon и Samsung. Това означава, че всички устройства работят безпроблемно заедно, независимо от производителя. Изкуственият интелект учи вашите навици - кога се събуждате, кога напускате дома, кога се прибирате - и автоматично оптимизира климата и осветлението. 5G свързаност осигурява мигновен отговор без забавяне. Биометричната сигурност включва лицево разпознаване и пръстов отпечатък за входна врата. Реални спестявания от 15-30% на енергийните разходи чрез интелигентно управление на отопление и климатизация.",
    features: [
      "Matter протокол - универсална съвместимост",
      "AI управление - учи вашите навици",
      "5G свързаност - мигновен отговор",
      "Биометрична сигурност - лицево разпознаване и пръстов отпечатък",
      "Гласов контрол - Google Assistant, Alexa, Siri",
      "Енергийна оптимизация в реално време",
      "Интеграция със соларни и възобновяеми източници",
      "Предиктивна диагностика и поддръжка"
    ],
    process: [
      { step: 1, title: "Анализ на дома", description: "Оценка на архитектурата и интеграция с Matter устройства." },
      { step: 2, title: "Избор на устройства", description: "Препоръка на Matter-съвместими устройства." },
      { step: 3, title: "Инсталация", description: "Професионален монтаж на хъб, сензори и актуатори." },
      { step: 4, title: "Конфигурация", description: "Програмиране на автоматизационни сценарии." },
      { step: 5, title: "Обучение", description: "Обучение за ползване и непрекъсната поддръжка." }
    ],
    image: smartHomeImg,
    gallery: [smartHomeImg],
    isInnovative: true
  }
];

// English services data
const servicesEN: Service[] = [
  // ========== COMPLETE FINISHING WORKS ==========
  {
    id: "finishing-works",
    icon: Paintbrush,
    title: "Complete Finishing Works",
    category: "finishing-work",
    shortDescription: "We transform newly built homes into ready-to-move-in homes with attention to every detail.",
    fullDescription: "Finishing works are the final stage that transforms raw construction into a finished home. Our team takes on the entire process - from initial surface preparation to final installation of doors and accessories. We work with proven materials and modern technologies to guarantee durability and flawless aesthetics. Each project is executed according to an individual plan, tailored to your requirements and budget.",
    features: [
      "Plastering and priming of walls and ceilings",
      "Installation of floor coverings - laminate, parquet, tiles",
      "Painting with high-quality paints",
      "Installation of suspended ceilings and lighting",
      "Construction of drywall structures",
      "Installation of doors and baseboards",
      "Installation of sanitary equipment"
    ],
    process: [
      { step: 1, title: "Inspection and planning", description: "Site visit and preparation of detailed work plan." },
      { step: 2, title: "Surface preparation", description: "Plastering, priming and preparation of walls and ceilings." },
      { step: 3, title: "Flooring and tiling", description: "Installation of floor coverings and wall coatings." },
      { step: 4, title: "Installation", description: "Placement of doors, sanitary ware and electrical accessories." },
      { step: 5, title: "Finalization", description: "Painting, cleaning and handover of the property." }
    ],
    image: paintingImg,
    gallery: [paintingImg, flooringImg],
    isInnovative: false
  },

  {
    id: "drywall-construction",
    icon: Layers,
    title: "Drywall Construction",
    category: "finishing-work",
    shortDescription: "Drywall, suspended ceilings and partition walls - fast and clean construction of interior elements.",
    fullDescription: "Drywall construction is a modern technology for fast and efficient construction of interior walls, ceilings and decorative elements without using wet processes. Drywall structures allow easy concealment of installations, improved sound insulation and creation of unique architectural forms. Key advantages include: speed of execution (up to 3 times faster than masonry), cleanliness of the work process, easy subsequent modifications and perfect surface geometry. We work with quality Knauf profiles and boards with different characteristics - standard, moisture-resistant, fire-resistant and sound-insulating.",
    features: [
      "Drywall partition walls",
      "Suspended ceilings - smooth and multi-level",
      "Wall cladding for concealing installations",
      "Decorative niches and shelves",
      "Hidden lighting and LED strips",
      "Sound and thermal insulation",
      "Moisture-resistant solutions for bathrooms"
    ],
    process: [
      { step: 1, title: "Consultation", description: "Discussion of ideas and technical possibilities." },
      { step: 2, title: "Construction", description: "Installation of metal structure and cladding." },
      { step: 3, title: "Insulation", description: "Installation of insulation material if needed." },
      { step: 4, title: "Finishing", description: "Joint plastering and preparation for painting." }
    ],
    image: drywallImg,
    gallery: [drywallImg],
    isInnovative: false
  },

  {
    id: "custom-furniture",
    icon: Sofa,
    title: "Custom Furniture",
    category: "finishing-work",
    shortDescription: "Custom furniture made to individual sizes and specifications - kitchens, wardrobes, cabinets.",
    fullDescription: "Custom furniture is the perfect solution for maximum utilization of every centimeter of your space. We work with experienced furniture makers who create functional and beautiful products tailored to your needs and style. From kitchen furniture through built-in wardrobes to special solutions for non-standard niches - everything is made with precision and attention to detail.",
    features: [
      "Kitchen furniture according to individual project",
      "Built-in wardrobes and closets",
      "Bathroom and hallway cabinets",
      "Furniture for non-standard spaces",
      "Choice of multiple materials and finishes",
      "3D visualization before production",
      "Delivery and installation by our team"
    ],
    process: [
      { step: 1, title: "Measurement", description: "Precise measurement of the space." },
      { step: 2, title: "Design", description: "Preparation of project and 3D visualization." },
      { step: 3, title: "Production", description: "Manufacturing in furniture workshop according to approved project." },
      { step: 4, title: "Installation", description: "Delivery and professional on-site installation." }
    ],
    image: kitchenImg,
    gallery: [kitchenImg],
    isInnovative: false
  },

  {
    id: "windows-doors",
    icon: Frame,
    title: "Window Replacement",
    category: "finishing-work",
    shortDescription: "Removal of old windows and installation of new windows and doors with professional treatment.",
    fullDescription: "Window replacement is an investment in comfort and energy efficiency. New windows can reduce heat loss by up to 40%, which directly affects heating bills. We remove old windows and install new PVC or aluminum windows and doors with precise treatment of openings. We ensure proper hydro and thermal insulation, joint filling and finishing of interior and exterior sills. We work with leading brands such as Rehau, Salamander, Veka and Schüco, guaranteeing durability and aesthetics.",
    features: [
      "Removal of old windows",
      "Preparation and correction of openings",
      "Installation of PVC or aluminum windows",
      "Hydro and thermal insulation along the perimeter",
      "Installation of interior sills",
      "Fabrication of exterior sills",
      "Adjustment and tuning of mechanisms"
    ],
    process: [
      { step: 1, title: "Measurement", description: "Precise measurement of openings." },
      { step: 2, title: "Removal", description: "Careful removal of old windows." },
      { step: 3, title: "Installation", description: "Professional placement and leveling." },
      { step: 4, title: "Finishing", description: "Insulation, sills and final adjustment." }
    ],
    image: windowsImg,
    gallery: [windowsImg],
    isInnovative: false
  },

  {
    id: "doors-installation",
    icon: DoorOpen,
    title: "Interior and Entrance Door Installation",
    category: "finishing-work",
    shortDescription: "Professional installation of interior, sliding and entrance doors with perfect treatment.",
    fullDescription: "Doors are an important element of the interior that combines functionality and aesthetics. Proper installation is critical for silent opening, tight closing and durability. We offer professional installation of all types of doors - from standard interior through hidden systems with concealed hinges to sliding doors in the wall and solid entrance doors with biometric locking. We work with different brands and models, ensuring precise leveling (up to 1mm tolerance), proper frame treatment and flawless finish with baseboards.",
    features: [
      "Installation of interior doors",
      "Sliding and hidden systems",
      "Entrance doors - steel and aluminum",
      "Glass doors and partition systems",
      "Precise frame treatment",
      "Installation of baseboards and moldings",
      "Adjustment and tuning"
    ],
    process: [
      { step: 1, title: "Measurement", description: "Exact dimensions for proper door selection." },
      { step: 2, title: "Preparation", description: "Opening correction if necessary." },
      { step: 3, title: "Installation", description: "Placement of frames and leaves." },
      { step: 4, title: "Finishing", description: "Baseboards, silicone and final adjustment." }
    ],
    image: doorsImg,
    gallery: [doorsImg],
    isInnovative: false
  },

  // ========== MAJOR RENOVATION ==========
  {
    id: "apartment-renovation",
    icon: Home,
    title: "Major Apartment Renovation",
    category: "full-renovation",
    shortDescription: "Complete renovation of apartments in panel, brick and EPK buildings - old construction.",
    fullDescription: "Major apartment renovation in old construction is a complex process requiring specialized approach according to construction type. Panel buildings have their specifics - thin walls (12-16 cm), specific distribution of installations in channels, limited possibilities for moving plumbing points. Brick buildings offer more possibilities for restructuring, but often have uneven walls and floors. EPK structures require attention when working with load-bearing elements and thermal insulation. For all types of old construction we recommend complete replacement of installations (average age 40+ years), modern electrical solutions (minimum 10kW input power), contemporary plumbing system with PPR pipes and professional waterproofing.",
    features: [
      "Demolition and removal of old flooring and tiling",
      "Replacement of plumbing installations",
      "Replacement of electrical installation",
      "Leveling of walls and floors",
      "Waterproofing of wet rooms",
      "Installation of new flooring",
      "Painting and finishing works"
    ],
    process: [
      { step: 1, title: "Inspection and assessment", description: "Analysis of condition and construction type." },
      { step: 2, title: "Planning", description: "Preparation of budget and schedule." },
      { step: 3, title: "Demolition", description: "Breaking and preparation for new installations." },
      { step: 4, title: "Installations", description: "Replacement of plumbing, electrical and heating systems." },
      { step: 5, title: "Finishing", description: "Flooring, plastering, painting and installation." }
    ],
    image: apartmentRenovationImg,
    gallery: [apartmentRenovationImg, bathroomImg],
    isInnovative: false
  },

  {
    id: "house-renovation",
    icon: Home,
    title: "Major House Renovation",
    category: "full-renovation",
    shortDescription: "Complete renovation of single-family houses - from foundations to roof.",
    fullDescription: "House renovation is a large-scale project requiring coordination of multiple activities - from structural reinforcement to roof structure replacement. We work with old houses, which often require facade renovation, replacement of wooden structures and modernization of heating systems. Our team has experience with different architectural styles and materials characteristic of Bulgarian construction.",
    features: [
      "Assessment of structural condition",
      "Reinforcement if necessary",
      "Replacement of roof structure",
      "Renovation and thermal insulation",
      "Replacement of all installations",
      "Interior finishing works",
      "Improvement of energy efficiency"
    ],
    process: [
      { step: 1, title: "Expertise", description: "Assessment of load-bearing structure and condition." },
      { step: 2, title: "Design", description: "Renovation plan and necessary permits." },
      { step: 3, title: "Structural works", description: "Reinforcement, roof, facade." },
      { step: 4, title: "Installations", description: "New plumbing, electrical and heating systems." },
      { step: 5, title: "Finishing", description: "Interior works and completion." }
    ],
    image: fullRenovationImg,
    gallery: [fullRenovationImg],
    isInnovative: false
  },

  // ========== PARTIAL RENOVATIONS ==========
  {
    id: "bathroom",
    icon: Bath,
    title: "Bathroom Renovation",
    category: "partial-renovation",
    shortDescription: "Complete bathroom transformation - from waterproofing to final details.",
    fullDescription: "The bathroom is one of the most heavily used rooms in the home and requires an uncompromising approach to quality. We perform comprehensive execution: removal of old tiles, replacement of installations, professional waterproofing with warranty, installation of structures for built-in cistern, linear drains and luxury sanitary ware. We specialize in complex executions such as miter cutting of tiles (45 degrees), creation of niches and concealment of pipes.",
    features: [
      "Removal of old coatings and sanitary ware",
      "Replacement of plumbing installations",
      "Multi-layer waterproofing with warranty",
      "Structures for built-in cistern",
      "Linear drains and floor drainage",
      "Miter cutting of tiles (45°)",
      "Installation of shower cabins and bathtubs"
    ],
    process: [
      { step: 1, title: "Demolition", description: "Careful removal of old elements." },
      { step: 2, title: "Installations", description: "New plumbing points according to project." },
      { step: 3, title: "Waterproofing", description: "Multi-layer protection against moisture." },
      { step: 4, title: "Tiling", description: "Precise tile installation." },
      { step: 5, title: "Installation", description: "Sanitary ware, accessories and final details." }
    ],
    image: bathroomImg,
    gallery: [bathroomImg],
    isInnovative: false
  },

  {
    id: "kitchen",
    icon: ChefHat,
    title: "Kitchen Renovation",
    category: "partial-renovation",
    shortDescription: "Modernization of kitchen space with attention to functionality and style.",
    fullDescription: "The kitchen is the heart of the home and requires uncompromising planning. We don't offer standard solutions, but complete kitchen design tailored to ergonomics and specifics of your space. We take on the entire process: from demolition and correction of plumbing and electrical installations to precise installation of furniture and appliances. We create spaces that combine practicality with aesthetics.",
    features: [
      "Removal of old kitchen",
      "Relocation of plumbing and electrical points",
      "Preparation of walls and floors",
      "Installation of kitchen furniture",
      "Built-in appliances",
      "Tiling or other protection",
      "Installation of lighting and accessories"
    ],
    process: [
      { step: 1, title: "Planning", description: "Measurement and design of new kitchen." },
      { step: 2, title: "Demolition", description: "Removal of old furniture and appliances." },
      { step: 3, title: "Installations", description: "Correction of plumbing and electricity." },
      { step: 4, title: "Finishing", description: "Surface preparation and tiling." },
      { step: 5, title: "Installation", description: "Placement of furniture and appliances." }
    ],
    image: kitchenImg,
    gallery: [kitchenImg],
    isInnovative: false
  },

  {
    id: "living-room",
    icon: Sofa,
    title: "Living Room Renovation",
    category: "partial-renovation",
    shortDescription: "Transformation of living space into cozy and functional relaxation area.",
    fullDescription: "The living room is where the family spends the most time together - an average of 4-5 hours daily. That's why it's extremely important for this space to combine comfort with elegance and practicality. We work on all aspects - from flooring replacement (parquet, laminate, boards) through construction of decorative drywall elements (TV walls, niches, hidden lighting) to painting and installation of multi-point lighting. We pay special attention to acoustics (important for home cinema), proper space zoning and ergonomics for maximum comfort.",
    features: [
      "Replacement of floor coverings",
      "Plastering and painting of walls",
      "Decorative drywall elements",
      "Suspended ceilings with hidden lighting",
      "Installation of electrical elements",
      "Construction of niches for equipment",
      "Installation of climate systems"
    ],
    process: [
      { step: 1, title: "Concept", description: "Discussion of vision and functional needs." },
      { step: 2, title: "Preparation", description: "Removal of old elements and preparation." },
      { step: 3, title: "Execution", description: "Flooring, walls, ceilings." },
      { step: 4, title: "Details", description: "Lighting, accessories, finishing." }
    ],
    image: livingRoomImg,
    gallery: [livingRoomImg],
    isInnovative: false
  },

  {
    id: "quick-refresh",
    icon: Timer,
    title: "Quick Refresh",
    category: "partial-renovation",
    shortDescription: "Quick interior renewal up to 1 week - painting, flooring replacement, minor corrections.",
    fullDescription: "Sometimes the home needs a quick refresh without major renovation. Our refresh renovation is ideal for tenants, owners before sale or simply for interior renewal. Within up to 1 week we can paint walls and ceilings, replace old flooring, refresh joints and silicone in bathroom, replace electrical switches and outlets, install new lighting fixtures.",
    features: [
      "Painting of walls and ceilings",
      "Replacement or renovation of flooring",
      "Refreshing joints and silicone",
      "Replacement of switches and outlets",
      "Installation of lighting fixtures",
      "Minor repairs and corrections",
      "Cleaning after renovation"
    ],
    process: [
      { step: 1, title: "Inspection", description: "Quick assessment and scope determination." },
      { step: 2, title: "Preparation", description: "Protection of furniture and surfaces." },
      { step: 3, title: "Execution", description: "Fast and efficient renewal." },
      { step: 4, title: "Handover", description: "Cleaning and ready-to-use home." }
    ],
    image: paintingImg,
    gallery: [paintingImg],
    isInnovative: false
  },

  // ========== SPECIAL INNOVATIVE SOLUTIONS ==========
  {
    id: "smart-installations",
    icon: Lightbulb,
    title: "Smart Installations 2025",
    category: "special-solutions",
    shortDescription: "Home automation with Matter protocol - intelligent control of the entire home.",
    fullDescription: "Smart installations from 2025 turn your home into an intelligent ecosystem with Matter standard - the new universal protocol supported by Apple, Google, Amazon and Samsung. This means all devices work seamlessly together, regardless of manufacturer. Artificial intelligence learns your habits - when you wake up, when you leave home, when you return - and automatically optimizes climate and lighting. 5G connectivity ensures instant response without delay. Biometric security includes facial recognition and fingerprint for entrance door. Real savings of 15-30% on energy costs through intelligent heating and air conditioning management.",
    features: [
      "Matter protocol - universal compatibility",
      "AI control - learns your habits",
      "5G connectivity - instant response",
      "Biometric security - facial recognition and fingerprint",
      "Voice control - Google Assistant, Alexa, Siri",
      "Real-time energy optimization",
      "Integration with solar and renewable sources",
      "Predictive diagnostics and maintenance"
    ],
    process: [
      { step: 1, title: "Home analysis", description: "Assessment of architecture and integration with Matter devices." },
      { step: 2, title: "Device selection", description: "Recommendation of Matter-compatible devices." },
      { step: 3, title: "Installation", description: "Professional installation of hub, sensors and actuators." },
      { step: 4, title: "Configuration", description: "Programming of automation scenarios." },
      { step: 5, title: "Training", description: "Training for use and continuous support." }
    ],
    image: smartHomeImg,
    gallery: [smartHomeImg],
    isInnovative: true
  }
];

// Export function to get services by language
export const getServices = (language: Language): Service[] => {
  return language === 'bg' ? servicesBG : servicesEN;
};

export const getServiceByIdWithLanguage = (id: string, language: Language): Service | undefined => {
  const serviceList = language === 'bg' ? servicesBG : servicesEN;
  return serviceList.find(service => service.id === id);
};

// Legacy export for backward compatibility
export const services = servicesBG;
