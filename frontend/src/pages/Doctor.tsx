import { Link } from "react-router-dom";
import "../index.css";

function Doctor() {
  return (
    <div className="site doctor-profile-page">
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="brand">
            <div className="brand-logo">S</div>

            <div className="brand-text">
              <span className="brand-name">
                SPARKLING SMILE
              </span>
              <span className="brand-tagline">
                Dental Clinic
              </span>
            </div>
          </Link>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/appointment">Appointments</Link>
          </nav>

          <Link to="/appointment" className="nav-button">
            Book Consultation
          </Link>
        </div>
      </header>

      <main>
        <section className="doctor-profile-hero">
          <div className="container doctor-profile-grid">
            <div className="doctor-profile-photo">
              <div className="image-placeholder">
                <span>Doctor Photo</span>
                <small>
                  The clinic's approved doctor photograph
                  can be added here.
                </small>
              </div>
            </div>

            <div className="doctor-profile-content">
              <p className="eyebrow">
                MEET YOUR DENTIST
              </p>

              <h1>Dr. Jyoti Raheja</h1>

              <p className="doctor-profile-role">
                Endodontist · DoH-Licensed General Dentist
              </p>

              <div className="doctor-qualification-badge">
                MDS – Conservative Dentistry &amp; Endodontics
              </div>

              <p className="doctor-profile-description">
                Dr. Jyoti Raheja is an Endodontist and DoH-licensed
                General Dentist based in Abu Dhabi, with over 18 years
                of experience in India and the UAE, including practice
                in Abu Dhabi since 2019. She holds an MDS in Conservative
                Dentistry &amp; Endodontics from PGIDS Rohtak, where she
                earned All India Rank 1 in the 2010 MDS entrance exam.
                Her approach combines clinical experience with a
                patient-focused commitment to explaining treatment
                options and helping patients make informed decisions.
              </p>

              <div className="doctor-profile-actions">
                <Link
                  to="/appointment"
                  className="primary-button"
                >
                  Book a Consultation
                </Link>

                <Link
                  to="/services"
                  className="secondary-button"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section doctor-profile-details">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">
                PROFESSIONAL PROFILE
              </p>

              <h2>
                Experience, expertise, and patient-focused care.
              </h2>

              <p>
                Learn more about Dr. Raheja's academic background,
                clinical areas of expertise, research, and approach
                to dental care.
              </p>
            </div>

            <div className="doctor-detail-grid">
              <article className="doctor-detail-card">
                <div className="service-icon" aria-hidden="true">18+</div>
                <h3>Years of Experience</h3>
                <p>
                  Over 18 years of dental experience across India
                  and the UAE, including practice in Abu Dhabi since 2019.
                </p>
              </article>

              <article className="doctor-detail-card">
                <div className="service-icon" aria-hidden="true">#1</div>
                <h3>Academic Achievement</h3>
                <p>
                  All India Rank 1 in the 2010 MDS entrance examination.
                </p>
              </article>

              <article className="doctor-detail-card">
                <div className="service-icon" aria-hidden="true">MDS</div>
                <h3>Specialist Qualification</h3>
                <p>
                  MDS in Conservative Dentistry &amp; Endodontics from
                  the Postgraduate Institute of Dental Sciences (PGIDS), Rohtak.
                </p>
              </article>
            </div>

            <div className="doctor-biography-sections">
              <article className="doctor-biography-block">
                <h2>Education and Academic Excellence</h2>
                <p>
                  Dr. Raheja earned her <strong>MDS in Conservative Dentistry
                  &amp; Endodontics</strong> from the <strong>Postgraduate
                  Institute of Dental Sciences (PGIDS), Rohtak</strong>.
                  She achieved <strong>All India Rank 1</strong> in the
                  2010 MDS entrance examination.
                </p>
              </article>

              <article className="doctor-biography-block">
                <h2>Clinical Expertise and Specialisations</h2>
                <p>
                  Her clinical expertise includes endodontic treatments
                  and restorative procedures, tailored to the patient's
                  clinical needs and assessment.
                </p>
                <ul>
                  <li>
                    <strong>Single-sitting root canal treatments:</strong>{" "}
                    Completing treatment in one appointment when clinically appropriate.
                  </li>
                  <li>
                    <strong>Microscopic root canal treatments:</strong>{" "}
                    Using magnification to support precision in complex cases.
                  </li>
                  <li>
                    <strong>Root canal re-treatments:</strong>{" "}
                    Further treatment when a previously treated tooth requires it.
                  </li>
                  <li>
                    <strong>CBCT-guided root canal treatments:</strong>{" "}
                    Using three-dimensional imaging when indicated.
                  </li>
                  <li>
                    <strong>Post-and-core restorations:</strong>{" "}
                    Restorative support for teeth when clinically required.
                  </li>
                  <li>
                    <strong>Aesthetic restorations:</strong>{" "}
                    Crowns, bridges, and veneers.
                  </li>
                </ul>
              </article>

              <article className="doctor-biography-block">
                <h2>Research and Professional Development</h2>
                <p>
                  Dr. Raheja has published research on
                  <strong> endodontic-periodontal lesions</strong> in the
                  <em> Journal of Periodontology</em> and has presented
                  at national dental conventions. She remains committed
                  to continuous learning and professional development.
                </p>
              </article>

              <article className="doctor-biography-block">
                <h2>A Patient-Focused Approach</h2>
                <p>
                  Dr. Raheja aims to help patients understand their
                  diagnosis and available treatment options. Following
                  a clinical assessment, she discusses appropriate
                  recommendations and an individualised plan based on
                  each patient's needs, with an emphasis on clear
                  communication and attention to detail.
                </p>
              </article>
            </div>

            <div className="doctor-profile-cta">
              <h2>Book a Consultation</h2>
              <p>
                Visit Sparkling Smile Dental Clinic to discuss your
                dental concerns with Dr. Jyoti Raheja and learn about
                suitable care options following an assessment.
              </p>
              <Link to="/appointment" className="primary-button">
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>SPARKLING SMILE DENTAL CLINIC</strong>
            <p>Professional dental care for every smile.</p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/appointment">Appointments</Link>
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

export default Doctor;
