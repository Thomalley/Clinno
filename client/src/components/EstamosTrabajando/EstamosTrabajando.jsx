import React from "react"
import './EstamosTrabajando.css'
import photo from '../utils/hipertencion.gif'
import { Link } from "react-router-dom";


export default function EstamosTrabajando() {


    return (
        <div className="contiene">
            <div className="container">
                <div className=".no-gutters">
                    <div className="col-12">
                        <h1 id="work" className="display-5">Estamos trabajando <strong>para usted!</strong></h1>
                        <img  className=" col-8 .col-sm-8" id="workingImage" src={photo} alt="estamos trabando" />
                        <h2 id="build" className="display-6">Componente en <strong>construcción</strong></h2>
                        <Link to='/'>
                            <button className="btn btn-warning">
                                Volver a inicio
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="foot_er">
                </div>
            </div>
        </div>
    )
}