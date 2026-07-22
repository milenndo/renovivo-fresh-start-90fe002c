import type { Language } from '@/contexts/LanguageContext';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    reading_time: number;
    meta_title: string;
    meta_description: string;
    created_at: string;
}

// Apartment Renovation Sofia 2024 - Bulgarian
export const apartmentRenovationPostBG: BlogPost = {
    id: 'apartment-renovation-sofia-2024',
    title: 'Ремонт на апартамент в София 2024 – Цени, етапи и какво да очаквате',
    slug: 'remont-na-apartament-sofia-2024',
    excerpt: 'Пълен наръчник за ремонт на апартамент в София през 2024 г. Научете за актуалните цени, етапи на работа и как да избегнете често допусканите грешки.',
    content: `### Ремонт на апартамент в София 2024

Ремонтът на апартамент в София през 2024 г. изисква внимателно планиране и реалистични очаквания. Цените варират значително в зависимост от обхвата на работата, качеството на материалите и избора на изпълнител.

## Актуални цени за ремонт в София

**Основен ремонт:**
- Шпакловка и боядисване: 15-25 лв/кв.м
- Подмяна на настилки: 30-50 лв/кв.м
- Електрически инсталации: 20-35 лв/кв.м

**Цялостен ремонт:**
- Среден клас: 400-600 лв/кв.м
- Висок клас: 700-1000+ лв/кв.м

## Етапи на ремонта

1. **Подготовка и планиране** - Оглед, проект, бюджет
2. **Демонтаж** - Премахване на стари елементи
3. **Груби инсталации** - ВиК, електро, отопление
4. **Изравнявания** - Замазки, шпакловки
5. **Довършителни работи** - Настилки, боядисване
6. **Монтажи** - Врати, кухня, санитария

## Какво да очаквате

Типичният ремонт на двустаен апартамент (60-70 кв.м) отнема 2-3 месеца при добра организация. Важно е да заложите резерв от 10-15% за непредвидени разходи.

### Съвети от Renovivo

- Започнете с ясен проект и бюджет
- Изберете проверени изпълнители
- Не правете компромиси с хидроизолацията
- Планирайте реалистични срокове

Професионалният ремонт не е най-евтиният, но е най-сигурният път към качествен резултат.`,
    category: 'съвети',
    tags: ['ремонт апартамент', 'цени ремонт София', 'етапи ремонт', 'ремонт 2024'],
    author: 'Renovivo',
    reading_time: 5,
    meta_title: 'Ремонт на апартамент в София 2024 – Цени и етапи | Renovivo',
    meta_description: 'Актуални цени и етапи за ремонт на апартамент в София през 2024 г. Професионални съвети от Renovivo.',
    created_at: '2024-12-01T10:00:00.000Z',
};

// Apartment Renovation Sofia 2024 - English
export const apartmentRenovationPostEN: BlogPost = {
    id: 'apartment-renovation-sofia-2024',
    title: 'Apartment Renovation in Sofia 2024 – Prices, Stages and What to Expect',
    slug: 'remont-na-apartament-sofia-2024',
    excerpt: 'Complete guide to apartment renovation in Sofia in 2024. Learn about current prices, work stages and how to avoid common mistakes.',
    content: `### Apartment Renovation in Sofia 2024

Apartment renovation in Sofia in 2024 requires careful planning and realistic expectations. Prices vary significantly depending on the scope of work, quality of materials and choice of contractor.

## Current Renovation Prices in Sofia

**Basic Renovation:**
- Plastering and painting: €8-13/sqm
- Flooring replacement: €15-25/sqm
- Electrical installations: €10-18/sqm

**Complete Renovation:**
- Mid-range: €200-300/sqm
- High-end: €350-500+/sqm

## Renovation Stages

1. **Preparation and Planning** - Inspection, design, budget
2. **Demolition** - Removal of old elements
3. **Rough Installations** - Plumbing, electrical, heating
4. **Leveling** - Screeds, plastering
5. **Finishing Work** - Flooring, painting
6. **Installations** - Doors, kitchen, sanitary ware

## What to Expect

A typical renovation of a two-bedroom apartment (60-70 sqm) takes 2-3 months with good organization. It's important to budget a 10-15% reserve for unforeseen expenses.

### Tips from Renovivo

- Start with a clear design and budget
- Choose verified contractors
- Don't compromise on waterproofing
- Plan realistic timelines

Professional renovation isn't the cheapest, but it's the safest path to quality results.`,
    category: 'tips',
    tags: ['apartment renovation', 'renovation prices Sofia', 'renovation stages', 'renovation 2024'],
    author: 'Renovivo',
    reading_time: 5,
    meta_title: 'Apartment Renovation in Sofia 2024 – Prices and Stages | Renovivo',
    meta_description: 'Current prices and stages for apartment renovation in Sofia in 2024. Professional advice from Renovivo.',
    created_at: '2024-12-01T10:00:00.000Z',
};

export const getApartmentRenovationPost = (language: Language): BlogPost => {
    return language === 'bg' ? apartmentRenovationPostBG : apartmentRenovationPostEN;
};
