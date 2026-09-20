import { useState, useEffect, type FormEvent } from "react";
import { company } from "../data/company";
import { solutions } from "../data/solutions";
import { Arrow, Heading } from "./Shared";
type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};
const initial: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};
export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const handler = (e: Event) =>
      setForm((f) => ({
        ...f,
        projectType: (e as CustomEvent<string>).detail,
      }));
    window.addEventListener("project-type", handler);
    return () => window.removeEventListener("project-type", handler);
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.phone && !/^[+\d\s().-]{7,25}$/.test(form.phone))
      next.phone = "Enter a valid phone number.";
    if (!form.projectType) next.projectType = "Choose a project type.";
    if (form.message.trim().length < 10)
      next.message = "Please include at least 10 characters.";
    setErrors(next);
    setStatus("");
    if (Object.keys(next).length) {
      setTimeout(
        () =>
          document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    if (!company.inquiryEndpoint) {
      setStatus(
        "Online inquiries are not connected yet. Your message has not been sent. Please contact us directly by phone or email using the details on this page.",
      );
      return;
    }
    setBusy(true);
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 15000);
    try {
      const response = await fetch(company.inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: abort.signal,
      });
      if (!response.ok) throw new Error("failed");
      setStatus("Thank you. Your inquiry has been sent.");
      setForm(initial);
    } catch {
      setStatus(
        "We could not send your inquiry. Your information is still here; please try again.",
      );
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }
  return (
    <section id="contact" className="section container contact">
      <div>
        <p className="eyebrow dark">Let's connect</p>
        <Heading>Your Solar Journey|Starts Here.</Heading>
        <p>
          Tell us a little about your project.
          <br />
          Let's explore what solar could mean for you.
        </p>
        <div className="contact-details">
          {[
            ["Phone", company.phone],
            ["Email", company.email],
            ["Office", company.office],
            ["Working hours", company.hours],
          ]
            .filter(([, value]) => value)
            .map(([key, value]) => (
              <div key={key}>
                <span>{key}</span>
                <p>
                  {key === "Phone" ? (
                    <a href={company.phoneHref}>{value}</a>
                  ) : key === "Email" ? (
                    <a href={`mailto:${company.email}`}>{value}</a>
                  ) : (
                    value
                  )}
                </p>
              </div>
            ))}
        </div>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="form-grid">
          {(["name", "company", "email", "phone"] as const).map((key) => (
            <label key={key} htmlFor={key}>
              {key === "name"
                ? "Full name"
                : key[0].toUpperCase() + key.slice(1)}
              {["name", "email"].includes(key) ? " *" : " (optional)"}
              <input
                id={key}
                name={key}
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
                autoComplete={
                  key === "company"
                    ? "organization"
                    : key === "phone"
                      ? "tel"
                      : key
                }
                value={form[key]}
                maxLength={key === "phone" ? 25 : 150}
                required={key === "name" || key === "email"}
                aria-invalid={!!errors[key]}
                aria-describedby={errors[key] ? `${key}-error` : undefined}
                placeholder={
                  {
                    name: "Your name",
                    company: "Your company",
                    email: "you@company.com",
                    phone: "+ Country code and number",
                  }[key]
                }
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              {errors[key] && (
                <small id={`${key}-error`} className="field-error">
                  {errors[key]}
                </small>
              )}
            </label>
          ))}
          <label className="full" htmlFor="projectType">
            Project type *
            <select
              id="projectType"
              required
              value={form.projectType}
              aria-invalid={!!errors.projectType}
              aria-describedby={errors.projectType ? "type-error" : undefined}
              onChange={(e) =>
                setForm({ ...form, projectType: e.target.value })
              }
            >
              <option value="">Select your project type</option>
              {solutions.map((s) => (
                <option key={s.short}>{s.short}</option>
              ))}
              <option>Other</option>
            </select>
            {errors.projectType && (
              <small id="type-error" className="field-error">
                {errors.projectType}
              </small>
            )}
          </label>
          <label className="full" htmlFor="message">
            Your message *
            <textarea
              id="message"
              rows={4}
              required
              maxLength={3000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Tell us about your project, location and energy goals…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && (
              <small id="message-error" className="field-error">
                {errors.message}
              </small>
            )}
          </label>
        </div>
        <div className="form-bottom">
          <span>* Required fields</span>
          <button className="button navy" disabled={busy} type="submit">
            {busy ? "Sending…" : "Send inquiry"}
            <Arrow diagonal />
          </button>
        </div>
        <p className="form-status" role="status">
          {status}
        </p>
        {!company.inquiryEndpoint && (
          <p className="form-notice">
            Online inquiries are not connected yet. Please{" "}
            <a href={company.phoneHref}>call us</a> or{" "}
            <a href={`mailto:${company.email}`}>email our team</a> directly.
          </p>
        )}
      </form>
    </section>
  );
}
