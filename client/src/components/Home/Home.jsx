import React,{ useState } from "react";
import NavBar from '../NavBar/NavBar';
import {Link} from 'react-router-dom';


export default function Home(){

    const initialState ={
        searchTurno: ""
    }
    
    const [state,setstate] = useState(initialState);
    const [loggeado,setLoggeado] = useState(true);
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
    const handleSubmit = (e) =>{
        e.preventDefault();
        // if(loggeado){ changeSesion();
        // console.log(e.target.childNodes[0].value );

        // dispatch(searchVideogame(state.searchTurno));
        // e.target.childNodes[0].value='';
    }
    return(
        <div className="container">
                <NavBar />
                    <br/><br/><br/>
                <div className="row mt-3 d-flex flex-wrap">
                    <div className="col-9">
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="5000">
                                <img src="https://cdn.pixabay.com/photo/2016/06/16/14/49/elderly-1461424_960_720.jpg" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Clinno es tu app de citas medicas!</h5>
                                    <p>Con Clinno podras acceder a +1000 citas medicas.</p>
                                </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="3000">
                                <img src="https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125_960_720.jpg" className="d-block w-100" alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Tu salud es lo mas importante!</h5>
                                    <p>Por eso brindamos el mejor servicio con los mejores profesionales.</p>
                                </div>
                                </div>
                                <div className="carousel-item">
                                <img src="https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534_960_720.jpg" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Clinno te da acceso a los mejores profesionales!</h5>
                                    <p>Los mejores medicos estan al alcance de un click!.</p>
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
                        
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center ">
                        <div className="col d-flex flex-column justify-content-end pb-3 mb-3">
                            <h2>Bienvenido a Clinno!</h2>
                            <h4>Accede a un turno medico!</h4>
                            <div className="">
                                <Link to='/register' type="button" class="btn btn-outline-secondary me-3">Registrate</Link>
                                <Link to='/login' type="button" class="btn btn-primary">Ingresa</Link>
                            </div>
                        </div>
                        <div className="col">
                            <form  className="d-flex " >
                                    <input 
                                        className="form-control me-3"
                                        type="text"
                                        onChange={handleState}
                                        value={state.searchTurno}
                                        type="search" />
                                    <button 
                                        className="btn btn-outline-primary"
                                        // type="submit" 
                                        value='Search'
                                        onClick={handleSubmit} >Buscar </button>
                            </form>
                        </div>
                    </div>
                </div>
                <br/>

                <div id='nosotros' className="mt-2 border-top border-bottom d-flex justify-content-center align-items-center flex-wrap mt-5 ">
                    <h2 className="m-4">Sobre nosotros</h2>
                    <div className='d-flex justify-content-start gap-2 '>
                        <div className="col shadow-lg p-3 mb-5 bg-body rounded">
                            <h2>Que es Clinno?</h2>
                            <p> Es una app de citas medicas, a través de la pagina podras encontrar la cita medica que necesitas, con los mejores medicos </p>
                        </div>
                        <div  className=" col shadow-lg p-3 mb-5 bg-body rounded">
                            <h2>Por que elegirnos?</h2>
                            <p> Porque te brinda una gran cantidad de citas/turnos medicos en un solo lugar, al alcanze de un click. </p>
                        </div>
                        <div  className="col shadow-lg p-3 mb-5 bg-body rounded">
                            <h2>Que te brindamos?</h2>
                            <p> La manera mas sencilla de solicitar turnos, en el horario disponible que desees, solamente debes registrarte.<Link to='/login'>Hazlo ya!</Link></p>                        
                        </div>
                        <div  className="col shadow-lg p-3 mb-5 bg-body rounded">
                            <h2>y si te Registras?</h2>
                            <p> Podras llevar toda la informacion de tus turnos, recordatorios, cancelaciones, los medicos que te atendieron e incluso sus diagnosticos.</p>
                        </div>
                        <div  className="col shadow-lg p-3 mb-5 bg-body rounded">
                            <h2>Como usar Clinno?</h2>
                            <p> Con tu usuario podras buscar la cita medica que necesites, ingresando el nombre del doctor o la especialidad que estes buscando.</p>
                        </div>
                    </div>
                </div>{/*  //nosotros//*/}
                <div id='doctores' className="">
                    <h2 className="m-4">Nuestros Doctores</h2>
                    <div className='d-flex justify-content-start align-items-center '>
                        <div>
                            <h2>Quienes son nuestros doctores?</h2>
                            <p> ... </p>
                        </div>
                        
                    </div>
                </div>{/*  //nosotros//*/}
            


        </div>
        
    )
}