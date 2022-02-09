const initialState = {
    clientes : [],
    cliente : [],
    especialidades : [],
    clinicas : [],
    clinica: [],
    doctor: []
};




const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case "GET_CLIENTES" :
            return {
                ...state,
                clientes : action.payload
            }
            
        case 'POST_USER' :
            return{
                ...state,
            }

        case 'POST_CLINIC' :
            return{
                ...state,
            }
        
        case "VALIDATE_USER" :
            return{
                ...state,
                cliente : action.payload

            }
        case "VALIDATE_USER_WRONG" :
            return{
                ...state,
                cliente : action.payload

            }
        case "GET_ESPECIALIDAD" :
            return{
                ...state,
                especialidades : action.payload
              
            }
        case "GET_CLINICAS" : 
            return{
                ...state,
                clinicas : action.payload
              
            }
        case 'CLINICA_USER':
            return{
                ...state,
                clinica: action.payload
              
            }
        case 'VALIDATE_DOCTOR':
            return{
                ...state,
                doctor: action.payload
                
            }
        default :
        return state;
    }
}

export default rootReducer;