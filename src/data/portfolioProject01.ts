/**
 * PORTFOLIO 01 — an illustrative apartment concept, not a documented Renovivo commission.
 * Each room belongs to the same proposed design narrative. Do not add invented clients,
 * completion dates, budgets, testimonials, verified "before" images or contractor results.
 */
export type LocalizedCopy = { bg: string; en: string };
export type RoomKey = "overview" | "living" | "kitchen" | "bedroom" | "bathroom" | "hall";

export interface EditorialRoom {
  id: RoomKey;
  number: string;
  label: LocalizedCopy;
  heading: LocalizedCopy;
  intro: LocalizedCopy;
  challenge: LocalizedCopy;
  approach: LocalizedCopy;
  details: LocalizedCopy[];
  image: string;
  alt: LocalizedCopy;
}

const t = (bg:string,en:string):LocalizedCopy=>({bg,en});
const img = (name:string)=>"/images/project-01/"+name+".jpg";

export const renovationProject01 = {
  id:"apartment-01",
  number:"01",
  title:t("Апартамент с повече светлина и по-малко излишни детайли","An apartment with more light and fewer distractions"),
  shortTitle:t("Светъл градски апартамент","Light-filled city apartment"),
  status:t("Интериорна концепция · визуален пример","Interior concept · illustrative example"),
  category:t("Цялостен ремонт на апартамент","Complete apartment renovation"),
  typology:t("Примерен двустаен апартамент","Illustrative one-bedroom apartment"),
  area:t("Около 72.5 м² · примерен габарит","Approx. 72.5 m² · conceptual footprint"),
  location:t("София · примерен проект","Sofia · concept project"),
  intro:t(
    "Идеята: истински удобен дом за ежедневието. Няма демонстративен лукс — има светлина, логична организация, достатъчно място за вещи и детайли, които се изпълняват добре.",
    "The idea: a home that works in everyday life. Not showy luxury — but daylight, clear organization, good storage and carefully considered construction details."
  ),
  story:t(
    "Това е демонстрационна история за цялостен ремонт на градско жилище. Започваме от най-честия въпрос при подобен апартамент: как ограничената площ да работи спокойно за живеене, без стаите да изглеждат като отделни дизайнерски шоуруми. Затова всички помещения споделят една материална и цветова логика.",
    "This is an illustrative story about renovating a compact city apartment. It starts with the practical question of how to make limited space function calmly, without turning each room into a separate showroom. All rooms therefore share one consistent material and color language."
  ),
  scope:[
    t("Проверка на основата и нивата преди довършване","Survey of substrate and levels before finishing"),
    t("Координация на електро- и ВиК точките по разпределение","Coordinating electrical and plumbing positions with layout"),
    t("Подготовка на стени, тавани и подове","Wall, ceiling and floor preparation"),
    t("Планиране на осветление, контакти и мебели","Lighting, power points and furniture planning"),
    t("Настилки, облицовки, врати и фини покрития","Floors, tiling, doors and finishing coats"),
    t("Последователност на монтажите и финални проверки","Sequencing installation works and final checks")
  ],
  materials:[
    t("Светъл дъб / дървесни декори","Light oak / wood accents"),
    t("Топло бяло и мек грейдж","Warm white and soft greige"),
    t("Матови фронтове и фини текстури","Matte fronts and tactile finishes"),
    t("Топло функционално осветление","Warm task and ambient lighting")
  ],
  steps:[
    {title:t("Измерване и задание","Survey and brief"),body:t("Проверка на реалните размери, отклоненията и ограниченията на инсталациите.","Measure actual dimensions and review constraints before decisions.")},
    {title:t("Разпределение и инсталации","Layout and services"),body:t("Местоположението на кухнята, мебелите и осветлението се координира преди затварянето на повърхностите.","Coordinate kitchen, furniture and lighting before closing the surfaces.")},
    {title:t("Подготовка и конструкции","Preparation and construction"),body:t("Равнини, сухо строителство, мокри процеси, хидроизолация и проверки преди облицовка.","Substrates, drywall, wet trades, waterproofing and checks before finishes.")},
    {title:t("Довършване","Finishing"),body:t("Настилки, облицовки, шпакловки, боядисване, врати и монтажни детайли по ред, който избягва преработки.","Flooring, tiling, paint, doors and a carefully sequenced installation.")},
    {title:t("Контрол и предаване","Quality control and handover"),body:t("Преглед на фугите, силиконите, осветлението, функционалните зони и довършителните допуски.","Review joints, sealants, lighting, functional zones and finishing quality.")}
  ],
  rooms:[
    {
      id:"overview",number:"01",label:t("Общ изглед","Overview"),heading:t("Един дом, а не пет несвързани интериора","One coherent home, not disconnected interiors"),
      intro:t("Поглед към дневната, кухнята и трапезарията. Дървесните декори, меките цветове и осветлението се повтарят във всички помещения.","A view through living, kitchen and dining. Wood textures, subtle colors and layered lighting connect every room."),
      challenge:t("Отделните функции трябва да работят в общ обем, без кухнята да доминира над дневната.","Living, dining and cooking must coexist without one function dominating the space."),
      approach:t("Разделяме зоните чрез мебели, светлина и различни задачи, не чрез излишни преградни стени.","Define zones with furniture, lighting and function rather than unnecessary partitions."),
      details:[t("Единна подова линия","Continuity in floor treatment"),t("Пропорционални мебели","Right-sized furnishings"),t("Топли, но ненатрапчиви акценти","Understated warm accents")],
      image:img("overview"),alt:t("Общ изглед към дневна и кухня в светъл градски апартамент — концептуална визуализация","Illustrative overview of a compact living room and kitchen")
    },
    {
      id:"living",number:"02",label:t("Дневна","Living room"),heading:t("Удобна дневна с реални пропорции","A comfortable living room at real-world scale"),
      intro:t("Мястото за почивка е спокойно и достатъчно свободно. Телевизорът, диванът и преминаването към останалите помещения са в един ясен план.","A relaxed seating zone with enough clear circulation; TV, sofa and route into the other rooms work together."),
      challenge:t("Диван, ТВ зона и движение през помещението се конкурират за едни и същи квадратни метри.","Sofa, TV and circulation compete for the same square meters."),
      approach:t("Не претрупваме стените. Планираме контактите спрямо ТВ мебела, оставяме място за преминаване и контролираме отраженията от светлината.","Avoid overloaded walls; coordinate outlets with the TV unit, preserve a clear path and manage glare."),
      details:[t("Подови преходи без излишни прагове","Clean transitions without unnecessary thresholds"),t("Равнини и фини фуги","Straight planes and neat joints"),t("Осветление с различни режими","Layered lighting")],
      image:img("living"),alt:t("Дневна със светъл диван, дъбов под и отворена кухня — концептуална визуализация","Illustrative warm living room with oak floor")
    },
    {
      id:"kitchen",number:"03",label:t("Кухня и трапезария","Kitchen and dining"),heading:t("Кухня, която трябва да се ползва всеки ден","A kitchen designed for everyday use"),
      intro:t("Компактна работна зона, осветен плот, лесен достъп до уредите и трапезна маса близо до естествената светлина.","A compact work triangle with task lighting, convenient appliances and dining close to daylight."),
      challenge:t("Инсталациите и уредите трябва да се съберат без компромис с работния плот и зоната за движение.","Appliances and services need careful placement without sacrificing worktop or circulation."),
      approach:t("Първо се фиксират трасетата и точките за уреди, аспирация и вода. След това се определят мебели, плот и осветление — не обратно.","Fix plumbing, extraction and electrical points first, then cabinetry, worktops and lighting — never in reverse."),
      details:[t("Защитени зони около мокрите точки","Appropriate detailing around wet zones"),t("Осветление под горните шкафове","Task lighting beneath wall cabinets"),t("Достъпни сервизни връзки","Serviceable appliance connections")],
      image:img("kitchen"),alt:t("Функционална кухня с матови шкафове и трапезария — концептуална визуализация","Illustrative functional kitchen and dining area")
    },
    {
      id:"bedroom",number:"04",label:t("Спалня","Bedroom"),heading:t("Тихо помещение, в което има място и за съхранение","A restful room with enough storage"),
      intro:t("Семпла спалня, гардероб до тавана и спокойна палитра. Акцентът е в практичността и точните монтажни детайли.","An understated bedroom with full-height wardrobe and calm colors. Practical construction details matter most."),
      challenge:t("Гардероб, легло и удобно отваряне на вратите в ограничена площ.","Wardrobe, bed and doors must function within the available footprint."),
      approach:t("Проверяваме проходите, разполагаме контактите от двете страни на леглото и предвиждаме равна основа за мебелите по поръчка.","Check circulation, position bedside outlets, and prepare straight surfaces for fitted cabinetry."),
      details:[t("Незаслепяващо светлинно решение","Low-glare lighting"),t("Място за отваряне на гардероб","Wardrobe clearance"),t("Еднаква дървесна палитра с дневната","Shared oak palette with living room")],
      image:img("bedroom"),alt:t("Съвременна спалня с гардероб и светло дърво — концептуална визуализация","Illustrative modern bedroom with fitted storage")
    },
    {
      id:"bathroom",number:"05",label:t("Баня","Bathroom"),heading:t("Баня, в която детайлът е технически, не декоративен","A bathroom where details are technical, not decorative"),
      intro:t("Функционално разположение на душ, тоалетна и мивка с материали, които са лесни за почистване и поддръжка.","Practical shower, toilet and vanity arrangement with durable, easy-to-maintain materials."),
      challenge:t("Наклони, душ зона, вградени елементи и малка площ изискват точни предварителни решения.","Falls, waterproof zones and concealed components require accurate planning."),
      approach:t("Предвиждаме позициите на сифона и смесителите, ревизиите и хидроизолацията преди облицовката. Красивата фуга идва след правилния детайл отдолу.","Determine drain, mixers, access panels and waterproofing before tiling. A good finish starts below the tile."),
      details:[t("Надеждна хидроизолация на мокрите зони","Reliable waterproofing in wet zones"),t("Ревизионен достъп до скрити връзки","Service access to concealed fittings"),t("Контрол на наклоните към сифона","Correct falls towards the drain")],
      image:img("bathroom"),alt:t("Баня с душ, конзолна тоалетна и светли каменни облицовки — концептуална визуализация","Illustrative stone-look bathroom")
    },
    {
      id:"hall",number:"06",label:t("Антре","Hallway"),heading:t("Първите квадратни метри също трябва да работят","The first square meters matter too"),
      intro:t("Антре с място за обувки, палта и ежедневни вещи, което преминава естествено към дневната.","An entrance with practical storage and a natural connection to the living area."),
      challenge:t("В малкото антре лесно се получава претрупване с врати, шкафове и осветление.","Hallways easily become cluttered with doors, cabinets and lighting."),
      approach:t("Предвиждаме шкафове с разумна дълбочина, осветено огледало и свободен проход; позициите на ключове и домофон се решават преди финиша.","Use shallow storage, a lit mirror and clear circulation, and coordinate switches and entry controls before finishing."),
      details:[t("Планирани ключове при входа","Switches planned at the entrance"),t("Здрави и лесни за поддръжка повърхности","Durable easy-clean surfaces"),t("Свързаност с дневната","Continuous visual connection to living")],
      image:img("hall"),alt:t("Антре с дървени акценти и поглед към дневната — концептуална визуализация","Illustrative compact entrance and living connection")
    }
  ] as EditorialRoom[]
};
export const localText=(copy:LocalizedCopy,language:string)=>language==="en"?copy.en:copy.bg;
