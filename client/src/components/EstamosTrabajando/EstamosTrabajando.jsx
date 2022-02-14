import React from "react"
import './EstamosTrabajando.css'
import photo from '../utils/hipertencion.gif'
export default function EstamosTrabajando(){


    return(
        <div>
        <div className="workingDiv">        
        <h1 className="workingTitulo">Estamos trabajando para usted!</h1>
        <img className="workingImage" src={photo} alt="estamos trabando" /> 
        <h2 >Área en construcción</h2> 
        </div>
        </div>
    )
}