import axios from 'axios';

export const getClients = ()=>{
    return async function(dispatch){
        try{
            // let json = await axios.get('http://localhost:3001/cliente');
            const json = [{ "username" : "marcos@hotmail.com", "password" : "123456"}, {"username" : "jose@hotmail.com", "password" : "123456"}, { "username" : "luis@hotmail.com", "password" : "123456"}]
            return dispatch({
                type : "GET_CLIENTES",
                // payload : json.data
                payload : json
            })
        }
        catch(e){
            console.log(e)
        }
    }
}