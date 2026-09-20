// All imagery is served from Pexels CDN. Swap the numeric IDs (or the whole
// helper) to plug in real resort photography later.
export const px = (id, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  hero: px(30158901, 1920, 1280),
  welcome: px(37454902, 1100, 1375),
  welcomeSmall: px(32418081, 700, 933),
  roomFeature: px(37098094, 1200, 1440),
  cloudSunrise: px(34530099, 1920, 1200),
  storyLand: px(37454900, 1100, 760),
  storyPeople: px(37845688, 1100, 760),
  storyPhilosophy: px(19000373, 1100, 760),
  wellnessA: px(6629612, 800, 1067),
  wellnessB: px(6186740, 800, 1067),
  diningWide: px(33033815, 1400, 875),
  diningA: px(29101361, 800, 800),
  diningB: px(36694451, 800, 800),
  location: px(35151732, 1200, 900),
};
