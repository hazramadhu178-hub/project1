import { IMG } from "../data/images";
import Reveal, { RevealLine } from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import SectionHeading from "./SectionHeading";

const blocks = [
  {
    num: "01",
    title: "The Land",
    text: "Rooted in the forests and landscapes of Darjeeling. The estate was planted long before it was built on — we kept every mature tree and shaped the architecture around them.",
    image: IMG.storyLand,
    alt: "Forested Himalayan slopes surrounding the resort",
  },
  {
    num: "02",
    title: "The People",
    text: "Working closely with local communities and artisans. Our furniture is made in Kurseong, our textiles hand-woven in the valley, and most of our team grew up within an hour of the gate.",
    image: IMG.storyPeople,
    alt: "Prayer flags and local craft in the Darjeeling hills",
  },
  {
    num: "03",
    title: "The Philosophy",
    text: "Luxury with a lighter footprint. Fewer rooms, longer stays, seasonal menus and energy drawn largely from the sun and the river below.",
    image: IMG.storyPhilosophy,
    alt: "Terraced tea gardens in a green Himalayan valley",
  },
];

export default function StorySection() {
  return (
    <section className="vd-section vd-ivory" id="story" aria-label="Our story">
      <div className="vd-container">
        <SectionHeading
          label="Our Story"
          number="Section 05"
          title={"Built around\nthe land."}
          aside="Verdara was imagined as a place where hospitality and nature could exist together. Every detail — from locally crafted interiors to seasonal cuisine — is designed to create a deeper connection with the mountains."
        />

        {blocks.map((b, i) => (
          <article
            key={b.num}
            className={`story-block ${i % 2 === 1 ? "story-block--alt" : ""}`}
          >
            <Reveal>
              <ParallaxImage src={b.image} alt={b.alt} distance={28} />
            </Reveal>
            <div className="story-block__body">
              <Reveal y={14}>
                <span className="story-block__num">{b.num}</span>
              </Reveal>
              <h3 className="vd-h3">
                <RevealLine>{b.title}</RevealLine>
              </h3>
              <Reveal delay={0.1}>
                <p className="vd-body">{b.text}</p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
