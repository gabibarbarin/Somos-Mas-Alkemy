import React, { useEffect, useState } from "react";
import { Footer, Slider } from "../../components";
import Header from "../../components/Header/index";
import { getAllService } from "../../services";
import ReactHtmlParser from "react-html-parser";
import "./index.css"

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    getAllService("organizations/1/public")
      .then((res) => {
        setWelcomeText(res.data.welcomeText);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllService("news").then((res) => {
      setNewsData(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <Slider />
        <h1 className="text-center my-4">{welcomeText}</h1>
        <h2 className="text-center my-4">Novedades</h2>
        <div className="row">
          {newsData.map((news, i) => (
            <div key={i} className="col-sm-12 col-lg-3 my-2 max-width-news">
              <div className="card border-0 news-home shadow-sm">
                <div className="news-home-image-container">
                  <div className="news-home-image">
                    <img
                      src={news.image}
                      className="card-img-top"
                      alt={news.name}
                    />
                  </div>
                  <a href="#!" className="btn-primary news-home-category">
                    {news.type}
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{news.name}</h5>
                  <p className="card-text">{ReactHtmlParser(news.content)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
