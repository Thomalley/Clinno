import axios from 'axios';


//POST

export function registrarCliente(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/", payload)
        console.log(response)
        return response
    }
}