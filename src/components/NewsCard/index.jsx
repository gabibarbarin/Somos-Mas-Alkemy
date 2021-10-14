import React from 'react'
import { Link } from 'react-router-dom'

function NewsCard({ NewsData }) {
    return (
        <div>
            <div class="card text-center " style={{width:"50vh"}}>
                <div class="card-header">
                    {NewsData.category}
                </div>
                <div class="card">
                    <img src={NewsData.image} alt={NewsData.name} class='img-fluid' />
                    <h5 class="card-title">{NewsData.name} </h5>
                    <p class="card-text">{NewsData.content} </p>
                    <Link to={`/novedades/${NewsData.id}`} class="btn btn-primary">Ver más</Link>
                </div>
                <div class="card-footer text-muted">
                    {/* Created At */}
                    2 days ago
                </div>
            </div>
        </div>
    )
}

export default NewsCard
