import React, { useEffect, useState } from 'react'
import { getAllService } from '../../services';
import Carousel from './Carrousel'

function Slider() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
      getAllService("slides")
      .then((res) => {
          setSlides(res.data);
      })
      .catch((error)=>{
        console.log(error)
      })
    }, []);

    return (
        <div className='d-flex justify-content-center'> 
            <Carousel  slides={slides}/> 
        </div>
    )
}

export default Slider
