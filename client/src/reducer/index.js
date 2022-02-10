const initialState = {
    clientes: [],
    cliente: [],
    especialidades: [],
    clinicasByEspec: [],
    clinicas: [],
    clinica: [],
    doctoresByEspec: [],
    doctor: []
};




const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CLIENTES":
            return {
                ...state,
                clientes: action.payload
            }

        case 'POST_USER':
            return {
                ...state,
            }

        case 'POST_CLINIC':
            return {
                ...state,
            }

        case "VALIDATE_USER":
            return {
                ...state,
                cliente: action.payload
            }

        case "VALIDATE_USER_WRONG":
            return {
                ...state,
                cliente: action.payload
            }

        case "GET_ESPECIALIDAD":
            return {
                ...state,
                especialidades: action.payload
            }

        case "GET_CLINICAS_BY_ESPE":
            return {
                ...state,
                clinicasByEspec: action.payload
            }

        case 'CLINICA_USER':
            return {
                ...state,
                clinica: action.payload
            }

        case "GET_DOCTORES_BY_ESPEC_ID":
            return {
                ...state,
                doctoresByEspec: action.payload
            }

        case "CREAR_TURNO":
            return {
                ...state,
            }
        
        case "RESET_PASSWORD":
                return{
                    ...state,
                }

        case 'VALIDATE_DOCTOR':
            return {
                ...state,
                doctor: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;