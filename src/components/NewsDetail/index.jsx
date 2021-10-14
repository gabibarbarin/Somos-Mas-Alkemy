import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';
import {Link} from 'react-router-dom';

const NewsDetail = (props) => {
    const [news, setNews] = useState({});
    const { match: { params } } = props

    const getData = async () => {
        const endpoint = `http://localhost:3001/news/${params.id}`;
        const data = await axios.get(endpoint);
        return data.data
    }
    useEffect(() => {
        getData().then(data => {
            setNews(data)
        });
    },[])
    return(
        <>  
            <div className="container text-center">
                {news.length > 0 ? (
                    <>
                        <div className="back shadow-sm">
                            <Link to="/"><BsArrowReturnLeft /> Volver</Link>
                        </div>
                        <div className="news-image" style={{backgroundImage: `url(${news.image})`}}></div>
                        <div className="news-title my-2">
                            <h2 className="border-bottom pb-3">{news.title}</h2>
                            <p className="text-secondary fst-italic">{news.createdAt}</p>
                        </div>
                        <p>{news.text}</p>
                    </>
                ) : (
                    <h2>Ocurrió un error</h2>
                )}
            </div>
        </>
    )
}

export default NewsDetail