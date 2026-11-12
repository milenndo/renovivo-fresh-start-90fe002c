import prices from '@/content/blog-2026/remont-ceni.md?raw';
import bathroom from '@/content/blog-2026/banya.md?raw';
import olderBuildings from '@/content/blog-2026/staro-stroitelstvo.md?raw';
import preparation from '@/content/blog-2026/podgotovka.md?raw';
import plaster from '@/content/blog-2026/shpaklovka.md?raw';

const articles = [
  {
    slug: 'osnoven-remont-apartament-sofia-ceni-2026',
    title: 'Колко струва основен ремонт на апартамент в София през 2026 г.? Актуални цени за труд и материали',
    meta_title: 'Основен ремонт в София: цени за 2026 г. | Renovivo',
    excerpt: 'Пазарни ориентири за труд и материали, примерна сметка за 70 м² и разходите, които да проверите преди основен ремонт на апартамент в София.',
    category: 'съвети', tags: ['ремонт на апартамент', 'цени 2026', 'София', 'бюджет'],
    image_url: '/images/blog/2026/remont-ceni.webp',
    image_alt: 'Подготвен за довършване апартамент с материали и работна маса', content: prices,
  },
  {
    slug: 'remont-banya-stapki-vik-hidroizolatsiya',
    title: 'Ремонт на баня стъпка по стъпка: от ВиК инсталацията до качественото хидроизолиране',
    meta_title: 'Ремонт на баня: ВиК и хидроизолация | Renovivo',
    excerpt: 'Правилната последователност при ремонт на баня: разпределение, ВиК, основи, наклони и хидроизолация. Какво да проверите преди плочките.',
    category: 'бани', tags: ['ремонт на баня', 'хидроизолация', 'ВиК', 'София'],
    image_url: '/images/blog/2026/banya.webp',
    image_alt: 'Баня с подготвена хидроизолация преди полагане на плочки', content: bathroom,
  },
  {
    slug: 'remont-staro-stroitelstvo-panel-epk-sofia',
    title: 'Скритите рискове и разходи при ремонт на старо строителство в София: панел срещу ЕПК',
    meta_title: 'Ремонт на панел и ЕПК: рискове и разходи | Renovivo',
    excerpt: 'Какво да проверите в стар апартамент: конструкция, инсталации, влага и основи. Практични насоки за бюджет при ремонт на панел и ЕПК в София.',
    category: 'съвети', tags: ['старо строителство', 'панел', 'ЕПК', 'София'],
    image_url: '/images/blog/2026/staro-stroitelstvo.webp',
    image_alt: 'Стар апартамент преди ремонт с износен паркет и стари покрития', content: olderBuildings,
  },
  {
    slug: 'podgotovka-zhilishte-remont-cheklist',
    title: 'Как да подготвим жилището си за ремонт: практичен чеклист за собственици',
    meta_title: 'Подготовка на жилище за ремонт: чеклист | Renovivo',
    excerpt: 'Чеклист преди ремонта: задание, бюджет, защита на мебели, доставки, достъп и отпадъци. Подгответе апартамента си в София без пропуски.',
    category: 'съвети', tags: ['подготовка за ремонт', 'чеклист', 'ремонт до ключ', 'София'],
    image_url: '/images/blog/2026/podgotovka.webp',
    image_alt: 'Жилище с опаковани мебели и защитен под преди ремонт', content: preparation,
  },
  {
    slug: 'shpaklovka-izravnyavane-steni-kachestvo',
    title: 'Защо качествената шпакловка и изравняване на стени определят крайния вид на интериора',
    meta_title: 'Шпакловка и изравняване на стени: качество | Renovivo',
    excerpt: 'Разликата между гладка и равна стена, нивата Q1–Q4 и влиянието на LED осветлението. Как да сравните оферти за шпакловка в София.',
    category: 'съвети', tags: ['шпакловка', 'изравняване на стени', 'Q4', 'довършителни работи'],
    image_url: '/images/blog/2026/shpaklovka.webp',
    image_alt: 'Фино шпаклована стена и прозоречен откос при странична дневна светлина', content: plaster,
  },
];

export const renovationPosts2026 = articles.map((post, index) => ({
  ...post,
  id: `renovivo-editorial-2026-${index + 1}`,
  author: 'Екипът на Renovivo',
  meta_description: post.excerpt,
  reading_time: Math.max(3, Math.ceil(post.content.split(/\s+/).length / 180)),
  created_at: `2026-11-12T08:0${4 - index}:00+02:00`,
  updated_at: '2026-11-12T09:00:00+02:00',
  is_published: true,
  image_caption: 'Илюстративно изображение, генерирано с AI. Не представя конкретен изпълнен обект.',
}));

export const findRenovationPost = (slug?: string) => renovationPosts2026.find(post => post.slug === slug);
