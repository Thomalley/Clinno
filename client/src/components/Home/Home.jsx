import React,{ useState,useEffect  } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link,useNavigate} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Cookies from 'universal-cookie'

import { useAuth0 } from "@auth0/auth0-react";


import './HomeStyle.css';
import Footer from "./Footer";

const cookies = new Cookies()

let arrayEsp = [
    "Fisiatría",
    "Pediatría",
    "Traumatología",
    "Cardiología",
    "Gastroenterología",
    "Neurología",
    "Psiquiatría",
    "Kinesiología",
    "Psicología",
    "Nutrición",
    "Fonoaudiología"
];

export default function DetailClinica(){

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const clientes = useSelector((state)=> state.clientes);

    const { isAuthenticated,isLoading} = useAuth0();
    //isLoading muestra si la sesion fue iniciada por auth0, isAuthenticated al final manda un true

    
    let session;
    console.log("sesion iniciada por " + cookies.get('email'));
    //este consola muestra el email de cookies, el email determina si inicio sesion
    if(cookies.get('email')){
        session = true;
    }else{
        session = isLoading;
    }
    const [loggeado,setLoggeado] = useState(session);


    //control de sesion
    useEffect(()=>{
        console.log(isLoading)
        if(cookies.get('email')){
            setLoggeado(true);
        }else {
            if(isAuthenticated){
                setLoggeado(true);
            }else{
                setLoggeado(false);
            }
        }
        
    },[isLoading,cookies.get('email')])

   
    //NavBar NECESITA saber si esta iniciada la sesion, con loggeado , un estado.
 
    
   
    return(
        <>
            <div className="container contenedor_home ">
                <NavBar loggin={loggeado} />
                

                <div className='d-flex justify-content-center align-items-center '>
                    <div>
                        <h3 className="m-4">Contamos con las especialidades:</h3>
                        <div className=" especialidades_contenido">
                            {arrayEsp.sort((a, b)=> {
                                if (a < b) {
                                    return  -1 ;
                                }
                                if (a > b) {
                                    return  1;
                                }
                                return 0;
                            })?.map((e,i)=>{
                                return <div className="especialidad" key={i}>
                                    <h4>{e}</h4>
                                </div>
                            })}
                        </div>

                    </div>
                </div>

                
                


            </div>
            <Footer />
            
        </>
    )
}