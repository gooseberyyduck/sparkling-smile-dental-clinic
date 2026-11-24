/*
  Central SEO settings for Sparkling Smile Dental Clinic.
  Set VITE_SITE_URL in frontend/.env (e.g. VITE_SITE_URL=https://www.example.ae)
  so canonical URLs, Open Graph URLs and the sitemap use the live domain.
*/
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://sparklingsmiledentalclinic.ae"
).replace(/\/$/, "");

export const CLINIC = {
  name: "Sparkling Smile Dental Clinic",
  phone: "+971503002504",
  altPhone: "+97126272214",
  email: "sparklingsmiledentalclinicad@gmail.com",
  streetAddress:
    "103, Building 159, Sector E 15, Hamdan Street, Opposite Al Salama Hospital",
  locality: "Al Zahiyah, Abu Dhabi",
  region: "Abu Dhabi",
  country: "AE",
  logo: "/images/sparkling-smile-logo.png",
  heroImage: "/images/clinic-interior-hero.jpg",
  whatsapp: "https://wa.me/971503002504",
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return SITE_URL ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : path;
}

/* Trim text to a meta-description length without cutting a word in half. */
export function toDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s]+$/, "") + "…";
}

export const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": absoluteUrl("/#clinic"),
  name: CLINIC.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl(CLINIC.logo),
  image: absoluteUrl(CLINIC.heroImage),
  telephone: CLINIC.phone,
  email: CLINIC.email,
  priceRange: "AED",
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.streetAddress,
    addressLocality: CLINIC.locality,
    addressRegion: CLINIC.region,
    addressCountry: CLINIC.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  areaServed: { "@type": "City", name: "Abu Dhabi" },
};
