import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  // Optional srcset for responsive images - array of {src, width} pairs
  srcSet?: Array<{ src: string; width: number }>;
}

// Standard breakpoints for srcset generation (1x and 2x for Retina)
const SRCSET_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536, 1920];

/**
 * Generates srcset string from an array of image sources
 */
const generateSrcSet = (
  srcSet: Array<{ src: string; width: number }>
): string => {
  return srcSet.map(({ src, width }) => `${src} ${width}w`).join(", ");
};

/**
 * Optimized image component with:
 * - Explicit width/height for CLS prevention
 * - Lazy loading with IntersectionObserver
 * - Priority loading for above-the-fold images
 * - Responsive sizes attribute
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  srcSet,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Calculate aspect ratio from width/height
  const aspectRatio = width && height ? width / height : undefined;

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate srcset string if provided
  const srcSetString = useMemo(() => {
    if (srcSet && srcSet.length > 0) {
      return generateSrcSet(srcSet);
    }
    return undefined;
  }, [srcSet]);

  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        className
      )}
      style={{
        width: '100%',
        aspectRatio: aspectRatio,
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          srcSet={srcSetString}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ aspectRatio }}
        />
      )}
      {/* Placeholder while loading - prevents CLS */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-muted/50"
          aria-hidden="true"
          style={{ aspectRatio }}
        />
      )}
    </div>
  );
};

export { OptimizedImage, generateSrcSet, SRCSET_WIDTHS };
