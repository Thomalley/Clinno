import './Reviews.css'
import React from 'react';
import profilePhoto from '../../components/utils/images-landing/usuario-sin-foto.png'
import Footer from '../Home/Footer';
import NavBar from '../NavBar/NavBar';


export default function Register(){

    const reviewArray = [
        {
            "nombre": "Manuel",
            "apellido": "perez",
            "review": "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
            "fecha": "enero 2022"
            },

            {
                "nombre": "pepito",
                "apellido": "garcia",
                "review": "es un garron clinno loco",
                "fecha": "enero 2021"
                },

                {
                    "nombre": "loco",
                    "apellido": "ricardo",
                    "review": "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                    "fecha": "enero 2020"
                    }
    ]

  return (
    <div>
    <NavBar/>
    <div class="card-deck">
    <h2>REVIEWS</h2>
    <div class="card-review">
    {reviewArray.map( (el) => 
    <div className='carta-review'>
    <img class="card-img-top image-review" src={profilePhoto} alt="Card cap"/>
    <div class="card-body">
    <h5 class="card-title">{el.nombre} {el.apellido}</h5>
    <p class="card-text">{el.review}</p>
    </div>
    <p class="card-text">
    <small class="text-muted">{el.fecha}</small>
    </p>
    </div>
    )}
    </div>
    </div>
    <Footer/>
    </div>
  )}