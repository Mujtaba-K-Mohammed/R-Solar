import { useEffect, useRef, useState } from "react";
import { Arrow, Brand } from "./Shared";
const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Solutions", "solutions"],
  ["Services", "services"],
  ["Projects", "projects"],
  ["Why Us", "why-us"],
  ["Contact", "contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const focusables = [
          toggle.current,
          ...Array.from(nav.current!.querySelectorAll<HTMLAnchorElement>("a")),
        ].filter(Boolean) as HTMLElement[];
        const first = focusables[0],
          last = focusables.at(-1)!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const resize = () => {
      if (innerWidth > 1100) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = prior;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header
      className={`header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="nav-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span>{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="main-nav"
          ref={nav}
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
        >
          {links.map(([title, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              {title}
            </a>
          ))}
          <a
            className="nav-quote"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Get a quote <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}
