import Seo from "../components/Seo";
import ContentPageView from "../components/ContentPageView";
import { CONTACT_PAGE } from "../content/pages";
import { CLINIC, dentistSchema } from "../seo/site";
import "../index.css";

function Contact() {
  return (
    <div className="site">
      <Seo
        title={CONTACT_PAGE.metaTitle}
        description={CONTACT_PAGE.metaDescription}
        path="/contact"
        schema={dentistSchema}
      />
      <ContentPageView
        page={CONTACT_PAGE}
        heroActions={
          <>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-button"
            >
              WhatsApp Us
            </a>
            <a href={`tel:${CLINIC.phone}`} className="secondary-button">
              Call 050 300 2504
            </a>
          </>
        }
        sidebar={
          <div className="service-sidebar-card">
            <p className="eyebrow">CONTACT DETAILS</p>
            <h3>{CLINIC.name}</h3>
            <div className="sidebar-detail">
              <span>Phone</span>
              <strong>
                <a href={`tel:${CLINIC.phone}`}>050 300 2504</a> /{" "}
                <a href={`tel:${CLINIC.altPhone}`}>02 627 2214</a>
              </strong>
            </div>
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
        }
      />
    </div>
  );
}

export default Contact;
