import React, { useEffect, useState } from "react";
import { getAllService } from "../../services";
import { Header, Footer } from "../../components/";

const UsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllService("members").then((res) => setData(res.data));
  }, []);

  return (
    <div className="sm-container">
      <Header />
      <h1 className="text-center my-4">Miembros</h1>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide my-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex justify-content-center">
              {data.slice(0, 3).map((item) => (
                <div key={item.id} className="col-3 text-center">
                  <div className="mx-2">
                    <img
                      style={{ objectFit: "cover" }}
                      src={item.image}
                      width="200"
                      height="200"
                      className="rounded-circle shadow mx-auto"
                      alt="..."
                    />
                    <h5 className="mt-4 text-uppercase">{item.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center">
              {data.slice(3, 6).map((item) => (
                <div key={item.id} className="col-3 text-center">
                  <div className=" mx-2">
                    <img
                      src={item.image}
                      width="200"
                      height="200"
                      className="rounded-circle shadow mx-auto"
                      alt="..."
                    />
                    <h5 className="mt-4 text-uppercase">{item.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UsPage;
