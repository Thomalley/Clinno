import React from "react"
import './Error.css'
import photo from '../utils/hipertencion.gif'
import { Link } from "react-router-dom";


export default function Error() {


    return (
        <div className="contiene">
            <div className="container">
                <div className=".no-gutters">
                    <div className="col-12">
                        <h1 id="work" className="display-5"><strong>Algo salio mal!</strong></h1>
                        <img  className=" col-8 .col-sm-8" id="workingImage" src={photo} alt="estamos trabando" />
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