interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
  taglineClassName?: string;
}

/** Monochrome brand mark; no metallic gradients or decorative shimmer. */
const Wordmark = ({ className = "", showTagline = false, taglineClassName = "" }: WordmarkProps) => (
  <span className={`inline-flex flex-col items-start leading-none ${className}`}>
    <span className="font-semibold normal-case tracking-[-0.065em] leading-none">renovivo<span className="text-[#6A746B]">.</span></span>
    {showTagline && (
      <span className={`mt-1.5 text-[8px] sm:text-[9px] tracking-[0.22em] uppercase font-medium text-muted-foreground whitespace-nowrap ${taglineClassName}`}>
        Every Detail Metters
      </span>
    )}
  </span>
);

export default Wordmark;
