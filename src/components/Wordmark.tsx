interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
  taglineClassName?: string;
}

/**
 * Renovivo wordmark. "R" is gold (primary); remaining letters use
 * currentColor so they adapt to the surrounding background (white on dark,
 * black on light) via the parent's text color utility.
 */
const Wordmark = ({ className = "", showTagline = false, taglineClassName = "" }: WordmarkProps) => {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-display font-bold tracking-tight uppercase leading-none">
        <span className="text-primary">R</span>
        <span>enovivo</span>
      </span>
      {showTagline && (
        <span
          className={`mt-1 text-[10px] tracking-[0.35em] uppercase text-primary/80 font-medium ${taglineClassName}`}
        >
          Every Detail Matters
        </span>
      )}
    </span>
  );
};

export default Wordmark;
