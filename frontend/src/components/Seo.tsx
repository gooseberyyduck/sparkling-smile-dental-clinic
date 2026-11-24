import { CLINIC, SITE_URL, absoluteUrl } from "../seo/site";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  schema?: object | object[];
};

/*
  React 19 hoists <title>, <meta> and <link> rendered anywhere in the
  tree into <head>, so no extra library is needed.
*/
function Seo({
  title,
  description,
  path,
  image = CLINIC.heroImage,
  type = "website",
  noindex = false,
  schema,
}: SeoProps) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {SITE_URL && !noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={CLINIC.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {SITE_URL && !noindex && <meta property="og:url" content={url} />}
      <meta property="og:locale" content="en_AE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export default Seo;
