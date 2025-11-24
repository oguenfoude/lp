"use client";
import Image from "next/image";
import { cong } from "@/lib/config/cong";

export default function Gallery() {
  const { images } = cong.gallery;
  if (!images || images.length === 0) return null;
  return (
    <section id="gallery" className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img, idx) => (
            <figure key={idx} className="border border-[var(--color-border)] rounded-md overflow-hidden bg-white">
              <div className="relative w-full h-64">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              {img.caption && (
                <figcaption className="p-3 text-sm text-[var(--color-muted)]">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}