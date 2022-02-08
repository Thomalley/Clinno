import axios from 'axios';
import { createSearchParams } from 'react-router-dom';

//acceso a informacion de todos los clientes para admin
export function getClients (){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/cliente');
            return dispatch({
                type : "GET_CLIENTES",
                payload : json.data
            })
        }
        catch(e){
            console.log(e)

        }
    }
}

export function login_validate(payload){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/cliente');
                for(let i = 0 ; i < json.data.length ; i++){
                if (json.data[i].email === payload.email && json.data[i].password === payload.password){
                    const data = [{
                        email : json.data[i].email,
                        password : json.data[i].password,
                        nombre : json.data[i].nombre,
                        apellido : json.data[i].apellido,
                        direccion : json.data[i].direccion,
                        id : json.data[i].id,
                        dni : json.data[i].dni,
                        admin : json.data[i].admin,
                        createdAt : json.data[i].createdAt
                    }]
                    
                    return dispatch({
                        type : "VALIDATE_USER",
                        payload : data
                    });
                }
                else 
                    dispatch({
                    type : "VALIDATE_USER_WRONG",
                    payload : []
                });
            }
        }
        catch(e){
            console.log(e)
        }
    }
}

//POST

export function registrarCliente(payload){
        return async function (dispatch){
        console.log(payload)
        const response = await axios.post("http://localhost:3001/cliente", payload)
        console.log(response)
        return response
    }
}
    
//Clinica

export function login_clinica(payload){
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/clinica');
            for(let i = 0 ; i < json.data.length ; i++){
                if (json.data[i].email === payload.email && json.data[i].password === payload.password){
                const datos = [{
                    id : json.data[i].id,
                    nombre : json.data[i].nombre,
                    direccion : json.data[i].direccion,
                    telefono : json.data[i].telefono,
                    mail : json.data[i].mail,
                    password : json.data[i].password,
                    nombreEn : json.data[i].nombreEn,
                    apellidoEn : json.data[i].apellidoEn,
                    DNIEn : json.data[i].DNIEn,
                    createdAt : json.data[i].createdAt
                }]
                return dispatch({
                    type : "CLINICA_USER",
                    payload : datos
                    });
                }
                else {
                    dispatch({
                        type : "CLINICA_USER",
                        payload : []
                    });
                }
            }
           
        }
        catch(e){
            console.log(e)
        }
    }
}