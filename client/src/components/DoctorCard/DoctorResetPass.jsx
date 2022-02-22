import React, { useState, useEffect} from 'react';
import { ResetPassword } from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import Cookies from 'universal-cookie'
import { doctorResetCodigo,getDoctorById,getAllDoctores } from '../../actions/index';

import './DoctorCardStyle.css'

const ResetPassDoctor = () => {

    const [errors, setErrors] = useState({ noInputs: 'No hay inputs' });
    const [input, setInputs] = useState({
        codigo: "",
    });
    
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const userMail = (cookies.get("email"))
    const doctorId = useSelector((state)=> state.doctorId);
    const doctoresDb = useSelector((state)=> state.allDoctoresInDB);

    let user = {};

    useEffect ( () => {
      dispatch(getDoctorById(cookies.get('doctor_id')))
      dispatch(getAllDoctores())
    },[])

    let userId = cookies.get('doctor_id');

    function UpdatePassword(e, userId, input) {
        e.preventDefault();
        const arr = doctoresDb.filter( d => d.codigo===input.codigo)
        if(arr.length!==0){
            swal("Codigo Incorrecto!", "Este Codigo no es valido.", "warning");
        }else{
            dispatch(doctorResetCodigo(userId, input))
            setInputs({
                codigo: "",
            });
            swal("Has Cambiado tu codigo de doctor con exito!", "En instantes seras redirigido a Inicio de Doctor", "success");
            cookies.set('doctor_codigo', input.codigo, {path: '/'});
            setTimeout(()=> window.location.href='./', 2000) ;
        }
    }

    function isNotEmpty(obj) {
        return Object.keys(obj).length !== 0;
    }

    function handleCheckbox(e) {
        var pass1 = document.getElementById('pass1');
        var pass2 = document.getElementById('pass2');
        if( e.target.checked) {
            pass1.type="text";
            pass2.type="text";
        } 
        else{ 
            pass1.type="password";
            pass2.type="password";
        }
    }
    const handleInputChange = function (e) {
        var pass1 = document.getElementById('pass1');
        var pass2 = document.getElementById('pass2');

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, pass1, pass2));
        setInputs({
            codigo: e.target.value
        })
    }
    return (
        <div className='container text-black reseteando_codigo'>
            <form className="col-12" onSubmit={(e) => UpdatePassword(e, userId, input)}>
                <h2>Cambiar Codigo Doctor</h2>
                <div className="m-3">
                    <input type="password" className="form-control" placeholder="Nuevo Codigo" name="codigo" id="pass1" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="m-3">
                    <input type="password" className="form-control" placeholder="Confirmar codigo" name="codigo" id="pass2" onChange={(e) => handleInputChange(e)} />
                </div>
                {errors.name && (<p className="alert alert-danger ocultar">{errors.name}</p>)}
                <input className="mostrame_check" type='checkbox' onChange={(e)=> handleCheckbox(e)}/><p className="mostrame_la_pass">Mostrar Contraseña</p>
                <div className="container text-center  d-flex justify-content-center align-items-center">
                    <button type="submit" disabled={isNotEmpty(errors)} className="btn btn-warning">modificar</button>
                </div>
            </form>
        </div>
    )
}

export function validate(input, pass1, pass2) {
    let errors = {};
    if (!input.codigo) {
        errors.name = 'Contraseña es un campo obligatorio';
    }
    if (pass1.value !== pass2.value) {
        errors.name = 'Las contraseñas no coinciden';
    }
    return errors;
}

export default ResetPassDoctor;
