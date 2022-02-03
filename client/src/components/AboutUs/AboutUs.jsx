import './AboutUs.css';
import React from 'react';
import NavBar from '../NavBar/NavBar';

export default function AboutUs(){



    return(
        <div>
        <NavBar/>
        <img className="imgAbout" src="https://images.pexels.com/photos/6074958/pexels-photo-6074958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="nf" />
        <h1 className='abouth1'>About Us</h1>
        <div className='second'>
            <div className='container2'></div>
            <div className='container2'></div>
            <div className='container2'></div>
            <div className='container2'></div>
            <div className='container2'></div>
            <div className='container2'></div>
            <div className='container2'></div>
            <div className='container2'></div>
        </div>
        <div className='third'>
            <button className='btn btn-primary' id="btn" href='#nosotros'>Nosotros</button>
            <button className="btn btn-primary" id="btn" href='#doctores'>Doctores</button>
        </div>
        <p className='rights'>© 2022 Clinno. All rights reserved</p>
        </div>
    )
}