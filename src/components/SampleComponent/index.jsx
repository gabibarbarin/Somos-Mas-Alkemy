import React, { useEffect, useState } from "react";
import { getAllService } from "../../services";
import ReactHtmlParser from "react-html-parser";
import "./style.css";

function SampleComponent({ page }) {
  const [data, setData] = useState();
  useEffect(() => {
    getAllService(`${page}`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <div>
      <div className="row">
        {data?.map((sample, i) => (
          <div key={i} className="col-sm-12 col-lg-3 my-2 max-width-sample">
            <div className="card border-0 sample-class shadow-sm">
              <div className="sample-class-image-container">
                <div className="sample-class-image">
                  <img
                    src={sample.image}
                    className="card-img-top"
                    alt={sample.name}
                  />
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{sample.name}</h5>
                <div className="card-text">
                  {ReactHtmlParser(sample.content)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleComponent;
