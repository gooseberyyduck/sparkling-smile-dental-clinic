

import { Link } from "react-router-dom";
import "../index.css";
import Seo from "../components/Seo";
import { dentistSchema } from "../seo/site";
import { FaqList, faqSchema } from "../components/ContentBlocks";

const WHY_CHOOSE = [
  { title: "Personalised Treatment Plans", text: "We recommend treatments based on your oral health, concerns, and individual requirements." },
  { title: "Multiple Dental Services", text: "Patients can explore preventive, cosmetic, restorative, and general dentistry treatments." },
  { title: "Patient-Focused Consultations", text: "We explain dental conditions and available treatment options before proceeding." },
  { title: "Comfortable Environment", text: "Our welcoming approach helps patients feel more at ease during dental visits." },
  { title: "Focus on Long-Term Oral Health", text: "We consider both immediate dental concerns and ongoing oral health needs." },
];

const TREATMENT_STEPS = [
  { title: "Initial Consultation", text: "Discuss your dental concerns, symptoms, and expectations with the dentist." },
  { title: "Dental Examination", text: "The dentist evaluates your teeth and gums to understand your oral health." },
  { title: "Treatment Recommendations", text: "Suitable procedures are explained based on the examination findings." },
  { title: "Treatment Planning", text: "We discuss the next steps, expected appointments, and relevant treatment considerations." },
];

const HOME_FAQS = [
  { question: "What dental treatments are available at Sparkling Smile Dental Clinic?", answer: "We offer general dentistry, dental cleaning, root canal treatment, teeth whitening, cosmetic dentistry, and crowns and bridges." },
  { question: "How often should I visit a dentist in Abu Dhabi?", answer: "Many patients benefit from a dental check-up every six months. Your dentist may recommend more frequent visits based on your oral health." },
  { question: "Is professional dental cleaning necessary if I brush every day?", answer: "Yes. Regular brushing cannot remove all hardened plaque and tartar. Professional cleaning helps remove these deposits and supports gum health." },
  { question: "When should I consider root canal treatment?", answer: "Root canal treatment may be recommended when decay or infection reaches the inner pulp of a tooth. A dental examination helps determine whether this treatment is necessary." },
  { question: "Can teeth whitening remove all types of stains?", answer: "Teeth whitening can improve certain types of discolouration. However, the results depend on the cause and severity of the stains." },
  { question: "What is the purpose of dental crowns and bridges?", answer: "Crowns restore and protect damaged teeth. Bridges replace missing teeth and help restore chewing function." },
];

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
    "103, Building 159, Sector E 15, Hamdan Street, Opposite Al Salama Hospital, Al Zahiyah, Abu Dhabi";
  const whatsappLink = getWhatsAppLink("0503002504");

  const servicePreview = [
    {
      title: "General Dentistry",
      description:
        "Regular dental examinations help identify tooth decay, gum problems, and other oral health concerns at an early stage. Our general dentistry services focus on maintaining healthy teeth and gums. We provide appropriate examinations and treatments based on individual needs.",
      slug: "general-dentistry",
      icon: "tooth",
    },
    {
      title: "Dental Cleaning",
      description:
        "Daily brushing and flossing may not remove all plaque and tartar deposits. Professional dental cleaning helps remove these accumulated deposits. It also supports gum health and better oral hygiene.",
      slug: "dental-cleaning",
      icon: "sparkles",
    },
    {
      title: "Root Canal Treatment",
      description:
        "Deep tooth decay and infection can affect the inner tissues of a tooth. This may cause pain and sensitivity. Root canal treatment helps remove infected tissue and manage the infection. It also helps preserve the natural tooth whenever possible.",
      slug: "root-canal-treatment",
      icon: "shield",
    },
    {
      title: "Teeth Whitening",
      description:
        "Food, beverages, and other factors can cause tooth discolouration. These stains may affect the appearance of your smile. Professional teeth whitening helps reduce certain stains and improve tooth brightness. A dental assessment helps determine whether the treatment is suitable.",
      slug: "teeth-whitening",
      icon: "smile",
    },
    {
      title: "Cosmetic Dentistry",
      description:
        "Stained, uneven, or imperfect-looking teeth can affect smile confidence. Cosmetic dentistry offers different options to improve the appearance of your teeth. Treatments such as dental veneers can help address selected aesthetic concerns.",
      slug: "cosmetic-dentistry",
      icon: "sun",
    },
    {
      title: "Crowns and Bridges",
      description:
        "Damaged and missing teeth can affect chewing, speech, and smile appearance. Dental crowns help restore and protect weakened teeth. Bridges replace missing teeth and help improve dental function.",
      slug: "crowns-bridges",
      icon: "crown",
    },
  ];

  return (
    <div className="site">
      <Seo
        title="Dentist in Abu Dhabi | Sparkling Smile Dental Clinic"
        description="Looking for a dentist in Abu Dhabi? Visit Sparkling Smile Dental Clinic for quality dental care, experienced dentists and personalised treatments."
        path="/"
        schema={[dentistSchema, faqSchema(HOME_FAQS)]}
      />
      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="brand">
            <img src="/images/sparkling-smile-logo.webp" alt="Sparkling Smile Dental Clinic logo" className="brand-logo-image" width="160" height="155"/>

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

            <Link to="/about">About</Link>

            <Link to="/services">Services</Link>

            <a href="#team">Our Team</a>

            <a href="#gallery">Gallery</a>

            <Link to="/contact">Contact</Link>
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
                Maintaining a healthy smile requires regular attention and
                professional guidance. At Sparkling Smile Dental Clinic, we
                provide a wide array of services for those looking for a
                trustworthy dentist in Abu Dhabi. Our services include
                routine check-ups, cleaning, root canal treatment,
                whitening, cosmetic dentistry, and restorative services. We
                focus on understanding your dental concerns and
                recommending suitable treatments. Our welcoming environment
                also helps make every visit more comfortable.
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
                <img src="/images/clinic-interior-hero.webp" alt="Reception at Sparkling Smile Dental Clinic, Al Zahiyah, Abu Dhabi" className="clinic-hero-image" width="979" height="942" fetchPriority="high"/>
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
                <img loading="lazy" src="/images/clinic-gallery-1.webp" width="1144" height="908" alt="Treatment room at Sparkling Smile Dental Clinic in Abu Dhabi" className="clinic-about-photo"/>
              </div>
            </div>

            <div className="section-content">
              <p className="eyebrow">ABOUT OUR CLINIC</p>

              <h2>
                Care that puts your smile first.
              </h2>

              <p>
                At Sparkling Smile Dental Clinic, our goal is to provide
                professional dental care in a comfortable, welcoming, and
                patient-focused environment. As a dental clinic in Abu
                Dhabi, we understand that every patient has different oral
                health needs. These may include routine dental
                maintenance, tooth pain, damaged teeth, or concerns about
                smile appearance.
              </p>

              <p>
                Our approach begins with understanding your concerns and
                evaluating your dental health. We then recommend suitable
                treatment options based on your needs. We also explain
                procedures and discuss available solutions. This helps
                patients make informed decisions about their oral health.
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
                Maintaining healthy teeth and gums requires regular
                attention. From preventive examinations to restorative and
                cosmetic procedures, our dental clinic in Abu Dhabi offers
                treatments for common oral health concerns. We help
                patients address existing dental problems and maintain
                their smiles.
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
            WHY CHOOSE US
            ===================================================== */}

        <section className="section home-info-section why-choose-section">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">WHY CHOOSE US</p>

              <h2>Why choose Sparkling Smile Dental Clinic?</h2>

              <p>
                Finding the best dentist in Abu Dhabi involves more than
                choosing a convenient location. Patients also need clear
                communication and appropriate treatment recommendations. A
                comfortable environment is equally important when seeking
                professional dental care.
              </p>

              <p>
                At Sparkling Smile Dental Clinic, we consider each
                patient's dental condition and individual requirements.
              </p>
            </div>

            <div className="info-grid">
              {WHY_CHOOSE.map((item) => (
                <div className="info-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW WE APPROACH TREATMENT
            ===================================================== */}

        <section className="section home-info-section approach-section">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">OUR PROCESS</p>

              <h2>How we approach your dental treatment</h2>

              <p>
                Understanding what happens during an appointment can make
                dental visits less stressful. This is especially helpful if
                you are visiting a dentist in Abu Dhabi for the first time.
              </p>

              <p>Our consultation and treatment planning approach includes:</p>
            </div>

            <div className="info-grid">
              {TREATMENT_STEPS.map((step, index) => (
                <div className="info-card" key={step.title}>
                  <span className="step-number">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>

            <p className="info-note">
              This process helps patients understand their dental needs. It
              also allows them to make informed decisions about their
              treatment.
            </p>
          </div>
        </section>

        {/* =====================================================
            PREVENTIVE CARE
            ===================================================== */}

        <section className="section home-info-section preventive-section">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">PREVENTIVE CARE</p>

              <h2>Keep your smile healthy with preventive dental care</h2>
            </div>

            <div className="home-prose">
              <p>
                Not every dental problem causes noticeable discomfort in
                its early stages. Regular examinations can help identify
                developing concerns before they become more complicated.
                Good oral hygiene also plays an important role in
                preventing common dental problems.
              </p>

              <p>
                Brush twice daily and floss regularly to maintain clean
                teeth. Professional dental cleaning and routine check-ups
                provide additional support. These habits help maintain
                healthy teeth and gums over time.
              </p>

              <p>
                If you experience persistent toothache, bleeding gums, or
                sensitivity, arrange a dental assessment. A dentist can
                identify the underlying cause and recommend suitable
                treatment. Regular visits to a dental clinic in Abu Dhabi
                can also help you maintain consistent oral health care.
              </p>
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
                    src="/images/doctor.webp"
                    width="520"
                    height="606"
                    loading="lazy"
                    alt="Dr. Jyoti Raheja"
                  />
                </div>

                <div className="doctor-info">
                  <h3>Dr. Jyoti Raheja</h3>

                  <p className="doctor-qualification">
                    Dentist
                  </p>

                  <p>MDS – Conservative Dentistry &amp; Endodontics (2010–2013)</p>
                  <p><strong>18+ years of experience</strong></p>

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
                <img loading="lazy" src="/images/clinic-gallery-1.webp" width="1144" height="908" alt="Sparkling Smile Dental Clinic Abu Dhabi, clinic photo 1" className="gallery-image"/>
              </div>

              <div className="gallery-item">
                <img loading="lazy" src="/images/clinic-gallery-2.webp" width="640" height="538" alt="Sparkling Smile Dental Clinic Abu Dhabi, clinic photo 2" className="gallery-image"/>
              </div>

              <div className="gallery-item">
                <img loading="lazy" src="/images/clinic-gallery-3.webp" width="640" height="538" alt="Sparkling Smile Dental Clinic Abu Dhabi, clinic photo 3" className="gallery-image"/>
              </div>

              <div className="gallery-item">
                <img loading="lazy" src="/images/clinic-gallery-4.webp" width="640" height="538" alt="Sparkling Smile Dental Clinic Abu Dhabi, clinic photo 4" className="gallery-image"/>
              </div>

              <div className="gallery-item">
                 <img loading="lazy" src="/images/clinic-gallery-5.webp" width="640" height="538" alt="Sparkling Smile Dental Clinic Abu Dhabi, clinic photo 5" className="gallery-image"/>
              </div>
              <div className="gallery-item">
                <img
                  src="/images/gallery-treatment-1.webp"
                  width="650"
                  height="273"
                  loading="lazy"
                  alt="Dr. Jyoti Raheja providing dental treatment"
                  className="gallery-image"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="/images/gallery-treatment-2.webp"
                  width="640"
                  height="537"
                  loading="lazy"
                  alt="Dental treatment at Sparkling Smile Dental Clinic"
                  className="gallery-image"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="/images/gallery-treatment-3.webp"
                  width="640"
                  height="537"
                  loading="lazy"
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
                Whether you need a routine check-up, professional
                cleaning, or treatment for an existing dental concern,
                Sparkling Smile Dental Clinic is here to help. If you are
                looking for the best dentist in Abu Dhabi for your dental
                needs, book a consultation with our team. We will evaluate
                your oral health and discuss suitable treatment options
                based on your individual assessment.
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
                Have questions about our dental treatments or need
                assistance with an appointment? Contact {clinicName} for
                treatment enquiries and consultation details.
              </p>

              <p>
                Our team can also help you with appointment-related
                questions. We look forward to helping you take the next
                step towards better oral health.
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

        {/* =====================================================
            FAQ
            ===================================================== */}

        <section id="faq" className="section home-info-section faq-section">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>

              <h2>Your questions, answered.</h2>
            </div>

            <FaqList faqs={HOME_FAQS} />
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

            <Link to="/about">About Us</Link>

            <Link to="/services/cosmetic-dentistry">Cosmetic Dentistry</Link>

            <Link to="/services/pediatric-dentistry">Pediatric Dentist</Link>

            <Link to="/contact">Emergency Dentist</Link>

            <Link to="/contact">Contact</Link>
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
