import { useRef, useState } from "react";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import {
  company,
  principles,
  process,
  reasons,
  sectors,
} from "../data/company";
import { solutions } from "../data/solutions";
import { statistics } from "../data/statistics";
import { Arrow, Heading, Icon } from "./Shared";
export function About() {
  return (
    <section id="about" className="section container about">
      <div className="about-photo" data-image>
        <img
          src="/images/profile-solar-panels.webp"
          alt="Solar module photograph from the Royal Voltage Trading company profile"
          loading="lazy"
        />
        <span className="photo-caption">
          SOLAR ENERGY SOLUTIONS
          <small>Royal Voltage Trading · Company profile</small>
        </span>
      </div>
      <div className="about-copy">
        <p className="eyebrow dark">About {company.name}</p>
        <Heading>Engineering a Cleaner|Energy Future</Heading>
        <p data-reveal>{company.description}</p>
        <p data-reveal>{company.secondaryDescription}</p>
        <div className="mission-vision">
          <div>
            <h3>Our mission</h3>
            <p>{company.mission}</p>
          </div>
          <div>
            <h3>Our vision</h3>
            <p>{company.vision}</p>
          </div>
        </div>
        <div className="principles" data-stagger>
          {principles.map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              {x}
            </div>
          ))}
        </div>
        <a href="#why-us" className="text-link dark-link">
          Discover our approach <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
export function EnergyFlow() {
  return (
    <section id="energy" className="energy-section">
      <div className="container">
        <div className="section-top">
          <div>
            <p className="eyebrow">The energy journey</p>
            <Heading>From Sun to a|Brighter Tomorrow</Heading>
          </div>
          <p>
            A natural source. A considered system.
            <br />A cleaner way to power what comes next.
          </p>
        </div>
        <div className="energy-flow">
          <svg
            className="energy-line"
            viewBox="0 0 1000 50"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 25H1000" stroke="#345063" fill="none" />
            <path
              className="energy-draw"
              d="M0 25H1000"
              stroke="#EFBF55"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          {["Sunlight", "Solar technology", "Clean energy", "Your world"].map(
            (x, i) => (
              <div className="flow-node" key={x}>
                <div className="flow-symbol">
                  {i === 0 ? (
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="20" cy="20" r="7" />
                      <path d="M20 2v7m0 22v7M2 20h7m22 0h7M7 7l5 5m16 16 5 5M7 33l5-5M28 12l5-5" />
                    </svg>
                  ) : (
                    <Icon kind={i === 1 ? 3 : i === 2 ? 5 : 0} />
                  )}
                </div>
                <span className="node-index">0{i + 1}</span>
                <h3>{x}</h3>
                <p>
                  {
                    [
                      "An abundant beginning.",
                      "Converting light into potential.",
                      "Energy with a new purpose.",
                      "Powering everyday possibility.",
                    ][i]
                  }
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
export function Solutions() {
  return (
    <section id="solutions" className="section container">
      <div className="section-top">
        <div>
          <p className="eyebrow dark">Our services</p>
          <Heading>Solar Expertise.|Complete Support.</Heading>
        </div>
        <p>
          From genuine equipment supply to technical support.
          <br />
          Electrical and solar services built around your project.
        </p>
      </div>
      <div className="sectors" aria-label="Sectors we serve">
        {sectors.map((sector) => (
          <div key={sector.title}>
            <h3>{sector.title}</h3>
            <p>{sector.detail}</p>
          </div>
        ))}
      </div>
      <div className="solutions-grid" data-stagger>
        {solutions.map((s, i) => (
          <a
            href={`#contact`}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("project-type", { detail: s.short }),
              )
            }
            className="solution"
            key={s.title}
          >
            <div className="solution-top">
              <span>0{i + 1}</span>
              <Icon kind={i} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <span className="solution-more">
              Explore solution <Arrow diagonal />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="services" className="process-section section">
      <div className="container">
        <p className="eyebrow dark">From concept to clean energy</p>
        <Heading>A Seamless Journey|to Solar Success</Heading>
        <div className="process-list">
          <div className="process-line">
            <div className="process-progress" />
          </div>
          {process.map((s, i) => (
            <div className="process-item" key={s.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  function open(p: Project) {
    setSelected(p);
    dialog.current?.showModal();
  }
  return (
    <section id="projects" className="section container">
      <div className="section-top">
        <div>
          <p className="eyebrow dark">From our company profile</p>
          <Heading>Equipment &|Installation Highlights.</Heading>
        </div>
        <p>
          GoodWe systems, installation work and storage equipment.
          <br />
          Images and descriptions from our company profile.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <button
            className={`project project-${i}`}
            onClick={() => open(p)}
            key={p.title}
            aria-label={`View ${p.title} profile highlight`}
          >
            <div className="project-image" data-image>
              <img src={p.image} alt={p.alt} loading="lazy" />
              <span className="project-tag">
                Company profile · Page {p.sourcePage}
              </span>
              <span className="project-arrow">
                <Arrow diagonal />
              </span>
            </div>
            <div className="project-caption">
              <div>
                <span>{p.category} / PROFILE HIGHLIGHT</span>
                <h3>{p.title}</h3>
              </div>
              <small>View details</small>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close project details"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        {selected && (
          <>
            <img src={selected.image} alt={selected.alt} />
            <div className="dialog-content">
              <p className="eyebrow dark">Company profile highlight</p>
              <h2 id="project-title">{selected.title}</h2>
              <p>{selected.description}</p>
              <dl>
                {Object.entries({
                  Location: selected.location,
                  Category: selected.category,
                  Capacity: selected.capacity,
                  Year: selected.year,
                  Client: selected.client,
                  Status: selected.status,
                }).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v ?? "Not specified in the profile"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
export function Statistics() {
  return (
    <section className="statistics-section">
      <div className="container">
        <div className="impact-title">
          <div>
            <p className="eyebrow">Company at a glance</p>
            <h2>Local Expertise. Global Technology.</h2>
          </div>
        </div>
        <div className="statistics profile-facts" data-stagger>
          {statistics.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <h3>{fact.label}</h3>
              <small>{fact.detail}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function WhyRoyalSolar() {
  return (
    <section id="why-us" className="section container why">
      <div>
        <p className="eyebrow dark">Why {company.name}</p>
        <Heading>More Than Solar.|A Brighter Future.</Heading>
        <p>
          Good engineering considers the whole picture.
          <br />
          Our approach starts with what matters to you.
        </p>
        <a href="#contact" className="text-link dark-link">
          Let's talk about your project <Arrow diagonal />
        </a>
      </div>
      <div className="why-grid" data-stagger>
        {reasons.map(([title, copy], i) => (
          <div key={title}>
            <Icon kind={i} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <div className="cta-image" data-image>
        <img
          src="/images/profile-solar-panels.webp"
          alt="Solar installation imagery supplied in the company profile"
          loading="lazy"
        />
      </div>
      <div className="container cta-inner">
        <p className="eyebrow">The next chapter starts with you</p>
        <h2 data-reveal>
          LET'S POWER A<br />
          <em>SUSTAINABLE FUTURE.</em>
        </h2>
        <p>
          Talk to Royal Voltage Trading about genuine GoodWe equipment and the
          right solar solution for your project.
        </p>
        <a className="button gold" href="#contact">
          Start your solar project <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
