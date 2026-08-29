import Image from "next/image";
import type { ComponentType } from "react";
import { tileClass, type Tile } from "@/lib/content";
import type { Photo } from "@/lib/images";

/**
 * One image slot.
 *
 * Renders the real photograph when `photo` is set, and the brand illustration
 * on its pastel tile when it isn't — so an unshot slot still looks deliberate.
 * Photos are cropped to fill the same box the illustration occupies, which
 * keeps grids aligned no matter which slots have landed.
 */
export function Figure({
  tile,
  photo,
  illustration: Illustration,
  height = "h-[180px]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
  className = "",
}: {
  tile: Tile;
  photo?: Photo;
  illustration?: ComponentType<{ className?: string }>;
  height?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (photo) {
    return (
      <div className={`relative ${height} overflow-hidden rounded-tile ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex ${height} items-center justify-center overflow-hidden rounded-tile ${tileClass[tile]} ${className}`}
    >
      {Illustration ? <Illustration className="h-full w-full p-5" /> : null}
    </div>
  );
}
