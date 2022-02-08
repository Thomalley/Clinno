const initialState = {
    clientes : [],
    cliente : [],
    clinica: []
};




const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case "GET_CLIENTES" :
            return {
                ...state,
                clientes : action.payload
            }
            
        case 'POST_USER':
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
        case 'CLINICA_USER':
            return{
                ...state,
                clinica: action.payload
            }
        default :
        return state;
    }
}

export default rootReducer;