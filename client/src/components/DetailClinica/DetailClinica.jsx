import React,{ useState,useEffect  } from "react";
import { useDispatch,useSelector } from "react-redux";
import {useParams} from 'react-router';
import {Link,useNavigate} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import clinicas from './clinicas.json';
import logo from '../utils/images-landing/logo.png'

import Cookies from 'universal-cookie'

import { useAuth0 } from "@auth0/auth0-react";



import './DetailClinicaStyle.css';
import Footer from "../Home/Footer";

const cookies = new Cookies()



let newArray = [
    "Miguel Becerra",
    "Sonia Rodrigues",
    "Victorina Perdomo",
    "Otilia Alarcon",
    "Maria-Consuelo Sole",
    "César Vazquez",
    "Socorro Muñiz",
    "Andreu Vilar",
    "Vanesa Castilla",
    "Yassine Duque",
    "Izaro Sales",
    "Jose-Manuel Farre",
    "Roser Canto",
    "Iris Olmedo",
    "Mariona Domenech",
    "Flor Morales",
    "Emílio Robledo",
    "Ines Veiga",
    "Simon Urbano",
    "Judit Buendia",
]
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
    let {name} = useParams();
    const[error,setError]= useState(null)
    
    const dispatch = useDispatch();
    const clientes = useSelector((state)=> state.clientes);

    const { isAuthenticated,isLoading} = useAuth0();


    
    let session;
    // console.log("sesion iniciada por " + cookies.get('email'))  
    if(cookies.get('email')){
        session = true;
    }else{
        session = isLoading;
    }
    const [loggeado,setLoggeado] = useState(session);


    

    //control de sesion
    useEffect(()=>{
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

    
    const goToLogin = () =>{
        navigate('/login');
    }

    const clinic =clinicas.filter(e =>(
        e.nombre.toLowerCase() === name.toLowerCase()
    ))

    return(
        <>
        {clinic.length <1?
        <>
            <NavBar loggin={loggeado} />
            <div className="errorPagina">
                <Link to='/home'><div className="nombre_hospital"><img className="imgLogo_Clinno" src={logo} alt="Logo Clinno" /></div></Link>
                <br/>
                <h2>Lo siento, Esta página no está disponible. Disculpa las molestias.</h2>
                <h4>Por favor haz <Link to='/home'>click aqui</Link>  para volver a la home</h4>
            </div>
        </>
        
        :    <div className="container contenedor_home ">
                <NavBar loggin={loggeado} />
                
                <div className="nombre_hospital"><img className="imglogo" src={clinic[0].logo} alt="nf" /></div>
                <h1>{clinic[0].nombre}</h1>
                <div className="row mt-3 g-0 bg-light container_corrousel ">
                    <div className="col-2 col-md-8 container_corrousel_col_I ">
                        <div id="carouselExampleDark" className="carousel carousel-dark slide carrousel_slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="5000">
                                <img src="https://cdn.pixabay.com/photo/2016/06/16/14/49/elderly-1461424_960_720.jpg" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block carrousel_img">
                                    <h5>Clinno es tu app de citas medicas!</h5>
                                    <p>Con Clinno podras acceder a +1000 citas medicas.</p>
                                </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="3000">
                                <img src="https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125_960_720.jpg" className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block carrousel_img">
                                    <h5 className="blanco_carrousel">Tu salud es lo mas importante!</h5>
                                    <p className="blanco_carrousel">Por eso brindamos el mejor servicio con los mejores profesionales.</p>
                                </div>
                                </div>
                                <div className="carousel-item">
                                <img src="https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534_960_720.jpg" className="d-block w-100" alt="..."/>
                                <div className=" carousel-caption d-none d-md-block carrousel_img">
                                    <h5 className="blanco_carrousel">Clinno te da acceso a los mejores profesionales!</h5>
                                    <p className="blanco_carrousel">Los mejores medicos estan al alcance de un click!.</p>
                                </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                            
                    <div className="col-8 col-md-4 d-flex flex-column justify-content-center align-items-center  carrousel_home">
                            <div className="col d-flex flex-column justify-content-end pb-3 mb-3 ">
                                <h2 className="animation_carrousel">Bienvenido a {clinic[0].nombre}!</h2>
                                <h4 className="animation_carrousel">Accede a un turno medico con Clinno!</h4>
                                <div className="animation_carrousel">
                                {loggeado?  <></> :
                                    <>
                                        <Link to='/register' type="button" className="btn btn-outline-secondary me-3">Registrate</Link>
                                        <Link to='/login' type="button" className="btn btn-primary">Ingresa</Link>
                                    </>
                                }
                                </div>
                            </div>
                            <div className="col animation_carrousel">
                                        <div  className="d-flex flex-column " >
                                            <div className="nombre_hospital"><img className="imglogo" src={clinic[0].logo} alt="nf" /></div>
                                            <div className="nombre_hospital"><img className="imgLogo_Clinno" src={logo} alt="Logo Clinno" /></div>
                                            {/* <button 
                                                type="button" 
                                                className="btn btn-primary animation_carrousel" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#exampleModal"
                                            >Busca tu cita medica! </button> */}

                                        </div>
                            </div>
                    </div>
                </div>
                                
                <div id='nosotros' className=" mt-2 border-top border-bottom  mt-5 row nosotros_home ">
                    <h2 className="m-4 nosotros">Sobre nosotros</h2>
                    <div className='d-flex justify-content-start gap-2 flex-warp-reverse row g-0'>
                        <div className="col shadow-lg p-3 mb-5 rounded nosotros_item none_item">
                            <h2>{clinic[0].nombre}</h2>
                            <p> En {clinic[0].nombre}, contamos con un staff de primer nivel para brindar un servicio de excelencia, promoviendo un ambiente de confort y atención personalizada para los pacientes. </p>
                        </div>
                        <div  className="col shadow-lg p-3 mb-5  rounded nosotros_item none_item">
                            <h2>Por que elegirnos?</h2>
                            <p> Porque te brinda una gran cantidad de citas/turnos medicos en un solo lugar, al alcanze de un click. </p>
                        </div>
                        <div  className="col  shadow-lg p-3 mb-5  rounded nosotros_item">
                            <h2>Que te brindamos?</h2>
                            <p> Usted podrá acceder de manera online a sus exámenes actuales y previos, incluso desde su celular.</p>
                        </div>
                        <div  className="col  shadow-lg p-3 mb-5  rounded nosotros_item none_item">
                            <h2>y si te Registras?</h2>
                            <p> Podras llevar toda la informacion de tus turnos, recordatorios, cancelaciones, los medicos que te atendieron e incluso sus diagnosticos.</p>
                        </div>
                        <div  className="col  shadow-lg p-3 mb-5  rounded nosotros_item none_item">
                            <h2>Como usar Clinno?</h2>
                            <p> Con tu usuario podras buscar la cita medica que necesites, ingresando el nombre del doctor o la especialidad que estes buscando.</p>
                        </div>
                    </div>
                </div>{/*  //nosotros//*/}
                <div id='doctores' className=" doctores">
                        <h2 className="m-4">Nuestra Clinica</h2>
                </div>
                <div class="accordion direccion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button d-flex justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Donde estamos?
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body d-flex justify-content-start align-items-center acordeon_direccion">
                            <div className="nombre_hospital item_direccion"><img className="imglogo" src={clinic[0].logo} alt="nf" /></div>
                            <p className="item_direccion"> Estamos en {clinic[0].direccion}, Buenos Aires, Capital Federal </p>
                        </div>
                        </div>
                    </div>
                </div>
                
                
                {/* <div className="container_carta_doctor">
                    <div className=" carta_doctor">
                        <img src="https://cdn.pixabay.com/photo/2020/05/26/19/48/stethoscope-5224534_960_720.jpg" className="card-img" alt="..."/>
                        <div className="card-img-overlay carta_texto_doctor">
                            <h5 className="card-title">La mejor atención</h5>
                            <p className="card-text">Contamos con un staff de primer nivel, promoviendo un ambiente de confort y atención personalizada para los pacientes.</p>
                            <p className="card-text">Para su mejor confort</p>
                        </div>
                    </div>
                    <div className=" carta_doctor">
                        <img src="https://cdn.pixabay.com/photo/2017/10/03/20/01/mri-2813899_960_720.jpg" className="card-img" alt="..."/>
                        <div className="card-img-overlay carta_texto_doctor">
                            <h5 className="card-title">Nuestras instalaciones</h5>
                            <p className="card-text">Las instalaciones mas modernas, con la de tecnología de vanguardia y recursos humanos altamente capacitados</p>
                            <p className="card-text">Tecnología de avanzada</p>
                        </div>
                    </div>
                    <div className="carta_doctor">
                        <img src="https://cdn.pixabay.com/photo/2017/06/18/19/35/x-ray-of-the-jaw-2416945_960_720.jpg" className="card-img" alt="..."/>
                        <div className="card-img-overlay carta_texto_doctor">
                            <h5 className="card-title"> Acceso a toda su información</h5>
                            <p className="card-text">Usted podrá acceder de manera online a sus exámenes actuales y previos, incluso desde su celular. </p>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div> */}
                <div className='d-flex justify-content-center align-items-start '>
                    <div>
                    <h3 className="m-4">Quienes son nuestros doctores?</h3>
                        <div className=" doctores_contenido">
                        
                            {newArray.sort((a, b)=> {
                                if (a < b) {
                                    return  -1 ;
                                }
                                if (a > b) {
                                    return  1;
                                }
                                return 0;
                            }).map((e,i)=>{
                                return <div className="doctor" key={i}>
                                    <h4>{e}</h4>
                                    <img className="imagen_medico" src="https://via.placeholder.com/100x100"/>
                                </div>
                            })}
                        </div>

                    </div>
                    <div >
                        <h3 className="m-4">Contamos con las especialidades:</h3>
                        <div className=" especialidades_contenido">
                            {clinic[0].especialidades.sort((a, b)=> {
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

                {/* <!-- Modal --> */}
                {/* <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Inicio de sesion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            No has iniciado sesion , por favor ingresa.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  to='/login'  type="button"  className="btn btn-primary"  data-bs-dismiss="modal" onClick={goToLogin}>Ir a login</button>
                        </div>
                        </div>
                    </div>
                </div> */}


            </div>
        }
            <Footer />
            
        </>
    )
}