const initialState = {
    users : []
};




const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case "EJEMPLO" :
            return {
                ...state,
                users : action.payload
            }
        default :
            return state;

    }
}

export default rootReducer;