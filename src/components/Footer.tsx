import { company } from "../data/company";
import { Brand } from "./Shared";
export default function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Brand />
          <p>
            Solar engineering.
            <br />A brighter tomorrow.
          </p>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#about">About us</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h3>Solutions</h3>
          <a href="#solutions">Commercial</a>
          <a href="#solutions">Industrial</a>
          <a href="#solutions">Residential</a>
          <a href="#goodwe">GoodWe products</a>
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href="#contact">Start a conversation ↗</a>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <span>{company.office}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </span>
        <span>ENGINEERING A CLEANER ENERGY FUTURE</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
