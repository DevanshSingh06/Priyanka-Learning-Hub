"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { EmptyState } from "@/components/layout/public-page";
import { galleryCategories, galleryPlaceholders, type GalleryCategory } from "@/lib/data/public-content";

export function GalleryGrid() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const visibleItems = galleryPlaceholders.filter((item) => category === "All" || item.category === category);
  const selectedItem = galleryPlaceholders.find((item) => item.id === selectedId);

  return <>
    {galleryPlaceholders.length > 0 && <div className="gallery-filter" aria-label="Filter gallery">
      {galleryCategories.map((option) => <button className={category === option ? "filter-chip selected" : "filter-chip"} type="button" aria-pressed={category === option} key={option} onClick={() => setCategory(option)}>{option}</button>)}
    </div>}
    {galleryPlaceholders.length > 0 ? <div className="gallery-grid gallery-page-grid" aria-live="polite">
      {visibleItems.map((item, index) => <button className={`gallery-tile gallery-tile-${index + 1}`} type="button" key={item.id} onClick={() => setSelectedId(item.id)} aria-label={`Open photo: ${item.title}`}>
        <strong>{item.title}</strong><span className="gallery-category">{item.category}</span>
      </button>)}
    </div> : <EmptyState title="No gallery photos are available yet" message="Please check back for classroom, event, and activity photos." />}
    {selectedItem && <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedId(null)}>
      <section className="lightbox-panel" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
        <button className="lightbox-close" type="button" onClick={() => setSelectedId(null)} aria-label="Close image preview"><X size={20} /></button>
        <h2 id="lightbox-title">{selectedItem.title}</h2>
        <p>{selectedItem.category}</p>
      </section>
    </div>}
  </>;
}