import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <body className="landingBody">
        <div>
        <div>
            <Link to='/home'>
                <button>Get In!</button>
            </Link>
        </div>
        </div>
        </body>
    )
}