'use client';
import React from 'react';
import ContactHero from '../components/contact/ContactHero/ContactHero';
import ContactForm from '../components/contact/ContactForm/ContactForm';
import ContactInfo from '../components/contact/ContactInfo/ContactInfo';
import '../styles/ContactPage.css';

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <ContactHero />

      <main className="contact-main-content">
        <section className="contact-form-section">
          <ContactForm />
        </section>

        <aside className="contact-info-section">
          <ContactInfo />
        </aside>
      </main>
    </div>
  );
};

export default Contact;
