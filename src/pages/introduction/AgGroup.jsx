import React from "react";
import "./AgGroup.css";

const COMPANIES = [
 
  {
    title: "KATCO",
    body:
      "KATCO is a specialised company focused on cultivation, processing and export of Rhodes Grass & Alfalfa forage. The company operates modern baling and logistics infrastructure to supply bulk forage to Gulf and Asian markets.",
  },
  {
    title: "THE EXPRESS F&B Trading LLC",
    body:
      "THE EXPRESS F&B Trading LLC, Dubai-based, operates in the food & beverage trading sector, handling large volume shipments of grains, oilseeds and other agri-commodities into the Middle East hospitality chain.",
  },
  {
    title: "Indus Farming Corporation ",
    body:
      "Indus Farming Corporation, based in Pakistan, established in 2010 as the first company in the country dedicated to premium Rhodes Grass hay and Alfalfa hay exports. It manages over 1,000 acres and serves international feed markets. ",
  },
  {
    title: "ArdAkhdar Trading – UAE",
    body:
      "ArdAkhdar is a Dubai-based agro-products trading company specialising in fresh fruits, vegetables, premium rice and spices, leveraging the UAE trade gateway to serve markets across the Middle East and Africa. ",
  },
];

export default function AgGroup() {
  return (
    <section className="aggroup" aria-labelledby="aggroup-title">
      <div className="ag__inner">
        {/* Section Head */}
        <header className="ag__head">
          <p className="ag__eyebrow">MJA GROUP Companies</p>
          <h2 id="aggroup-title" className="ag__title">
            Brief introduction of different companies within MJA GROUP of Industries
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
