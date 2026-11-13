interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
  taglineClassName?: string;
}

/** Approved 2026-11-13 editorial wordmark — neutral, no metallic accents. */
const Wordmark = ({ className = "", showTagline = false, taglineClassName = "" }: WordmarkProps) => (
  <span className={"inline-flex items-center gap-2.5 leading-none " + className}>
    <span aria-hidden="true" className="relative inline-grid h-[1.02em] w-[0.8em] shrink-0 place-items-center font-[Literata] text-[1.09em] font-medium leading-none tracking-[-0.12em] text-[#303D33]">
      R
      <span className="absolute bottom-[0.13em] right-[0.03em] h-[1px] w-[0.3em] rotate-[-40deg] bg-[#78816F]" />
    </span>
    <span className="inline-flex flex-col justify-center gap-1">
      <span className="text-[0.59em] font-semibold tracking-[0.17em] text-[#2E342F]">RENOVIVO</span>
      {showTagline && (
        <span className={"hidden sm:block whitespace-nowrap text-[0.205em] font-medium uppercase tracking-[0.24em] text-[#777B73] " + taglineClassName}>
          Ремонти · Интериор · Изпълнение
        </span>
      )}
    </span>
  </span>
);

export default Wordmark;
