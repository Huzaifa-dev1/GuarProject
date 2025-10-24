import React from "react";
import "./AgGroup.css";

const COMPANIES = [
  {
    title: "Hassaan Builders",
    body:
      "Initially, Hassaan Builders started its operations as a construction company in 1985. Later on, the company extended its business into oil field as well. Currently, HB is recognized as one of the best sellers of oil products across the country which mainly includes Bitumen.",
  },
  {
    title: "Hassaan Carriage Services",
    body:
      "Hassaan Carriage services is a transportation company which provides carriage services to a large number of companies especially to Punjab Highway, FWO and NLC. The services include bitumen and other oil products delivery from refinery to customer’s site in bowsers, trailers, and trucks.",
  },
  {
    title: "Shaheer Oil Mills",
    body:
      "Shaheer Oil Mills specializes in processing of cotton seeds to extract cotton seed oil and cotton seed cake.",
  },
  {
    title: "Shaheer Feed Mills",
    body:
      "Shaheer Feed Mills is producing wide range of feed products for Dairy Industry. It is located near Shaheer Oil Mills. SFM complies the best manufacturing and bio-security standards to provide the quality products.",
  },
  {
    title: "AG Enterprises",
    body:
      "AG Enterprises is a licensed Import/Export based firm. The company is involved in import and export of numerous products including Japanese cars, Industrial Machinery and different instruments.",
  },
];

export default function AgGroup() {
  return (
    <section className="aggroup" aria-labelledby="aggroup-title">
      <div className="ag__inner">
        {/* Section Head */}
        <header className="ag__head">
          <p className="ag__eyebrow">AG Group Companies</p>
          <h2 id="aggroup-title" className="ag__title">
            Brief introduction of different companies within AG Group of Industries
          </h2>
          <p className="ag__lede">
            A quick look at the subsidiaries and business units that make up the Group.
          </p>
          <span className="ag__rule" aria-hidden />
        </header>

        {/* Grid */}
        <div className="ag__grid">
          {COMPANIES.map((c, i) => (
            <article
              className="agcard"
              key={c.title}
              style={{ animationDelay: `${0.18 + i * 0.12}s` }}
            >
              <h3 className="agcard__title">
                <span className="agcard__dot" aria-hidden />
                {c.title}
              </h3>
              <p className="agcard__body">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
