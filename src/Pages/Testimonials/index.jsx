import React from "react";
import { Footer, Header, SampleComponent } from "../../components";

const TestimonialsPage = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <h2 className="text-center my-4">Testimonios</h2>
        <SampleComponent page="testimonials" />
      </div>
      <Footer />
    </>
  );
};

export default TestimonialsPage;
