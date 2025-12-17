// Import images
import fullRenovationImg from "@/assets/images/services/full-renovation.jpg";
import bathroomImg from "@/assets/images/services/bathroom.jpg";
import kitchenImg from "@/assets/images/services/minimalistchna_byala_kuhniya.png";
import bedroomImg from "@/assets/images/projects/bedroom.jpg";
import livingRoomImg from "@/assets/images/projects/living-room.jpg";
import flooringImg from "@/assets/images/services/flooring.jpg";
import paintingImg from "@/assets/images/services/painting.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  location: string;
  duration: string;
  area: string;
  description: string;
  challenge: string;
  solution: string;
  mainImage: string;
  gallery: string[];
  features: string[];
}

export const categories = [
  { id: "all", name: "Всички" },
  { id: "full", name: "Цялостен ремонт" },
  { id: "bathroom", name: "Баня" },
  { id: "kitchen", name: "Кухня" },
  { id: "bedroom", name: "Спалня" },
  { id: "living", name: "Дневна" },
];

export const projects: Project[] = [
  {
    id: "modern-apartment-sofia",
    title: "Модерен апартамент в София",
    category: "Цялостен ремонт",
    categoryId: "full",
    location: "София, кв. Лозенец",
    duration: "3 месеца",
    area: "120 кв.м.",
    description: "Цялостен ремонт на тристаен апартамент с модерен минималистичен дизайн. Проектът включва пълна подмяна на инсталации, нова баня и кухня, както и преустройство на дневната зона.",
    challenge: "Старият апартамент имаше остаряла планировка с малки затворени стаи. Клиентът искаше отворено пространство със съвременен вид.",
    solution: "Премахнахме ненужни преградни стени, създадохме open-space дневна с кухня и добавихме модерно LED осветление. Използвахме неутрална цветова палитра с дървени акценти.",
    mainImage: fullRenovationImg,
    gallery: [fullRenovationImg, livingRoomImg, kitchenImg, bathroomImg],
    features: ["Open-space дневна", "Нова баня", "Модерна кухня", "LED осветление", "Подово отопление"],
  },
  {
    id: "luxury-marble-bathroom",
    title: "Луксозна баня с мрамор",
    category: "Баня",
    categoryId: "bathroom",
    location: "София, кв. Витоша",
    duration: "3 седмици",
    area: "12 кв.м.",
    description: "Луксозна баня с мраморни плочки, дъждовна душ система и free-standing вана. Проектът включва подово отопление и LED осветление.",
    challenge: "Малко пространство, което трябваше да се превърне в спа-подобно преживяване без да изглежда претрупано.",
    solution: "Използвахме огледала за оптична илюзия за повече пространство, вградени ниши за съхранение и минималистичен дизайн с акцент върху качествените материали.",
    mainImage: bathroomImg,
    gallery: [bathroomImg, fullRenovationImg, kitchenImg],
    features: ["Мраморни плочки", "Дъждовен душ", "Free-standing вана", "Подово отопление", "LED огледало"],
  },
  {
    id: "minimalist-white-kitchen",
    title: "Минималистична бяла кухня",
    category: "Кухня",
    categoryId: "kitchen",
    location: "София, кв. Младост",
    duration: "2 седмици",
    area: "18 кв.м.",
    description: "Модерна бяла кухня с интегрирани уреди, каменен плот и LED осветление под шкафовете. Функционален дизайн с максимално използване на пространството.",
    challenge: "Клиентът искаше максимално чист и минималистичен вид, но с много място за съхранение.",
    solution: "Проектирахме кухня до тавана с push-to-open механизми без видими дръжки. Интегрирахме всички уреди и добавихме скрито LED осветление.",
    mainImage: kitchenImg,
    gallery: [kitchenImg, livingRoomImg, fullRenovationImg],
    features: ["Бели фасади без дръжки", "Каменен плот", "Интегрирани уреди", "LED осветление", "Push-to-open"],
  },
  {
    id: "cozy-bedroom",
    title: "Уютна спалня",
    category: "Спалня",
    categoryId: "bedroom",
    location: "София, кв. Борово",
    duration: "10 дни",
    area: "16 кв.м.",
    description: "Уютна спалня с топли тонове, вградено осветление и custom-made гардероб. Акцент върху комфорта и релаксацията.",
    challenge: "Създаване на релаксираща атмосфера в типична панелна спалня с ниски тавани.",
    solution: "Използвахме светли цветове за оптично увеличаване на пространството, добавихме LED ленти за индиректно осветление и тапицирана стена зад леглото.",
    mainImage: bedroomImg,
    gallery: [bedroomImg, flooringImg, paintingImg],
    features: ["Тапицирана стена", "Вграден гардероб", "LED осветление", "Топли тонове", "Паркет"],
  },
  {
    id: "spacious-living-room",
    title: "Просторна дневна",
    category: "Дневна",
    categoryId: "living",
    location: "София, кв. Изток",
    duration: "2 седмици",
    area: "35 кв.м.",
    description: "Просторна дневна с отворен план, минималистичен дизайн и акцент върху естествената светлина. Включва зона за телевизор с вградени шкафове.",
    challenge: "Голямо пространство, което трябваше да се зонира без физически прегради.",
    solution: "Използвахме различни подови настилки и осветление за зониране. Добавихме вградена TV стена с биокамина и скрито осветление.",
    mainImage: livingRoomImg,
    gallery: [livingRoomImg, fullRenovationImg, kitchenImg],
    features: ["Open-space", "Вградена TV стена", "Биокамина", "Зониране с осветление", "Панорамни прозорци"],
  },
  {
    id: "geometric-bathroom",
    title: "Баня с геометрични плочки",
    category: "Баня",
    categoryId: "bathroom",
    location: "Пловдив",
    duration: "2 седмици",
    area: "8 кв.м.",
    description: "Компактна баня с интересен дизайн на геометрични плочки. Функционално решение за малко пространство с walk-in душ.",
    challenge: "Много малко пространство, което трябваше да включва душ, тоалетна и мивка.",
    solution: "Проектирахме walk-in душ без кабина, използвахме висящи санитарни уреди и добавихме геометрични плочки като акцент.",
    mainImage: bathroomImg,
    gallery: [bathroomImg, fullRenovationImg, kitchenImg],
    features: ["Геометрични плочки", "Walk-in душ", "Висяща тоалетна", "Компактен дизайн", "LED огледало"],
  },
  {
    id: "industrial-kitchen",
    title: "Индустриална кухня",
    category: "Кухня",
    categoryId: "kitchen",
    location: "София, кв. Център",
    duration: "3 седмици",
    area: "22 кв.м.",
    description: "Кухня в индустриален стил с открити тухли, метални акценти и дървени елементи. Комбинация от суровост и уют.",
    challenge: "Клиентът искаше автентичен индустриален вид в нова сграда.",
    solution: "Използвахме декоративни тухли, открити метални тръби за осветление и рустик дървен плот. Комбинирахме с модерни уреди за функционалност.",
    mainImage: kitchenImg,
    gallery: [kitchenImg, livingRoomImg, fullRenovationImg],
    features: ["Декоративни тухли", "Метални акценти", "Дървен плот", "Индустриално осветление", "Открити елементи"],
  },
  {
    id: "center-apartment",
    title: "Апартамент в центъра",
    category: "Цялостен ремонт",
    categoryId: "full",
    location: "София, бул. Витоша",
    duration: "4 месеца",
    area: "95 кв.м.",
    description: "Цялостен ремонт на апартамент в стара сграда с запазване на автентични елементи като високи тавани и розетки.",
    challenge: "Комбиниране на модерен комфорт със запазване на историческия характер на сградата.",
    solution: "Реставрирахме оригиналните розетки и первази, добавихме модерни инсталации скрито и използвахме класически цветове с модерни мебели.",
    mainImage: fullRenovationImg,
    gallery: [fullRenovationImg, livingRoomImg, bedroomImg],
    features: ["Реставрирани елементи", "Високи тавани", "Модерни инсталации", "Класически стил", "Паркет"],
  },
  {
    id: "modern-bedroom",
    title: "Модерна спалня",
    category: "Спалня",
    categoryId: "bedroom",
    location: "Варна",
    duration: "12 дни",
    area: "20 кв.м.",
    description: "Модерна спалня с функционално осветление, walk-in гардероб и минималистичен дизайн в неутрални тонове.",
    challenge: "Създаване на пълноценен walk-in гардероб в спалня със стандартни размери.",
    solution: "Проектирахме компактен, но функционален walk-in гардероб с плъзгащи се врати и оптимизирахме останалото пространство.",
    mainImage: bedroomImg,
    gallery: [bedroomImg, flooringImg, paintingImg],
    features: ["Walk-in гардероб", "Плъзгащи врати", "LED осветление", "Минималистичен дизайн", "Неутрални тонове"],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
