import {
  Home,
  Paintbrush,
  Layers,
  Square,
  Sparkles,
  Hexagon,
  Mountain,
  Lightbulb,
  DoorOpen,
  Sofa,
  Frame,
} from "lucide-react";
import type { Language } from "@/contexts/LanguageContext";

// Import images
import fullRenovationImg from "@/assets/images/services/full-renovation.jpg";
import bathroomImg from "@/assets/images/services/bathroom.jpg";
import kitchenImg from "@/assets/images/services/minimalistchna_byala_kuhniya.jpg";
import paintingImg from "@/assets/images/services/painting.jpg";
import flooringImg from "@/assets/images/services/flooring.jpg";
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
  category?: "full-renovation" | "finishing-work" | "special-solutions";
  colorVariants?: { name: string; description: string }[];
  vsTiles?: {
    advantages: string[];
    disadvantages: string[];
    comparison: { aspect: string; innovative: string; tiles: string }[];
  };
  faq?: { question: string; answer: string }[];
}

// FAQ данни за всички активни маршрути на услуги - Bulgarian (Захранват FAQPage JSON-LD Schema)
const serviceFAQsBG: Record<string, { question: string; answer: string }[]> = {
  "apartment-renovation": [
    {
      question: "Колко време отнема цялостен ремонт на апартамент в София?",
      answer:
        "Цялостният ремонт на апартамент в София обикновено отнема между 8 и 14 седмици (2 до 3.5 месеца) в зависимост от квадратурата и дали имотът е старо строителство за къртене или ново строителство. За двустаен или тристаен апартамент (70–95 кв.м) точният срок се фиксира в писмен договор с неустойки при забавяне.",
    },
    {
      question: "Колко струва цялостен ремонт до ключ в София през 2026 г.?",
      answer:
        "Ориентировъчната инвестиция за цялостен ремонт (труд и материали) в София започва от 100–300 €/м² за базово/инвестиционно ниво, 301–500 €/м² за пълно завършване до ключ (Renovivo Comfort) и от 500 €/м² за премиум изпълнение с включени мебели по поръчка. Точната фиксирана цена се определя с детайлна КСС оферта след безплатен оглед.",
    },
    {
      question: "Трябва ли да присъствам на обекта и да координирам майсторите?",
      answer:
        "Не. Всеки наш обект в София се управлява от един личен технически ръководител, който координира всички профилирани екипи (ВиК, Ел., гипсокартон, шпакловки, плочки, мебели), доставките и контрола на качеството. Получавате регулярни фото и видео отчети.",
    },
    {
      question: "Каква гаранция получавам след края на ремонта?",
      answer:
        "Предоставяме 2 години пълна писмена гаранция по договор за всички изпълнени строително-монтажни работи и инсталации, плюс пълната заводска гаранция (до 10–25 години) за вложените материали и системи.",
    },
  ],
  "finishing-works": [
    {
      question: "Какво включват цялостните довършителни работи на апартамент по БДС (на шпакловка и замазка)?",
      answer:
        "Довършителните работи по БДС включват всички етапи след Акт 14/15/16 до готов за нанасяне дом: преработка и добавяне на Ел. и ВиК точки, окачени тавани и скрито осветление от гипсокартон, фини шпакловки (ниво Q3/Q4), безвъздушно боядисване, изравнителни замазки, монтаж на паркет/гранитогрес, цялостно изграждане на бани, монтаж на интериорни врати и кухни по поръчка.",
    },
    {
      question: "Колко време отнема довършването на нов апартамент в София?",
      answer:
        "При ново строителство на шпакловка и замазка (без нужда от тежко къртене) цялостните довършителни работи за апартамент от 65 до 100 кв.м в София отнемат средно между 6 и 10 седмици по фиксиран в договора график.",
    },
    {
      question: "Поемате ли довършване на инвестиционни имоти за отдаване под наем или продажба?",
      answer:
        "Да. Разполагаме със специализирани пакети за инвеститори в София, оптимизирани за висока износоустойчивост, бърз срок на издаване и максимална възвръщаемост на инвестицията (ROI), включително корпусна мебел и кухни по поръчка.",
    },
  ],
  "house-renovation": [
    {
      question: "Какви етапи обхваща основният ремонт на къща в София и околността?",
      answer:
        "Поемаме цялостната реновация на еднофамилни къщи — от конструктивно обследване, хидро- и топлоизолация, подмяна на дограма, ВиК, Ел. и ОВиК инсталации (подово отопление, термопомпи) до пълно вътрешно довършване до ключ и мебели по поръчка.",
    },
    {
      question: "Работите ли в населените места около София (Бистрица, Драгалевци, Бояна, Симеоново, Панчарево, Банкя)?",
      answer:
        "Да, изпълняваме цялостни ремонти на къщи в цяла София, вилните зони на Витоша и всички населени места в Софийска област.",
    },
  ],
  "custom-furniture": [
    {
      question: "Какво е предимството да поръчам кухнята и мебелите заедно с цялостния ремонт от Renovivo?",
      answer:
        "Спестявате между 4 и 8 седмици чакане след края на ремонта и избягвате разминавания между изводите за ток/вода и мебелите. Нашият екип прави 3D заснемане още по време на шпакловките, произвежда мебелите паралелно и ги монтира веднага след полагането на настилките.",
    },
    {
      question: "Какви мебели по поръчка изработвате?",
      answer:
        "Проектираме, произвеждаме и монтираме кухни по индивидуален проект с вграждане на всички електроуреди, вградени гардероби, дрешници, антрета, ТВ секции и водоустойчиви шкафове за баня от MDF, ПДЧ, фурнир и технически камък.",
    },
  ],
  "drywall-construction": [
    {
      question: "Какви системи за гипсокартон и звукоизолация използвате?",
      answer:
        "Работим със сертифицирани профили и плоскости Knauf (стандартни, влагоустойчиви, огнеустойчиви и акустични Диамант плоскости) в комбинация с каменна вата за максимална шумоизолация на спални и детски стаи в София.",
    },
    {
      question: "Включва ли услугата шпакловане до готовност за боя?",
      answer:
        "Да, изпълняваме цялостно фугиране с армиращи ленти и фина цялостна шпакловка ниво Q3/Q4, напълно готова за безвъздушно боядисване или декоративни мазилки.",
    },
  ],
  "windows-doors": [
    {
      question: "С кои марки PVC и алуминиева дограма работите?",
      answer:
        "Доставяме и монтираме високоенергийни профилни системи от Rehau, Salamander, Veka и Schüco с троен стъклопакет (К-стъкло и четирисезонно стъкло), включително демонтаж на старата дограма и пълно обръщане на прозорците.",
    },
  ],
  "doors-installation": [
    {
      question: "Кога по време на ремонта се монтират интериорните врати?",
      answer:
        "Интериорните врати се монтират във финалния етап — след приключване на всички мокри процеси, боядисване на стените и полагане на подовите настилки. При тапетните (скрити) врати касата се монтира още на етап груба шпакловка и гипсокартон.",
    },
  ],
  "microcement": [
    {
      question: "Колко издържа микроциментът в баня и мокри помещения?",
      answer:
        "При правилно многослойно полагане и запечатване с двукомпонентен полиуретанов лак микроциментът издържа над 20 години. Той е 100% водоустойчив, без фуги, не задържа мухъл и е съвместим с подово отопление.",
    },
    {
      question: "Може ли микроцимент да се нанесе директно върху стари плочки без къртене?",
      answer:
        "Да! Поради дебелината си от едва 2–3 мм и екстремната адхезия микроциментът се полага директно върху здрави стари плочки в бани и кухни, спестявайки разходите и шума от къртене.",
    },
  ],
  "terrazzo": [
    {
      question: "Каква е разликата между Terrazzo (терацо) и микроцимент?",
      answer:
        "Terrazzo е монолитна венецианска настилка с реални мраморни и гранитни фрагменти, която се шлифова диамантено до огледална гладкост и издържа над 75 години. Микроциментът е по-тънко (2–3 мм) безшевно покритие с фина минерална текстура за подове и стени.",
    },
  ],
  "flake-floor": [
    {
      question: "За какви помещения е подходяща настилката Flake Floor?",
      answer:
        "Flake Floor е изключително здрава, хидроизолираща и морозоустойчива безшевна система, идеална за тераси, балкони, гаражи, коридори и натоварени търговски площи.",
    },
  ],
  "stone-carpet": [
    {
      question: "Защо каменният килим е по-добър от гранитогреса за открити тераси в София?",
      answer:
        "В климата на София плочките на открити тераси често се разлепват и пукат през зимата заради замръзнала под тях влага. Каменният килим е 100% дренажен и монолитен — водата преминава свободно през порите му към сифона, без да образува локви, лед или напрежение при замръзване.",
    },
  ],
  "smart-installations": [
    {
      question: "Какво представлява Matter протоколът за умен дом през 2026 г.?",
      answer:
        "Matter е универсалният стандарт за домашна автоматизация, поддържан от Apple Home, Google Home, Amazon Alexa и Samsung SmartThings. Всички ваши умни ключове, осветление, климатизация, подово отопление и датчици за теч работят локално и безопасно в едно общо приложение без забавяне.",
    },
  ],
};

// FAQ data for all active routes - English
const serviceFAQsEN: Record<string, { question: string; answer: string }[]> = {
  "apartment-renovation": [
    {
      question: "How long does a complete turnkey apartment renovation in Sofia take?",
      answer:
        "A complete apartment renovation in Sofia typically takes 8 to 14 weeks (2 to 3.5 months), depending on property size and condition. For a 70–95 sq.m apartment, the exact completion date is fixed in a binding contract with penalty clauses for delays.",
    },
    {
      question: "How much does a turnkey apartment renovation in Sofia cost in 2026?",
      answer:
        "Indicative turnkey budgets (labor + materials) in Sofia range from 100–300 €/m² for our Essential/Investment tier, 301–500 €/m² for Turnkey Comfort, and 500+ €/m² for Bespoke Premium including custom furniture. Exact fixed pricing is provided via an itemized Bill of Quantities (BOQ) after a free site inspection.",
    },
    {
      question: "Can I manage my Sofia property renovation remotely?",
      answer:
        "Yes. Every project is led by a single dedicated project manager who coordinates all trades, deliveries, and quality checks. You receive regular photo and video updates, making our service ideal for busy executives, expats, and overseas property investors.",
    },
    {
      question: "What warranty do you provide?",
      answer:
        "We provide a 2-year written contractual warranty on all workmanship and installations, plus full manufacturer warranties on all installed materials and equipment.",
    },
  ],
  "finishing-works": [
    {
      question: "What is included in BDS (shell & core) finishing works in Sofia?",
      answer:
        "BDS finishing works cover the entire cycle after Act 14/15/16 to make a newly built apartment move-in ready: MEP adjustments, Knauf drywall and concealed lighting, Q3/Q4 fine plastering, airless painting, self-leveling screeds, parquet/tile flooring, complete bathrooms, interior doors, and custom kitchen cabinetry.",
    },
    {
      question: "How long does it take to finish a new-build BDS apartment?",
      answer:
        "Without heavy demolition, complete finishing works for a 65–100 sq.m new-build apartment in Sofia take between 6 and 10 weeks under a fixed contract schedule.",
    },
  ],
  "house-renovation": [
    {
      question: "What does a complete house renovation in Sofia include?",
      answer:
        "We handle single-family house renovations from A to Z: structural reinforcement, facade and roof insulation, window replacement, complete plumbing, electrical, and underfloor heating systems, interior finishing, and custom furniture.",
    },
  ],
  "custom-furniture": [
    {
      question: "Why order custom kitchens and furniture together with my renovation?",
      answer:
        "Ordering custom furniture through Renovivo saves 4 to 8 weeks of waiting after construction ends. We take 3D laser measurements during the plastering phase, manufacture your kitchen and wardrobes in parallel, and install them immediately after the flooring.",
    },
  ],
  "drywall-construction": [
    {
      question: "What drywall and soundproofing systems do you use?",
      answer:
        "We use certified Knauf metal profiles, acoustic rockwool insulation, and moisture/fire/sound-resistant boards finished to Q3/Q4 smoothness.",
    },
  ],
  "windows-doors": [
    {
      question: "Which window profile brands do you install?",
      answer:
        "We supply and install high-efficiency PVC and aluminum systems from Rehau, Salamander, Veka, and Schüco with triple glazing and full perimeter insulation.",
    },
  ],
  "doors-installation": [
    {
      question: "Do you install concealed (flush-to-wall) and sliding doors?",
      answer:
        "Yes, we install standard interior doors, concealed-frame flush doors, pocket sliding doors, and armored entrance doors with 1mm laser leveling precision.",
    },
  ],
  "microcement": [
    {
      question: "How long does microcement last in bathrooms?",
      answer:
        "With proper multi-layer application and polyurethane sealing, microcement lasts 20+ years. It is 100% waterproof, joint-free, mold-resistant, and compatible with underfloor heating.",
    },
    {
      question: "Can microcement be applied directly over existing tiles?",
      answer:
        "Yes, microcement is only 2–3 mm thick and bonds directly over sound existing tiles without messy demolition.",
    },
  ],
  "terrazzo": [
    {
      question: "What is the difference between Terrazzo and microcement?",
      answer:
        "Terrazzo contains real marble and granite aggregates cast in a monolithic matrix and diamond-polished to last 75+ years. Microcement is a thin (2–3 mm) seamless mineral coating suitable for both floors and walls.",
    },
  ],
  "flake-floor": [
    {
      question: "Where is Flake Floor best used?",
      answer:
        "Flake Floor combines waterproofing and extreme wear resistance, making it ideal for terraces, balconies, garages, and high-traffic commercial zones.",
    },
  ],
  "stone-carpet": [
    {
      question: "Why is Stone Carpet better than outdoor tiles for Sofia terraces?",
      answer:
        "Outdoor tiles in Sofia frequently crack and detach due to freeze-thaw cycles. Stone Carpet is 100% porous and frost-proof — rainwater drains freely through the natural quartz pebbles without puddling or ice damage.",
    },
  ],
  "smart-installations": [
    {
      question: "What is the Matter Smart Home standard in 2026?",
      answer:
        "Matter is the universal smart home protocol supported by Apple, Google, Amazon, and Samsung, allowing lighting, HVAC, underfloor heating, shades, and leak sensors to operate locally in one unified app.",
    },
  ],
};

// Алиас за обратна съвместимост със стар ключ "full-renovation"
serviceFAQsBG["full-renovation"] = serviceFAQsBG["apartment-renovation"];
serviceFAQsEN["full-renovation"] = serviceFAQsEN["apartment-renovation"];

export const getServiceFAQs = (
  language: Language,
): Record<string, { question: string; answer: string }[]> => {
  return language === "bg" ? serviceFAQsBG : serviceFAQsEN;
};

export const serviceFAQs = serviceFAQsBG;

const servicesBG: Service[] = [
  // ========== ОСНОВЕН И ЦЯЛОСТЕН РЕМОНТ ДО КЛЮЧ ==========
  {
    id: "apartment-renovation",
    icon: Home,
    title: "Цялостен ремонт на апартамент до ключ",
    category: "full-renovation",
    shortDescription:
      "Пълно управление и изпълнение на ремонта от А до Я в София — с един отговорен технически ръководител, детайлна КСС оферта и фиксирана цена по договор.",
    fullDescription:
      "Цялостният ремонт на апартамент до ключ в София от Renovivo представлява комплексно инженерно и интериорно решение от А до Я, при което вие работите с един отговорен технически ръководител, фиксиран бюджет по КСС и гарантиран краен срок по договор.\n\nПоемаме както основен ремонт на старо строителство (тухла, ЕПК, панел), така и пълно преустройство на инвестиционни имоти в София. При старото строителство извършваме контролирано къртене и извозване, пълна подмяна на амортизираните ВиК щрангове и разводки с полипропиленови (PPR) и обезшумени тръби, както и изграждане на нова електроинсталация с дефектнотокови защити и слаботоково окабеляване.\n\nСлед обновяването на инженерните системи изравняваме подовете и стените до перфектна геометрия, изпълняваме гипсокартон и скрито осветление, полагаме сертифицирани хидроизолации в баните, монтираме подови настилки, врати, санитария и собствено производство кухни и мебели по поръчка. Получавате ежедневен фото и видео отчет, финално професионално почистване и 2 години писмена гаранция.",
    features: [
      "3D лазерно заснемане и изготвяне на точна КСС оферта без скрити разходи",
      "Един личен технически ръководител и постоянни профилирани екипи",
      "Демонтаж, къртене и организирано извозване на строителни отпадъци",
      "Изцяло нови ВиК, Ел. и ОВиК инсталации с протоколи и гаранция",
      "Машинни мазилки, фини шпакловки (Q3/Q4) и безвъздушно боядисване",
      "Цялостно изграждане на бани с плочки, широкоформатен гранитогрес или микроцимент",
      "Монтаж на настилки, интериорни врати, осветление и мебели по поръчка до ключ",
    ],
    process: [
      {
        step: 1,
        title: "Безплатен оглед и 3D заснемане в София",
        description:
          "Посещаваме имота, оценяваме конструкцията и инсталациите и снемаме точни лазерни размери.",
      },
      {
        step: 2,
        title: "Детайлна КСС оферта и Договор",
        description:
          "Получавате пълна количествено-стойностна сметка с фиксирана крайна цена и календарен график.",
      },
      {
        step: 3,
        title: "Демонтаж и нови Ел. / ВиК инсталации",
        description:
          "Разчистване на обекта и полагане на нови сертифицирани електро, водопроводни и отоплителни трасета.",
      },
      {
        step: 4,
        title: "Сухо строителство, шпакловки и бани",
        description:
          "Изграждане на гипсокартон, замазки, хидроизолации, облицовки в мокри помещения и фино боядисване.",
      },
      {
        step: 5,
        title: "Настилки, мебели и предаване до ключ",
        description:
          "Монтаж на паркет, врати, ключове/контакти, кухня по поръчка, финално почистване и гаранционен протокол.",
      },
    ],
    image: apartmentRenovationImg,
    gallery: [apartmentRenovationImg, bathroomImg],
    isInnovative: false,
  },

  // ========== ЦЯЛОСТНИ ДОВЪРШИТЕЛНИ РАБОТИ (БДС) ==========
  {
    id: "finishing-works",
    icon: Paintbrush,
    title: "Цялостни довършителни работи (по БДС)",
    category: "finishing-work",
    shortDescription:
      "Превръщаме новопостроени апартаменти на шпакловка и замазка (Акт 14/15/16) в София в напълно завършени, готови за нанасяне или отдаване под наем домове.",
    fullDescription:
      "Цялостните довършителни работи от Renovivo са създадени специално за собственици на ново строителство в София (на етап БДС — шпакловка и замазка след Акт 14, Акт 15 или Акт 16) и купувачи на инвестиционни имоти, които искат безупречно качество без да координират сами десетки отделни майстори.\n\nПоемаме процеса от самото начало: преработка и добавяне на нови Ел. точки, ключове, контакти и ВиК изводи според разпределението на мебелите, изграждане на окачени тавани от гипсокартон със скрито LED осветление и корнизи за пердета, полагане на саморазливни замазки и шпакловка до огледална гладкост (ниво Q3/Q4).\n\nИзпълняваме цялостно баните и мокрите помещения (хидроизолация, вградени структури, плочки или безшевен микроцимент), боядисваме с висок клас миещи се бои и монтираме подови настилки, интериорни врати и корпусни мебели по поръчка. Всичко се управлява от един технически ръководител с фиксирана цена по договор.",
    features: [
      "Адаптация на Ел. и ВиК точки спрямо интериорния проект и кухнята",
      "Фина шпакловка (Q3/Q4), грундиране и безвъздушно боядисване",
      "Саморазливни замазки и монтаж на трислоен паркет, SPC винил, ламинат и гранитогрес",
      "Окачени тавани от гипсокартон, скрито осветление и акустични обшивки",
      "Цялостно изграждане на бани от А до Я с 2 г. писмена гаранция",
      "Доставка и монтаж на интериорни врати, первази и осветителни тела",
      "Паралелна изработка и монтаж на кухня и гардероби по поръчка",
    ],
    process: [
      {
        step: 1,
        title: "Оглед на обекта и КСС бюджет",
        description:
          "Проверяваме равнинността на замазките и стените от строителя и изготвяме точна КСС оферта.",
      },
      {
        step: 2,
        title: "Корекции по инсталации и гипсокартон",
        description:
          "Извеждане на точни изводи за кухня/осветление и монтаж на окачени тавани и предстенни обшивки.",
      },
      {
        step: 3,
        title: "Бани, фини шпакловки и замазки",
        description:
          "Хидроизолация и облицовка на баните, фина шпакловка на стени/тавани и подготовка на подовете.",
      },
      {
        step: 4,
        title: "Боядисване, настилки и врати",
        description:
          "Боядисване с висок клас бои, полагане на паркет/гранитогрес и монтаж на интериорни врати.",
      },
      {
        step: 5,
        title: "Монтаж на мебели и почистване до ключ",
        description:
          "Монтаж на кухнята, санитарията, ключовете и осветителните тела, последван от основно почистване.",
      },
    ],
    image: paintingImg,
    gallery: [paintingImg, flooringImg],
    isInnovative: false,
  },

  // Къща
  {
    id: "house-renovation",
    icon: Home,
    title: "Цялостен ремонт на къща",
    category: "full-renovation",
    shortDescription:
      "Комплексна реновация и довършителни работи на еднофамилни къщи в София и околността — от инсталации и изолации до интериор до ключ.",
    fullDescription:
      "Цялостният ремонт на къща в София и вилните зони изисква сериозна инженерна координация, която надхвърля стандартния апартаментен ремонт. Нашият екип поема пълното обновяване на нови и стари еднофамилни къщи с един отговорен технически ръководител и ясен календарен план.\n\nИзпълняваме цялостна подмяна на ВиК, електроинсталации и съвременни ОВиК системи (водно подово отопление, термопомпени инсталации, конвектори), вътрешна и външна топло- и хидроизолация, смяна на дограма, сухо строителство, стълбища, бани и пълно интериорно завършване до ключ.",
    features: [
      "Техническо обследване и цялостно планиране на етапите по КСС",
      "Изграждане на водно подово отопление, ОВиК, ВиК и нови ел. табла",
      "Вътрешна топлоизолация, звукоизолация и конструкции от гипсокартон",
      "Смяна на PVC и алуминиева дограма и входни врати",
      "Цялостно изпълнение на бани, мокри помещения и спа зони",
      "Външни настилки за тераси и веранди (каменен килим, Flake Floor, гранитогрес)",
      "Интериорни довършителни работи и мебели по поръчка до ключ",
    ],
    process: [
      {
        step: 1,
        title: "Инженерен оглед и заснемане",
        description:
          "Пълна оценка на състоянието на сградата, инсталациите и архитектурното разпределение.",
      },
      {
        step: 2,
        title: "КСС оферта и календарен план",
        description:
          "Изготвяне на детайлен бюджет по етапи и подписване на договор с фиксирани параметри.",
      },
      {
        step: 3,
        title: "Инженерни системи и изолации",
        description:
          "Изпълнение на ВиК, Ел., подово отопление, дограма и изолационни системи.",
      },
      {
        step: 4,
        title: "Вътрешни довършителни работи",
        description:
          "Замазки, мазилки, шпакловки, бани, настилки, боядисване и декоративни покрития.",
      },
      {
        step: 5,
        title: "Обзавеждане и гаранционно предаване",
        description:
          "Монтаж на кухни, врати и осветление, почистване и предаване с 2 г. писмена гаранция.",
      },
    ],
    image: fullRenovationImg,
    gallery: [fullRenovationImg],
    isInnovative: false,
  },

  // Изработка на мебели по поръчка
  {
    id: "custom-furniture",
    icon: Sofa,
    title: "Мебели по поръчка — кухни и корпусна мебел",
    category: "finishing-work",
    shortDescription:
      "Проектиране, производство и монтаж на кухни, вградени гардероби и корпусна мебел по поръчка, напълно синхронизирани с вашия ремонт в София.",
    fullDescription:
      "Изработката на кухни и корпусна мебел по поръчка от Renovivo решава един от най-големите проблеми при всеки ремонт в София — месеците чакане след приключване на строителните работи и разминаванията между контактите, тръбите и шкафовете.\n\nКогато поемаме вашия ремонт, ние снемаме милиметрово точни 3D размери още на етап шпакловки, изготвяме технически проект за точните ВиК и Ел. изводи и стартираме производството на мебелите паралелно с довършителните работи. Така вашата кухня, гардероби, дрешник, антре и шкафове за баня се монтират веднага след полагането на настилките.",
    features: [
      "Кухни по индивидуален проект с пълно вграждане на електроуреди и осветление",
      "Вградени гардероби до тавана, дрешници и системи с плавно затваряне (Blum / Hettich)",
      "Водоустойчиви шкафове за баня от MDF и компакт ламинат",
      "Мебели за антре, дневна, домашни офиси и нестандартни скосени ниши",
      "Богат избор от MDF (мат/гланц/фреза), естествен фурнир, ПДЧ Egger/Kronospan и технически камък",
      "3D визуализация и технически проект преди пускане в производство",
      "Доставка и чист професионален монтаж от нашия екип в София",
    ],
    process: [
      {
        step: 1,
        title: "Лазерно замерване и задание",
        description:
          "Прецизно заснемане на помещението и уточняване на механизми, материали и електроуреди.",
      },
      {
        step: 2,
        title: "3D проект и схема за инсталации",
        description:
          "Изготвяне на 3D визуализация и точни схеми за ВиК и Ел. изводите.",
      },
      {
        step: 3,
        title: "Прецизно производство",
        description:
          "Изработка на корпусите и фасадите с висок клас обков по одобрения проект.",
      },
      {
        step: 4,
        title: "Доставка и монтаж до ключ",
        description:
          "Транспорт, сглобяване, нивелиране и монтаж на плотове и уреди на обекта.",
      },
    ],
    image: kitchenImg,
    gallery: [kitchenImg],
    isInnovative: false,
  },

  // Сухо строителство
  {
    id: "drywall-construction",
    icon: Layers,
    title: "Сухо строителство и гипсокартон",
    category: "finishing-work",
    shortDescription:
      "Окачени тавани със скрито осветление, преградни стени и акустични предстенни обшивки по система Knauf.",
    fullDescription:
      "Сухото строителство е гръбнакът на модерния интериор при довършване на ново строителство и реновация на стари апартаменти в София. Конструкциите от гипсокартон осигуряват идеална геометрия на стените и таваните, позволяват вграждане на архитектурно скрито LED осветление, магнитни релси и корнизи за завеси, и значително подобряват звукоизолацията между съседните имоти.\n\nРаботим със сертифицирани профили, антивибрационни окачвачи и плоскости Knauf (влагоустойчиви, огнеустойчиви и високоплътни акустични плоскости) в комбинация с каменна вата.",
    features: [
      "Окачени тавани — гладки, многонивелни, със светлинни ниши и скрити корнизи",
      "Преградни стени от гипсокартон с двойна обшивка и каменна вата",
      "Звукоизолационни предстенни обшивки към съседи и щрангове",
      "Куфари за скриване на тръби, въздуховоди и вградени казанчета в бани",
      "Декоративни ТВ стени, ниши и вградени линейни осветителни профили",
      "Фугиране с армиращи ленти и фина шпакловка до ниво Q3/Q4",
      "Влагоустойчиви и циментови плоскости (Aquapanel) за мокри помещения",
    ],
    process: [
      {
        step: 1,
        title: "Лазерно трасиране",
        description:
          "Прецизно разчертаване на нивата, нишите за осветление и преградните стени.",
      },
      {
        step: 2,
        title: "Метална конструкция и изолация",
        description:
          "Монтаж на профили с уплътнителни ленти и полагане на минерална/каменна вата.",
      },
      {
        step: 3,
        title: "Зашиване с плоскости",
        description:
          "Еднослойна или двуслойна обшивка с разминаване на фугите за защита от пукнатини.",
      },
      {
        step: 4,
        title: "Армиране и шпакловане Q3/Q4",
        description:
          "Фугиране и цялостно шпакловане до идеално гладка повърхност за боядисване.",
      },
    ],
    image: drywallImg,
    gallery: [drywallImg],
    isInnovative: false,
  },

  // Смяна на дограма
  {
    id: "windows-doors",
    icon: Frame,
    title: "Смяна на дограма",
    category: "finishing-work",
    shortDescription:
      "Демонтаж на стара дограма и монтаж на високоенергийни PVC и алуминиеви прозорци с пълно обръщане и изолация.",
    fullDescription:
      "Смяната на дограмата е първата задължителна стъпка при основен ремонт на апартамент или къща в София, която намалява топлинните загуби с до 40% и изолира уличния шум. Извършваме внимателен демонтаж на старата дограма, монтаж на нови PVC или алуминиеви профилни системи (Rehau, Salamander, Veka, Schüco) с троен стъклопакет и цялостно вътрешно и външно обръщане на прозорците с гипсокартон/XPS и шпакловка.",
    features: [
      "Демонтаж и извозване на стара дървена, метална или амортизирана дограма",
      "Монтаж на 5-, 6- и 7-камерна PVC или алуминиева дограма с прекъснат термомост",
      "Тройни стъклопакети с четирисезонно и нискоемисионно К-стъкло",
      "Пълно вътрешно и външно обръщане (измазване и шпакловане) на отворите",
      "Монтаж на външни алуминиеви козирки и вътрешни первази",
      "Комарници, ролетни щори и противовзломен обков",
      "Реглаж и гаранционна поддръжка на механизмите",
    ],
    process: [
      {
        step: 1,
        title: "Прецизно замерване",
        description:
          "Снемане на размери и избор на профилна система и стъклопакет.",
      },
      {
        step: 2,
        title: "Демонтаж на стара дограма",
        description:
          "Чисто премахване на старите рамки и подготовка на зида.",
      },
      {
        step: 3,
        title: "Нивелиран монтаж и уплътняване",
        description:
          "Закрепване, нивелиране и термоизолационно уплътняване на контура.",
      },
      {
        step: 4,
        title: "Обръщане на прозорци и первази",
        description:
          "Довършване на страниците с гипсокартон/шпакловка и монтаж на первази.",
      },
    ],
    image: windowsImg,
    gallery: [windowsImg],
    isInnovative: false,
  },

  // Монтаж на врати
  {
    id: "doors-installation",
    icon: DoorOpen,
    title: "Монтаж на интериорни и входни врати",
    category: "finishing-work",
    shortDescription:
      "Прецизен монтаж на интериорни, тапетни (скрити), плъзгащи и блиндирани входни врати като част от вашия ремонт.",
    fullDescription:
      "Правилният монтаж на вратите определя финалния облик на всеки ремонтиран дом. Нашият екип монтира стандартни интериорни врати с регулируеми каси, модерни тапетни врати със скрити каси (които се сливат със стената и се боядисват или покриват с микроцимент), плъзгащи системи и блиндирани входни врати с лазерно нивелиране до 1 мм толеранс.",
    features: [
      "Монтаж на интериорни врати с обхватни регулируеми каси",
      "Вграждане на тапетни (скрити) врати на етап гипсокартон и шпакловка",
      "Монтаж на плъзгащи врати покрай стена или в касета в стената",
      "Демонтаж и монтаж на блиндирани входни врати с обръщане на касата",
      "Прецизно подрязване и сглобяване на первази под 45 или 90 градуса",
      "Монтаж на магнитни брави, скрити панти и падащи прагове",
      "Синхронизация с нивата на подовите настилки и первазите",
    ],
    process: [
      {
        step: 1,
        title: "Оразмеряване на строителните отвори",
        description:
          "Проверка и корекция на височините и ширините преди поръчка на вратите.",
      },
      {
        step: 2,
        title: "Подготовка на нивата",
        description:
          "Съгласуване с точната дебелина на паркета и плочките в баните.",
      },
      {
        step: 3,
        title: "Лазерно нивелиран монтаж",
        description:
          "Сглобяване и укрепване на касите, окачване на крилата и монтаж на обкова.",
      },
      {
        step: 4,
        title: "Первази и финална настройка",
        description:
          "Поставяне на первази, уплътнения и тестване за плавно и безшумно затваряне.",
      },
    ],
    image: doorsImg,
    gallery: [doorsImg],
    isInnovative: false,
  },

  // ========== СПЕЦИАЛНИ ИНОВАТИВНИ РЕШЕНИЯ ==========
  {
    id: "microcement",
    icon: Square,
    title: "Микроцимент",
    category: "special-solutions",
    shortDescription:
      "Луксозно безшевно и 100% водоустойчиво покритие за модерни бани, подове, стени и мебели по поръчка.",
    fullDescription:
      "Микроциментът е високотехнологично полимер-минерално покритие с дебелина едва 2–3 мм, което създава монолитна, напълно безфугова повърхност с изтънчена архитектурна естетика. То е едно от най-търсените решения за висок клас ремонти в София — за цели бани без нито една фуга, душ зони, кухненски гърбове, подове с подово отопление, стълбища и плотове.\n\nПоради изключителната си здравина и адхезия микроциментът може да се полага както върху нова замазка и гипсокартон, така и директно върху съществуващи стари плочки без нужда от къртене.",
    features: [
      "100% безшевна монолитна повърхност — без фуги, мухъл и задържане на мръсотия",
      "Пълна водоустойчивост — перфектен за бани, душ кабини и мокри зони",
      "Полага се директно върху стари плочки, бетон, замазка или MDF без къртене",
      "Над 50 дизайнерски нюанса и текстури — от топъл пясък и травертин до графит",
      "Отлична топлопроводимост — идеален за водно и електрическо подово отопление",
      "Висока устойчивост на надраскване, удар и битова химия",
      "Изключително лесна поддръжка и почистване",
    ],
    process: [
      {
        step: 1,
        title: "Оглед и избор на мостра",
        description:
          "Оценка на основата в София и избор на точен цвят, текстура и финиш (мат/сатен).",
      },
      {
        step: 2,
        title: "Армиране и грундиране",
        description:
          "Подготовка на основата с епоксиден/кварцов грунд и стъклофибърна мрежа.",
      },
      {
        step: 3,
        title: "Базови и финишни слоеве",
        description:
          "Ръчно нанасяне с маламашка на базовите и декоративните слоеве микроцимент.",
      },
      {
        step: 4,
        title: "Запечатване с полиуретанов лак",
        description:
          "Многослойно импрегниране и запечатване за 100% водоустойчивост и износоустойчивост.",
      },
    ],
    image: microcementImg,
    gallery: [microcementImg, microcementKitchenImg],
    isInnovative: true,
    vsTiles: {
      advantages: [
        "Напълно без фуги — край на почерняването, мухъла и трудното търкане",
        "Може да се положи директно върху стари плочки без шум и прах от къртене",
        "Дебелина само 2–3 мм — не повдига нивото на пода и не натоварва плочата",
        "Създава визуално по-просторно, луксозно и монолитно помещение",
      ],
      disadvantages: [
        "Изисква сертифицирани майстори и стриктно спазване на технологичните паузи",
        "По-висока инвестиция спрямо нисък клас стандартни плочки",
      ],
      comparison: [
        {
          aspect: "Фуги и хигиена",
          innovative: "100% без фуги, антибактериална повърхност",
          tiles: "Множество фуги, задържащи влага и варовик",
        },
        {
          aspect: "Полагане при ремонт",
          innovative: "Директно върху здрава основа или стари плочки",
          tiles: "Задължително къртене и извозване",
        },
        {
          aspect: "Дебелина на системата",
          innovative: "2 – 3 мм",
          tiles: "12 – 20 мм (с лепилото)",
        },
        {
          aspect: "Дизайн и визия",
          innovative: "Монолитен бутиков дизайн по поръчка",
          tiles: "Стандартна модулна решетка",
        },
      ],
    },
  },

  // Terrazzo
  {
    id: "terrazzo",
    icon: Sparkles,
    title: "Terrazzo (Терацо)",
    category: "special-solutions",
    shortDescription:
      "Венецианска монолитна мозайка с естествени мраморни и каменни фрагменти — вечна класика в модерно изпълнение.",
    fullDescription:
      "Terrazzo (терацо) е премиум монолитна настилка, съчетаваща естествени фракции от мрамор, гранит, кварц или оникс със високоякостно свързващо вещество, която се шлифова диамантено на място до идеално гладка, безшевна повърхност. С живот от над 75 години и индивидуален подбор на цветовете и едрината на камъните, Terrazzo придава неповторим архитектурен почерк на дневни, фоайета, бани и търговски пространства.",
    features: [
      "Индивидуален дизайн — избирате точния цвят на основата и мраморните фракции",
      "Екстремна дълготрайност от над 75 години",
      "Естествен мрамор, гранит и минерални пигменти",
      "Напълно монолитен и безфугов под",
      "Възможност за многократно реполиране и обновяване след десетилетия",
      "Съвместим с подово отопление и устойчив на UV лъчи",
      "Луксозен избор за резиденции, просторни дневни и шоуруми в София",
    ],
    process: [
      {
        step: 1,
        title: "Дизайн и мостри",
        description:
          "Избор на каменни фракции, пигменти и степен на блясък (мат, сатен, полиран).",
      },
      {
        step: 2,
        title: "Подготовка и армиране",
        description:
          "Изравняване и грундиране на основата против пукнатини.",
      },
      {
        step: 3,
        title: "Изливане на сместа",
        description:
          "Прецизно забъркване и ръчно полагане на Terrazzo матрицата.",
      },
      {
        step: 4,
        title: "Диамантено шлифоване и полиране",
        description:
          "Многоетапно машинно шлифоване за разкриване на мрамора и финална импрегнация.",
      },
    ],
    image: terrazzoImg,
    gallery: [terrazzoImg, terrazzoBathroomImg],
    isInnovative: true,
  },

  // Flake Floor
  {
    id: "flake-floor",
    icon: Hexagon,
    title: "Flake Floor",
    category: "special-solutions",
    shortDescription:
      "Високоустойчива безшевна подова система с декоративни флейк частици и вградена хидроизолация за тераси и гаражи.",
    fullDescription:
      "Flake Floor е монолитна полимерна подова система, която обединява 100% безшевна хидроизолация и декоративно износоустойчиво покритие в едно. Благодарение на своята еластичност, UV стабилност и устойчивост на екстремни температурни амплитуди в София, Flake Floor е перфектното дългосрочно решение за открити тераси, балкони, гаражи и стълбища.",
    features: [
      "Хидроизолация и финишна настилка в една монолитна система",
      "100% морозоустойчива и еластична — не се пука и не се отлепва през зимата",
      "UV стабилна — цветовете не пожълтяват и не избледняват на слънце",
      "Устойчива на автомобилни гуми, масла, соли и механично натоварване",
      "Противохлъзгаща текстура за безопасност при мокър под",
      "Бързо полагане и лесно почистване без фуги",
    ],
    process: [
      {
        step: 1,
        title: "Оглед и избор на флейк микс",
        description:
          "Оценка на основата и избор на цветова комбинация от декоративни частици.",
      },
      {
        step: 2,
        title: "Шлайфане и грундиране",
        description:
          "Механична подготовка на бетона/плочките и дълбоко грундиране.",
      },
      {
        step: 3,
        title: "Хидроизолационен базов слой и флейк",
        description:
          "Нанасяне на еластичната мембрана и пълно насищане с цветни частици.",
      },
      {
        step: 4,
        title: "Запечатване с UV полиуретанов топ лак",
        description:
          "Финално запечатване за устойчивост на атмосферни влияния и износване.",
      },
    ],
    image: flakeFloorImg,
    gallery: [flakeFloorImg, flakeFloorShowroomImg],
    isInnovative: true,
  },

  // Каменен килим
  {
    id: "stone-carpet",
    icon: Mountain,
    title: "Каменен килим",
    category: "special-solutions",
    shortDescription:
      "Дренажна безшевна настилка от естествени кварцови и мраморни камъчета — край на локвите и разлепените плочки на терасата.",
    fullDescription:
      "Каменният килим (Stone Carpet) решава завинаги най-честия проблем на откритите тераси, веранди и зони около басейни в София — задържането на вода, замръзването и разрушаването на плочките. Настилката се състои от калибровани естествени мраморни или речни камъчета, свързани с прозрачна алифатна полиуретанова смола.\n\nПокритието е 100% водопропускливо (дренажно) — дъждовната вода преминава мигновено през микропорите към хидроизолацията и сифона отдолу, оставяйки повърхността суха, нехлъзгава и напълно защитена от лед през зимата.",
    features: [
      "100% дренажна система — без локви, застояла вода и заледяване",
      "Пълна морозоустойчивост при сурови зимни условия",
      "Естествени заоблени камъчета — приятни и безопасни за ходене бос",
      "Полага се безфугово върху тераси, стълбища, алеи и около басейни",
      "Висока UV устойчивост без пожълтяване на смолата",
      "Лесно измиване с водоструйка и минимална поддръжка",
    ],
    process: [
      {
        step: 1,
        title: "Оглед и избор на фракция",
        description:
          "Проверка на наклоните и хидроизолацията и избор на цвят на естествените камъчета.",
      },
      {
        step: 2,
        title: "Подготовка и хидроизолация",
        description:
          "Грундиране и полагане на безшевна хидроизолационна мембрана под килима.",
      },
      {
        step: 3,
        title: "Ръчно полагане и заглаждане",
        description:
          "Смесване на камъчетата с UV смола и полагане с дебелина 8–12 мм.",
      },
      {
        step: 4,
        title: "Полимеризация",
        description:
          "Пълно втвърдяване в рамките на 24–48 часа до готовност за експлоатация.",
      },
    ],
    image: stoneCarpetImg,
    gallery: [stoneCarpetImg, stoneCarpetPoolImg],
    isInnovative: true,
  },

  // Смарт инсталации
  {
    id: "smart-installations",
    icon: Lightbulb,
    title: "Смарт инсталации 2026",
    category: "special-solutions",
    shortDescription:
      "Интелигентна домашна автоматизация с Matter протокол — централизиран контрол на осветление, климат, щори и защита от течове.",
    fullDescription:
      "Модерният цялостен ремонт през 2026 г. е немислим без интелигентно планирана електроинсталация и автоматизация. Изграждаме системи за Умен дом (Smart Home), базирани на универсалния стандарт Matter, който гарантира пълна съвместимост с Apple Home, Google Home, Amazon Alexa и Samsung SmartThings без обвързване с един производител.\n\nИнтегрираме димируемо архитектурно осветление по сценарии, умно управление на подово отопление и климатици за икономия на енергия до 30%, моторизирани корнизи и щори, интелигентни брави и автоматични кранове със сензори за наводнение, които спират водата за секунди при наличие на влага.",
    features: [
      "Универсален Matter протокол — работи с Apple Siri, Google и Alexa",
      "Умно управление на осветлението и готови светлинни сценарии (Ден, Кино, Нощ)",
      "Автоматичен контрол на подово отопление, термопомпи и климатици по стаи",
      "Защита от наводнение със сензори и автоматично спиране на централния водопровод",
      "Моторизирани пердета, щори и интелигентни входни брави с код/отпечатък",
      "Изграждане по време на ремонта със скрито окабеляване и дълбоки конзоли",
      "Намаляване на разходите за отопление и охлаждане с 15–30%",
    ],
    process: [
      {
        step: 1,
        title: "Проектиране преди ремонта",
        description:
          "Планиране на всички умни функции, датчици и захранвания още преди шпакловките.",
      },
      {
        step: 2,
        title: "Окабеляване и табло",
        description:
          "Полагане на правилните кабели, дълбоки конзоли с нулев проводник и смарт модули.",
      },
      {
        step: 3,
        title: "Монтаж на ключове и сензори",
        description:
          "Инсталация на смарт ключове, термостати, актуатори за вода и мотори за пердета.",
      },
      {
        step: 4,
        title: "Програмиране и обучение",
        description:
          "Настройка на автоматизациите във вашия телефон и предаване на готовата система.",
      },
    ],
    image: smartHomeImg,
    gallery: [smartHomeImg],
    isInnovative: true,
  },
];

// English services data — Пълен паритет на всички 10 маршрута (без липсващи страници!)
const servicesEN: Service[] = [
  {
    id: "apartment-renovation",
    icon: Home,
    title: "Turnkey Apartment Renovation",
    category: "full-renovation",
    shortDescription:
      "End-to-end apartment renovation in Sofia — managed by a single accountable project lead with a detailed BOQ quote and a fixed contract price.",
    fullDescription:
      "A turnkey apartment renovation in Sofia by Renovivo covers the entire engineering and interior transformation from A to Z. You work with one dedicated project manager, an itemized Bill of Quantities (BOQ), and a fixed budget and deadline locked in a written contract.\n\nWe specialize in both full refurbishments of older properties (brick, EPK, panel) and high-ROI renovations for investment properties in Sofia. For old construction, we handle controlled demolition, waste removal, complete replacement of aged plumbing with silent PPR systems, and new electrical wiring with modern breaker panels.\n\nWe then execute laser-leveled screeds, Knauf drywall and concealed lighting, Q3/Q4 plastering, certified bathroom waterproofing, flooring, doors, and in-house custom kitchen and wardrobe manufacturing — backed by daily photo updates and a 2-year written warranty.",
    features: [
      "3D laser scanning and itemized BOQ quote with zero hidden costs",
      "Single dedicated project manager and permanent specialized crews",
      "Controlled demolition and organized debris removal",
      "Complete replacement of plumbing, electrical, and HVAC systems",
      "Q3/Q4 fine plastering, self-leveling screeds, and airless painting",
      "Turnkey bathrooms with large-format tiles or seamless microcement",
      "Flooring, interior doors, lighting, and custom furniture installation",
    ],
    process: [
      {
        step: 1,
        title: "Free On-Site Inspection & 3D Scan",
        description:
          "We assess the property in Sofia and take millimeter-accurate laser measurements.",
      },
      {
        step: 2,
        title: "Itemized BOQ & Fixed Contract",
        description:
          "You receive a transparent Bill of Quantities with a fixed price and binding schedule.",
      },
      {
        step: 3,
        title: "Demolition & Rough MEP Installations",
        description:
          "Site preparation and installation of new plumbing, electrical, and HVAC lines.",
      },
      {
        step: 4,
        title: "Drywall, Plastering & Bathrooms",
        description:
          "Suspended ceilings, waterproofing, tiling/microcement, and smooth wall preparation.",
      },
      {
        step: 5,
        title: "Flooring, Custom Furniture & Handover",
        description:
          "Parquet, doors, custom kitchen installation, deep cleaning, and 2-year warranty.",
      },
    ],
    image: apartmentRenovationImg,
    gallery: [apartmentRenovationImg, bathroomImg],
    isInnovative: false,
  },

  {
    id: "finishing-works",
    icon: Paintbrush,
    title: "Complete Finishing Works (BDS New Builds)",
    category: "finishing-work",
    shortDescription:
      "We transform newly built shell & core (BDS) apartments in Sofia into move-in or rental-ready homes with fixed pricing and timelines.",
    fullDescription:
      "Our Complete Finishing Works service is tailored for buyers of new-build properties in Sofia (handed over at BDS — plaster and screed stage after Act 14/15/16) and property investors seeking predictable, high-end execution without managing separate contractors.\n\nWe handle the entire cycle: adjusting electrical and plumbing points to match your kitchen and furniture layout, building Knauf suspended ceilings with concealed LED lighting, applying self-leveling screeds, and finishing walls to Q3/Q4 smoothness.\n\nWe build complete turnkey bathrooms, apply premium washable paints, and install parquet/tile flooring, interior doors, and custom-made kitchens and cabinetry under a single fixed-price contract.",
    features: [
      "Electrical and plumbing adjustments tailored to your interior layout",
      "Q3/Q4 fine plastering, priming, and airless painting",
      "Self-leveling screeds and installation of parquet, SPC vinyl, laminate, and tiles",
      "Knauf suspended ceilings, concealed curtain tracks, and LED lighting",
      "Complete turnkey bathroom execution with 2-year warranty",
      "Supply and installation of interior doors, baseboards, and lighting",
      "Parallel manufacturing and installation of custom kitchens and wardrobes",
    ],
    process: [
      {
        step: 1,
        title: "Site Inspection & BOQ Quote",
        description:
          "We inspect the developer's screed and walls and prepare an itemized fixed-price quote.",
      },
      {
        step: 2,
        title: "MEP Adjustments & Drywall",
        description:
          "Relocating sockets/plumbing points and constructing suspended ceilings.",
      },
      {
        step: 3,
        title: "Bathrooms & Fine Plastering",
        description:
          "Waterproofing and tiling bathrooms while preparing walls to Q3/Q4 level.",
      },
      {
        step: 4,
        title: "Painting, Flooring & Doors",
        description:
          "Airless painting, flooring installation, and fitting interior doors.",
      },
      {
        step: 5,
        title: "Custom Furniture & Deep Clean",
        description:
          "Installing bespoke cabinetry, sanitary ware, and lighting before turnkey handover.",
      },
    ],
    image: paintingImg,
    gallery: [paintingImg, flooringImg],
    isInnovative: false,
  },

  {
    id: "house-renovation",
    icon: Home,
    title: "Turnkey House Renovation",
    category: "full-renovation",
    shortDescription:
      "Comprehensive interior and exterior renovation of single-family houses in Sofia and the region.",
    fullDescription:
      "Renovating a single-family house in Sofia requires rigorous engineering coordination. Our team manages complete house renovations from A to Z: structural and insulation upgrades, window replacement, complete plumbing, electrical, and underfloor heating / heat pump installations, staircases, bathrooms, outdoor terraces, and turnkey interior finishing.",
    features: [
      "Engineering assessment and itemized BOQ project planning",
      "Underfloor heating, heat pumps, plumbing, and electrical upgrades",
      "Thermal and acoustic insulation and Knauf drywall systems",
      "High-efficiency PVC and aluminum window and door replacement",
      "Turnkey bathrooms, wet zones, and spa areas",
      "Frost-proof outdoor terrace flooring (Stone Carpet, Flake Floor)",
      "Complete interior finishing and custom furniture installation",
    ],
    process: [
      {
        step: 1,
        title: "Engineering Assessment",
        description: "Full evaluation of structure, insulation, and MEP systems.",
      },
      {
        step: 2,
        title: "BOQ Budget & Schedule",
        description: "Itemized quote and binding milestone contract.",
      },
      {
        step: 3,
        title: "MEP & Insulation Works",
        description: "Plumbing, electrical, underfloor heating, and windows.",
      },
      {
        step: 4,
        title: "Interior & Exterior Finishing",
        description: "Plastering, bathrooms, flooring, and seamless coatings.",
      },
      {
        step: 5,
        title: "Custom Cabinetry & Handover",
        description: "Furniture installation, deep cleaning, and written warranty.",
      },
    ],
    image: fullRenovationImg,
    gallery: [fullRenovationImg],
    isInnovative: false,
  },

  {
    id: "custom-furniture",
    icon: Sofa,
    title: "Custom Furniture — Kitchens & Cabinetry",
    category: "finishing-work",
    shortDescription:
      "Bespoke kitchens, walk-in closets, and cabinetry manufactured and installed in sync with your renovation in Sofia.",
    fullDescription:
      "Ordering custom furniture through Renovivo eliminates the 2-month wait after construction finishes. We take 3D laser measurements during the plastering stage, align all electrical and plumbing outlets with the cabinetry design, manufacture your furniture in parallel, and install it right after the flooring is laid.",
    features: [
      "Custom kitchens with full appliance and LED integration",
      "Floor-to-ceiling wardrobes and walk-in closets with Blum/Hettich hardware",
      "Waterproof MDF and compact laminate bathroom vanities",
      "Hallway storage, TV units, home offices, and bespoke niche cabinetry",
      "Wide selection of painted MDF, natural veneer, Egger/Kronospan boards, and stone",
      "3D visualization and technical drawings prior to production",
      "Delivery and clean professional installation by our Sofia team",
    ],
    process: [
      {
        step: 1,
        title: "3D Laser Measurement",
        description: "Exact on-site dimensions and material selection.",
      },
      {
        step: 2,
        title: "3D Design & MEP Drawings",
        description: "Visual approval and exact outlet mapping.",
      },
      {
        step: 3,
        title: "Precision Manufacturing",
        description: "Workshop production while finishing works are underway.",
      },
      {
        step: 4,
        title: "Delivery & Installation",
        description: "On-site assembly, leveling, and appliance integration.",
      },
    ],
    image: kitchenImg,
    gallery: [kitchenImg],
    isInnovative: false,
  },

  {
    id: "drywall-construction",
    icon: Layers,
    title: "Drywall & Acoustic Construction",
    category: "finishing-work",
    shortDescription:
      "Suspended ceilings, concealed LED lighting, partition walls, and acoustic insulation using certified Knauf systems.",
    fullDescription:
      "Drywall construction delivers flawless geometry, concealed architectural lighting, and superior soundproofing for apartments and houses in Sofia. We work exclusively with certified Knauf profiles, acoustic hangers, rockwool insulation, and moisture/fire/sound-resistant boards finished to Q3/Q4 level.",
    features: [
      "Smooth and multi-level suspended ceilings with concealed LED coves",
      "Double-board partition walls with rockwool sound insulation",
      "Acoustic wall linings against noisy neighboring apartments",
      "Concealed cistern enclosures and pipe boxing in bathrooms",
      "Decorative TV walls, niches, and recessed curtain tracks",
      "Joint reinforcement and full Q3/Q4 fine plastering",
      "Moisture-resistant and cement boards for wet zones",
    ],
    process: [
      {
        step: 1,
        title: "Laser Layout",
        description: "Marking exact ceiling heights, partitions, and light coves.",
      },
      {
        step: 2,
        title: "Metal Framing & Insulation",
        description: "Installing decoupled profiles and acoustic mineral wool.",
      },
      {
        step: 3,
        title: "Board Installation",
        description: "Single or double-layer boarding with staggered joints.",
      },
      {
        step: 4,
        title: "Q3/Q4 Finishing",
        description: "Taping and full-surface skimming ready for painting.",
      },
    ],
    image: drywallImg,
    gallery: [drywallImg],
    isInnovative: false,
  },

  {
    id: "windows-doors",
    icon: Frame,
    title: "Window Replacement",
    category: "finishing-work",
    shortDescription:
      "Removal of old frames and installation of high-efficiency PVC and aluminum windows with full reveal finishing.",
    fullDescription:
      "Upgrading windows reduces heat loss by up to 40% and blocks street noise in Sofia. We dismantle old frames, install triple-glazed PVC or aluminum systems (Rehau, Salamander, Veka, Schüco), and fully plaster and finish interior and exterior window reveals.",
    features: [
      "Removal and disposal of old window frames",
      "Installation of multi-chamber PVC or thermal-break aluminum systems",
      "Triple glazing with four-season and low-E glass",
      "Complete interior and exterior plastering of window reveals",
      "Interior sills and exterior aluminum drip caps",
      "Insect screens, roller shutters, and security hardware",
      "Hardware adjustment and warranty",
    ],
    process: [
      {
        step: 1,
        title: "Measurement",
        description: "Precise sizing and profile specification.",
      },
      {
        step: 2,
        title: "Dismantling",
        description: "Careful removal of existing windows.",
      },
      {
        step: 3,
        title: "Level Installation",
        description: "Mounting and thermal perimeter sealing.",
      },
      {
        step: 4,
        title: "Reveal Finishing",
        description: "Drywall/plastering of reveals and sill installation.",
      },
    ],
    image: windowsImg,
    gallery: [windowsImg],
    isInnovative: false,
  },

  {
    id: "doors-installation",
    icon: DoorOpen,
    title: "Interior & Entrance Door Installation",
    category: "finishing-work",
    shortDescription:
      "Laser-leveled installation of interior, concealed flush-to-wall, sliding, and armored entrance doors.",
    fullDescription:
      "Proper door installation ensures silent operation and clean architectural lines. We install standard interior doors, concealed-frame flush doors (painted or coated in microcement), pocket sliding doors, and armored entrance doors with 1mm laser precision.",
    features: [
      "Interior doors with adjustable architrave frames",
      "Concealed (flush) doors integrated during the drywall/plastering stage",
      "In-wall pocket sliding doors and glass partitions",
      "Armored entrance doors with full frame finishing",
      "Precision mitered architraves and baseboards",
      "Magnetic locks, concealed hinges, and drop-down acoustic seals",
      "Seamless alignment with parquet and bathroom tile levels",
    ],
    process: [
      {
        step: 1,
        title: "Opening Verification",
        description: "Checking wall thickness and rough opening dimensions.",
      },
      {
        step: 2,
        title: "Floor Level Coordination",
        description: "Aligning thresholds with finished floor heights.",
      },
      {
        step: 3,
        title: "Laser-Leveled Mounting",
        description: "Securing frames, hanging leaves, and fitting hardware.",
      },
      {
        step: 4,
        title: "Trim & Adjustment",
        description: "Installing architraves and tuning latches.",
      },
    ],
    image: doorsImg,
    gallery: [doorsImg],
    isInnovative: false,
  },

  // ========== SPECIAL INNOVATIVE SOLUTIONS (EN) ==========
  {
    id: "microcement",
    icon: Square,
    title: "Microcement",
    category: "special-solutions",
    shortDescription:
      "Luxury 2–3 mm seamless and 100% waterproof coating for modern bathrooms, floors, walls, and custom furniture.",
    fullDescription:
      "Microcement is a high-performance polymer-mineral coating applied at just 2–3 mm thickness to create a monolithic, joint-free surface. It is the premier choice for luxury renovations in Sofia — ideal for seamless bathrooms, walk-in showers, kitchen backsplashes, floors with underfloor heating, stairs, and furniture.\n\nThanks to its extreme adhesion, microcement can be applied over new screed and drywall or directly over existing tiles without demolition.",
    features: [
      "100% joint-free monolithic surface — zero grout lines or mold",
      "Fully waterproof — ideal for bathrooms, showers, and wet zones",
      "Applies directly over existing tiles, concrete, screed, or MDF",
      "50+ bespoke colors and textures — from warm travertine to graphite",
      "High thermal conductivity — perfect over underfloor heating",
      "Resistant to wear, impact, and household cleaning agents",
      "Hygienic and effortless to maintain",
    ],
    process: [
      {
        step: 1,
        title: "Consultation & Sample Selection",
        description: "Substrate inspection in Sofia and color/texture selection.",
      },
      {
        step: 2,
        title: "Priming & Fiberglass Mesh",
        description: "Reinforcing the substrate for crack-free performance.",
      },
      {
        step: 3,
        title: "Base & Decorative Coats",
        description: "Hand-troweled application of base and fine microcement layers.",
      },
      {
        step: 4,
        title: "Polyurethane Sealing",
        description: "Multi-coat protective sealing for 100% waterproofing.",
      },
    ],
    image: microcementImg,
    gallery: [microcementImg, microcementKitchenImg],
    isInnovative: true,
    vsTiles: {
      advantages: [
        "Zero grout lines — no discoloration, mold, or scrubbing",
        "Applies directly over old tiles without noisy demolition",
        "Only 2–3 mm thick — does not raise floor height",
        "Creates a spacious, monolithic architectural aesthetic",
      ],
      disadvantages: [
        "Requires certified applicators and strict curing times",
        "Higher initial investment compared to basic ceramic tiles",
      ],
      comparison: [
        {
          aspect: "Grout & Hygiene",
          innovative: "100% seamless & antibacterial",
          tiles: "Multiple grout lines that trap dirt",
        },
        {
          aspect: "Renovation Prep",
          innovative: "Applies over existing tiles",
          tiles: "Requires full demolition",
        },
        {
          aspect: "System Thickness",
          innovative: "2 – 3 mm",
          tiles: "12 – 20 mm (with adhesive)",
        },
        {
          aspect: "Visual Style",
          innovative: "Bespoke monolithic luxury",
          tiles: "Standard grid pattern",
        },
      ],
    },
  },

  {
    id: "terrazzo",
    icon: Sparkles,
    title: "Terrazzo",
    category: "special-solutions",
    shortDescription:
      "Monolithic Venetian mosaic flooring with natural marble and granite aggregates — engineered to last 75+ years.",
    fullDescription:
      "Terrazzo is a bespoke monolithic flooring system combining natural marble, granite, and quartz aggregates in a high-strength matrix, diamond-ground and polished on site to a seamless finish. Lasting over 75 years, Terrazzo delivers timeless architectural prestige for living areas, foyers, bathrooms, and commercial interiors in Sofia.",
    features: [
      "Bespoke design — custom matrix color and marble aggregate selection",
      "75+ years of structural durability",
      "Authentic natural marble and granite aggregates",
      "100% seamless and hygienic monolithic floor",
      "Can be re-polished multiple times over decades",
      "UV-stable and compatible with underfloor heating",
      "Suitable for luxury residences and commercial spaces",
    ],
    process: [
      {
        step: 1,
        title: "Design Consultation",
        description: "Selecting stone aggregates, pigments, and gloss level.",
      },
      {
        step: 2,
        title: "Substrate Preparation",
        description: "Leveling and priming the base.",
      },
      {
        step: 3,
        title: "Casting",
        description: "Mixing and hand-spreading the Terrazzo matrix.",
      },
      {
        step: 4,
        title: "Diamond Grinding & Sealing",
        description: "Multi-stage diamond polishing to reveal the stone.",
      },
    ],
    image: terrazzoImg,
    gallery: [terrazzoImg, terrazzoBathroomImg],
    isInnovative: true,
  },

  {
    id: "flake-floor",
    icon: Hexagon,
    title: "Flake Floor",
    category: "special-solutions",
    shortDescription:
      "Seamless waterproof and frost-resistant decorative flake flooring for terraces, balconies, and garages.",
    fullDescription:
      "Flake Floor combines monolithic waterproofing and heavy-duty decorative protection in a single seamless system. Elastic, UV-stable, and frost-proof, it is the ideal long-term flooring solution for outdoor terraces, balconies, and garages in Sofia.",
    features: [
      "Waterproofing and decorative finish in one seamless system",
      "100% frost-resistant and elastic — prevents winter cracking",
      "UV-stable — colors never yellow or fade",
      "Resistant to hot tires, oils, and heavy wear",
      "Anti-slip texture for wet-weather safety",
      "Fast installation and easy joint-free maintenance",
    ],
    process: [
      {
        step: 1,
        title: "Inspection & Flake Selection",
        description: "Substrate check and color blend selection.",
      },
      {
        step: 2,
        title: "Grinding & Priming",
        description: "Mechanical surface preparation and deep priming.",
      },
      {
        step: 3,
        title: "Elastic Base & Flake Broadcast",
        description: "Applying the waterproof membrane and decorative flakes.",
      },
      {
        step: 4,
        title: "UV Polyurethane Topcoat",
        description: "Sealing for extreme weather and abrasion resistance.",
      },
    ],
    image: flakeFloorImg,
    gallery: [flakeFloorImg, flakeFloorShowroomImg],
    isInnovative: true,
  },

  {
    id: "stone-carpet",
    icon: Mountain,
    title: "Stone Carpet",
    category: "special-solutions",
    shortDescription:
      "100% porous natural quartz and marble pebble flooring — eliminating puddles and cracked tiles on terraces and pools.",
    fullDescription:
      "Stone Carpet permanently solves the most common outdoor terrace problem in Sofia: trapped water and frost-damaged tiles. Made from natural marble or river pebbles bound with UV-stable polyurethane resin, the surface is 100% porous — rainwater drains immediately through the carpet to the waterproofing layer below, leaving no puddles or ice.",
    features: [
      "100% porous drainage system — zero puddles or standing water",
      "Completely frost-proof during harsh Sofia winters",
      "Anti-slip natural rounded pebbles — safe around pools and terraces",
      "Seamless monolithic application on terraces, stairs, and walkways",
      "Aliphatic UV-stable resin that never yellows",
      "Easy pressure-washer cleaning and minimal maintenance",
    ],
    process: [
      {
        step: 1,
        title: "Consultation & Stone Selection",
        description: "Checking drainage slopes and choosing pebble colors.",
      },
      {
        step: 2,
        title: "Waterproofing Membrane",
        description: "Applying a seamless waterproof base layer.",
      },
      {
        step: 3,
        title: "Trowel Application",
        description: "Hand-laying the resin-bound pebbles at 8–12 mm thickness.",
      },
      {
        step: 4,
        title: "Curing",
        description: "Full curing within 24–48 hours.",
      },
    ],
    image: stoneCarpetImg,
    gallery: [stoneCarpetImg, stoneCarpetPoolImg],
    isInnovative: true,
  },

  {
    id: "smart-installations",
    icon: Lightbulb,
    title: "Smart Installations 2026",
    category: "special-solutions",
    shortDescription:
      "Matter-based Smart Home automation — unified control of lighting, HVAC, underfloor heating, shades, and leak protection.",
    fullDescription:
      "We design and install future-proof Smart Home systems during your renovation in Sofia using the universal Matter protocol — natively supported by Apple Home, Google Home, Amazon Alexa, and Samsung SmartThings.\n\nWe integrate architectural lighting scenes, room-by-room underfloor heating and AC optimization (saving 15–30% on energy bills), motorized shades, smart locks, and automatic water shut-off valves with leak sensors.",
    features: [
      "Universal Matter protocol — compatible with Apple Siri, Google, and Alexa",
      "Smart lighting scenes and dimming control",
      "Automated room-by-room HVAC and underfloor heating control",
      "Flood protection with leak sensors and automatic main water shut-off",
      "Motorized curtain tracks, blinds, and biometric smart locks",
      "Concealed wiring and deep junction boxes installed during renovation",
      "15–30% real-world energy savings",
    ],
    process: [
      {
        step: 1,
        title: "Pre-Renovation Engineering",
        description: "Planning sensors, actuators, and wiring before plastering.",
      },
      {
        step: 2,
        title: "Wiring & Panel Integration",
        description: "Installing neutral wires, deep boxes, and DIN-rail modules.",
      },
      {
        step: 3,
        title: "Device Installation",
        description: "Mounting smart switches, thermostats, and water valves.",
      },
      {
        step: 4,
        title: "Scene Configuration & Handover",
        description: "Setting up your mobile app and automation routines.",
      },
    ],
    image: smartHomeImg,
    gallery: [smartHomeImg],
    isInnovative: true,
  },
];

export const getServices = (language: Language): Service[] => {
  return language === "bg" ? servicesBG : servicesEN;
};

export const getServiceByIdWithLanguage = (
  id: string,
  language: Language,
): Service | undefined => {
  const serviceList = language === "bg" ? servicesBG : servicesEN;
  return serviceList.find((service) => service.id === id);
};

export const getServiceById = (id: string): Service | undefined => {
  return servicesBG.find((service) => service.id === id);
};

export const services = servicesBG;
