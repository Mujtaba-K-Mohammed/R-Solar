export type Project = {
  title: string;
  location: string | null;
  category: string;
  capacity: string | null;
  year: string | null;
  client: string | null;
  status: string;
  image: string;
  alt: string;
  description: string;
  sourcePage: number;
};
// Images/captions from the supplied profile. These are not independently documented named projects.
export const projects: Project[] = [
  {
    title: "Hybrid Inverters & Battery Storage",
    category: "Installed system",
    location: null,
    capacity: null,
    year: null,
    client: null,
    status: "Completed installation shown in the company profile",
    image: "/images/profile-hybrid-installation.webp",
    alt: "Wall-mounted GoodWe inverters and lithium batteries from the company profile",
    description:
      "A GoodWe installation pairing hybrid inverters with lithium battery storage. The profile does not specify the client, site, capacity or completion year.",
    sourcePage: 11,
  },
  {
    title: "Solar Installation Support",
    category: "Installation",
    location: null,
    capacity: null,
    year: null,
    client: null,
    status: "Installation work shown in the company profile",
    image: "/images/profile-installation-team.webp",
    alt: "Technicians positioning solar modules in the supplied company profile",
    description:
      "Solar panel installation imagery supplied in the company profile, illustrating the company's installation support activities.",
    sourcePage: 10,
  },
  {
    title: "Modular Battery Storage",
    category: "Energy storage",
    location: null,
    capacity: null,
    year: null,
    client: null,
    status: "Equipment highlight from the company profile",
    image: "/images/profile-battery-cabinet.webp",
    alt: "Open GoodWe battery cabinet with modular battery packs and wiring",
    description:
      "A modular lithium battery cabinet featured in the company profile. This equipment photograph is not presented as a separately identified customer project.",
    sourcePage: 11,
  },
];
