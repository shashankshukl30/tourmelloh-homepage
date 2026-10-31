import Image from "next/image";
import { media } from "@/content/catalog/media";
import type { MediaKey } from "@/content/catalog/media-plan";

/** A library photograph filling its (positioned) parent, with its own blur and caption text. */
export function Photo({
  k,
  sizes,
  priority = false,
  position,
  className,
  quality = 86,
}: {
  k: MediaKey;
  sizes: string;
  priority?: boolean;
  position?: string;
  className?: string;
  quality?: number;
}) {
  const photo = media[k];
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      preload={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={photo.blur}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

export const caption = (k: MediaKey) => media[k].alt;
