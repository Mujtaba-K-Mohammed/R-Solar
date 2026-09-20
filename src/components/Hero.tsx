import { Component, lazy, Suspense, type ReactNode } from "react";
import { company } from "../data/company";
import { Arrow } from "./Shared";
const Scene = lazy(() => import("./three/SolarScene"));
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            Renewable energy · Solar engineering
          </p>
          <h1>
            POWERING A<br />
            <em>SUSTAINABLE</em>
            <br />
            <em>FUTURE.</em>
          </h1>
          <p className="hero-description">{company.heroDescription}</p>
          <a className="hero-partner" href="#goodwe">
            AUTHORIZED GOODWE DISTRIBUTOR <span>UAE · EST. 2026</span>
          </a>
          <div className="hero-actions">
            <a className="button gold" href="#solutions">
              Explore our solutions <Arrow diagonal />
            </a>
            <a className="text-link" href="#projects">
              View our work <Arrow />
            </a>
          </div>
        </div>
        <div
          className="hero-visual"
          role="img"
          aria-label="Interactive photovoltaic module with dark solar cells, reflective glass and an aluminum frame"
        >
          <img
            className="panel-fallback"
            src="/images/profile-solar-panels.webp"
            alt=""
          />
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </SceneBoundary>
          <div className="visual-label">
            <span className="crosshair">+</span>
            <span>
              PHOTOVOLTAIC TECHNOLOGY
              <small>Engineered to capture possibility.</small>
            </span>
          </div>
        </div>
      </div>
      <div className="hero-bottom container">
        <a href="#about" className="scroll-link">
          <span className="scroll-rule" />
          Scroll to explore
        </a>
        <span>THE FUTURE IS POWERED BY THE SUN</span>
        <span className="edition">01 / SOLAR ENGINEERING</span>
      </div>
    </section>
  );
}
