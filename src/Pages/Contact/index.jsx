import React from "react";
import { ContactForm, ContactText, Footer } from "../../components";
import Header from "../../components/Header";
import "./style.css";

const ContactPage = () => {
  return (
    /* Cuando este disponible aplicar Header y Footer */
    <div className="contactContainer">
      <Header />
      <div className="col-12 mt-5 text-center">
        <h4 className="text-uppercase">Contactate con nosotros</h4>
      </div>
      <div className="row mt-4 m-auto pe-3 ps-3 mt-md-5 mainComponentsContainer">
        <ContactText />
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
