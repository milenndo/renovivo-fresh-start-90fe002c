/**
 * Renovivo — вътрешен модул за ориентировъчна калкулация.
 *
 * Единичните ставки по-долу са нетни изходни стойности на компанията.
 * Не са публична ценова листа и не се показват поединично в интерфейса —
 * навън излиза само крайният диапазон.
 */

export type PresetId = "full" | "refresh" | "bath" | "kitchen";
export type TierIndex = 0 | 1 | 2;

export interface EstimateInput {
  area: number;        // РЗП в м²
  rooms?: number;      // брой стаи (без баня и коридор)
  baths?: number;      // брой бани / тоалетни
  height?: number;     // височина на помещенията в метри
  doors?: number;
  windows?: number;
  floor?: number;      // етаж
  lift?: boolean;      // има ли асансьор
  occupied?: boolean;  // обитаван ли е имотът по време на ремонта
}

export interface EstimateResult {
  low: number;         // долна граница на диапазона, EUR с ДДС
  high: number;        // горна граница на диапазона, EUR с ДДС
  mid: number;         // централна стойност
  perSqm: number;      // EUR/м² по централната стойност
  days: number;        // ориентировъчен срок в работни дни
  operations: number;  // брой включени операции
}

interface Op {
  c: string;
  q: string;
  l: number;
  m: number;
  p: string[];
}

const OPS: Op[] = [
  { c: "prep", q: "A", l: 4.2423, m: 2.0363, p: ["full", "refresh", "kitchen"] },
  { c: "demo", q: "A", l: 9.3331, m: 0.0, p: ["full", "kitchen"] },
  { c: "demo", q: "TW", l: 11.8785, m: 0.0, p: ["full", "bath", "kitchen"] },
  { c: "demo", q: "PLUMB", l: 20.3632, m: 0.0, p: ["full", "bath", "kitchen"] },
  { c: "demo", q: "ELEC", l: 11.8785, m: 0.0, p: ["full", "kitchen"] },
  { c: "demo", q: "DOORS", l: 30.5448, m: 0.0, p: ["full", "kitchen"] },
  { c: "demo", q: "BATH", l: 93.3314, m: 0.0, p: ["full", "bath", "kitchen"] },
  { c: "demo", q: "A", l: 10.1816, m: 4.2423, p: ["full", "kitchen"] },
  { c: "plumb", q: "PLUMB", l: 27.151, m: 0.0, p: ["full", "bath", "kitchen"] },
  { c: "plumb", q: "PLUMB", l: 78.059, m: 54.3019, p: ["full", "kitchen"] },
  { c: "plumb", q: "PLUMB", l: 64.4835, m: 33.9387, p: ["full", "kitchen"] },
  { c: "plumb", q: "BATH", l: 37.3326, m: 30.5448, p: ["full", "kitchen"] },
  { c: "plumb", q: "PLUMB", l: 23.7571, m: 10.1816, p: ["full", "bath", "kitchen"] },
  { c: "plumb", q: "ONE", l: 118.7854, m: 0.0, p: ["full", "kitchen"] },
  { c: "elec", q: "ELEC3", l: 11.7088, m: 0.0, p: ["full", "kitchen"] },
  { c: "elec", q: "ELEC", l: 27.151, m: 18.6663, p: ["full", "kitchen"] },
  { c: "elec", q: "ELEC", l: 8.4847, m: 3.7333, p: ["full", "kitchen"] },
  { c: "elec", q: "ELEC3", l: 9.3331, m: 4.0726, p: ["full", "kitchen"] },
  { c: "elec", q: "ONE", l: 305.4482, m: 373.3256, p: ["full", "kitchen"] },
  { c: "elec", q: "ELEC", l: 11.1998, m: 11.8785, p: ["full", "kitchen"] },
  { c: "elec", q: "LIGHT", l: 37.3326, m: 110.3007, p: ["full", "kitchen"] },
  { c: "hydro", q: "WP", l: 23.7571, m: 15.2724, p: ["full", "bath", "kitchen"] },
  { c: "hydro", q: "WPB", l: 10.1816, m: 6.7877, p: ["full", "bath", "kitchen"] },
  { c: "hydro", q: "ONE", l: 101.8161, m: 0.0, p: ["full", "bath", "kitchen"] },
  { c: "plaster", q: "WALL", l: 20.3632, m: 8.4847, p: ["full", "refresh"] },
  { c: "plaster", q: "WALL", l: 12.727, m: 5.0908, p: ["full", "refresh"] },
  { c: "plaster", q: "CEIL", l: 14.4239, m: 5.0908, p: ["full", "refresh"] },
  { c: "plaster", q: "WC", l: 2.3757, m: 2.0363, p: ["full", "refresh"] },
  { c: "screed", q: "A", l: 22.0601, m: 11.8785, p: ["full"] },
  { c: "screed", q: "TF", l: 27.151, m: 13.5755, p: ["full", "bath"] },
  { c: "tile", q: "TW", l: 33.9387, m: 44.1203, p: ["full", "bath", "kitchen"] },
  { c: "tile", q: "TF", l: 30.5448, m: 47.5142, p: ["full", "bath", "kitchen"] },
  { c: "tile", q: "PERIM2", l: 6.7877, m: 3.3939, p: ["full", "kitchen"] },
  { c: "floor", q: "FIN", l: 18.6663, m: 40.7264, p: ["full"] },
  { c: "floor", q: "PERIM", l: 7.6362, m: 8.4847, p: ["full"] },
  { c: "paint", q: "WC", l: 7.6362, m: 4.2423, p: ["full", "refresh"] },
  { c: "carp", q: "DOORS", l: 93.3314, m: 458.1723, p: ["full"] },
  { c: "sanit", q: "BATH", l: 144.2394, m: 492.111, p: ["full", "bath", "kitchen"] },
  { c: "sanit", q: "BATH", l: 110.3007, m: 390.2949, p: ["full", "bath", "kitchen"] },
  { c: "sanit", q: "BATH", l: 203.6321, m: 729.6818, p: ["full", "bath", "kitchen"] },
  { c: "sanit", q: "BATH", l: 76.362, m: 101.8161, p: ["full", "bath", "kitchen"] },
  { c: "final", q: "A", l: 10.1816, m: 3.3939, p: ["full", "refresh", "kitchen"] },
  { c: "final", q: "A", l: 6.7877, m: 1.3575, p: ["full", "refresh", "kitchen"] },
  { c: "final", q: "ONE", l: 203.6321, m: 0.0, p: ["full", "refresh", "kitchen"] },
  { c: "final", q: "ONE", l: 152.7241, m: 0.0, p: ["full", "refresh", "kitchen"] },
];

/** Коефициенти по ниво на изпълнение: [труд, материал] */
const TIER_FACTOR: [number, number][] = [
  [0.88, 0.72], // Стандарт
  [1.0, 1.0],   // Премиум
  [1.22, 1.85], // Сигнатура
];

const DAY_FACTOR = [1, 1.18, 1.45];

/** Разсейване на диапазона спрямо централната стойност. */
const SPREAD_LOW = 0.92;
const SPREAD_HIGH = 1.14;

function quantities(i: Required<EstimateInput>): Record<string, number> {
  const { area: A, height: h, rooms, baths: bath, doors, windows: win, floor } = i;
  const perim = 4.3 * Math.sqrt(Math.max(A, 1));
  return {
    A,
    WALL: A * h,
    CEIL: A,
    PERIM: perim,
    PERIM2: perim * 1.6,
    PART: A * 0.25,
    GKC: A * 0.6,
    FIN: A * 0.78,
    ELEC: 6 * rooms + 12,
    ELEC3: (6 * rooms + 12) * 2.4,
    LIGHT: rooms * 2 + bath + 2,
    PLUMB: 6 * bath + 4,
    PLUMB8: (6 * bath + 4) * 3,
    STR: h * bath,
    TW: bath * 26,
    TF: bath * 6,
    WP: bath * 9,
    WPB: bath * 14,
    TER: 0,
    WIN: win,
    DOORS: doors,
    ROOMS: rooms,
    BATH: bath,
    WC: A * h + A,
    UFH: A * 0.62,
    MC: bath * 20,
    BETON: A * 0.03,
    WARD: rooms * 4,
    KIT: 4.5,
    ONE: 1,
    floor,
  };
}

/** Утежнения по условия на обекта — влияят само на труда. */
function siteCoefficient(i: Required<EstimateInput>): number {
  let k = 1;
  if (!i.lift && i.floor > 3) k += Math.min(0.18, (i.floor - 3) * 0.03);
  if (i.occupied) k += 0.22;
  if (i.area < 45) k += 0.1;
  else if (i.area > 200) k -= 0.07;
  if (i.height > 3) k += 0.08;
  return k;
}

function withDefaults(input: EstimateInput): Required<EstimateInput> {
  const area = Math.max(10, input.area || 75);
  return {
    area,
    rooms: input.rooms ?? Math.max(1, Math.round(area / 25)),
    baths: input.baths ?? (area > 110 ? 2 : 1),
    height: input.height ?? 2.6,
    doors: input.doors ?? Math.max(2, Math.round(area / 20)),
    windows: input.windows ?? Math.max(4, Math.round(area / 6)),
    floor: input.floor ?? 3,
    lift: input.lift ?? true,
    occupied: input.occupied ?? false,
  };
}

export function estimate(
  input: EstimateInput,
  preset: PresetId,
  tier: TierIndex
): EstimateResult {
  const i = withDefaults(input);
  const Q = quantities(i);
  const k = siteCoefficient(i);
  const [tl, tm] = TIER_FACTOR[tier];

  let total = 0;
  let count = 0;

  for (const op of OPS) {
    if (!op.p.includes(preset)) continue;
    const qty = Q[op.q] ?? 0;
    if (!qty) continue;
    total += qty * op.l * tl * k + qty * op.m * tm;
    count++;
  }

  const days = Math.round(
    (14 + i.area * 0.3 + i.baths * 6) * DAY_FACTOR[tier] * (0.55 + count / 70)
  );

  const round50 = (n: number) => Math.round(n / 50) * 50;

  return {
    low: round50(total * SPREAD_LOW),
    high: round50(total * SPREAD_HIGH),
    mid: round50(total),
    perSqm: Math.round(total / i.area),
    days,
    operations: count,
  };
}

