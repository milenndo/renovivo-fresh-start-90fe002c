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
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="display-serif normal-case leading-none tracking-tight">
        <span className="text-primary">R</span>
        <span>enovivo</span>
      </span>
      {showTagline && (
        <span
          className={`mt-1 text-[10px] tracking-[0.35em] uppercase font-medium wordmark-tagline ${taglineClassName}`}
        >
          Every Detail Matters
        </span>
      )}
    </span>
  );
};

export default Wordmark;
