import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { SiteFooter, SiteHeader } from "../components/ContentPageView";
import "../index.css";

function NotFound() {
  return (
    <div className="site">
      <Seo
        title="Page not found | Sparkling Smile Dental Clinic"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <SiteHeader />
      <main className="page-message not-found-page">
        <h1>Page not found</h1>
        <p>The page you are looking for may have moved or no longer exists.</p>
        <div className="service-hero-actions">
          <Link to="/" className="primary-button">Go to Home</Link>
          <Link to="/services" className="secondary-button">View Our Services</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default NotFound;
