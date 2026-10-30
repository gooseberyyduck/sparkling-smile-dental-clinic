import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

type Service = {

  id: number;

  name: string;

  slug: string;

  category: string;

  short_description: string | null;

  duration_minutes: number;

  price: number | string | null;

  image: string | null;

};

const API_URL = "http://localhost:5000/api";

const ROOT_CANAL_FALLBACK: Service = {

  id: -1,

  name: "Root Canal Treatment",

  slug: "root-canal-treatment",

  category: "Root Canal Treatment",

  short_description: null,

  duration_minutes: 30,

  price: null,

  image: null,

};

/* ==========================================================

   CHOOSE THE MOST RELEVANT AVAILABLE SERVICE IMAGE

   ========================================================== */

function getServiceImage(service: Service): string {

  if (service.image?.trim()) {

    const image = service.image.trim();

    if (/^https?:\/\//i.test(image) || image.startsWith("/")) {

      return image;

    }

    if (image.startsWith("images/")) {

      return `/${image}`;

    }

    return `/images/${image}`;

  }

  const slug = service.slug.toLowerCase();

  const text =

    `${service.name} ${service.category} ${service.slug}`.toLowerCase();

  // Unique cosmetic dentistry images

  const uniqueImages: Record<string, string> = {

    "dental-jewellery": "dental-jewellery.jpg",

    "dental-veneers": "dental-veneers.jpg",

    "digital-smile-design": "digital-smile-design.jpg",

    "hollywood-smile": "hollywood-smile.jpg",

    "snap-on-smile": "snap-on-smile.jpg",

    "teeth-whitening": "teeth-whitening.jpg",

    "dental-whitening": "teeth-whitening.jpg",

    "dental-crown": "dental-crown.jpg",

    "dental-bridges": "dental-bridges.jpg",

    "crowns-bridges": "crowns-bridges.jpg",

    "flexible-denture": "flexible-denture.jpg",

    "acrylic-denture": "acrylic-denture.jpg",

    "dental-cleaning": "dental-cleaning.jpg",

    "dental-filling": "dental-filling.jpg",

    "fluoride-treatment": "fluoride-treatment.jpg",

    "gum-disease-treatment": "gum-disease-treatment.jpg",

    "dental-x-ray": "dental-x-ray.jpg",

    "tooth-sensitivity-management": "tooth-sensitivity.jpg",

    "general-dentistry": "general-dentistry.jpg",

    "tooth-extraction": "tooth-extraction.jpg",

    "dental-surgery": "dental-surgery.jpg",

    "pediatric-dentistry": "pediatric-dentistry.jpg",

    "prosthodontics": "prosthodontics.jpg",

    "polishing": "dental-polishing.jpg",

    "re-root-canal-treatment": "re-root-canal.jpg",

    "root-canal-treatment": "root-canal.jpg",

    "single-sitting-root-canal-treatment": "single-sitting-root-canal.jpg",

    "calcified-root-canal-treatment": "calcified-root-canal.jpg",

    "wisdom-tooth-root-canal-treatment": "wisdom-tooth-root-canal.jpg",

    "post-and-core": "post-and-core.jpg",

  };

  // Match exact service slugs before using category fallbacks

  if (uniqueImages[slug]) {

    return `/images/services/${uniqueImages[slug]}`;

  }

  // Relevant fallback images for additional services

  if (text.includes("root canal")) {

    return "/images/services/root-canal.jpg";

  }

  if (text.includes("cleaning")) {

    return "/images/services/dental-cleaning.jpg";

  }

  if (text.includes("polishing")) {

    return "/images/services/dental-polishing.jpg";

  }

  if (text.includes("whitening")) {

    return "/images/services/teeth-whitening.jpg";

  }

  if (text.includes("veneer")) {

    return "/images/services/dental-veneers.jpg";

  }

  if (text.includes("jewellery")) {

    return "/images/services/dental-jewellery.jpg";

  }

  if (text.includes("smile")) {

    return "/images/services/hollywood-smile.jpg";

  }

  if (text.includes("crown") || text.includes("bridge")) {

    return "/images/services/dental-crown.jpg";

  }

  if (text.includes("denture")) {

    return "/images/services/flexible-denture.jpg";

  }

  if (text.includes("extraction") || text.includes("surgery")) {

    return "/images/services/dental-surgery.jpg";

  }

  if (text.includes("pediatric")) {

    return "/images/services/pediatric-dentistry.jpg";

  }

  if (text.includes("gum")) {

    return "/images/services/gum-disease-treatment.jpg";

  }

  if (text.includes("fluoride")) {

    return "/images/services/fluoride-treatment.jpg";

  }

  if (text.includes("x-ray")) {

    return "/images/services/dental-x-ray.jpg";

  }

  if (text.includes("filling")) {

    return "/images/services/dental-filling.jpg";

  }

  if (text.includes("prosthodontic")) {

    return "/images/services/prosthodontics.jpg";

  }

  return "/images/services/general-dentistry.jpg";

}

/* ==========================================================

   CLEAN SVG FALLBACKS

   Used only when a service photo is unavailable.

   ========================================================== */

function ServiceIcon({ service }: { service: Service }) {

  const text =

    `${service.name} ${service.category}`.toLowerCase();

  if (text.includes("root canal")) {

    return (

      <svg viewBox="0 0 48 48" aria-hidden="true">

        <path

          d="M14 8C8 9 7 17 10 24L17 41C18 44 21 43 22 39L24 29L27 39C28 43 31 44 33 40L39 23C42 14 36 7 30 9C27 10 25 12 22 11C19 11 17 8 14 8Z"

          fill="none"

          stroke="currentColor"

          strokeWidth="2.2"

          strokeLinejoin="round"

        />

        <path

          d="M24 15V24M20 20L24 24L28 20"

          fill="none"

          stroke="currentColor"

          strokeWidth="2"

          strokeLinecap="round"

          strokeLinejoin="round"

        />

      </svg>

    );

  }

  if (

    text.includes("cleaning") ||

    text.includes("polishing") ||

    text.includes("whitening") ||

    text.includes("cosmetic") ||

    text.includes("veneer")

  ) {

    return (

      <svg viewBox="0 0 48 48" aria-hidden="true">

        <path

          d="M20 7L23 17L33 20L23 23L20 33L17 23L7 20L17 17Z"

          fill="none"

          stroke="currentColor"

          strokeWidth="2.2"

          strokeLinejoin="round"

        />

        <path

          d="M35 27L37 33L43 35L37 37L35 43L33 37L27 35L33 33Z"

          fill="none"

          stroke="currentColor"

          strokeWidth="2"

          strokeLinejoin="round"

        />

      </svg>

    );

  }

  if (

    text.includes("surgery") ||

    text.includes("extraction")

  ) {

    return (

      <svg viewBox="0 0 48 48" aria-hidden="true">

        <circle

          cx="24"

          cy="24"

          r="17"

          fill="none"

          stroke="currentColor"

          strokeWidth="2.2"

        />

        <path

          d="M24 15V33M15 24H33"

          fill="none"

          stroke="currentColor"

          strokeWidth="2.5"

          strokeLinecap="round"

        />

      </svg>

    );

  }

  if (

    text.includes("crown") ||

    text.includes("bridge") ||

    text.includes("denture") ||

    text.includes("prosthodont")

  ) {

    return (

      <svg viewBox="0 0 48 48" aria-hidden="true">

        <path

          d="M9 15L17 20L24 13L31 20L39 15L35 38H13Z"

          fill="none"

          stroke="currentColor"

          strokeWidth="2.2"

          strokeLinejoin="round"

        />

        <path

          d="M15 28H33"

          fill="none"

          stroke="currentColor"

          strokeWidth="2"

          strokeLinecap="round"

        />

      </svg>

    );

  }

  return (

    <svg viewBox="0 0 48 48" aria-hidden="true">

      <path

        d="M14 8C8 9 7 17 10 24L17 41C18 44 21 43 22 39L24 29L27 39C28 43 31 44 33 40L39 23C42 14 36 7 30 9C27 10 25 12 22 11C19 11 17 8 14 8Z"

        fill="none"

        stroke="currentColor"

        strokeWidth="2.2"

        strokeLinejoin="round"

      />

    </svg>

  );

}

/* ==========================================================

   SERVICE PHOTO

   If a photo is missing, show a clean SVG icon instead.

   ========================================================== */

function ServiceVisual({

  service,

  className,

}: {

  service: Service;

  className: string;

}) {

  const [imageFailed, setImageFailed] = useState(false);

  const imagePath = getServiceImage(service);

  if (imageFailed) {

    return (

      <div

        className={`${className} service-image-fallback`}

        role="img"

        aria-label={`${service.name} illustration`}

      >

        <span className="service-fallback-icon">

          <ServiceIcon service={service} />

        </span>

      </div>

    );

  }

  return (

    <img

      className={className}

      src={imagePath}

      alt={`${service.name} at Sparkling Smile Dental Clinic`}

      loading="lazy"

      onError={() => setImageFailed(true)}

    />

  );

}

/* ==========================================================

   CATEGORY ORDER

   Root canal services always appear first.

   ========================================================== */

function categoryPriority(category: string): number {

  const value = category.toLowerCase();

  if (value.includes("root canal")) return 0;

  if (value.includes("general") || value.includes("preventive")) return 1;

  if (value.includes("cosmetic")) return 2;

  if (value.includes("restorative") || value.includes("prosthodontic")) return 3;

  if (value.includes("surgery") || value.includes("pediatric")) return 4;

  return 5;

}

function Services() {

  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchServices() {

      try {

        setLoading(true);

        setError("");

        const response = await fetch(`${API_URL}/services`);

        if (!response.ok) {

          throw new Error("Failed to fetch services");

        }

        const result = await response.json();

        setServices(result.data || []);

      } catch (err) {

        console.error(err);

        setError("Unable to load services right now.");

      } finally {

        setLoading(false);

      }

    }

    fetchServices();

  }, []);

  const rootCanalService =

    services.find(

      (service) =>

        service.slug.toLowerCase().includes("root-canal-treatment") &&

        !service.name.toLowerCase().includes("re-root")

    ) ||

    services.find(

      (service) =>

        service.name.toLowerCase() === "root canal treatment"

    );

  const featuredRootCanal =

    rootCanalService || ROOT_CANAL_FALLBACK;

  const featuredSlug =

    rootCanalService?.slug || "root-canal-treatment";

  const relatedRootCanalServices = services.filter(

    (service) =>

      service.slug !== featuredSlug &&

      `${service.name} ${service.category} ${service.slug}`

        .toLowerCase()

        .includes("root canal")

  );

  const groupedServices = services.reduce(

    (groups, service) => {

      if (!groups[service.category]) {

        groups[service.category] = [];

      }

      groups[service.category].push(service);

      return groups;

    },

    {} as Record<string, Service[]>

  );

  const orderedCategories = Object.entries(groupedServices).sort(

    ([categoryA], [categoryB]) =>

      categoryPriority(categoryA) - categoryPriority(categoryB) ||

      categoryA.localeCompare(categoryB)

  );

  return (

    <div className="site">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="container navbar-inner">

          <Link to="/" className="brand">

            <img

              src="/images/sparkling-smile-logo.png"

              alt="Sparkling Smile Dental Clinic"

              className="brand-logo-image"

            />

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

            <Link to="/#about">About</Link>

            <Link to="/#team">Our Team</Link>

            <Link to="/#gallery">Gallery</Link>

            <Link to="/#contact">Contact</Link>

          </nav>

          <Link to="/appointment" className="nav-button">

            Book Appointment

          </Link>

        </div>

      </header>

      {/* SERVICES HERO */}

      <section className="service-page-hero">

        <div className="container">

          <p className="eyebrow">OUR SERVICES</p>

          <h1>

            Comprehensive care for

            <br />

            every smile.

          </h1>

          <p>

            Explore the dental treatments available at

            Sparkling Smile Dental Clinic, with a special

            focus on root canal care.

          </p>

          <Link

            to="/appointment"

            className="primary-button service-hero-book"

          >

            Book Appointment

          </Link>

        </div>

      </section>

      {/* SERVICES CONTENT */}

      <main className="section">

        <div className="container">

          {loading && (

            <div className="loading-message">

              Loading services...

            </div>

          )}

          {error && (

            <div className="error-message">

              {error}

            </div>

          )}

          {!loading && !error && (

            <>

              {/* ROOT CANAL SPECIALTY FEATURE */}

              <section

                className="service-specialty-section"

                aria-labelledby="root-canal-heading"

              >

                <div className="root-canal-feature">

                  <div className="root-canal-feature-media">

                    <ServiceVisual

                      service={featuredRootCanal}

                      className="root-canal-feature-image"

                    />

                    <span className="root-canal-image-label">

                      Our Specialty

                    </span>

                  </div>

                  <div className="root-canal-feature-content">

                    <p className="eyebrow">

                      OUR FEATURED SPECIALTY

                    </p>

                    <h2 id="root-canal-heading">

                      Root Canal Treatment

                    </h2>

                    <p>

                      Root canal treatment focuses on problems

                      affecting the inner part of a tooth. After

                      an assessment, the dentist can explain the

                      appropriate treatment options and whether

                      the natural tooth can be preserved.

                    </p>

                    <p>

                      Explore our root canal treatment options

                      and book a consultation to discuss your

                      dental concerns.

                    </p>

                    <div className="root-canal-related">

                      {relatedRootCanalServices

                        .slice(0, 4)

                        .map((service) => (

                          <Link

                            key={service.id}

                            to={`/services/${service.slug}`}

                            className="root-canal-related-link"

                          >

                            {service.name}

                            <span aria-hidden="true"> ↗</span>

                          </Link>

                        ))}

                    </div>

                    <div className="root-canal-feature-actions">

                      <Link

                        to="/appointment"

                        className="primary-button"

                      >

                        Book Appointment

                      </Link>

                      <Link

                        to={`/services/${featuredSlug}`}

                        className="service-featured-details"

                      >

                        Explore Treatment Details →

                      </Link>

                    </div>

                  </div>

                </div>

              </section>

              {/* ALL SERVICE CATEGORIES */}

              {orderedCategories.map(

                ([category, categoryServices]) => {

                  /*

                   * The featured root canal treatment is presented

                   * above. Keep the related procedures in this grid.

                   */

                  const hiddenServices = [

                    "pediatric dentistry",

                    "crowns and bridges",

                    "crowns bridges",

                    "crown and bridge",

                    "prosthodontics",

                    "hollywood smile",

                  ];

                  const visibleServices = categoryServices

                    .filter((service) => {

                      const searchableService = `${service.name} ${service.slug} ${service.category}`

                        .toLowerCase()

                        .replace(/&/g, "and")

                        .replace(/-/g, " ");

                      return (

                        service.slug !== featuredSlug &&

                        !hiddenServices.some((name) =>

                          searchableService.includes(name)

                        )

                      );

                    })

                    .sort((a, b) => {

                      const aIsRootCanal =

                        `${a.name} ${a.slug}`

                          .toLowerCase()

                          .includes("root canal");

                      const bIsRootCanal =

                        `${b.name} ${b.slug}`

                          .toLowerCase()

                          .includes("root canal");

                      if (aIsRootCanal && !bIsRootCanal) return -1;

                      if (!aIsRootCanal && bIsRootCanal) return 1;

                      return a.name.localeCompare(b.name);

                    });

                  if (visibleServices.length === 0) {

                    return null;

                  }

                  return (

                    <section

                      className="service-category"

                      key={category}

                    >

                      <div className="section-heading">

                        <p className="eyebrow">

                          {category.toUpperCase()}

                        </p>

                        <h2>{category}</h2>

                      </div>

                      <div className="services-grid">

                        {visibleServices.map((service) => (

                          <article

                            className="service-card"

                            key={service.id}

                          >

                            <div className="service-card-media-wrap">

                              <ServiceVisual

                                service={service}

                                className="service-card-media"

                              />

                            </div>

                            <h3>{service.name}</h3>

                            <p>

                              {service.short_description ||

                                "Professional dental care tailored to your individual needs."}

                            </p>

                            <div className="service-card-actions">

                              <Link

                                to={`/services/${service.slug}`}

                                className="service-card-link"

                              >

                                View Treatment Details →

                              </Link>

                              <Link

                                to="/appointment"

                                className="service-mini-book"

                              >

                                Book Appointment

                              </Link>

                            </div>

                          </article>

                        ))}

                      </div>

                    </section>

                  );

                }

              )}

              {/* BOTTOM BOOKING CTA */}

              <section className="services-bottom-cta">

                <div>

                  <p className="eyebrow">

                    YOUR NEXT STEP

                  </p>

                  <h2>

                    Let’s talk about your dental health.

                  </h2>

                  <p>

                    Schedule a consultation so the dentist can

                    understand your needs and discuss suitable

                    treatment options.

                  </p>

                </div>

                <Link

                  to="/appointment"

                  className="primary-button"

                >

                  Book Appointment

                </Link>

              </section>

            </>

          )}

        </div>

      </main>

      {/* FOOTER */}

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

            <Link to="/#about">About</Link>

            <Link to="/#contact">Contact</Link>

            <Link to="/appointment">Book Appointment</Link>

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

export default Services;