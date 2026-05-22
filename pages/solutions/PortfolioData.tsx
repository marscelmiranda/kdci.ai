import { PORTFOLIO_1, PORTFOLIO_2, PORTFOLIO_3, PORTFOLIO_4, PORTFOLIO_5, PORTFOLIO_6, PORTFOLIO_7, PORTFOLIO_8 } from '../../data';

export type MediaType = 'image' | 'youtube' | 'vimeo';

export interface MediaItem {
  type: MediaType;
  url: string;
}

export interface PortfolioItem {
  id: string;
  thumbnail: string;
  title: string;
  tag: string;
  description?: string;
  media: MediaItem[];
}

// --- Data ---

export const portfolioItems: PortfolioItem[] = [
  { 
    id: "item-1",
    thumbnail: PORTFOLIO_1, 
    title: "Nike Pitch Deck", 
    tag: "Powerpoint / Presentation",
    description: "This presentation design for Nike utilizes a high-energy, athletic aesthetic that aligns with the brand’s iconic visual identity. By combining bold typography with dynamic sports photography and a high-contrast palette, the deck delivers corporate insights through a professional and visually impactful narrative.",
    media: [
      { type: 'image', url: PORTFOLIO_1 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773885625/N2_jcknr7.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773885625/N3_wyeqch.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773885625/N4_quoeiv.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773885625/N5_yyxpux.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773885625/N6_xiwrzm.webp?auto=format&fit=crop&q=80&w=1200&h=800" }
    ]
  },
  { 
    id: "item-2",
    thumbnail: PORTFOLIO_2, 
    title: "Haystak Corporate Branding", 
    tag: "Branding / Corporate Logo",
    description: "This project features a comprehensive branding and digital identity for Haystak, integrating custom logo design with a modern UX/UI framework. The visual language utilizes a clean, data-centric aesthetic and a professional color palette to create an intuitive web experience that emphasizes searchability and organizational efficiency.",
    media: [
      { type: 'vimeo', url: "https://player.vimeo.com/video/893341258?background=1&autoplay=1&muted=1&loop=1&autopause=0" }, // Example Vimeo video
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886863/H1_fa1spz.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886863/H2_oebyq8.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886864/H3_vp1bj0.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886863/H4_tc17d1.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886864/H5_zzgkz0.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886863/H6_opfj0b.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: PORTFOLIO_2 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886866/H8_mbjelt.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/893343733?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/893344563?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773887181/H9_yu735b.webp?auto=format&fit=crop&q=80&w=1200&h=800" }
    ]
  },
  { 
    id: "item-3",
    thumbnail: PORTFOLIO_3, 
    title: "Augmented Wars | QUANTIQ", 
    tag: "Print Ad / Web Graphics / Event Collaterals",
    description: "This project showcases a comprehensive branding and marketing suite for Quantiq, featuring a sleek, data-driven visual identity. The design integrates custom logo creation with sophisticated print and digital marketing materials, utilizing a tech-focused color palette and precise geometric layouts to communicate innovation and professional reliability.",
    media: [
      { type: 'image', url: PORTFOLIO_3 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/quantiq_2_d0ybqk.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/quantiq_3_dd6ylj.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/quantiq_4_uedair.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/907480881?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890146/quantiq_5_aycsiw.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890147/quantiq_6_drnbwc.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
    ]
  },
  { 
    id: "item-4",
    thumbnail: PORTFOLIO_4, 
    title: "Starbucks | One Psyche PPT", 
    tag: "Powerpoint / Presentation",
    description: "This presentation design for Starbucks focuses on a clean, sophisticated layout that aligns with the brand’s iconic visual identity. By combining high-quality lifestyle photography with structured typography and a muted color palette, the deck delivers corporate insights through a professional and cohesive narrative.",
    media: [
      { type: 'image', url: PORTFOLIO_4 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890056/starbucks_2_ongs4l.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890057/starbucks_3_op62vx.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890057/starbucks_4_kvoouv.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890058/starbucks_5_liyysm.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890059/starbucks_6_bjgu2m.webp?auto=format&fit=crop&q=80&w=1200&h=800" }
    ]
  },
  { 
    id: "item-5",
    thumbnail: PORTFOLIO_5, 
    title: "Arby's Online Order Form", 
    tag: "UI/UX / Web App Development",
    description: "This project features a comprehensive UX/UI design for Arby’s, focusing on a streamlined digital ordering experience. The interface combines a bold, high-contrast visual hierarchy with intuitive navigation, prioritizing high-quality food imagery and user-centric flows to enhance brand engagement across mobile and web platforms.",
    media: [
      { type: 'image', url: PORTFOLIO_5 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890064/arbys_2_mtmwtj.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890063/arbys_3_zthf9c.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/930101477?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890065/arbys_4_gjd4ds.webp?auto=format&fit=crop&q=80&w=1200&h=800" }
    ]
  },
  { 
    id: "item-6",
    thumbnail: PORTFOLIO_6, 
    title: "Furtim Corporate Branding", 
    tag: "Branding / Corporate Logo / UI/UX / Motion Graphics",
    description: "This project showcases a comprehensive branding suite for Furtim, integrating custom illustration, logo design, web development, and video production. The visual identity features a dark, sophisticated aesthetic with intricate vector art and a modern web interface, creating a cohesive and mysterious brand narrative across multiple digital touchpoints.",
    media: [
      { type: 'vimeo', url: "https://player.vimeo.com/video/897696428?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_1_gudfvs.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_2_k49n6i.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: PORTFOLIO_6 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_4_jtr03w.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/furtim_5_niycny.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/furtim_6_c4ojex.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_7_s7qhs9.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_8_zkgcom.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/furtim_9_tzxyis.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_10_hubwyz.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_11_g7z4lv.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/897706426?background=1&autoplay=1&muted=1&loop=1&autopause=0" }
    ]
  },
  { 
    id: "item-7",
    thumbnail: PORTFOLIO_7, 
    title: "Nielsen Media | Event Presentations", 
    tag: "Powerpoint / Presentation",
    description: "This presentation design for KDCI and Nielsen Media utilizes a clean, professional layout to communicate complex data and corporate insights. The aesthetic features a balanced color palette and structured typography, ensuring clarity and brand consistency throughout the slides for a high-impact, business-centric narrative.",
    media: [
      { type: 'image', url: PORTFOLIO_7 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890071/nielsen_2_a4v1st.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/922794319?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/922796986?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890072/nielsen_3_xpdafe.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/922798226?background=1&autoplay=1&muted=1&loop=1&autopause=0" }
      
    ]
  },
  { 
    id: "item-8",
    thumbnail: PORTFOLIO_8, 
    title: "Tutti Frutti | Social Media Ads", 
    tag: "Web Graphic / Social Media",
    description: 'A vibrant social media banner design for the "Tutti Frutti" campaign, featuring bold typography and high-contrast colors. This energetic layout blends geometric elements with organic textures to create a modern, attention-grabbing brand identity for corporate recruitment and engagement.',
    media: [
      { type: 'image', url: PORTFOLIO_8 },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890060/tutti_frutti_2_ycv0a3.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890061/tutti_frutti_3_qrqswq.webp?auto=format&fit=crop&q=80&w=1200&h=800" },
      { type: 'vimeo', url: "https://player.vimeo.com/video/934763217?background=1&autoplay=1&muted=1&loop=1&autopause=0" },
      { type: 'image', url: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890062/tutti_frutti_4_whdpwr.webp?auto=format&fit=crop&q=80&w=1200&h=800" }
    ]
  }
];
