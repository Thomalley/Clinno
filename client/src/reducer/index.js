// import {bydate} from '../helpers/helpers'
const initialState = {
    clientes: [],
    cliente: [],
    clienteByDni: [],
    especialidades: [],
    clinicasByEspec: [],
    clinicas: [],
    clinica: [],
    clinicaById: [],
    doctoresByEspec: [],
    doctor: [],
    turnos: [],
    doctores: [],
    horarioDisponibleParaTurno: [],
    turnosDni: [],
    doctorId: [],
    turnosClinica: [],
    turnosDoctor: [],
    diagDoctor: [],
    diagnosticos: [],
    turnoById: [],
    allDoctoresInDB: [],
    resenia: [],
    order:"",
    mpData: [],
    admin: [],
    mensualidad: [],
    mensualidades: []
};



const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TURNO":
            return {
                ...state,
                turnosClinica: action.payload
            }
        case "MP_DATA":
            return{
                ...state,
                mpData: action.payload
            }
        case "NEW_ORDER":
            return {
                ...state,
                order: action.payload
            }
        case "GET_DOCTOR_ID":
            return {
                ...state,
                doctorId: action.payload
            }

        case "GET_TURNOS_DNI":
            return {
                ...state,
                turnosDni: action.payload
            }

        case "FILTRO_FECHA_TURNOS_ME":
            return {
                ...state,
                turnosDni: action.payload
            }

        case "GET_TURNOS_ID":
            return {
                ...state,
                turnoById: action.payload
            }

        case "FILTER_TURNOS":
            let turnosTotalN;
            (state.turnos)? turnosTotalN = state.turnosDoctor : turnosTotalN= state.turnos;
            turnosTotalN =action.payload.fecha === "" && action.payload.nombre === "" ? state.turnosDoctor 
            : action.payload.nombre ==="" ? turnosTotalN.filter(i => i.fecha.includes( action.payload.fecha))
            : turnosTotalN.filter(i => i.dniCliente.includes(action.payload.nombre)&& i.fecha.includes( action.payload.fecha));
            turnosTotalN = action.payload.status !== 'cancelado' ?  turnosTotalN.filter(i => i.status !== 'cancelado'): turnosTotalN;

            return {
                    ...state,
                    turnos: turnosTotalN
                }  

        case "GET_CLIENTES":
            return {
                ...state,
                clientes: action.payload
            }

        case "GET_CLIENTE_BY_DNI":
            return {
                ...state,
                clienteByDni: action.payload
            }

        case "GET_DIAG":
            return {
                ...state,
                diagnosticos: action.payload
            }

        case "GET_TURNOS":
            return {
                ...state,
                turnos: action.payload
            }

        case "DIAG_BY_TURNO":
            return {
                ...state,
                diagDoctor: action.payload
            }
        case "GET_CLINICAS":
            return {
                ...state,
                clinicas: action.payload
            }

        case 'POST_USER':
            return {
                ...state,
            }

        case 'POST_CLINIC':
            return {
                ...state,
            }

        case 'ADD_DIAG':
            return {
                ...state
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

        case "GET_CLINICA_ID":
            return {
                ...state,
                clinicaById: action.payload
            }
        case "GET_CLINICAS_BY_ESPE":
            return {
                ...state,
                clinicasByEspec: action.payload
            }

        case 'ADD_DOCTOR':
            return {
                ...state,
                doctor: action.payload
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
            return {
                ...state,
            }

        case 'VALIDATE_DOCTOR':
            return {
                ...state,
                doctor: action.payload,
            }
        case 'GET_RESENIA':
            return {
                ...state,
                resenia: action.payload
            }
        case 'GET_ALL_DOCTOR_CLINICA':
            return {
                ...state,
                doctores: action.payload
            }
        case "GET_DISPONIBILIDAD":
            return {
                ...state,
                horarioDisponibleParaTurno: action.payload
            }

        case "GET_TURNO_DOCTOR":
            return {
                ...state,
                turnosDoctor: action.payload,
                turnos: action.payload,
            }

        case "GET_TURNO_CLINICA":
            return {
                ...state,
                turnosClinica: action.payload
            }
        case "ALL_DOCTORES_IN_DB":
            return {
                ...state,
                allDoctoresInDB: action.payload
            }
        case "VALIDATE_ADMIN":
            return{
                ...state,
                admin: action.payload
            }
        case "VALIDATE_ADMIN_WRONG":
            return{
                ...state,
                admin: action.payload
                }
        case "GET_MENSUALIDAD":
            return {
                ...state,
                mensualidad: action.payload
            }
        case "GET_MENSUALIDADES":
            return{
                ...state,
                mensualidades: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;