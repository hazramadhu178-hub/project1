import { px } from "./images";

export const galleryCategories = [
  "All",
  "Resort",
  "Rooms",
  "Dining",
  "Nature",
  "Experiences",
];

const item = (id, cat, alt, w, h) => ({
  id: `${id}`,
  cat,
  alt,
  src: px(id, w, h),
  full: px(id, 1600, Math.round((h / w) * 1600)),
  ratio: `${w} / ${h}`,
});

export const galleryItems = [
  item(31665649, "Resort", "Resort terrace looking out over the mountain valley", 800, 1000),
  item(37454902, "Nature", "Layered Himalayan ranges above pine forest", 800, 560),
  item(32418081, "Rooms", "Timber-lined suite with warm evening light", 800, 600),
  item(33033815, "Dining", "Chef's table laid for an evening tasting menu", 800, 1000),
  item(37352963, "Experiences", "Tea gardens terraced into the Darjeeling hills", 800, 560),
  item(30158901, "Nature", "Mist drifting between Himalayan pines at dawn", 800, 1000),
  item(14025037, "Rooms", "Forest deluxe room with garden-facing windows", 800, 600),
  item(29101361, "Dining", "Seasonal mountain vegetables, plated", 800, 800),
  item(5015007, "Experiences", "Prayer flags above a Himalayan monastery", 800, 560),
  item(6629612, "Resort", "Spa treatment room lit by candlelight", 800, 1000),
  item(10195041, "Nature", "A quiet path through the misty pine forest", 800, 600),
  item(14025904, "Rooms", "Villa bedroom with canopy bed and natural light", 800, 1000),
  item(34530099, "Nature", "Sunrise breaking above a sea of cloud", 800, 560),
  item(36694451, "Dining", "Long table set for a mountain dinner", 800, 600),
  item(29536720, "Experiences", "Bonfire evening under a clear mountain sky", 800, 800),
];
