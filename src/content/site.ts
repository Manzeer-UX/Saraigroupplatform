/**
 * Single source of truth for all homepage copy.
 * Content is taken from the "Sarai Group Homepage" content inventory
 * (reviewed 10 November 2026). Short labels marked "derived" are
 * scannable summaries of the original copy, not new claims.
 */

import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
import alluviumLogo from "@/assets/case-studies/alluvium-logo.png";
import alluviumScreen from "@/assets/case-studies/alluvium-screen.png";
import eqipLogo from "@/assets/case-studies/eqip-logo.png";
import eqipScreen from "@/assets/case-studies/eqip-screen.png";
import gratiaeLogo from "@/assets/case-studies/gratiae-logo.png";
import gratiaeScreen from "@/assets/case-studies/gratiae-screen.png";
import greensightLogo from "@/assets/case-studies/greensight-logo.png";
import greensightScreen from "@/assets/case-studies/greensight-screen.png";
import lotiqLogo from "@/assets/case-studies/lotiq-logo.png";
import lotiqScreen from "@/assets/case-studies/lotiq-screen.png";
import runirLogo from "@/assets/case-studies/runir-logo.png";
import runirScreen from "@/assets/case-studies/runir-screen.png";
import trucklotsLogo from "@/assets/case-studies/trucklots-logo.png";
import trucklotsScreen from "@/assets/case-studies/trucklots-screen.png";
import {
  PiAppWindow,
  PiBrain,
  PiChartBar,
  PiChartLineUp,
  PiChartPieSlice,
  PiCloudArrowUp,
  PiCube,
  PiCpu,
  PiDatabase,
  PiGauge,
  PiHandHeart,
  PiKey,
  PiLightbulbFilament,
  PiLightning,
  PiMaskHappy,
  PiRocketLaunch,
  PiScan,
  PiSealCheck,
  PiShieldCheck,
  PiShieldWarning,
  PiSlidersHorizontal,
  PiSparkle,
  PiStack,
  PiTable,
  PiTarget,
  PiTrendUp,
} from "react-icons/pi";
import {
  SiAppium,
  SiDotnet,
  SiKubernetes,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSelenium,
  SiTensorflow,
} from "react-icons/si";
import { TbBrandAws, TbBrandAzure } from "react-icons/tb";

export const site = {
  name: "Sarai Group",
  shortName: "Sarai",
  url: "https://www.sarai.group",
  tagline: "Your Bridge To Digital Transformation Excellence!",
  description:
    "Sarai Platforms — agents for bespoke digital transformation. From ideation to implementation: rapid prototyping, data assets, tailored AI solutions and AI-enhanced business capabilities.",
  /** Update yearly (kept static so the page can be fully prerendered). */
  copyrightYear: 2026,
} as const;

// Navigation lives in its own module so the client-side Header doesn't
// pull this file's images and icon sets into the browser bundle.
export { navigation, type NavItem } from "./navigation";

/* 01 — Header and hero ------------------------------------------------ */
export const hero = {
  // Rendered in sentence case; wording and meaning are unchanged.
  title: [
    { text: "Your bridge to" },
    { text: "digital transformation", accent: true },
    { text: "excellence!" },
  ],
  lead: "Agents for bespoke digital transformation — taking businesses from ideation to implementation.",
  primaryCta: { label: "Explore our approach", href: "#approach" },
  secondaryCta: { label: "View case studies", href: "#case-studies" },
} as const;

/* 02 — Agents for Bespoke Digital Transformation ---------------------- */
export type Capability = {
  /** derived label */
  label: string;
  text: string;
  icon: IconType;
};

export const capabilitiesSection = {
  label: "Capabilities",
  title: "Agents for bespoke digital transformation",
  intro:
    "Four ways we help businesses modernize — with data and AI at the core of each.",
};

export const capabilities: Capability[] = [
  {
    label: "Concepts & prototypes",
    text: "Define digital product concepts and build prototypes quickly.",
    icon: PiLightbulbFilament,
  },
  {
    label: "Data assets",
    text: "Develop data assets for strategic planning, tactical decisions, and daily operations.",
    icon: PiDatabase,
  },
  {
    label: "Tailored AI",
    text: "Tailor AI solutions to businesses looking to modernize their digital operations.",
    icon: PiSlidersHorizontal,
  },
  {
    label: "AI-enhanced capabilities",
    text: "Use AI to enhance business capabilities.",
    icon: PiSparkle,
  },
];

/* 03 — From ideation to implementation -------------------------------- */
export type Stage = { name: string; short: string; icon: IconType };

export const lifecycleSection = {
  label: "Approach",
  title: "From ideation to implementation",
  subtitle: "Digital modernization lifecycle",
  intro:
    "The path from idea development to deployment at scale, stage by stage.",
};

export const stages: Stage[] = [
  { name: "Idea development", short: "Idea", icon: PiLightbulbFilament },
  { name: "Data-informed insights", short: "Insights", icon: PiChartLineUp },
  { name: "Rapid prototyping", short: "Prototype", icon: PiCube },
  { name: "Deployment at scale", short: "Scale", icon: PiRocketLaunch },
];

/** Time label shown on each transition, in order (stage n → stage n+1). */
export const transitions = [
  { weeks: 4, from: "Idea development", to: "data-informed insights" },
  { weeks: 8, from: "Data-informed insights", to: "rapid prototyping" },
  { weeks: 12, from: "Rapid prototyping", to: "deployment at scale" },
] as const;

/* Expertise and benefits (shown alongside the lifecycle in the original
   homepage graphic; presented here as their own section). */
export const expertiseBenefitsSection = {
  label: "Expertise & benefits",
  title: "The expertise behind every stage",
  intro:
    "Three areas of expertise power the digital modernization lifecycle — and five benefits it delivers to your business.",
};

export const expertise: { name: string; icon: IconType }[] = [
  { name: "Data asset curation", icon: PiStack },
  { name: "AI enhancements", icon: PiSparkle },
  { name: "AI and digital platforms", icon: PiCpu },
];

export const benefits: { name: string; icon: IconType }[] = [
  { name: "Efficiency", icon: PiLightning },
  { name: "Productivity", icon: PiGauge },
  { name: "Experience", icon: PiHandHeart },
  { name: "Growth", icon: PiTrendUp },
  { name: "Impact", icon: PiTarget },
];

/* 04 — Case studies ---------------------------------------------------- */
/* Logos, screenshots and copy come from the "Sarai Platforms — PPT design"
   Figma file (Sarai Products slides). The slide logos are white-on-dark, so
   the files here were converted to transparent, navy-on-white versions
   (brand colour marks kept) for use on the white card body. */
export type CaseStudy = {
  id: string;
  name: string;
  description: string;
  logo: StaticImageData;
  /** Logo height on the card; artwork aspect ratios differ. */
  logoClass: string;
  screenshot: StaticImageData;
  /** Optional link to a full case study page. */
  href?: string;
};

export const caseStudiesSection = {
  label: "Sarai products",
  title: "Case studies",
  intro:
    "Platforms we've built across logistics, sustainability, quality engineering, healthcare and enterprise AI.",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "trucklots",
    name: "TruckLots",
    description:
      "A smart truck parking platform giving drivers real-time availability and secure lot access — book a spot fast and skip the wasted fuel and idling from searching.",
    logo: trucklotsLogo,
    logoClass: "h-7",
    screenshot: trucklotsScreen,
    href: "https://www.sarai.group/trucklots.html",
  },
  {
    id: "greensight",
    name: "GreenSight",
    description:
      "An AI-powered carbon intelligence platform that simplifies emissions data, automates sustainability reporting, and helps teams make faster decarbonization decisions.",
    logo: greensightLogo,
    logoClass: "h-6",
    screenshot: greensightScreen,
  },
  {
    id: "eqip",
    name: "EQIP Enterprise AI",
    description:
      "An AI-powered Enterprise Quality Intelligence platform that automates software testing, improves test coverage, and helps teams release higher-quality software faster.",
    logo: eqipLogo,
    logoClass: "h-9",
    screenshot: eqipScreen,
  },
  {
    id: "gratiae",
    name: "Gratiae",
    description:
      "A unified wellness-practice platform that connects booking, clinical care, patient journeys, payments, and operational insights in one system.",
    logo: gratiaeLogo,
    logoClass: "h-7",
    screenshot: gratiaeScreen,
  },
  {
    id: "alluvium",
    name: "Alluvium",
    description:
      "AI-powered document intelligence that extracts and structures data from invoices, PDFs, forms, and scanned documents for faster, accurate processing.",
    logo: alluviumLogo,
    logoClass: "h-6",
    screenshot: alluviumScreen,
    href: "https://www.sarai.group/alluvium.html",
  },
  {
    id: "lotiq",
    name: "LotIQ",
    description:
      "AI-powered parking management connecting drivers and parking admins through intelligent discovery, booking, navigation, payments, and real-time occupancy insights.",
    logo: lotiqLogo,
    logoClass: "h-7",
    screenshot: lotiqScreen,
  },
  {
    id: "runir",
    name: "Runir",
    description:
      "AI governance and monitoring that gives secure visibility into enterprise AI usage — monitor LLM activity, manage risks, enforce policies, and gain actionable insights.",
    logo: runirLogo,
    logoClass: "h-7",
    screenshot: runirScreen,
  },
];

/* 05 — Services --------------------------------------------------------- */
export type Tool = { name: string; icon: IconType };

export type Service = {
  title: string;
  description: string;
  icon: IconType;
  tools: Tool[];
};

export const servicesSection = {
  label: "Services",
  title: "Our services",
  intro:
    "Services for individuals and businesses — from AI and data to cloud, security, applications and quality engineering.",
};

// Brands without an icon in react-icons (Power BI, Tableau, Playwright)
// use a neutral glyph so every tool chip keeps the same rhythm.
export const services: Service[] = [
  {
    title: "AI, Data & Cognitive Technologies",
    description: "Turn data into intelligent products, sharper decisions, and scalable automation.",
    icon: PiBrain,
    tools: [
      { name: "Python", icon: SiPython },
      { name: "Azure AI", icon: TbBrandAzure },
      { name: "TensorFlow", icon: SiTensorflow },
    ],
  },
  {
    title: "Enterprise Cybersecurity",
    description: "Protect systems, data, and access with security practices built for evolving risks.",
    icon: PiShieldCheck,
    tools: [
      { name: "SIEM", icon: PiShieldWarning },
      { name: "IAM", icon: PiKey },
      { name: "Vulnerability scanning", icon: PiScan },
    ],
  },
  {
    title: "Enterprise Application Development",
    description: "Design and build reliable applications for customers, teams, and operations.",
    icon: PiAppWindow,
    tools: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: ".NET", icon: SiDotnet },
    ],
  },
  {
    title: "Cloud & Infrastructure Modernization",
    description: "Modernize infrastructure for resilient, efficient, and flexible digital operations.",
    icon: PiCloudArrowUp,
    tools: [
      { name: "AWS", icon: TbBrandAws },
      { name: "Azure", icon: TbBrandAzure },
      { name: "Kubernetes", icon: SiKubernetes },
    ],
  },
  {
    title: "Data Analytics & Business Intelligence",
    description: "Make complex data easier to understand, explore, and act on.",
    icon: PiChartPieSlice,
    tools: [
      { name: "Power BI", icon: PiChartBar },
      { name: "Tableau", icon: PiTable },
      { name: "SQL", icon: PiDatabase },
    ],
  },
  {
    title: "Quality Engineering",
    description: "Build quality into delivery with practical, repeatable testing across every release.",
    icon: PiSealCheck,
    tools: [
      { name: "Selenium", icon: SiSelenium },
      { name: "Playwright", icon: PiMaskHappy },
      { name: "Appium", icon: SiAppium },
    ],
  },
];

/* Group companies (footer + structured data) --------------------------- */
export type Company = {
  name: string;
  services: string[];
  href: string;
};

export const companies: Company[] = [
  {
    name: "Seasia Infotech",
    services: [
      "Mobile application development",
      "Web application development",
      "Enterprise software development",
    ],
    href: "https://www.seasiainfotech.com/",
  },
  {
    name: "MoogleLabs",
    services: [
      "AI",
      "Machine learning",
      "Cloud engineering",
      "Analytics and visualization",
      "Data platform modernization",
    ],
    href: "https://www.mooglelabs.com/",
  },
  {
    name: "UIUXDen",
    services: [
      "Graphic design",
      "UX design",
      "UI design",
      "Front-end development",
    ],
    href: "https://www.uiuxden.com/",
  },
  {
    name: "BugRaptors",
    services: [
      "Core quality assurance",
      "Quality engineering",
      "Next-generation testing",
      "Testing consultation",
    ],
    href: "https://www.bugraptors.com/",
  },
  {
    name: "Woosper",
    services: [
      "Digital strategy",
      "Digital marketing analytics",
      "Lead generation",
      "Content marketing",
    ],
    href: "https://www.woosper.com/",
  },
];

/* 06 — Footer ----------------------------------------------------------- */
// Both are placeholders on the current homepage. Point these at the
// published policies when they are available.
export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;
