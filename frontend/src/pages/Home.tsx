

import { Link } from "react-router-dom";
import "../index.css";

function getWhatsAppLink(number: string): string {
  let digits = number.replace(/\D/g, "");

  // Convert a UAE local number such as 0503002504
  // to the international format required by WhatsApp.
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0")) {
    digits = `971${digits.slice(1)}`;
  }

  return `https://wa.me/${digits || "971503002504"}`;
}

function ServicePreviewIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  let artwork;

  switch (name) {
    case "tooth":
      artwork = (
        <>
          <path {...common} d="M8.5 5.8C5.8 6.2 4.8 9.2 5.8 12.3L8.5 21c.4 1.2 1.7 1.2 2.1 0l1.4-5.2c.3-1.1 1.8-1.1 2.1 0l1.4 5.2c.4 1.2 1.7 1.2 2.1 0l2.7-8.7c1-3.1 0-6.1-2.7-6.5-2-.3-3.1 1.3-4.3 1.3S10.5 5.5 8.5 5.8Z" />
        </>
      );
      break;
    case "sparkles":
      artwork = (
        <>
          <path {...common} d="M12 3.5 14 9l5.5 2-5.5 2-2 5.5-2-5.5-5.5-2L10 9l2-5.5Z" />
          <path {...common} d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
          <path {...common} d="m5 3 .7 1.6L7.3 5.3l-1.6.7L5 7.6l-.7-1.6-1.6-.7 1.6-.7L5 3Z" />
        </>
      );
      break;
    case "shield":
      artwork = <path {...common} d="M12 3.5 19 6v5.4c0 4.5-2.9 7.5-7 9.1-4.1-1.6-7-4.6-7-9.1V6l7-2.5Z M8.5 12.1l2.2 2.2 4.8-4.8" />;
      break;
    case "smile":
      artwork = (
        <>
          <path {...common} d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z" />
          <path {...common} d="M7.8 13.2c1 2 2.4 3 4.2 3s3.2-1 4.2-3" />
          <path {...common} d="M8.5 9.5h.1M15.4 9.5h.1" />
        </>
      );
      break;
    case "sun":
      artwork = (
        <>
          <path {...common} d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
          <path {...common} d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" />
        </>
      );
      break;
    case "child":
      artwork = (
        <>
          <circle {...common} cx="12" cy="8" r="4" />
          <path {...common} d="M4.5 20c.5-4 3.2-6 7.5-6s7 2 7.5 6" />
          <path {...common} d="M8.5 8.5h.1M15.4 8.5h.1M10 10.2c.6.6 1.4.6 2 0" />
        </>
      );
      break;
      case "crown":
        artwork = (
          <>
            <path
              {...common}
              d="M2 7l5 4 5-7 5 7 5-4-2 13H4L2 7Z"
            />
            <path {...common} d="M4 16h16" />
          </>
        );
        break;
    default:
      artwork = <circle {...common} cx="12" cy="12" r="8" />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="service-preview-icon-art"
      aria-hidden="true"
      focusable="false"
    >
      {artwork}
    </svg>
  );
}
function Home() {
  const clinicName = "Sparkling Smile Dental Clinic";
  const clinicPhone = "0503002504";
  const alternatePhone = "026272214";
  const clinicEmail = "sparklingsmiledentalclinicad@gmail.com";
  const clinicAddress =
    "103, Building 159, Sector E 15, Hamdan Street, Near Bilal Mosque, Opposite Al Salama Hospital, Al Zahiyah, Abu Dhabi";
  const whatsappLink = getWhatsAppLink("0503002504");

  const servicePreview = [
    {
      title: "General Dentistry",
      description:
        "Comprehensive dental care focused on maintaining healthy teeth and gums.",
      slug: "general-dentistry",
      icon: "tooth",
    },
    {
      title: "Dental Cleaning",
      description:
        "Professional cleaning to help maintain oral hygiene and a healthy smile.",
      slug: "dental-cleaning",
      icon: "sparkles",
    },
    {
      title: "Root Canal Treatment",
      description:
        "Treatment designed to manage infection and preserve your natural tooth.",
      slug: "root-canal-treatment",
      icon: "shield",
    },
    {
      title: "Teeth Whitening",
      description:
        "Professional cosmetic treatment to enhance the brightness of your smile.",
      slug: "teeth-whitening",
      icon: "smile",
    },
    {
      title: "Cosmetic Dentistry",
      description:
        "Personalised options to improve the appearance of your smile.",
      slug: "dental-veneers",
      icon: "sun",
    },
    {
      title: "Crowns and Bridges",
      description:
        "Restorative dental treatments designed to restore damaged teeth and replace missing teeth, improving function and appearance.",
      slug: "crowns-and-bridges",
      icon: "crown",
    },
  ];

  return (
    <div className="site">
      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="brand">
            <img src="/images/sparkling-smile-logo.png" alt="Sparkling Smile Dental Clinic" className="brand-logo-image"/>

            <div className="brand-text">
              <span className="brand-name">
                <span className="brand-sparkling">Sparkling</span>{" "}
                <span className="brand-smile">Smile</span>
                </span>
                <span className="brand-tagline">DENTAL CLINIC</span>
              </div>
          </Link>

          <nav className="nav-links">
            <Link to="/">Home</Link>

            <a href="#about">About</a>

            <Link to="/services">Services</Link>

            <a href="#team">Our Team</a>

            <a href="#gallery">Gallery</a>

            <a href="#contact">Contact</a>
          </nav>

          <Link to="/appointment" className="nav-button">
            Book Appointment
          </Link>
        </div>
      </header>

      {/* =====================================================
          HERO
          ===================================================== */}

      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">
                SPARKLING SMILE DENTAL CLINIC
              </p>

              <h1>
                A healthier smile
                <br />
                starts here.
              </h1>

              <p className="hero-description">
                Professional dental care delivered with expertise,
                precision, and genuine attention to every patient.
              </p>

              <div className="hero-buttons">
                <Link
                  to="/appointment"
                  className="primary-button"
                >
                  Book an Appointment
                </Link>

                <Link
                  to="/services"
                  className="secondary-button"
                >
                  Explore Our Services
                </Link>
              </div>

              <div className="hero-details">
                <div>
                  <strong>Experienced</strong>
                  <span>Dental Professionals</span>
                </div>

                <div>
                  <strong>Modern</strong>
                  <span>Clinical Approach</span>
                </div>

                <div>
                  <strong>Patient</strong>
                  <span>Focused Care</span>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <div className="image-placeholder clinic-hero-frame">
                <img src="/images/clinic-interior-hero.jpg"alt="Sparkling Smile Dental Clinic interior"className="clinic-hero-image"/>
              </div>

              <div className="hero-badge">
                <strong>Trusted Dental Care</strong>
                <span>For Every Smile</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
            ===================================================== */}

        <section
          id="about"
          className="section about-section"
        >
          <div className="container two-column">
            <div className="section-image">
              <div className="image-placeholder clinic-about-frame">
                <img src="/images/clinic-gallery-1.jpg" alt="Inside Sparkling Smile Dental Clinic" className="clinic-about-photo"/>
              </div>
            </div>

            <div className="section-content">
              <p className="eyebrow">ABOUT OUR CLINIC</p>

              <h2>
                Care that puts your smile first.
              </h2>

              <p>
                At Sparkling Smile Dental Clinic, our goal is to
                provide professional dental care in a comfortable,
                welcoming, and patient-focused environment.
              </p>

              <p>
                From routine dental care to specialized treatments,
                every treatment plan is tailored to the individual
                needs of our patients.
              </p>

              <a href="#contact" className="text-link">
                Get in touch →
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICES PREVIEW
            ===================================================== */}

        <section
          id="services"
          className="section services-section"
        >
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">OUR SERVICES</p>

              <h2>
                Complete dental care under one roof.
              </h2>

              <p>
                Explore our range of general, cosmetic,
                restorative, surgical, and root canal treatments.
              </p>
            </div>

            <div className="services-grid">
              {servicePreview.map((service) => (
                <article
                  className="service-card"
                  key={service.slug}
                >
                  <div className="service-icon" aria-hidden="true">
                    <ServicePreviewIcon name={service.icon} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link
                    to={`/services/${service.slug}`}
                    className="service-card-link"
                  >
                    View Treatment Details →
                  </Link>
                </article>
              ))}
            </div>

            <div
              style={{
                marginTop: "40px",
                textAlign: "center",
              }}
            >
              <Link
                to="/services"
                className="primary-button"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            TEAM
            ===================================================== */}

        <section
          id="team"
          className="section team-section"
        >
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">OUR TEAM</p>

              <h2>
                Meet our dental professional.
              </h2>

              <p>
                Dedicated to providing thoughtful,
                personalized dental care.
              </p>
            </div>

            <div className="team-grid">
              
              <Link
                to="/doctor"
                className="doctor-card doctor-card-link"
                aria-label="View Dr. Jyoti Raheja's profile"
              >
                <div className="doctor-photo">
                  <img
                    src="/images/doctor.jpg"
                    alt="Dr. Jyoti Raheja"
                  />
                </div>

                <div className="doctor-info">
                  <h3>Dr. Jyoti Raheja</h3>

                  <p className="doctor-qualification">
                    Endodontist · DoH-Licensed General Dentist
                  </p>

                  <p>MDS – Conservative Dentistry &amp; Endodontics</p>
                  <p><strong>18+ years of experience</strong> · All India Rank 1, MDS Entrance Exam (2010)</p>

                  <span className="doctor-profile-link">
                    View Doctor Profile →
                  </span>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* =====================================================
            GALLERY
            ===================================================== */}

        <section
          id="gallery"
          className="section gallery-section"
        >
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">OUR CLINIC</p>

              <h2>
                A comfortable space for your dental care.
              </h2>

              <p>
                Take a look inside Sparkling Smile Dental Clinic.
              </p>
            </div>

            <div className="gallery-grid">
              <div className="gallery-item large">
                <img src="/images/clinic-gallery-1.jpg"alt="Sparkling Smile Dental Clinic gallery photo 1"className="gallery-image"/>
              </div>

              <div className="gallery-item">
                <img src="/images/clinic-gallery-2.jpg"alt="Sparkling Smile Dental Clinic gallery photo 2"className="gallery-image"/>
              </div>

              <div className="gallery-item">
                <img src="/images/clinic-gallery-3.jpg"alt="Sparkling Smile Dental Clinic gallery photo 3"className="gallery-image"/>
              </div>

              <div className="gallery-item">
                <img src="/images/clinic-gallery-4.jpg"alt="Sparkling Smile Dental Clinic gallery photo 4"className="gallery-image"/>
              </div>

              <div className="gallery-item">
                 <img src="/images/clinic-gallery-5.jpg"alt="Sparkling Smile Dental Clinic gallery photo 5"className="gallery-image"/>
              </div>
              <div className="gallery-item">
                <img
                  src="/images/gallery-treatment-1.jpeg"
                  alt="Dr. Jyoti Raheja providing dental treatment"
                  className="gallery-image"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="/images/gallery-treatment-2.jpeg"
                  alt="Dental treatment at Sparkling Smile Dental Clinic"
                  className="gallery-image"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="/images/gallery-treatment-3.jpeg"
                  alt="Dentist performing a dental procedure"
                  className="gallery-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            APPOINTMENT
            ===================================================== */}

        <section
          id="appointment"
          className="section appointment-section"
        >
          <div className="container appointment-box">
            <div>
              <p className="eyebrow">APPOINTMENTS</p>

              <h2>
                Ready to take care of your smile?
              </h2>

              <p>
                Book your consultation with Sparkling Smile Dental
                Clinic. Choose a date and an available time.
                Your dentist will evaluate your needs and recommend
                the appropriate treatment during your consultation.
              </p>
            </div>

            <div className="appointment-action">
              <Link
                to="/appointment"
                className="primary-button"
              >
                Book an Appointment
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT
            ===================================================== */}

        <section
          id="contact"
          className="section contact-section"
        >
          <div className="container two-column">
            <div className="section-content">
              <p className="eyebrow">CONTACT US</p>

              <h2>
                We'd love to hear from you.
              </h2>

              <p>
                Contact {clinicName} for appointments,
                treatment enquiries, or any other questions.
              </p>

              <div className="contact-details">
                <div>
                  <span>Phone</span>

                  <strong>
                    <a href={`tel:${clinicPhone.replace(/[^\d+]/g, "")}`}>
                      {clinicPhone}
                    </a>
                  </strong>
                </div>

                <div>
                  <span>Alternate Phone</span>

                  <strong>
                    <a
                      href={`tel:${alternatePhone.replace(/[^\d+]/g, "")}`}
                    >
                      {alternatePhone}
                    </a>
                  </strong>
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    <a href={`mailto:${clinicEmail}`}>
                      {clinicEmail}
                    </a>
                  </strong>
                </div>

                <div>
                  <span>Address</span>
                  <strong>{clinicAddress}</strong>
                </div>

                <div>
                  <span>Working Hours</span>

                  <strong>
                    Every Day · 9:00 AM – 9:00 PM
                  </strong>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h3>Further enquiries?</h3>

              <p>
                Reach our clinic team directly through
                WhatsApp for quick assistance.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button full-width"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>
              SPARKLING SMILE DENTAL CLINIC
            </strong>

            <p>
              Professional dental care for every smile.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>

            <Link to="/services">Services</Link>

            <a href="#about">About</a>

            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="container copyright">
          © {new Date().getFullYear()} Sparkling Smile Dental Clinic.
          All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
