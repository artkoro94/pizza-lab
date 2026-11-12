import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

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

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setIsReady(true);
    }
  }, [src]);

  return (
    <span
      className={`image-reveal ${isReady ? "is-ready" : ""} ${className}`}
      aria-busy={!isReady}
    >
      <img
        {...imageProps}
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsReady(true)}
        onError={() => setIsReady(true)}
        className={`image-reveal__image ${imageClassName}`}
      />
    </span>
  );
}
