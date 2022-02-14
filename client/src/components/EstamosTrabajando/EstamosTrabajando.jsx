import React from "react"
import './EstamosTrabajando.css'
import photo from '../utils/hipertencion.gif'
export default function EstamosTrabajando() {



    return (
        <div className="contiene">
            <div className="container">
                <div className=".no-gutters">
                    <div className="col-12">
                        <h1 id="work" className="display-5">Estamos trabajando para usted!</h1>
                        <img className="workingImage" src={photo} alt="estamos trabando" />
                        <h2 id="build" className="display-6">Componente en <strong>construcción</strong></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}