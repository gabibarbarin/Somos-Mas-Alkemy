import React, { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import { getAllService } from "../../services";
import ReactHtmlParser from "react-html-parser";

function TestimonialsPage() {
  const [testimonialsData, setTestimonialsData] = useState();
  useEffect(() => {
    getAllService("testimonials").then((res) => {
      setTestimonialsData(res.data.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-center my-4">Testimonios</h2>
      <div className="row">
        {testimonialsData?.map((testimonials, i) => (
          <div
            key={i}
            className="col-sm-12 col-lg-3 my-2 max-width-testimonials"
          >
            <div className="card border-0 testimonials-class shadow-sm">
              <div className="testimonials-class-image-container">
                <div className="testimonials-class-image">
                  <img
                    src={testimonials.image}
                    className="card-img-top"
                    alt={testimonials.name}
                  />
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{testimonials.name}</h5>
                <div className="card-text">
                  {ReactHtmlParser(testimonials.content)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TestimonialsPage;
