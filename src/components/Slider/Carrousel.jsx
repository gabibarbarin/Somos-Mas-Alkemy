
import React from 'react';

const Carousel = ({slides}) =>{   

        return(       
        <>
        <div id="carouselExampleCaptions" className="carousel slide w-100" data-bs-ride="carousel" >
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner h-30" >
              {slides.map(({ id, text, imageUrl }) => {
              return (
                <div key={id} className={`carousel-item  ${ id === 1 ? "active"  : " "}`}>
                  <div></div>
                <img style={{height:"600px"}} src={imageUrl} className="d-block w-100  " alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h4>{text}</h4>
                </div>
              </div>
              )
              })}
           
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          </>
        );

}


export default Carousel;