"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { EmptyState } from "@/components/layout/public-page";
import { galleryPlaceholders } from "@/lib/data/public-content";

export function GalleryGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = galleryPlaceholders.find((item) => item.id === selectedId);

  useEffect(() => {
    if (!selectedId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  return <>
    {galleryPlaceholders.length > 0 ? <div className="gallery-grid gallery-page-grid">
      {galleryPlaceholders.map((item, index) => <button className={`gallery-tile gallery-tile-${index + 1}`} type="button" key={item.id} onClick={() => setSelectedId(item.id)} aria-label={`Open photo: ${item.alt}`}>
        <Image className="gallery-tile-image" src={item.imageUrl} alt={item.alt} fill sizes="(max-width: 620px) 100vw, (max-width: 820px) 50vw, 33vw" loading={index === 0 ? "eager" : "lazy"} />
      </button>)}
    </div> : <EmptyState title="No gallery photos are available yet" message="Please check back for classroom, event, and activity photos." />}
    {selectedItem && <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedId(null)}>
      <section className="lightbox-panel" role="dialog" aria-modal="true" aria-label="Gallery photo preview">
        <button className="lightbox-close" type="button" onClick={() => setSelectedId(null)} aria-label="Close image preview"><X size={20} /></button>
        <div className="lightbox-image-wrap">
          <Image className="lightbox-image" src={selectedItem.imageUrl} alt={selectedItem.alt} fill sizes="(max-width: 620px) 100vw, 90vw" />
        </div>
      </section>
    </div>}
  </>;
}