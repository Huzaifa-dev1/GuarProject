import React from "react";
import { FiHome, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { TbBuildingFactory } from "react-icons/tb";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        {/* Header */}
        <header className="contact__head">
          <h2 id="contact-title" className="contact__title">Contact Us</h2>
          <p className="contact__sub">
            We’d love to hear from you — reach out for inquiries, partnerships, or support.
          </p>
          <span className="contact__rule" aria-hidden />
        </header>

        {/* Contact Info Grid */}
        <div className="contact__grid">
          {/* Head Office */}
          <article className="c-card" aria-labelledby="head-office-title">
            <div className="c-card__head">
              <FiHome className="c-card__icon" />
              <h3 id="head-office-title" className="c-card__title">Head Office</h3>
            </div>

            <ul className="c-list">
              <li className="c-item">
                <FiMapPin />
                <span>
                  Mini bypass, near Eid Gah, Kot Addu, Punjab, Pakistan
                </span>
              </li>
              <li className="c-item">
                <FiPhone />
                <a href="tel:+92662241706">+92 66 224 1706</a>
              </li>
              <li className="c-item">
                <FiPhone />
                <a href="tel:+923061700074">+92 306 170 0074</a>
              </li>
              <li className="c-item">
                <FiMail />
                <a href="mailto:aggi@agggumindustries.com">aggi@agggumindustries.com</a>
              </li>
            </ul>
          </article>

          {/* Factory */}
          <article className="c-card" aria-labelledby="factory-title">
            <div className="c-card__head">
              <TbBuildingFactory className="c-card__icon" />
              <h3 id="factory-title" className="c-card__title">Factory</h3>
            </div>

            <ul className="c-list">
              <li className="c-item">
                <FiMapPin />
                <span>
                  3.5Km Kot Addu–Sinawan GT road near bypass, Kot Addu, Punjab, Pakistan
                </span>
              </li>
              <li className="c-item">
                <FiPhone />
                <a href="tel:+923401700073">+92 340 170 0073</a>
              </li>
            </ul>
          </article>
        </div>

       {/* Maps */}
<section className="contact__maps" aria-labelledby="map-title">
  <h3 id="map-title" className="map__title">Find Us</h3>
  <p className="map__desc">Factory location near Khojay Wala, Kot Addu.</p>

  <div className="mapframe">
    <iframe
      title="Factory Location Map"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      // ✅ Use a place/search embed (works in iframes)
      src="https://www.google.com/maps?q=Khojay+Wala,+Kot+Addu,+Punjab,+Pakistan&output=embed"
      allowFullScreen
    />
  </div>

  {/* Optional: open the full directions page in a new tab */}
  <a
    className="map__cta"
    href="https://www.google.com/maps/dir//Khojay+Wala/@30.4703649,70.944434,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x39253b8795044a6f:0xf20c7c210e40e4ab"
    target="_blank"
    rel="noreferrer"
  >
    Open directions in Google Maps
  </a>
</section>

      </div>
    </section>
  );
}
