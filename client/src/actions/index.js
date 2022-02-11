import axios from 'axios';
import { createSearchParams, renderMatches } from 'react-router-dom';
import swal from 'sweetalert';

export function getClients() {
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/cliente');
            return dispatch({
                type: "GET_CLIENTES",
                payload: json.data
            })
        }
        catch (e) {
            console.log(e)

        }
    }
}

export function getEspecialidad() {
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/especialidad');
            return dispatch({
                type: "GET_ESPECIALIDAD",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getClinicasByEspec(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/especialidad/${id}`);
            return dispatch({
                type: "GET_CLINICAS_BY_ESPE",
                payload: json.data
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function getDoctoresByEspec(data) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/doctor/${data.idEspecialidad}/${data.idClinica}`);
            return dispatch({
                type: "GET_DOCTORES_BY_ESPEC_ID",
                payload: json.data
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function login_validate(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/cliente');
            for (let i = 0; i < json.data.length; i++) {
                if (json.data[i].email === payload.email && json.data[i].password === payload.password) {
                    const data = [{
                        email: json.data[i].email,
                        password: json.data[i].password,
                        nombre: json.data[i].nombre,
                        apellido: json.data[i].apellido,
                        direccion: json.data[i].direccion,
                        id: json.data[i].id,
                        dni: json.data[i].dni,
                        admin: json.data[i].admin,
                        createdAt: json.data[i].createdAt
                    }]

                    return dispatch({
                        type: "VALIDATE_USER",
                        payload: data
                    });
                }
                else
                    dispatch({
                        type: "VALIDATE_USER_WRONG",
                        payload: []
                    });
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

//POST

export function registrarCliente(payload) {
    return async function (dispatch) {
        console.log(payload)
        const response = await axios.post("http://localhost:3001/cliente", payload)
        console.log(response)
        return response
    }
}

export function crearTurno(input) {
    return async function (dispatch) {
        try {
            const newTurno = await axios({
                method: "post",
                url: "http://localhost:3001/turno",
                data: {
                  fecha: input.fecha,
                  idEspecialidad: input.idEspecialidad,
                  idClinica: input.idClinica,
                  idDoctor: input.idDoctor,
                  hora: input.hora,
                  idCliente: input.idCliente
                },
              });
            return dispatch({
                type: "CREAR_TURNO",
                payload: newTurno
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function nuevoHorarioDoc(input) {
    return async function(dispatch) {
        try{
            const horario = await axios({
                method: "put",
                url: "http://localhost:3001/especialidad",
                data: {
                    nombre : input.nombre,
                    horario: input.horario
                },
            });
            // return dispatch({
            //     type: "NUEVO_HORARIO_DOC",
            //     payload: horario
            // })
        }
        catch(e){
            console.log(e)
        }
    }
}

//Clinica

export function login_clinica(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/clinica');
            for (let i = 0; i < json.data.length; i++) {
                if (json.data[i].email === payload.email && json.data[i].password === payload.password) {
                    const datos = [{
                        id: json.data[i].id,
                        nombre: json.data[i].nombre,
                        direccion: json.data[i].direccion,
                        telefono: json.data[i].telefono,
                        mail: json.data[i].mail,
                        password: json.data[i].password,
                        nombreEn: json.data[i].nombreEn,
                        apellidoEn: json.data[i].apellidoEn,
                        DNIEn: json.data[i].DNIEn,
                        createdAt: json.data[i].createdAt
                    }]
                    return dispatch({
                        type: "CLINICA_USER",
                        payload: datos
                    });
                }
                else {
                    dispatch({
                        type: "CLINICA_USER",
                        payload: []
                    });
                }
            }

        }
        catch (e) {
            console.log(e)
        }
    }
}

export function get_clinica(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/clinica');
            const datos = json.data.filter((e) => (e.id === payload))
            const datosFiltrados = [{
                id: datos[0].id,
                nombre: datos[0].nombre,
                direccion: datos[0].direccion,
                telefono: datos[0].telefono,
                mail: datos[0].mail,
                password: datos[0].password,
                nombreEn: datos[0].nombreEn,
                apellidoEn: datos[0].apellidoEn,
                DNIEn: datos[0].DNIEn,
            }]
            return dispatch({
                type: "CLINICA_USER",
                payload: datosFiltrados
            });
        }
        catch (e) {
            console.log(e)
        }
    }
}


export function registrarClinica(payload) {
    return async function (dispatch) {
        console.log(payload)
        const response = await axios.post("http://localhost:3001/clinica", payload)
        console.log(response)
        return response
    }
}




//Password Reset :)//

export function ResetPassword(id, password) {
    return async function (dispatch) {
        try{
        console.log(password)
        const response = await axios.put(`http://localhost:3001/cliente/${id}/passwordReset`, password )
        console.log(response)
        return response
        }
        catch(err){
            console.log(err)
        }
    }
}



//Doctor
export function validate_doctor(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get('http://localhost:3001/doctor');
            for (let i = 0; i < json.data.length; i++) {
                if (json.data[i].codigo === parseInt(payload.password, 10)) {
                    console.log(json.data[i]);
                    const datosDoc = [{
                        id: json.data[i].id,
                        nombre: json.data[i].nombre,
                        especialidad: {
                            id: json.data[i].especialidads[0].id,
                            nombre: json.data[i].especialidads[0].nombre,
                            horaComienzo: json.data[i].especialidads[0].horaComienzo,
                            horaFinal: json.data[i].especialidads[0].horaFinal,
                        }
                    }]
                    return dispatch({
                        type: "VALIDATE_DOCTOR",
                        payload: datosDoc
                    });
                }
                else {
                    dispatch({
                        type: "VALIDATE_DOCTOR",
                        payload: []
                    });
                }
            }

        }
        catch (e) {
            console.log(e)
        }
    }
}