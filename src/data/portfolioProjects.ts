import { renovationProject01, type LocalizedCopy, type RoomKey } from "./portfolioProject01";

export { localText } from "./portfolioProject01";
const t = (bg: string, en: string): LocalizedCopy => ({ bg, en });
type RoomStory = [string, string, string, string, string, string];
type ProjectBrief = {
  id: string;
  name: LocalizedCopy;
  typology: LocalizedCopy;
  area: LocalizedCopy;
  intro: LocalizedCopy;
  story: LocalizedCopy;
  materials: LocalizedCopy[];
  rooms: Record<Exclude<RoomKey, "overview">, RoomStory>;
  extraRoom?: { id: "children" | "office"; label: LocalizedCopy; story: RoomStory };
};

// These are proposed design briefs and generated visualizations, never completed
// commissions. Areas describe the brief, not measured client properties.
const briefs: ProjectBrief[] = [
  {
    id: "apartment-01",
    name: t("Светъл градски апартамент", "A light-filled city apartment"),
    typology: t("Двустаен апартамент", "One-bedroom apartment"),
    area: t("73 м² · проектен ориентир", "73 m² · design brief"),
    intro: t("Един компактен дом с обща дневна, удобна кухня и място за всичко необходимо. Светъл дъб, топло бяло и маслинен акцент свързват помещенията.", "A compact home with a shared living space, practical kitchen and room for everyday essentials. Light oak, warm white and an olive accent connect the rooms."),
    story: t("В основата на този двустаен апартамент е прост въпрос: как дневната, кухнята и трапезарията да споделят едно помещение, без то да се превърне в коридор между мебели? Разпределението събира кухнята в компактен Г-образен фронт, оставя масата близо до нея и пази свободен път към балкона. Същият светъл дъб продължава в спалнята и входната зона.", "The brief starts with a simple question: how can living, cooking and dining share one room without turning it into a passage between furniture? A compact L-shaped kitchen keeps the dining table nearby and leaves a clear route to the balcony. The same light oak continues into the bedroom and entrance."),
    materials: [t("Светъл дъб", "Light oak"), t("Матово топло бяло", "Matte warm white"), t("Маслинен текстил", "Olive upholstery"), t("Светъл гранитогрес и никел", "Light porcelain and nickel")],
    rooms: {
      living: ["Маслиненият диван и ниската маса оформят спокойна дневна до балкона.", "An olive sofa and low table define a calm living area beside the balcony.", "Пътят към прозореца не трябва да минава между масата и дивана.", "The route to the window must not squeeze between sofa and coffee table.", "Разполагаме мебелите по периферията и оставяме общата подова линия видима.", "Keep furniture at the perimeter and preserve a visible, continuous floor."],
      kitchen: ["Г-образна кухня със светъл плот и място за четирима около кръглата маса.", "An L-shaped kitchen with a pale worktop and a round table for four.", "Малкият работен фронт трябва да събере уреди, мивка и достатъчно плот.", "A small working frontage must fit appliances, sink and useful counter space.", "Групираме високите уреди в края, а работната светлина остава под горните шкафове.", "Group tall appliances at the end and place task lighting below the wall cabinets."],
      bedroom: ["Светъл гардероб, естествен текстил и свободно място от двете страни на леглото.", "Light oak storage, natural linens and accessible space on both sides of the bed.", "Обемът на гардероба не бива да отнема светлината от прозореца.", "The wardrobe must not take daylight away from the room.", "Събираме съхранението по една стена и оставяме останалите повърхности спокойни.", "Concentrate storage on one wall and keep the other surfaces understated."],
      bathroom: ["Компактна баня със стъклена душ зона, окачена тоалетна и дъбова мебел.", "A compact bathroom with glazed shower, wall-hung toilet and oak vanity.", "В мократа зона трябва да има удобен вход и достъп за почистване.", "The wet area needs practical access and room for cleaning.", "Подреждаме санитарията по стените, планираме наклоните и пазим прохода пред мивката.", "Place fittings along the walls, plan floor falls and keep the space in front of the vanity clear."],
      hall: ["Истинска входна зона с шкаф за обувки, закачалки и поглед към дома.", "A real entrance with shoe storage, coat hooks and a view into the home.", "Входната врата и шкафовете се отварят в ограничена площ.", "The entrance door and storage must open within a small footprint.", "Използваме плитък шкаф и същия дъб като в дневната, без да затваряме коридора.", "Use shallow storage and the same oak as the living room without enclosing the corridor."],
    },
  },
  {
    id: "apartment-02",
    name: t("Място за семейния ритъм", "Room for family life"),
    typology: t("Семеен тристаен апартамент", "Two-bedroom family apartment"),
    area: t("94 м² · проектен ориентир", "94 m² · design brief"),
    intro: t("Семеен апартамент с просторна обща зона, ясни проходи и повече затворено съхранение. Приглушено зелено и меден дъб придават характер без излишна декорация.", "A family apartment with a generous shared space, clear circulation and more concealed storage. Muted green and honey oak bring character without decorative excess."),
    story: t("Тук задачата не е просто да има голяма дневна. Домът трябва да поеме вечеря, игра и ежедневното прибиране на вещи, без всяка дейност да пречи на останалите. Кухнята и трапезарията образуват общ център, а меката зона остава встрани от основния маршрут. Шкафовете при входа и в спалнята са част от разпределението още в заданието. Семейното жилище поставя устойчивите, лесни за поддръжка повърхности пред показния лукс.", "The task is more than creating a large living room. Dinner, play and everyday storage need to coexist without competing. Kitchen and dining form a shared center while the seating stays outside the main route. Entrance and bedroom storage are part of the layout from the start. Durable, easy-care surfaces take priority over showy luxury."),
    materials: [t("Меден дъб", "Honey oak"), t("Приглушено градинско зелено", "Muted sage green"), t("Пясъчен текстил", "Sand upholstery"), t("Светъл терацо ефект", "Pale terrazzo effect")],
    extraRoom: {
      id: "children", label: t("Детска стая", "Child's room"),
      story: ["Светла втора спалня с място за сън, учене и прибиране на играчките.", "A light second bedroom with space to sleep, study and put toys away.", "Стаята трябва да се променя с възрастта, без всеки път да изисква нов ремонт.", "The room needs to adapt as a child grows without requiring another renovation.", "Избираме неутрална основа, свободностоящо бюро и затворено съхранение в общата зелено-дъбова палитра.", "Use a neutral base, a movable desk and closed storage in the apartment's sage-and-oak palette."],
    },
    rooms: {
      living: ["Мека зона в пясъчни тонове, свързана с трапезарията, но извън основния проход.", "Sand-toned seating connected to dining but outside the main circulation path.", "Едно помещение трябва да побира различни семейни занимания едновременно.", "One room must support different family activities at the same time.", "Отделяме зоните с подреждането на мебелите и осветлението, без нови стени.", "Define zones through furniture and lighting rather than additional walls."],
      kitchen: ["Зелени долни фронтове, дъбови акценти и голяма маса за общите вечери.", "Green lower fronts, oak accents and a generous table for shared meals.", "Готвенето и движението към масата не трябва да се пресичат пред уредите.", "Cooking and circulation to the table should not cross in front of appliances.", "Планираме работния триъгълник и свободните зони пред чекмеджетата преди поръчката на мебели.", "Plan the working triangle and drawer clearances before ordering cabinetry."],
      bedroom: ["Спокойна спалня с прибрано съхранение и мек, топъл текстил.", "A restful bedroom with concealed storage and soft warm textiles.", "Големият обем за вещи лесно превръща спалнята в склад.", "Generous storage can easily make a bedroom feel like a storeroom.", "Обединяваме гардеробите в ясен фронт и оставяме зоната около леглото лека.", "Combine wardrobes into one clear frontage and keep the bed area visually light."],
      bathroom: ["Светли плочки и приглушен зелен акцент свързват банята с общата палитра.", "Light tiles and a muted green accent connect the bathroom to the shared palette.", "Семейната баня изисква места за вещи без претрупан плот.", "A family bathroom needs storage without a cluttered counter.", "Използваме затворена мебел и ниша извън директната струя на душа.", "Use enclosed vanity storage and a niche outside the direct shower spray."],
      hall: ["Шкафове, пейка и достъпни закачалки посрещат ежедневните вещи още при входа.", "Cabinetry, a bench and accessible hooks collect everyday items at the entrance.", "Обувки, чанти и връхни дрехи не трябва да се разпиляват към дневната.", "Shoes, bags and coats should not spread into the living space.", "Отделяме ясни зони за сядане, обувки и дълги дрехи, без да стесняваме прохода.", "Separate seating, shoe and coat storage while preserving a clear passage."],
    },
  },
  {
    id: "apartment-03",
    name: t("Малка площ, ясен план", "Small footprint, clear plan"),
    typology: t("Компактен двустаен апартамент", "Compact one-bedroom apartment"),
    area: t("48 м² · проектен ориентир", "48 m² · design brief"),
    intro: t("Компактно жилище с истинска кухня, отделна спалня и лесни за поддръжка материали. Всеки шкаф и всеки проход имат конкретна задача.", "A compact home with a proper kitchen, separate bedroom and easy-care materials. Every cabinet and circulation route has a specific purpose."),
    story: t("При малък апартамент най-скъпият ресурс е свободното място. Разпределението избягва острови, обемни дивани и декоративни прегради. Правата кухня събира нужните уреди по една стена, малката маса остава подвижна, а светлите повърхности продължават между стаите. Инвестиционната логика е практичност и поддръжка, не обещание за доходност: ремонтопригодни детайли, достъп до връзките и мебели с разумни размери.", "In a small apartment the scarcest resource is clear space. The layout avoids islands, oversized sofas and decorative partitions. A straight kitchen contains the appliances on one wall, a small table stays movable and light surfaces connect the rooms. The investment brief means practicality and maintenance, not a return guarantee: serviceable details, accessible connections and right-sized furniture."),
    materials: [t("Светъл дъбов декор", "Light oak finish"), t("Матово слонова кост", "Matte ivory"), t("Приглушено синьо", "Dusty blue"), t("Светлосив гранитогрес", "Pale grey porcelain")],
    rooms: {
      living: ["Малък син диван и лека маса оставят въздух около зоната за почивка.", "A small blue sofa and light table preserve space around the seating area.", "Обемните мебели биха отнели основния проход в общата стая.", "Oversized furniture would consume the main passage through the shared room.", "Избираме компактни размери и свободно видим под вместо декоративно запълване.", "Choose compact dimensions and visible floor rather than filling every corner."],
      kitchen: ["Права кухня с всички основни функции, без остров и неизползваеми ъгли.", "A straight kitchen with essential functions, without an island or wasted corners.", "Мивка, фурна, хладилник и подготовка трябва да работят на кратък фронт.", "Sink, oven, fridge and preparation must work along a short frontage.", "Подреждаме уредите последователно и оставяме използваем плот между мократа и горещата зона.", "Sequence appliances and preserve usable worktop between wet and hot zones."],
      bedroom: ["Отделна компактна спалня със светли мебели и прибрано съхранение.", "A separate compact bedroom with light furniture and integrated storage.", "Ограничената площ не позволява всички мебели да бъдат свободностоящи.", "The limited footprint cannot accommodate entirely freestanding storage.", "Събираме гардеробите в обща линия и проверяваме отварянето на вратите спрямо леглото.", "Combine storage into one line and check door clearance against the bed."],
      bathroom: ["Малка душ баня със светла облицовка и лесен достъп до санитарията.", "A small shower bathroom with light finishes and accessible fittings.", "Душът трябва да остане удобен без да мокри целия под.", "The shower needs to remain usable without wetting the entire floor.", "Компактна стъклена преграда и правилни наклони отделят мократа зона.", "A compact glazed screen and correct floor falls define the wet area."],
      hall: ["Плитък шкаф, огледало и закачалки вместо тежък гардероб в тесния вход.", "Shallow storage, a mirror and hooks replace bulky cabinetry in the narrow entrance.", "Входната зона е и основен път към останалите помещения.", "The entrance is also the main route to the remaining rooms.", "Ограничаваме дълбочината на мебелите и осветяваме вертикалните повърхности.", "Limit cabinet depth and illuminate vertical surfaces."],
    },
  },
  {
    id: "apartment-04",
    name: t("Нов живот за старото жилище", "A new chapter for an older home"),
    typology: t("Апартамент в тухлена сграда", "Older brick apartment"),
    area: t("81 м² · проектен ориентир", "81 m² · design brief"),
    intro: t("Запазен характер с нова функционалност: дъбова рибена кост, топли глинени тонове и обновени инсталации като част от цялостното задание.", "Retained character with renewed functionality: oak herringbone, warm clay tones and upgraded services within a complete renovation brief."),
    story: t("Старото тухлено жилище не трябва да загуби характера си, за да стане удобно. Решението използва дълбоките прозоречни отвори и паркета като отправна точка. Широкият отвор между дневната и кухнята пази връзката между помещенията, без да заличава отделните им роли. Преди финишите стои техническата задача: проверка на съществуващите основи и трасета, нивелация и достъп до скритите връзки. Запазването на даден елемент е решение след оглед, не предварително обещание.", "An older brick home need not lose its character to become practical. Deep window reveals and parquet set the direction. A wide opening connects living and kitchen while keeping their roles distinct. Technical investigation comes before finishes: existing substrates and services, leveling and access to concealed connections. Retaining any element is a decision after inspection, never a promise made in advance."),
    materials: [t("Дъбова рибена кост", "Oak herringbone"), t("Топли глинени тонове", "Warm clay tones"), t("Орехови акценти", "Walnut accents"), t("Керамика слонова кост", "Ivory ceramics")],
    rooms: {
      living: ["Кожен диван и дъбов паркет подчертават характера на старото жилище.", "A leather sofa and oak parquet emphasize the older home's character.", "Новите мебели трябва да работят с прозорците и съществуващите отвори.", "New furniture needs to work with existing windows and openings.", "Пазим видими архитектурните линии и не закриваме дълбоките прозоречни ниши.", "Keep architectural lines visible and preserve deep window reveals."],
      kitchen: ["Глинени фронтове и светъл плот дават съвременна функция на отделената кухня.", "Clay-toned fronts and a pale worktop bring contemporary function to the kitchen.", "Старите трасета не винаги съвпадат с желаното място за уредите.", "Existing services do not always match the desired appliance positions.", "Проверяваме трасетата и аспирацията преди фиксиране на мебелния проект.", "Survey service routes and extraction before fixing the cabinetry design."],
      bedroom: ["Топъл текстил и орехови детайли продължават характера на общите помещения.", "Warm linens and walnut details continue the character of the shared rooms.", "Старите стени и подове могат да имат отклонения, важни за мебелите.", "Existing walls and floors may be uneven where cabinetry needs precision.", "Планираме изравняването и монтажните фуги преди изработката на гардероба.", "Plan leveling and installation joints before manufacturing the wardrobe."],
      bathroom: ["Светла керамика с глинен акцент, подредена около компактна душ зона.", "Light ceramics with a clay accent arranged around a compact shower.", "Обновяването на мокрото помещение започва под облицовката.", "Renewing a wet room starts underneath the finish.", "Залагаме проверка на щранговете, нова хидроизолация и ревизионни отвори в заданието.", "Include service-riser checks, new waterproofing and inspection access in the brief."],
      hall: ["Рибената кост и светлите врати свързват входа с характера на апартамента.", "Herringbone flooring and pale doors connect the entrance to the apartment's character.", "Различните стари нива създават трудни преходи при вратите.", "Different existing floor levels create awkward transitions at doors.", "Съгласуваме крайните височини на настилките и касите още преди финишните работи.", "Coordinate finished floor and door-frame levels before finishing work begins."],
    },
  },
  {
    id: "apartment-05",
    name: t("Дом с място за работа", "A home with room to work"),
    typology: t("Тристаен апартамент с кабинет", "Apartment with a separate study"),
    area: t("87 м² · проектен ориентир", "87 m² · design brief"),
    intro: t("Жилище, в което работният ден има свое място, а вечер домът остава дом. Светъл дъб, графитени акценти и внимателно разположено осветление.", "A home where the working day has its own place without taking over the evening. Pale oak, graphite accents and carefully positioned lighting."),
    story: t("Работното място не е просто свободен ъгъл за бюро. Тук то получава естествена светлина, правилни контакти и място за прибиране на техниката. Дневната и кухнята остават за почивка и срещи, а спалнята е отделена от задачите на деня. Графитените детайли събират палитрата, без да правят дома студен. Основният строителен акцент е предварителната координация на осветлението, захранването и мебелите.", "A workspace is more than a spare corner for a desk. Here it has daylight, suitable outlets and storage for equipment. Living and kitchen remain places to unwind and gather, while the bedroom stays separate from daily tasks. Graphite details connect the palette without making the home feel cold. The construction emphasis is coordinating lighting, power and fitted furniture from the start."),
    materials: [t("Светъл дъб", "Pale oak"), t("Графитени акценти", "Graphite accents"), t("Неутрален текстил", "Neutral textiles"), t("Светъл каменен ефект", "Light stone effect")],
    extraRoom: {
      id: "office", label: t("Кабинет и стая за гости", "Study and guest room"),
      story: ["Отделна стая за съсредоточена работа, която може да приеме и гост.", "A separate room for focused work that can also accommodate a guest.", "Бюрото, техниката и резервното място за спане трябва да работят в малка площ.", "Desk, equipment and guest sleeping space need to coexist in a small room.", "Разполагаме бюрото до прозореца, планираме контактите и оставяме свободна зона пред компактния разтегателен диван.", "Place the desk by daylight, plan outlets and preserve clearance around a compact sofa bed."],
    },
    rooms: {
      living: ["Дневна с отделено бюро до естествената светлина и удобна зона за почивка.", "A living space with a desk near daylight and a comfortable seating zone.", "Мониторът, кабелите и служебните вещи не трябва да превземат стаята.", "A monitor, cables and work items should not take over the room.", "Отделяме работния кът с мебелно решение и предвиждаме прибиране на техниката.", "Define the workspace with fitted furniture and allow equipment to be put away."],
      kitchen: ["Графитени и дъбови фронтове, светъл плот и компактна трапезария.", "Graphite and oak fronts, a pale worktop and compact dining space.", "Общата зона трябва да остава спокойна и когато кухнята се използва.", "The shared space should remain calm while the kitchen is in use.", "Събираме съхранението и уредите в последователен фронт с практично работно осветление.", "Organize storage and appliances into a coherent frontage with practical task lighting."],
      bedroom: ["Спалня без работен кът, с плътни завеси и събрано съхранение.", "A bedroom without a workspace, with blackout curtains and integrated storage.", "Границата между работа и почивка лесно изчезва в домашния офис.", "The boundary between work and rest can disappear when working from home.", "Оставяме служебната техника извън спалнята и планираме отделни светлинни режими.", "Keep work equipment out of the bedroom and plan separate lighting modes."],
      bathroom: ["Светли каменни повърхности, дъбова мебел и сдържани тъмни детайли.", "Light stone-effect surfaces, oak vanity and restrained dark details.", "Контрастните елементи трябва да са практични, не само ефектни на снимка.", "Contrasting fittings should be practical rather than merely photogenic.", "Планираме достъпни за поддръжка смесители, чисти фуги и достатъчно светлина при огледалото.", "Plan serviceable fittings, neat joints and adequate mirror lighting."],
      hall: ["Затворен гардероб и малка зона за ежедневните вещи освобождават останалия дом.", "A closed wardrobe and a place for daily essentials free up the rest of the home.", "Работни чанти и доставки създават безпорядък още при входа.", "Work bags and deliveries create clutter immediately at the entrance.", "Предвиждаме определено място за тях, плитки шкафове и свободен маршрут към дневната.", "Provide a dedicated landing zone, shallow cabinetry and clear access to the living room."],
    },
  },
];

export const portfolioProjects = briefs.map((brief, index) => ({
  ...renovationProject01,
  id: brief.id,
  number: String(index + 1).padStart(2, "0"),
  title: brief.name,
  status: t("Интериорни решения", "Interior design"),
  shortTitle: brief.name,
  typology: brief.typology,
  area: brief.area,
  location: t("Градско жилище", "Urban apartment"),
  intro: brief.intro,
  story: brief.story,
  materials: brief.materials,
  rooms: [...renovationProject01.rooms.map((room) => {
    const copy = room.id === "overview" ? undefined : brief.rooms[room.id];
    return {
      ...room,
      image: `/images/portfolio/${brief.id}/${room.id}.webp`,
      alt: t(`${room.label.bg} — ${brief.name.bg}`, `${room.label.en} — ${brief.name.en}`),
      ...(copy ? {
        intro: t(copy[0], copy[1]),
        challenge: t(copy[2], copy[3]),
        approach: t(copy[4], copy[5]),
        // Keep the technical story specific to this brief instead of inheriting
        // material claims from the original apartment.
        details: brief.materials.slice(0, 3),
      } : { intro: brief.intro }),
    };
  }), ...(brief.extraRoom ? [{
    ...renovationProject01.rooms.find(room => room.id === "bedroom")!,
    id: brief.extraRoom.id,
    number: "07",
    label: brief.extraRoom.label,
    heading: brief.extraRoom.label,
    intro: t(brief.extraRoom.story[0], brief.extraRoom.story[1]),
    challenge: t(brief.extraRoom.story[2], brief.extraRoom.story[3]),
    approach: t(brief.extraRoom.story[4], brief.extraRoom.story[5]),
    details: brief.materials.slice(0, 3),
    image: `/images/portfolio/${brief.id}/${brief.extraRoom.id}.webp`,
    alt: t(`${brief.extraRoom.label.bg} — ${brief.name.bg}`, `${brief.extraRoom.label.en} — ${brief.name.en}`),
  }] : [])],
}));

export const getPortfolioProject = (id: string | undefined) => portfolioProjects.find(project => project.id === id);
