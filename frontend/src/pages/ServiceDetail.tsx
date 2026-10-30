import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  display_order: number;
};


type ServiceContent = {
  overview: string;
  when_needed: string;
  procedure_details: string;
  benefits: string;
  aftercare: string;
};

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "dental-jewellery": {
    overview: "Dental jewellery is a small decorative accessory attached to the surface of a tooth for cosmetic purposes. The dentist should first check that the tooth and surrounding gums are healthy.",
    when_needed: "This is an optional cosmetic choice for people who want to add a small decorative detail to their smile. It is not a treatment for dental disease.",
    procedure_details: "The dentist examines the tooth, discusses placement, and explains the bonding process and any risks before proceeding. The tooth surface is prepared conservatively and the jewellery is attached using dental materials.",
    benefits: "It offers a personalised cosmetic accent without requiring a major change to the tooth's appearance.",
    aftercare: "Maintain normal brushing and flossing, avoid picking at the jewellery, and contact the clinic if it loosens or irritates the mouth. Professional advice is important before attempting removal."
  },
  "dental-veneers": {
    overview: "Dental veneers are thin coverings placed on the front surfaces of selected teeth to change their colour, shape, or appearance.",
    when_needed: "A dentist may discuss veneers for certain stains, small chips, uneven shapes, or gaps when the teeth and gums are suitable for cosmetic treatment.",
    procedure_details: "The dentist assesses your bite and oral health, discusses the desired result, and plans the veneer shape and shade. Depending on the veneer type, the tooth may need preparation before impressions or scans and fitting.",
    benefits: "Veneers can improve the appearance of selected teeth and create a more even-looking smile when carefully planned.",
    aftercare: "Brush and floss daily, attend dental reviews, and avoid biting hard objects with veneered teeth. A dentist can advise whether a night guard is appropriate if you grind your teeth."
  },
  "digital-smile-design": {
    overview: "Digital smile design uses photographs, scans, and digital planning to help visualise possible changes to a smile before treatment decisions are made.",
    when_needed: "It may be useful when considering several cosmetic options or when planning changes to tooth shape, alignment, or proportions.",
    procedure_details: "The dental team records photographs and scans, reviews the smile and facial proportions, and prepares a digital preview to support discussion. The preview is a planning aid, not a guarantee of the final result.",
    benefits: "Digital planning can make treatment options easier to discuss and help align expectations before a procedure is chosen.",
    aftercare: "There is usually no special aftercare for the planning appointment itself. Follow the dentist's recommendations for any examination or treatment that follows."
  },
  "hollywood-smile": {
    overview: "A Hollywood smile is a broad term for a cosmetic plan intended to improve the overall appearance of the smile. The specific treatment may involve whitening, veneers, crowns, orthodontics, or a combination.",
    when_needed: "It may be considered by people who want to address concerns such as tooth colour, shape, spacing, or uneven visible teeth.",
    procedure_details: "The dentist examines the teeth and gums, discusses your goals, and explains suitable options. The final plan depends on oral health, tooth condition, bite, and the amount of change desired.",
    benefits: "A personalised plan can improve smile appearance while helping the patient understand the options, limitations, and maintenance involved.",
    aftercare: "Aftercare depends on the treatments selected. Maintain good oral hygiene and attend follow-up visits as advised by the dentist."
  },
  "snap-on-smile": {
    overview: "A snap-on smile is a removable cosmetic dental appliance designed to cover visible teeth temporarily. Suitability and availability depend on the individual case and the appliance offered.",
    when_needed: "It may be discussed by people seeking a removable cosmetic option, but it does not replace treatment for decay, gum disease, or other oral-health problems.",
    procedure_details: "The dentist assesses oral health, discusses expectations and limitations, and determines whether an appliance is appropriate. Records or impressions may be taken to help make a device that fits the teeth.",
    benefits: "A removable appliance can provide a temporary change in appearance without permanently altering the visible surfaces of teeth.",
    aftercare: "Follow the dentist's cleaning and storage instructions, remove the appliance as directed, and do not wear it if it causes pain or damages the gums."
  },
  "teeth-whitening": {
    overview: "Teeth whitening is a cosmetic procedure intended to lighten natural tooth colour and reduce certain types of staining.",
    when_needed: "It may be considered for suitable adults concerned about discolouration. Fillings, crowns, veneers, and some types of stains may not whiten in the same way as natural teeth.",
    procedure_details: "The dentist checks the teeth and gums, discusses likely results and sensitivity, and recommends an appropriate whitening approach if suitable. Instructions vary depending on the method used.",
    benefits: "Whitening can brighten the appearance of natural teeth without changing their shape.",
    aftercare: "Follow the dentist's instructions, report persistent sensitivity or gum irritation, and maintain regular brushing and dental reviews. Results vary and may need maintenance."
  },
  "general-dentistry": {
    overview: "General dentistry focuses on assessing, preventing, and managing common problems affecting teeth, gums, and the mouth.",
    when_needed: "Routine examinations are useful even without symptoms. Pain, bleeding gums, broken teeth, sensitivity, or changes in the mouth should be assessed by a dentist.",
    procedure_details: "The dentist reviews your concerns and dental history, examines the mouth, and may recommend X-rays or other checks when clinically appropriate. Findings and options are discussed with you.",
    benefits: "Regular general dental care can help identify problems early and support long-term oral health.",
    aftercare: "Follow the care plan provided, maintain daily brushing and interdental cleaning, and attend recommended check-ups."
  },
  "dental-cleaning": {
    overview: "Professional dental cleaning removes plaque, tartar, and surface deposits that regular brushing may not fully remove.",
    when_needed: "Cleaning may be recommended during routine preventive visits or when plaque and tartar build up, gums bleed, or gum health needs closer attention.",
    procedure_details: "The dental professional examines the mouth and removes deposits using appropriate instruments, then may polish the teeth if suitable. The method depends on the amount and location of deposits.",
    benefits: "Professional cleaning supports gum health and helps keep teeth and the mouth clean.",
    aftercare: "Brush twice daily, clean between teeth, and follow the recall interval recommended for your gum health. Mild temporary sensitivity can occur."
  },
  "dental-polishing": {
    overview: "Dental polishing smooths tooth surfaces and may remove some surface stains after a professional cleaning when appropriate.",
    when_needed: "It may be offered as part of a cleaning visit when surface deposits or stains are present. It does not replace treatment for decay or deeper discolouration.",
    procedure_details: "After assessing the teeth, the dental professional uses suitable polishing equipment and material on selected surfaces. The approach is adapted to the patient's oral health and restorations.",
    benefits: "Polishing can leave tooth surfaces feeling smoother and improve the appearance of certain surface stains.",
    aftercare: "Continue regular brushing and interdental cleaning, and follow the dental team's advice about stain prevention and future cleaning."
  },
  "dental-filling": {
    overview: "A dental filling restores a tooth affected by a cavity or limited damage after the dentist has assessed and treated the affected area.",
    when_needed: "A filling may be recommended for tooth decay or certain small fractures. The appropriate restoration depends on the size and location of the damage.",
    procedure_details: "The dentist examines the tooth and may take an X-ray. If a filling is suitable, damaged tissue is removed as needed and the tooth is restored with an appropriate material.",
    benefits: "A filling can restore tooth shape and function and help protect the treated area from further damage.",
    aftercare: "Follow instructions about eating and numbness after treatment. Contact the clinic if your bite feels uneven, pain worsens, or the filling feels loose."
  },
  "fluoride-treatment": {
    overview: "Fluoride treatment applies a professionally selected fluoride product to help strengthen tooth enamel and reduce the risk of tooth decay.",
    when_needed: "The dentist may recommend it for people at increased risk of cavities, including some children and adults with a history of decay or dry mouth.",
    procedure_details: "The dental professional checks your oral-health needs and applies the recommended fluoride product according to its instructions.",
    benefits: "Fluoride helps enamel resist acid attacks and can be part of a preventive plan to lower cavity risk.",
    aftercare: "Follow the product-specific instructions about eating, drinking, and brushing after application, and continue your usual preventive dental routine."
  },
  "gum-disease-treatment": {
    overview: "Gum disease treatment aims to control inflammation and infection affecting the tissues that support the teeth.",
    when_needed: "Bleeding, swollen or tender gums, persistent bad breath, gum recession, or loose teeth should be assessed. These signs can have different causes and need professional evaluation.",
    procedure_details: "The dentist checks gum health and may measure gum pockets. Treatment can include professional cleaning below the gumline, home-care guidance, and follow-up or specialist referral when needed.",
    benefits: "Appropriate treatment can help control inflammation and reduce the risk of further damage to the supporting tissues.",
    aftercare: "Follow the recommended brushing and interdental-cleaning routine, attend review visits, and avoid tobacco. Seek advice if swelling, pain, or bleeding persists."
  },
  "dental-x-ray": {
    overview: "Dental X-rays provide images of teeth and nearby structures that may not be visible during a routine visual examination.",
    when_needed: "The dentist may recommend an X-ray to investigate pain, decay between teeth, infection, trauma, or to plan certain treatments when the image is clinically justified.",
    procedure_details: "The dental team selects the appropriate image, positions the sensor or film, and takes the X-ray while following radiation-safety procedures.",
    benefits: "X-rays can help the dentist assess hidden areas and make better-informed diagnostic and treatment decisions.",
    aftercare: "No special aftercare is usually required. Ask the dentist if you have questions about why an image was recommended or about any previous X-rays."
  },
  "tooth-sensitivity-management": {
    overview: "Tooth sensitivity management identifies and addresses discomfort triggered by cold, heat, touch, or sweet foods.",
    when_needed: "Arrange an assessment if sensitivity is persistent, worsening, localised to one tooth, or accompanied by pain, swelling, or damage.",
    procedure_details: "The dentist checks for causes such as exposed root surfaces, wear, cracks, or decay. Recommendations may include desensitising products, fluoride, protective treatment, or care for an underlying problem.",
    benefits: "Treatment aims to reduce discomfort and address the cause where possible.",
    aftercare: "Use a soft-bristled brush, avoid aggressive brushing, and follow product instructions. Persistent or severe symptoms should be reassessed by a dentist."
  },
  "dental-crown": {
    overview: "A dental crown is a custom-made covering that fits over a tooth to restore its shape, strength, or appearance.",
    when_needed: "A crown may be considered for a weakened, heavily restored, cracked, or root-treated tooth, depending on the clinical findings.",
    procedure_details: "The dentist assesses the tooth, prepares it if a crown is appropriate, and takes a scan or impression. A crown is then fitted and adjusted for comfort and bite.",
    benefits: "A well-fitted crown can protect a compromised tooth and restore its function and appearance.",
    aftercare: "Keep the crown and gumline clean, avoid chewing very hard objects, and attend reviews. Contact the clinic if the crown loosens or your bite feels incorrect."
  },
  "dental-bridges": {
    overview: "A dental bridge replaces one or more missing teeth by supporting an artificial tooth from adjacent teeth or dental implants, depending on the design.",
    when_needed: "A bridge may be discussed when a tooth is missing and the surrounding teeth and supporting tissues are suitable for the planned restoration.",
    procedure_details: "The dentist assesses the gap, bite, and supporting teeth, then explains the available designs. Records are taken and the bridge is fitted and adjusted according to the chosen plan.",
    benefits: "A bridge can restore the appearance of a gap and help with chewing and speech in suitable cases.",
    aftercare: "Clean carefully around and beneath the bridge using the tools recommended by the dental team, and attend regular checks of the bridge and supporting teeth."
  },
  "crowns-bridges": {
    overview: "Crowns and bridges are restorative options used to cover damaged teeth or replace missing teeth, depending on the patient's needs.",
    when_needed: "They may be considered when a tooth needs substantial protection or when one or more teeth are missing. An examination determines which option is appropriate.",
    procedure_details: "The dentist examines the teeth and bite, discusses materials and alternatives, and takes scans or impressions if treatment proceeds. The restoration is fitted and checked for comfort and function.",
    benefits: "These restorations can help restore chewing function, tooth shape, and smile appearance when suitable.",
    aftercare: "Maintain careful daily cleaning around the restorations and attend regular reviews. Avoid using restored teeth to bite hard objects."
  },
  "flexible-denture": {
    overview: "A flexible denture is a removable prosthesis designed to replace missing teeth using a flexible base material in selected cases.",
    when_needed: "It may be considered for certain partial-tooth replacement needs. Suitability depends on the number and position of missing teeth, gum health, and bite.",
    procedure_details: "The dentist assesses the mouth and discusses options, then takes impressions or scans if a denture is planned. Fit and comfort are checked and adjusted as required.",
    benefits: "A suitable denture can help replace missing teeth and support appearance and chewing function.",
    aftercare: "Clean the denture as instructed, remove it as advised, and keep the gums clean. Return for adjustments if it rubs, feels loose, or causes sores."
  },
  "acrylic-denture": {
    overview: "An acrylic denture is a removable appliance made with an acrylic base to replace some or all missing teeth.",
    when_needed: "It may be used for partial or complete tooth replacement depending on the clinical situation and the dentist's treatment plan.",
    procedure_details: "The dentist examines the mouth, takes impressions or scans, and arranges fitting and bite checks. Adjustments may be needed as the mouth adapts.",
    benefits: "A suitable acrylic denture can restore the appearance of missing teeth and help with everyday function.",
    aftercare: "Clean the denture daily, handle it carefully, and follow advice about when to remove it. Seek adjustments if it causes soreness or becomes unstable."
  },
  "prosthodontics": {
    overview: "Prosthodontics focuses on restoring or replacing missing and damaged teeth with options such as crowns, bridges, dentures, and other restorations.",
    when_needed: "A prosthodontic consultation may help when several teeth are damaged or missing, existing restorations need review, or bite and chewing function require assessment.",
    procedure_details: "The dentist reviews oral health, bite, goals, and available options. Treatment may involve planning, scans or impressions, temporary restorations, fitting, and follow-up visits.",
    benefits: "A planned restoration can support chewing, speech, appearance, and comfort depending on the patient's needs.",
    aftercare: "Follow the care instructions for the specific restoration, keep the mouth clean, and attend maintenance visits to check fit and function."
  },
  "post-and-core": {
    overview: "A post-and-core restoration may be used to help retain a crown when a tooth has lost substantial structure, often after root canal treatment.",
    when_needed: "The dentist may consider it when insufficient natural tooth structure remains to support a restoration. It is not suitable for every root-treated tooth.",
    procedure_details: "The dentist evaluates the remaining tooth and root, then determines whether a post and core are appropriate before planning the final restoration.",
    benefits: "In selected cases, it can provide support for a crown and help restore a tooth's function.",
    aftercare: "Follow the instructions for the final restoration, avoid biting hard objects on the tooth, and return promptly if the tooth or restoration becomes painful or loose."
  },
  "root-canal-treatment": {
    overview: "Root canal treatment addresses inflammation or infection inside a tooth by cleaning and sealing the root canal system, with the aim of retaining the natural tooth when possible.",
    when_needed: "It may be recommended when the pulp is irreversibly inflamed or infected, which can be associated with deep decay, trauma, or a crack. Diagnosis requires a dental examination and appropriate tests.",
    procedure_details: "The dentist assesses the tooth, numbs it when appropriate, accesses and cleans the canal system, then fills and seals it. A suitable final restoration may be needed to protect the tooth.",
    benefits: "Root canal treatment can relieve symptoms caused by pulp disease and may allow the natural tooth to be retained.",
    aftercare: "Follow the dentist's instructions, avoid heavy chewing on the tooth until it is fully restored, and complete the recommended final restoration and follow-up."
  },
  "re-root-canal-treatment": {
    overview: "Root canal retreatment involves reopening a previously treated tooth to reassess, clean, and reseal the canal system when problems persist or develop.",
    when_needed: "It may be considered if symptoms continue, infection returns, or new findings suggest the earlier treatment has not healed as expected. Other options may also be discussed.",
    procedure_details: "The dentist reviews previous treatment and current findings, then determines whether retreatment is feasible. If appropriate, the existing filling materials are removed, the canals are cleaned and resealed, and the tooth is restored.",
    benefits: "In selected cases, retreatment may help address persistent disease and preserve the natural tooth.",
    aftercare: "Attend all reviews, follow instructions, and arrange the recommended final restoration. Contact the clinic if swelling, pain, or other symptoms worsen."
  },
  "single-sitting-root-canal-treatment": {
    overview: "Single-sitting root canal treatment aims to complete the necessary root canal cleaning and sealing in one visit when the clinical situation allows.",
    when_needed: "The dentist may consider a single-visit approach for suitable cases after assessing the tooth, infection status, anatomy, and complexity.",
    procedure_details: "The dentist examines and numbs the tooth, cleans and shapes the canal system, and seals it if appropriate. Some cases require more than one visit, depending on findings.",
    benefits: "When suitable, completing treatment in one visit can reduce the number of appointments required for the root canal procedure.",
    aftercare: "Follow the dentist's instructions, avoid heavy chewing until the tooth is fully restored, and return for the recommended permanent restoration and review."
  },
  "calcified-root-canal-treatment": {
    overview: "Calcified root canal treatment addresses a tooth whose canal spaces have narrowed or become difficult to locate because of calcification.",
    when_needed: "It may be considered when examination and imaging suggest disease in a tooth with narrowed canals. These cases can be technically complex and may require specialist care.",
    procedure_details: "The dentist evaluates the tooth and imaging, discusses risks and alternatives, and plans treatment using appropriate magnification and instruments when available.",
    benefits: "In selected cases, treatment may help manage disease and retain the natural tooth despite difficult canal anatomy.",
    aftercare: "Follow the prescribed care plan and complete any recommended restoration. Attend follow-up visits and report increasing pain or swelling."
  },
  "wisdom-tooth-root-canal-treatment": {
    overview: "Root canal treatment on a wisdom tooth is considered only in selected cases when the tooth can be predictably treated and is worth retaining.",
    when_needed: "The dentist evaluates decay, infection, tooth position, access, function, and long-term outlook. Extraction may be a more suitable option in some cases.",
    procedure_details: "The dentist examines the tooth and relevant imaging, then discusses whether root canal treatment is practical. If chosen, the canal system is treated and the tooth is restored as appropriate.",
    benefits: "For a suitable, functional wisdom tooth, treatment may help retain it; the decision depends on individual clinical findings.",
    aftercare: "Follow the dentist's instructions and attend reviews. Seek prompt advice for worsening pain, swelling, fever, or difficulty opening the mouth."
  },
  "dental-surgery": {
    overview: "Dental surgery includes procedures performed to treat specific conditions affecting the teeth, gums, or supporting structures.",
    when_needed: "A dentist may recommend a surgical procedure after an examination when a condition cannot be managed adequately with non-surgical care.",
    procedure_details: "The dentist explains the diagnosis, planned procedure, anaesthesia, risks, alternatives, and recovery expectations before obtaining consent and proceeding.",
    benefits: "When clinically indicated, surgery can address a dental problem that needs procedural treatment.",
    aftercare: "Follow the written post-operative instructions, use medicines only as directed, and contact the clinic for uncontrolled bleeding, increasing swelling, fever, or severe worsening pain."
  },
  "tooth-extraction": {
    overview: "Tooth extraction is the removal of a tooth when it cannot be predictably retained or when removal is otherwise clinically indicated.",
    when_needed: "Extraction may be discussed for severe decay, certain fractures, advanced gum disease, or other conditions after the dentist assesses the tooth and alternatives.",
    procedure_details: "The dentist examines the tooth and may take an X-ray, explains the options, and uses appropriate anaesthesia. The tooth is then removed using the planned technique.",
    benefits: "Extraction can remove a tooth that is causing or contributing to a problem when preserving it is not a suitable option.",
    aftercare: "Follow the clinic's written instructions, protect the blood clot, and avoid smoking or disturbing the site. Seek urgent advice for heavy bleeding, fever, or worsening pain or swelling."
  },
  "pediatric-dentistry": {
    overview: "Pediatric dentistry focuses on the oral health of infants, children, and adolescents, including prevention, monitoring, and age-appropriate treatment.",
    when_needed: "Children benefit from routine dental visits as well as assessment for tooth pain, injury, visible decay, or changes in teeth and gums.",
    procedure_details: "The dentist assesses the child's teeth and oral development, explains findings in age-appropriate language, and recommends preventive care or treatment based on the child's needs.",
    benefits: "Early dental care can support healthy habits, monitor development, and identify problems before they become more difficult to manage.",
    aftercare: "Help children brush with age-appropriate fluoride toothpaste, support daily cleaning, follow dietary advice, and attend reviews as recommended."
  }
};

function getServiceContent(service: Service): ServiceContent {
  const slug = service.slug.toLowerCase();
  if (SERVICE_CONTENT[slug]) return SERVICE_CONTENT[slug];

  const name = service.name.toLowerCase();
  if (name.includes("root canal")) return SERVICE_CONTENT["root-canal-treatment"];
  if (name.includes("cleaning")) return SERVICE_CONTENT["dental-cleaning"];
  if (name.includes("whitening")) return SERVICE_CONTENT["teeth-whitening"];
  if (name.includes("veneer")) return SERVICE_CONTENT["dental-veneers"];
  if (name.includes("crown")) return SERVICE_CONTENT["dental-crown"];
  if (name.includes("bridge")) return SERVICE_CONTENT["dental-bridges"];
  if (name.includes("denture")) return SERVICE_CONTENT["acrylic-denture"];
  if (name.includes("extraction")) return SERVICE_CONTENT["tooth-extraction"];
  if (name.includes("pediatric")) return SERVICE_CONTENT["pediatric-dentistry"];
  if (name.includes("surgery")) return SERVICE_CONTENT["dental-surgery"];
  if (name.includes("fluoride")) return SERVICE_CONTENT["fluoride-treatment"];
  if (name.includes("gum")) return SERVICE_CONTENT["gum-disease-treatment"];
  if (name.includes("filling")) return SERVICE_CONTENT["dental-filling"];
  return SERVICE_CONTENT["general-dentistry"];
}

type Service = {
  id: number;
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  overview: string | null;
  when_needed: string | null;
  procedure_details: string | null;
  benefits: string | null;
  aftercare: string | null;
  duration_minutes: number;
  price: number | string | null;
  image: string | null;
  faqs: FAQ[];
};

function ServiceDetail() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const [service, setService] =
    useState<Service | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  ============================================================
  LOAD SERVICE FROM API
  ============================================================
  */

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `http://localhost:5000/api/services/${slug}`
          );

        if (!response.ok) {
          throw new Error(
            "Service not found"
          );
        }

        const result =
          await response.json();

        setService(result.data);
      } catch (err) {
        console.error(err);

        setError(
          "We couldn't find this service."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [slug]);


  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <div className="page-message">
        Loading treatment...
      </div>
    );
  }


  /*
  ============================================================
  ERROR
  ============================================================
  */

  if (error || !service) {
    return (
      <div className="page-message">

        <h2>
          Service not found
        </h2>

        <Link to="/services">
          ← Back to Services
        </Link>

      </div>
    );
  }


  /*
  ============================================================
  MAIN PAGE
  ============================================================
  */

  const fallbackContent = getServiceContent(service);

  return (
    <div className="site">

      {/* ======================================================
          NAVBAR
          ====================================================== */}

      <header className="navbar">

        <div className="container navbar-inner">

          <Link
            to="/"
            className="brand"
          >

            <div className="brand-logo">
              S
            </div>

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

            <Link to="/">
              Home
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/#about">
              About
            </Link>

            <Link to="/#team">
              Our Team
            </Link>

            <Link to="/#gallery">
              Gallery
            </Link>

            <Link to="/#contact">
              Contact
            </Link>

          </nav>


          <Link
            to="/appointment"
            className="nav-button"
          >
            Book Appointment
          </Link>

        </div>

      </header>


      {/* ======================================================
          SERVICE HERO
          ====================================================== */}

      <section className="service-detail-hero">

        <div className="container">

          <Link
            to="/services"
            className="back-link"
          >
            ← Back to Services
          </Link>


          <p className="eyebrow">
            {service.category.toUpperCase()}
          </p>


          <h1>
            {service.name}
          </h1>


          {service.short_description && (
            <p className="service-hero-description">
              {service.short_description}
            </p>
          )}


          <div className="service-hero-actions">

            <Link
              to="/appointment"
              className="primary-button"
            >
              Book an Appointment
            </Link>


            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-button"
            >
              WhatsApp Us
            </a>

          </div>

        </div>

      </section>


      {/* ======================================================
          SERVICE CONTENT
          ====================================================== */}

      <main className="section">

        <div className="container service-detail-layout">

          <article className="service-detail-content">

            {/* ==================================================
                OVERVIEW
                ================================================== */}

            {(service.overview || fallbackContent.overview) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  OVERVIEW
                </p>

                <h2>
                  About {service.name}
                </h2>

                <p>
                  {service.overview || fallbackContent.overview}
                </p>

              </section>

            )}


            {/* ==================================================
                WHEN NEEDED
                ================================================== */}

            {(service.when_needed || fallbackContent.when_needed) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  WHEN IT MAY BE NEEDED
                </p>

                <h2>
                  When is this treatment recommended?
                </h2>

                <p>
                  {service.when_needed || fallbackContent.when_needed}
                </p>

              </section>

            )}


            {/* ==================================================
                PROCEDURE
                ================================================== */}

            {(service.procedure_details || fallbackContent.procedure_details) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  THE PROCESS
                </p>

                <h2>
                  What does the treatment involve?
                </h2>

                <p>
                  {service.procedure_details || fallbackContent.procedure_details}
                </p>

              </section>

            )}


            {/* ==================================================
                BENEFITS
                ================================================== */}

            {(service.benefits || fallbackContent.benefits) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  BENEFITS
                </p>

                <h2>
                  Benefits
                </h2>

                <p>
                  {service.benefits || fallbackContent.benefits}
                </p>

              </section>

            )}


            {/* ==================================================
                AFTERCARE
                ================================================== */}

            {(service.aftercare || fallbackContent.aftercare) && (

              <section className="service-detail-section">

                <p className="eyebrow">
                  AFTERCARE
                </p>

                <h2>
                  After your treatment
                </h2>

                <p>
                  {service.aftercare || fallbackContent.aftercare}
                </p>

              </section>

            )}


            {/* ==================================================
                FAQ
                ================================================== */}

            {service.faqs &&
              service.faqs.length > 0 && (

                <section className="service-detail-section">

                  <p className="eyebrow">
                    FAQ
                  </p>

                  <h2>
                    Frequently Asked Questions
                  </h2>


                  <div className="faq-list">

                    {service.faqs.map(
                      (faq) => (

                        <details
                          key={faq.id}
                          className="faq-item"
                        >

                          <summary>
                            {faq.question}
                          </summary>

                          <p>
                            {faq.answer}
                          </p>

                        </details>

                      )
                    )}

                  </div>

                </section>

              )}


            {/* ==================================================
                FINAL CTA
                ================================================== */}

            <section className="service-detail-section">

              <p className="eyebrow">
                NEXT STEP
              </p>

              <h2>
                Need a dental consultation?
              </h2>

              <p>
                Book an appointment with Sparkling Smile
                Dental Clinic. The dentist will evaluate
                your dental needs and recommend the most
                appropriate treatment for you.
              </p>


              <div className="service-hero-actions">

                <Link
                  to="/appointment"
                  className="primary-button"
                >
                  Book an Appointment
                </Link>


                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-button"
                >
                  Enquire on WhatsApp
                </a>

              </div>

            </section>

          </article>


          {/* ====================================================
              SIDEBAR
              ==================================================== */}

          <aside className="service-sidebar">

            <div className="service-sidebar-card">

              <p className="eyebrow">
                TREATMENT INFORMATION
              </p>


              <h3>
                {service.name}
              </h3>


              <div className="sidebar-detail">

                <span>
                  Reference duration
                </span>

                <strong>
                  {service.duration_minutes}
                  {" "}
                  minutes
                </strong>

              </div>


              <p
                style={{
                  color: "#71818a",
                  fontSize: "13px",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                }}
              >
                Treatment duration is indicative only.
                The dentist will determine the appropriate
                treatment and appointment requirements after
                evaluating your needs.
              </p>


              <Link
                to="/appointment"
                className="primary-button full-width"
              >
                Book an Appointment
              </Link>


              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-button full-width"
              >
                Enquire on WhatsApp
              </a>

            </div>

          </aside>

        </div>

      </main>


      {/* ======================================================
          FOOTER
          ====================================================== */}

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

            <Link to="/">
              Home
            </Link>

            <Link to="/services">
              Services
            </Link>

            <Link to="/#about">
              About
            </Link>

            <Link to="/#contact">
              Contact
            </Link>

          </div>

        </div>


        <div className="container copyright">

          © {new Date().getFullYear()}
          {" "}
          Sparkling Smile Dental Clinic.
          All rights reserved.

        </div>

      </footer>

    </div>
  );
}

export default ServiceDetail;