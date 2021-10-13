import React from "react";
import { Footer, Header, SampleComponent } from "../../components";

const Activities = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <h2 className="text-center my-4">Servicios</h2>
        <SampleComponent page="activities" />
      </div>
      <Footer />
    </>
  );
};

export default Activities;
