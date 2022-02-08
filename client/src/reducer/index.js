const initialState = {
    clientes : [],
    cliente : []
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

        case 'POST_CLINIC':
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
        default :
        return state;
    }
}

export default rootReducer;