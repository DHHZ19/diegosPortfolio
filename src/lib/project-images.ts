import type { ImageMetadata } from "astro";

const images = import.meta.glob<ImageMetadata>(
  "../assets/projects/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
);

export function projectImage(src: string): ImageMetadata | undefined {
  const key = Object.keys(images).find((path) => path.endsWith(`/${src}`));
  return key ? images[key] : undefined;
}
