interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
  taglineClassName?: string;
}

/**
 * Renovivo wordmark. Capital gold "R" + lowercase letters that inherit
 * currentColor (white on dark backgrounds, black on light).
 * Tagline "Every Detail Matters" animates with a subtle shimmer.
 */
const Wordmark = ({ className = "", showTagline = false, taglineClassName = "" }: WordmarkProps) => {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="display-serif normal-case leading-none tracking-tight">
        <span className="text-primary">R</span>
        <span>enovivo</span>
      </span>
      {showTagline && (
        <span
          className={`mt-1 text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-medium wordmark-tagline whitespace-nowrap pl-[0.35em] ${taglineClassName}`}
        >
          Every Detail Matters
        </span>
      )}
    </span>
  );
};

export default Wordmark;
