import Seo from "../components/Seo";
import ContentPageView from "../components/ContentPageView";
import { faqSchema } from "../components/ContentBlocks";
import { ABOUT_PAGE } from "../content/pages";
import { dentistSchema } from "../seo/site";
import "../index.css";

function About() {
  return (
    <div className="site">
      <Seo
        title={ABOUT_PAGE.metaTitle}
        description={ABOUT_PAGE.metaDescription}
        path="/about"
        schema={[dentistSchema, faqSchema(ABOUT_PAGE.faqs)]}
      />
      <ContentPageView page={ABOUT_PAGE} />
    </div>
  );
}

export default About;
