const base = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const InstagramIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 8.5H17V5.2h-2.6c-2.2 0-3.6 1.5-3.6 3.7v2.1H8.5v3.2h2.3V22h3.4v-7.8h2.4l.4-3.2h-2.8V9.4c0-.6.3-.9.9-.9Z" />
  </svg>
);

export const WhatsappIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M21 11.6a8.9 8.9 0 0 1-13.3 7.8L3 21l1.7-4.5A8.9 8.9 0 1 1 21 11.6Z" />
    <path d="M8.9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.3 0 .5-.1.6l-.4.5c-.1.2-.3.3-.1.6a7 7 0 0 0 3 2.6c.3.1.5.1.7-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5a2 2 0 0 1-1.9 1.9c-.9 0-2.7-.5-4.6-2.3-1.9-1.9-2.6-3.6-2.7-4.6a2.7 2.7 0 0 1 .4-1.5Z" />
  </svg>
);

export const socialLinks = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "WhatsApp", href: "#", Icon: WhatsappIcon },
];
