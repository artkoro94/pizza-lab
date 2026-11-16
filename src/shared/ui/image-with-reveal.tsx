import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";
import { Spinner } from "@/shared/ui/spinner";

type ImageWithRevealProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "className" | "onLoad" | "onError"
> & {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

export function ImageWithReveal({
  src,
  alt,
  className = "",
  imageClassName = "",
  loading = "lazy",
  decoding = "async",
  ...imageProps
}: ImageWithRevealProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsReady(false);
    setHasError(false);
    const image = imageRef.current;
    if (image?.complete) {
      if (image.naturalWidth > 0) setIsReady(true);
      else if (image.currentSrc) setHasError(true);
    }
  }, [src]);

  return (
    <span
      className={`image-reveal ${isReady || hasError ? "is-ready" : ""} ${className}`}
      aria-busy={!isReady && !hasError}
    >
      {!isReady && !hasError && (
        <span className="absolute inset-0 z-10 grid place-items-center" aria-hidden="true">
          <Spinner size="md" className="text-accent" />
        </span>
      )}
      {hasError && (
        <span className="absolute inset-0 z-10 grid place-items-center bg-black/5 text-xs font-semibold text-black/40">
          Изображение недоступно
        </span>
      )}
      <img
        {...imageProps}
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => { setHasError(false); setIsReady(true); }}
        onError={() => { setIsReady(false); setHasError(true); }}
        className={`image-reveal__image ${imageClassName}`}
      />
    </span>
  );
}
