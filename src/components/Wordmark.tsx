interface WordmarkProps {
  className?: string;
  showTagline?: boolean;
  taglineClassName?: string;
  tone?: "dark" | "light";
}

const Wordmark = ({ className = "", tone = "dark" }: WordmarkProps) => (
  <img
    src={`/brand/renovivo-b1-horizontal-${tone === "light" ? "light-on-dark" : "dark-on-light"}.png`}
    alt="Renovivo"
    width={2200}
    height={733}
    className={"inline-block h-auto w-[180px] sm:w-[240px] align-middle " + className}
  />
);

export default Wordmark;
