interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
  taglineClassName?: string;
  tone?: "dark" | "light";
}

const Wordmark = ({ className = "", showTagline = false, tone = "dark" }: WordmarkProps) => (
  <picture className={"inline-block w-[160px] sm:w-[210px] align-middle " + className}>
    <source media="(max-width: 639px)" srcSet={`/brand/renovivo-wordmark-short-${tone}.svg`} />
    <img
      src={`/brand/renovivo-${showTagline ? "horizontal" : "wordmark-short"}-${tone}.svg`}
      alt="Renovivo"
      width={1640}
      height={395}
      className="block h-auto w-full"
    />
  </picture>
);

export default Wordmark;
