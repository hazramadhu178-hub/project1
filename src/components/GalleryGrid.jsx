import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { galleryCategories, galleryItems } from "../data/gallery";
import SectionHeading from "./SectionHeading";
import Lightbox from "./Lightbox";

export default function GalleryGrid() {
    const [cat, setCat] = useState("All");
    const [index, setIndex] = useState(-1);

    const items = useMemo(() => (cat === "All" ? galleryItems : galleryItems.filter((g) => g.cat === cat)),[cat] );

    const open = index >= 0 && index < items.length;

    return (
    <section className="vd-section vd-ivory" id="gallery" aria-label="Gallery">
        <div className="vd-container">
        <SectionHeading label="Gallery" title={"A glimpse\nof Verdara."} aside="Photographed across four seasons on the ridge — monsoon cloud, winter clarity and the long golden afternoons of spring." />

        <div className="gal-filters" aria-label="Gallery categories">
            {galleryCategories.map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} className={`gal-filter ${cat === c ? "is-active" : ""}`} onClick={() => { setCat(c); setIndex(-1); }} > {c} </button>
            ))}
        </div>

        {/* mobile + tablet: single dropdown containing every category */}
        <label className="gal-filter-select">
            <span className="sr-only">Filter gallery by category</span>
            <select value={cat} onChange={(e) => { setCat(e.target.value); setIndex(-1); }} aria-label="Filter gallery by category" >
            {galleryCategories.map((c) => (
                <option key={c} value={c}> {c} </option>
            ))}
            </select>
        </label>

        <motion.div layout className="gal-masonry">
        <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
            <motion.button key={item.id} layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.65, delay: (i % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }} className="gal-item" onClick={() => setIndex(i)} aria-label={`Open image: ${item.alt}`} >
            <div className="vd-media" style={{ aspectRatio: item.ratio }}>
                <img src={item.src} alt={item.alt} loading="lazy" />
            </div>

            <span className="gal-item__cap">
                <span>{item.cat}</span>
                <span>0{(i % 9) + 1}</span>
            </span>
            </motion.button>
        ))}
        </AnimatePresence>
        </motion.div>
        </div>

        <AnimatePresence>
        {open && (
            <Lightbox items={items} index={index} onClose={() => setIndex(-1)} onPrev={() => setIndex((i) => (i - 1 + items.length) % items.length)} onNext={() => setIndex((i) => (i + 1) % items.length)} />
        )}
        </AnimatePresence>
    </section>
    );
}
