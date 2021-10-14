import React, { useEffect, useState } from "react";
import { getAllService } from "../../services";
import "./ActivityDetail.css";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { LoaderSpinner } from '../index'

const ActivityDetail = () => {
  const { id } = useParams();
  const [activityDetail, setActivityDetail] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      getAllService(`activities/${id}`)
        .then((response) => {
          setActivityDetail(response.data);
          setLoading(false)
        })
        .catch((error) => {
          setMessage(error);
          setLoading(false)
        });
    }
  }, [id]);

  return (
    <>
      {loading ? <LoaderSpinner /> :
        <>
          {message !== "" ? (
            <h4>Ocurrio un error! Vuelva a intertar mas tarde!</h4>
          ) : activityDetail.message ? (
            <h4>{activityDetail.message}</h4>
          ) : (
            <div className="">
              <div className="card  card__activity ">
                <div className="row g-0">
                  <div className="col-xl-6">
                    <div className="card-image__activity">
                      <img
                        className="card-img-top activity__img"
                        src={activityDetail.image}
                        alt={activityDetail.name}
                      />
                      <div className="card-caption"> {activityDetail.name}</div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body ">
                      <h4 className="card-caption activity__text">
                        {" "}
                        {activityDetail.name}
                      </h4>
                      {/* <p className="card-text">{activityDetail.content}</p> */}
                      <div className="card-text">
                        {ReactHtmlParser(activityDetail.content)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      }
    </>
  );
};
export default ActivityDetail;
