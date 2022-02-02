import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
        <div>
            <Link to='/home'>
                <button>Get In!</button>
            </Link>
        </div>
        </div>
    )
}