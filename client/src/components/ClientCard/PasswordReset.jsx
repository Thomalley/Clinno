import React, { useState } from 'react';
import { ResetPassword, logoutUser } from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";

const PasswordReset = () => {

    const [errors, setErrors] = useState({ noInputs: 'No hay inputs' });
    const [input, setInputs] = useState({
        password: "",
    });

    const user = useSelector(state => state.currentUser)

    const dispatch = useDispatch();

    function UpdatePassword(e, user, input) {
        e.preventDefault();
        console.log(user)
        console.log(input)
        dispatch(ResetPassword(user, input))
        dispatch(logoutUser())
         .then(() => {
             window.location.reload();
            })

        setInputs({
            password: "",
        });
    }

    function isNotEmpty(obj) {
        return Object.keys(obj).length !== 0;
    }

    const handleInputChange = function (e) {
        var pass1 = document.getElementById('pass1');
        var pass2 = document.getElementById('pass2');

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, pass1, pass2));
        setInputs({
            password: e.target.value
        })
    }
    return (
        <div className='container4'>
            <form className="m-auto col-12" onSubmit={(e) => UpdatePassword(e, user.id, input)}>
                <h2>Cambiar Contraseña</h2>
                <div className="m-3">
                    <input type="password" className="form-control" placeholder="Nueva contraseña" name="password" id="pass1" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="m-3">
                    <input type="password" className="form-control" placeholder="Confirmar nueva contraseña" name="password2" id="pass2" onChange={(e) => handleInputChange(e)} />
                </div>
                {errors.name && (<p className="alert alert-danger ocultar">{errors.name}</p>)}
                <div className="container text-center  d-flex justify-content-center align-items-center">
                    <input type="submit" disabled={isNotEmpty(errors)} className="btn btn-warning" value="MODIFICAR CONTRASEÑA" />
                </div>
            </form>
        </div>
    )
}

export function validate(input, pass1, pass2) {
    let errors = {};
    if (!input.password) {
        errors.name = 'Contraseña es un campo obligatorio';
    }
    if (pass1.value !== pass2.value) {
        errors.name = 'Las contraseñas no coinciden';
    }
    return errors;
}

export default PasswordReset;