import type { ContentBlock, ListItem, PageFaq } from "../content/pages";

function Item({ item }: { item: ListItem }) {
  return item.label ? (
    <>
      <strong>{item.label}:</strong> {item.text}
    </>
  ) : (
    <>{item.text}</>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") return <p key={index}>{block.text}</p>;
        const List = block.type === "ol" ? "ol" : "ul";
        return (
          <List key={index} className={`content-list content-list-${block.type}`}>
            {block.items.map((item, i) => (
              <li key={i}>
                <Item item={item} />
              </li>
            ))}
          </List>
        );
      })}
    </>
  );
}

export function FaqList({ faqs }: { faqs: PageFaq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <details key={index} className="faq-item">
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(faqs: PageFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
