import React from 'react'
import { Route } from 'react-router'
import { NewsCard } from '../../components'


function News() {
    // consumicion de API con data de las novedades

    const data = [
        {   id:1,
            name: "lorem Ipsum dolor sit amet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvcoc5qgyMC8oK5J9D31yN1V-avGCAAycCg&usqp=CAU",
            content: "Suspendisse potenti. Nunc aliquet posuere ipsum eu posuere. Sed convallis nec eros in sagittis.",
            categoryId: 1,
            type: "Test"
        },
        {   id:2,
            name: "lorem Ipsum dolor sit amet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvcoc5qgyMC8oK5J9D31yN1V-avGCAAycCg&usqp=CAU",
            content: "Suspendisse potenti. Nunc aliquet posuere ipsum eu posuere. Sed convallis nec eros in sagittis.",
            categoryId: 1,
            type: "Test"
        },
        {
            id:3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvcoc5qgyMC8oK5J9D31yN1V-avGCAAycCg&usqp=CAU",
            name: "lorem Ipsum dolor sit amet",
            content: "Suspendisse potenti. Nunc aliquet posuere ipsum eu posuere. Sed convallis nec eros in sagittis.",
            categoryId: 2,
            type: "Test"
        },
        {
            id:4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvcoc5qgyMC8oK5J9D31yN1V-avGCAAycCg&usqp=CAU",
            name: "lorem Ipsum dolor sit amet",
            content: "Suspendisse potenti. Nunc aliquet posuere ipsum eu posuere. Sed convallis nec eros in sagittis.",
            categoryId: 3,
            type: "Test"
        }
    ]
    return (
      
            <>
            <Route exact path='/novedades' render={() => (
                <div class="container-md">
                    <div class="row justify-content-center g-5">
                    {data.map(data => (
                        <div class="col-auto">
                            <NewsCard NewsData={data}/>
                         </div>
                        ))}
                    </div>
                </div>)} />
     
            </>

    ) 
 }

export default News
