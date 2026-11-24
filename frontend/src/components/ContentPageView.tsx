import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ContentPage } from "../content/pages";
import { CLINIC } from "../seo/site";
import { ContentBlocks, FaqList } from "./ContentBlocks";

export function SiteHeader() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img
            src="/images/sparkling-smile-logo.webp"
            alt="Sparkling Smile Dental Clinic logo"
            className="brand-logo-image"
            width="160"
            height="155"
          />
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/doctor">Our Team</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>SPARKLING SMILE DENTAL CLINIC</strong>
          <p>Dental clinic in Al Zahiyah, Abu Dhabi.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container copyright">
        © {new Date().getFullYear()} Sparkling Smile Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
}

type Props = {
  page: ContentPage;
  sidebar?: ReactNode;
  heroActions?: ReactNode;
};

/* Shared layout for content pages (About, Contact) using the service-page styles. */
function ContentPageView({ page, sidebar, heroActions }: Props) {
  return (
    <>
      <SiteHeader />

      <section className="service-detail-hero">
        <div className="container">
          <p className="eyebrow">{page.category}</p>
          <h1>{page.title}</h1>
          {page.intro.map((text, index) => (
            <p key={index} className="service-hero-description">
              {text}
            </p>
          ))}
          <div className="service-hero-actions">
            {heroActions ?? (
              <a
                href={CLINIC.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button"
              >
                WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container service-detail-layout">
          <article className="service-detail-content">
            {page.sections.map((section) => (
              <section key={section.eyebrow} className="service-detail-section">
                <p className="eyebrow">{section.eyebrow}</p>
                <h2>{section.heading}</h2>
                <ContentBlocks blocks={section.blocks} />
                {section.eyebrow === "NEXT STEP" && (
                  <div className="service-hero-actions">
                    <a
                      href={CLINIC.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="whatsapp-button"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                )}
              </section>
            ))}

            {page.faqs.length > 0 && (
              <section className="service-detail-section">
                <p className="eyebrow">FAQ</p>
                <h2>Frequently Asked Questions</h2>
                <FaqList faqs={page.faqs} />
              </section>
            )}
          </article>

          <aside className="service-sidebar">
            {sidebar ?? (
              <div className="service-sidebar-card">
                <p className="eyebrow">VISIT US</p>
                <h3>{CLINIC.name}</h3>
                <div className="sidebar-detail">
                  <span>Address</span>
                  <strong>{CLINIC.streetAddress}, {CLINIC.locality}</strong>
                </div>
                <div className="sidebar-detail">
                  <span>Opening hours</span>
                  <strong>Open daily, 9:00 AM to 9:00 PM</strong>
                </div>
                <a
                  href={CLINIC.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-button full-width"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

export default ContentPageView;
