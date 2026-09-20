import { company } from "../data/company";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Mark() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m7 30 7-15h17l-7 15H7Zm4-7h16M19 15l-7 15M25 15l-7 15"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M19 10a6 6 0 0 1 12 0M25 0v3m-9 0 2 3m16-3-2 3M12 10h3m20 0h3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Brand() {
  return (
    <a href="#home" className="brand" aria-label={`${company.name} home`}>
      {company.logo ? (
        <img src={company.logo} alt={company.name} />
      ) : (
        <>
          <Mark />
          <span>
            {company.name.toUpperCase()}
            <small>ENGINEERING A BRIGHTER TOMORROW</small>
          </span>
        </>
      )}
    </a>
  );
}
export function Icon({ kind = 0 }: { kind?: number }) {
  const paths = [
    "M4 20V9l8-5 8 5v11H4Zm5 0v-7h6v7M8 9h.01M16 9h.01",
    "M3 20V9l6 3V7l6 4V4h5v16H3Z",
    "m3 11 9-8 9 8M6 9v11h12V9M10 20v-6h4v6",
    "m5 6-3 12h17l3-12H5Zm-1 6h17M11 6 8 18M17 6l-3 12",
    "M8 4h8v3h3v15H5V7h3V4Zm4 5-3 6h5l-2 5",
    "m14 3-4 6 5 3-5 9M4 5l2 2M18 17l2 2M3 13h3M18 7h3",
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind % paths.length]} />
    </svg>
  );
}
export function Heading({ children }: { children: string }) {
  return (
    <h2 data-heading>
      {children.split("|").map((s, i) => (
        <span className="heading-line" key={i}>
          <span>{s}</span>
        </span>
      ))}
    </h2>
  );
}
