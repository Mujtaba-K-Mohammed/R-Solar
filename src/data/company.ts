// Source: user-supplied Royal Voltage Trading Company Profile (2026), pp. 1, 3–6, 12–13.
// Royal Solar is the existing project/URL; official business identity follows the supplied profile.
export const company = {
  name: "Royal Voltage Trading",
  logo: "/images/royal-voltage-trading-logo.webp" as string | null,
  established: 2026,
  description:
    "Established in 2026, Royal Voltage Trading is a UAE-based electrical contracting and trading company specializing in electrical materials supply, electromechanical works and integrated renewable energy solutions. Our engineers, supervisors and technicians bring hands-on field experience to every stage of delivery.",
  secondaryDescription:
    "As an authorized GoodWe distributor in the UAE, we supply genuine inverters, batteries and smart monitoring solutions, alongside Royal Voltage solar equipment. Our approach combines reliable technology, technical expertise and precise execution for homes, businesses and industrial facilities.",
  mission:
    "To deliver high-quality solar technology and support, supplying efficient, durable systems suited to the UAE climate and each client's long-term energy needs.",
  vision:
    "To become the Gulf region's most trusted name in solar energy trading and distribution, accelerating clean power adoption through quality products, technical excellence and dependable service.",
  heroDescription:
    "Genuine GoodWe solar technology, electrical equipment and engineering support for residential, commercial and industrial projects across the UAE.",
  phone: "+971 55 245 2002",
  phoneHref: "tel:+971552452002",
  email: "info@royal-voltage.ae",
  office:
    "Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
  hours: null as string | null,
  inquiryEndpoint: import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined,
};
export const principles = [
  "Quality first",
  "Reliability",
  "Technical excellence",
  "Customer focus",
  "Sustainability",
];
export const sectors = [
  { title: "Residential", detail: "Villas & homes" },
  { title: "Commercial", detail: "Offices & retail" },
  { title: "Industrial", detail: "Factories & warehouses" },
];
export const process = [
  {
    title: "Consultation",
    description: "Understand your energy needs, budget and site requirements.",
  },
  {
    title: "Site Survey & Design",
    description:
      "Assess the site, size the system and specify the right equipment.",
  },
  {
    title: "Supply",
    description:
      "Deliver genuine GoodWe equipment and solar system components.",
  },
  {
    title: "Installation Support",
    description:
      "Coordinate with licensed installers for safe and correct fitting.",
  },
  {
    title: "Commissioning",
    description: "Test the system and configure performance monitoring.",
  },
  {
    title: "Ongoing Support",
    description:
      "Provide technical support, maintenance and warranty assistance.",
  },
];
export const reasons = [
  [
    "Authorized GoodWe Distributor",
    "Direct access to genuine GoodWe inverters, batteries and monitoring systems, supported by manufacturer warranties.",
  ],
  [
    "End-to-End Capability",
    "Consultation, design, supply, installation support and after-sales service throughout your solar journey.",
  ],
  [
    "UAE Market Knowledge",
    "System planning that considers local grid requirements, climate and building types.",
  ],
  [
    "Competitive Value",
    "Direct distribution relationships and solutions tailored to your site, budget and energy goals.",
  ],
  [
    "Responsive Technical Support",
    "A dedicated technical team assisting clients and installation partners after delivery.",
  ],
  [
    "Warranty Assistance",
    "Prompt replacement assistance for faulty products in line with the applicable product warranty.",
  ],
];
