import React from "react";
import "./Certifications.css";

// adjust paths/extensions to match your files
import CER1 from "../../assets/images/cer1.jpg";
import CER2 from "../../assets/images/cer2.jpg";

export default function Certifications() {
  const items = [
    {
      title: "Halal Certification — Al-Waiz Certifications & Training Services (Pvt.) Ltd.",
      img: CER1,
      alt: "Halal certification by Al-Waiz",
      file: CER1,
    },
    {
      title: "Halal Certification — Center for Halal Assurance",
      img: CER2,
      alt: "Halal certification by Center for Halal Assurance",
      file: CER2,
    },
  ];

  return (
    <section className="certs" aria-labelledby="certs-title">
      {/* backdrop that blurs everything except the hovered card */}
      <div className="certs__backdrop" aria-hidden="true" />

      <div className="certs__inner">
        <header className="certs__head">
          <h2 id="certs-title" className="certs__title">Certifications</h2>
          <p className="certs__sub">
            Independent certifications that back our Road Grass &amp; Alfalfa handling, hygiene, and quality practices.
          </p>
          <span className="certs__rule" aria-hidden />
        </header>

        <div className="certs__grid">
          {items.map((c) => (
            <article className="certcard" key={c.title} tabIndex={0}>
              <div className="certcard__media">
                <img src={c.img} alt={c.alt} loading="lazy" />
              </div>

              <footer className="certcard__foot">
                <h3 className="certcard__title">{c.title}</h3>

                <a className="certcard__download" href={c.file} download>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
                    className="certcard__icon"
                  >
                    <path
                      d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  Download
                </a>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
