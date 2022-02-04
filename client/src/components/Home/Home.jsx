import React,{ useState,useEffect  } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link,useNavigate} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Cookies from 'universal-cookie'


import './HomeStyle.css';

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

export default function Home(){

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    let navigate = useNavigate();
    const initialState ={
        searchTurno: ""
    }
    
    if (cookies.get('email')){
        console.log("sesion iniciada por " + cookies.get('email'))
    }
    else console.log("no hay usuario logueado")

    const [state,setstate] = useState(initialState);
    const [loggeado,setLoggeado] = useState(false);//estado que determina si inicio sesion la persona
    // console.log(state);

    const handleState = (e) =>{
        const {value} = e.target
        setstate({
          ...state,
          searchTurno: value
        });
    }

    const changeSesion=()=>{
        console.log(loggeado);
        if(loggeado)  {setLoggeado(false);}
        else  {setLoggeado(true);}
    }
    const goToLogin = () =>{
        navigate('/login');
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        // if(loggeado){ changeSesion();
        // console.log(e.target.childNodes[0].value );

        // dispatch(searchVideogame(state.searchTurno));
        // e.target.childNodes[0].value='';
    }
    return(
        <>
            <div className="container contenedor_home ">
                <NavBar />
                
                <h1 className="nombre_hospital ">Sansum Clinic</h1>
                <div className="row mt-3 g-0 bg-light container_corrousel ">
                    <div className="col-sm-8 col-md-8 ">
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
                            
                    <div className="col col-md-4 d-flex flex-column justify-content-center align-items-center  carrousel_home">
                            <div className="col d-flex flex-column justify-content-end pb-3 mb-3 ">
                                <h2 className="animation_carrousel">Bienvenido a Clinno!</h2>
                                <h4 className="animation_carrousel">Accede a un turno medico!</h4>
                                <div className="animation_carrousel">
                                    <Link to='/register' type="button" className="btn btn-outline-secondary me-3">Registrate</Link>
                                    <Link to='/login' type="button" className="btn btn-primary">Ingresa</Link>
                                </div>
                            </div>
                            <div className="col">
                                <form  className="d-flex " >
                                        
                                        <button type="button" className="btn btn-primary animation_carrousel" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            
                                            // type="submit" 
                                            // value='Search'
                                            // onClick={handleSubmit} 
                                            >Busca tu cita medica! </button>
                                </form>
                            </div>
                    </div>
                </div>
                <br/>
                {/* d-flex justify-content-center align-items-center flex-wrap */}
                <div id='nosotros' className=" mt-2 border-top border-bottom  mt-5 row ">
                    <h2 className="m-4 nosotros">Sobre nosotros</h2>
                    <div className='d-flex justify-content-start gap-2 flex-warp-reverse row g-0'>
                        <div className="col shadow-lg p-3 mb-5 rounded nosotros_item">
                            <h2>Sansum Clinic</h2>
                            <p> En clinica Sansum Clinic, contamos con un staff de primer nivel para brindar un servicio de excelencia, promoviendo un ambiente de confort y atención personalizada para los pacientes. </p>
                        </div>
                        <div  className="col shadow-lg p-3 mb-5  rounded nosotros_item">
                            <h2>Por que elegirnos?</h2>
                            <p> Porque te brinda una gran cantidad de citas/turnos medicos en un solo lugar, al alcanze de un click. </p>
                        </div>
                        <div  className="col  shadow-lg p-3 mb-5  rounded nosotros_item">
                            <h2>Que te brindamos?</h2>
                            <p> Como profesional de la salud, usted podrá acceder de manera online a sus exámenes actuales y previos, incluso desde su celular.<Link to='/login'>Hazlo ya!</Link></p>
                        </div>
                        <div  className="col  shadow-lg p-3 mb-5  rounded nosotros_item">
                            <h2>y si te Registras?</h2>
                            <p> Podras llevar toda la informacion de tus turnos, recordatorios, cancelaciones, los medicos que te atendieron e incluso sus diagnosticos.</p>
                        </div>
                        <div  className="col  shadow-lg p-3 mb-5  rounded nosotros_item">
                            <h2>Como usar Clinno?</h2>
                            <p> Con tu usuario podras buscar la cita medica que necesites, ingresando el nombre del doctor o la especialidad que estes buscando.</p>
                        </div>
                    </div>
                </div>{/*  //nosotros//*/}
                <div id='doctores' className=" doctores">
                        <h2 className="m-4">Nuestros Doctores</h2>
                </div>{/*  //doctores//*/}
                <div className="container_carta_doctor">
                    <div class=" carta_doctor">
                        <img src="https://cdn.pixabay.com/photo/2020/05/26/19/48/stethoscope-5224534_960_720.jpg" class="card-img" alt="..."/>
                        <div class="card-img-overlay carta_texto_doctor">
                            <h5 class="card-title">La mejor atención</h5>
                            <p class="card-text">Contamos con un staff de primer nivel, promoviendo un ambiente de confort y atención personalizada para los pacientes.</p>
                            <p class="card-text">Para su mejor confort</p>
                        </div>
                    </div>
                    <div class=" carta_doctor">
                        <img src="https://cdn.pixabay.com/photo/2017/10/03/20/01/mri-2813899_960_720.jpg" class="card-img" alt="..."/>
                        <div class="card-img-overlay carta_texto_doctor">
                            <h5 class="card-title">Nuestras instalaciones</h5>
                            <p class="card-text">Las instalaciones mas modernas, con la de tecnología de vanguardia y recursos humanos altamente capacitados</p>
                            <p class="card-text">Tecnología de avanzada</p>
                        </div>
                    </div>
                    <div class="carta_doctor">
                        <img src="https://cdn.pixabay.com/photo/2017/06/18/19/35/x-ray-of-the-jaw-2416945_960_720.jpg" class="card-img" alt="..."/>
                        <div class="card-img-overlay carta_texto_doctor">
                            <h5 class="card-title"> Acceso a toda su información</h5>
                            <p class="card-text">Usted podrá acceder de manera online a sus exámenes actuales y previos, incluso desde su celular. </p>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center '>
                    <div>
                        <h2 className="m-4">Quienes son nuestros doctores?</h2>
                    </div>
                </div>
                <div className=" doctores_contenido">
                    {newArray?.map(e=>{
                        return <div className="doctor">
                            <h4>{e}</h4>
                            <img className="imagen_medico" src="https://via.placeholder.com/100x100"/>
                        </div>
                    })}
                </div>

                <h3 className="m-4">Contamos con las especialidades:</h3>
                <div className=" especialidades_contenido">
                    {arrayEsp?.map(e=>{
                        return <div className="especialidad">
                            <h4>{e}</h4>
                        </div>
                    })}
                </div>

                    {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                </div>


            </div>
            <footer className="footer">
                <div className="">
                    <p>Clinno App | © Copyright 2022 | Pagina Diseñada por <Link className="link" to='/aboutus'>Nombre del team</Link></p>
                </div>
                <div>
                    <button className="btn btn-outline-secondary logo_clinno">Logo Clinno!</button>
                    <p ><Link className="texto_final" to="/login">Login</Link>  | <Link className="texto_final" to="/">Ladding Page </Link> | <Link  className="texto_final" to="/register"> Registro </Link>  </p>
                </div>

            </footer>
        </>
    )
}