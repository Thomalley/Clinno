import axios from 'axios';
import { createSearchParams } from 'react-router-dom';


//POST

export function registrarCliente(payload){
        return async function (dispatch){
        console.log(payload)
        const response = await axios.post("http://localhost:3001/cliente", payload)
        console.log(response)
        return response
    }
}