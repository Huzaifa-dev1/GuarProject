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
          {/* Pakistan Office */}
          <article className="c-card" aria-labelledby="pak-office-title">
            <div className="c-card__head">
              <FiHome className="c-card__icon" />
              <h3 id="pak-office-title" className="c-card__title">Pakistan Office</h3>
            </div>

            <ul className="c-list">
              <li className="c-item">
                <FiMapPin />
                <span>
                  Office: Asif Arcade, GT Road Mini Bypass, Kot Addu, Punjab, Pakistan
                </span>
              </li>
              <li className="c-item">
                <FiPhone />
                <a href="tel:+923306008545">+92 330 600 8545</a>
              </li>
              <li className="c-item">
                <FiPhone />
                <span>WhatsApp: +92 330 600 8545</span>
              </li>
              <li className="c-item">
                <FiMail />
                <a href="mailto:Mjaglobaltrading@gmail.com">Mjaglobaltrading@gmail.com</a>
              </li>
            </ul>
          </article>

          {/* UAE Office */}
          <article className="c-card" aria-labelledby="uae-office-title">
            <div className="c-card__head">
              <TbBuildingFactory className="c-card__icon" />
              <h3 id="uae-office-title" className="c-card__title">Dubai Office (UAE)</h3>
            </div>

            <ul className="c-list">
              <li className="c-item">
                <FiMapPin />
                <span>
                  Office: Al Aweer Market Building 1, Shop 15, Dubai, UAE
                </span>
              </li>
              <li className="c-item">
                <FiPhone />
                <a href="tel:+971566787265">+971 56 678 7265</a>
              </li>
              <li className="c-item">
                <FiPhone />
                <span>WhatsApp: +971 56 678 7265</span>
              </li>
              <li className="c-item">
                <FiMail />
                <a href="mailto:Mjaglobaltrading@gmail.com">Mjaglobaltrading@gmail.com</a>
              </li>
            </ul>
          </article>
        </div>

        {/* Maps */}
        <section className="contact__maps" aria-labelledby="map-title">
          <h3 id="map-title" className="map__title">Find Us</h3>
          <p className="map__desc">Pakistan office near Mini Bypass, Kot Addu.</p>

          <div className="mapframe">
            <iframe
              title="Office Location Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Asif+Arcade,+GT+Road+Mini+Bypass,+Kot+Addu,+Punjab,+Pakistan&output=embed"
              allowFullScreen
            />
          </div>

          <a
            className="map__cta"
            href="https://www.google.com/maps/dir//Asif+Arcade,+GT+Road+Mini+Bypass,+Kot+Addu,+Punjab,+Pakistan"
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
