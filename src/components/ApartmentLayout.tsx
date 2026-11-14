import { apartmentLayouts, layoutLabels } from '@/data/apartmentLayouts';
import { localText } from '@/data/portfolioProject01';

export default function ApartmentLayout({ index, language }: { index: number; language: string }) {
  const layout = apartmentLayouts[index];
  const en = language === 'en';
  const extraLabel = index === 1 ? { bg: 'Детска стая', en: 'Child’s room' } : { bg: 'Кабинет / гости', en: 'Study / guests' };
  const items = layoutLabels.map((label, i) => ({ label, area: layout.areas[i] })).filter(item => item.area > 0);
  if (layout.extra) items.push({ label: extraLabel, area: layout.extra });
  const usable = items.reduce((sum, item) => sum + item.area, 0);
  // Functional diagram: the hall gives independent access to all enclosed rooms.
  const livingWidth = [240, 260, 230, 275, 250][index];
  const hallX = livingWidth + 30;
  const privateX = hallX + 70;
  const rightWidth = 600 - privateX;
  const bedroomHeight = layout.extra ? 145 : 260;
  return (
    <section id="project-layout" className="border-t border-[#E6E4DB] py-14 md:py-20">
      <div className="container-custom grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="rv-kicker mb-4">{en ? 'LAYOUT & DIMENSIONS' : 'РАЗПРЕДЕЛЕНИЕ И РАЗМЕРИ'}</p>
          <h2 className="rv-heading-serif text-3xl md:text-5xl">{en ? 'Space that works.' : 'Площ, която работи.'}</h2>
          <p className="mt-5 text-sm leading-7 text-[#526054]">{localText(layout.note, language)}</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-5 text-sm">
            {items.map(item => <div key={item.label.en} className="flex justify-between gap-2 border-b border-[#DADDD3] py-3"><dt>{localText(item.label, language)}</dt><dd className="whitespace-nowrap font-semibold">{item.area} {en ? 'm²' : 'м²'}</dd></div>)}
          </dl>
          <p className="mt-4 text-xs leading-6 text-[#526054]">{en ? `Indicative gross area ${layout.total} m²; listed usable areas ${usable} m²${layout.areas[4] ? ' including balcony' : ''}. Remaining ${layout.total - usable} m² allow for walls and shafts.` : `Ориентировъчна обща площ ${layout.total} м²; изброени използваеми площи ${usable} м²${layout.areas[4] ? ' с балкона' : ''}. Останалите ${layout.total - usable} м² са предвидени за стени и шахти.`}</p>
          <h3 className="mt-6 text-sm font-semibold">{en ? 'Technical approach' : 'Технически подход'}</h3>
          <p className="mt-2 text-sm leading-7 text-[#526054]">{localText(layout.technical, language)}</p>
        </div>
        <figure className="min-w-0 rounded-lg border border-[#DADDD3] bg-[#F3F1EA] p-4 sm:p-6">
          <svg viewBox="0 0 630 450" role="img" aria-label={en ? `Apartment ${index + 1}: functional layout` : `Апартамент ${index + 1}: функционално разпределение`} className="h-auto w-full text-[#28352B]">
            <rect x="20" y="20" width="590" height="360" fill="#FAF9F6" stroke="#526054" strokeWidth="7" />
            <rect x="24" y="24" width={livingWidth} height="352" fill="#E2E8D9" />
            <rect x={privateX} y="24" width={rightWidth + 6} height={bedroomHeight - 4} fill="#E8DFD0" />
            {layout.extra > 0 && <rect x={privateX} y="165" width={rightWidth + 6} height="100" fill="#E3E5D5" />}
            <rect x={privateX} y="285" width={rightWidth + 6} height="91" fill="#DCE6E7" />
            <path d={`M${hallX} 20 V90 M${hallX} 160 V380 M${privateX} 20 V60 M${privateX} 115 ${layout.extra ? `V190 M${privateX} 240` : ""} V310 M${privateX} 355 V380 ${layout.extra ? `M${privateX} ${bedroomHeight + 20} H610` : ""} M${privateX} 280 H610`} fill="none" stroke="#526054" strokeWidth="5" />
            <path d={`M${hallX} 90 h-65 M${hallX} 155 A65 65 0 0 0 ${hallX - 65} 90 M${privateX} 60 h55 M${privateX} 115 A55 55 0 0 1 ${privateX + 55} 60 M${privateX} 310 h45`} fill="none" stroke="#87927F" strokeWidth="1.5" />
            <path d={`M${hallX + 15} 380 h40`} stroke="#F3F1EA" strokeWidth="9" />
            <path d={`M${hallX + 35} 425 v-25 m-6 7 6-7 6 7`} fill="none" stroke="#526054" strokeWidth="2" />
            <text x={hallX + 35} y="443" textAnchor="middle" fontSize="12">{en ? 'ENTRY' : 'ВХОД'}</text>
            <path d={`M55 20 H${livingWidth - 10} M${privateX + 30} 20 H580`} stroke="#9BBEC1" strokeWidth="7" />
            <rect x="42" y="43" width="36" height="110" rx="3" fill="#C4CFB6" stroke="#87927F" />
            <rect x="42" y="43" width="125" height="30" fill="#C4CFB6" stroke="#87927F" />
            <circle cx="145" cy="170" r="28" fill="#FAF9F6" stroke="#87927F" />
            <rect x="45" y="280" width="115" height="55" rx="8" fill="#B6C5A4" stroke="#87927F" />
            <rect x={privateX + 30} y="38" width="70" height="65" rx="3" fill="#FAF9F6" stroke="#AA9D89" />
            <path d={`M${privateX + 30} 54 h70`} stroke="#AA9D89" />
            <rect x="95" y="215" width="115" height="35" fill="#FAF9F6" rx="4" />
            {layout.extra > 0 && <>
              <path d="M610 180 V245" stroke="#9BBEC1" strokeWidth="7" />
              <rect x={privateX + 16} y="177" width="65" height="22" fill="#FAF9F6" stroke="#87927F" />
              <rect x="567" y="204" width="27" height="50" fill="#FAF9F6" stroke="#87927F" />
            </>}
            <rect x="556" y="298" width="40" height="40" fill="#FAF9F6" stroke="#97ACAE" />
            <path d="M556 298 l40 40 M596 298 l-40 40" stroke="#97ACAE" />
            <ellipse cx={privateX + 38} cy="358" rx="12" ry="15" fill="#FAF9F6" stroke="#97ACAE" />
            <rect x="552" y="352" width="42" height="15" rx="5" fill="#FAF9F6" stroke="#97ACAE" />
            <text x="152" y="237" textAnchor="middle" fontSize="13">{en ? 'Living / kitchen' : 'Дневна / кухня'}</text>
            <text x={privateX + rightWidth / 2} y="130" textAnchor="middle" fontSize="13">{en ? 'Bedroom' : 'Спалня'}</text>
            {layout.extra > 0 && <text x={privateX + rightWidth / 2} y="221" textAnchor="middle" fontSize="13">{localText(extraLabel, language)}</text>}
            <text x={privateX + rightWidth / 2} y="337" textAnchor="middle" fontSize="13">{en ? 'Bathroom' : 'Баня'}</text>
            <text x={hallX + 34} y="265" textAnchor="middle" fontSize="12" transform={`rotate(-90 ${hallX + 34} 265)`}>{en ? 'Hall' : 'Коридор'}</text>
          </svg>
          <figcaption className="mt-3 text-xs leading-6 text-[#526054]">{en ? 'Schematic functional arrangement, not to scale. Areas and furniture sizes are design targets. Final dimensions, openings and service routes require a measured survey; balcony is listed separately from the diagram.' : 'Схематично функционално разпределение, без мащаб. Площите и мебелните размери са проектни ориентири. Размерите, отворите и трасетата се уточняват след заснемане; балконът е описан отделно от схемата.'}</figcaption>
        </figure>
      </div>
    </section>
  );
}
