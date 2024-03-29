import axios from "axios";

export function getClients() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/cliente");
            return dispatch({
                type: "GET_CLIENTES",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}
export function postOrder(clinicaId) {
    return async function (dispatch) {
        try {
            const newOrder = await axios({
                method: "post",
                url: "/order",
                data: { clinicaId },
            });
            return dispatch({
                type: "NEW_ORDER",
                payload: newOrder.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}
export function getMensualidades(){
  return async function (dispatch){
    const mensus = await axios.get("/mensualidad");
    return dispatch({ type: "GET_MENSUALIDADES", payload: mensus.data})
  }
}

export function getMensualidad(id) {
    return async function (dispatch) {
        try {
            const mensualidad = await axios.get(`/mensualidad/clinica/${id}`);
            return dispatch({ type: "GET_MENSUALIDAD", payload: mensualidad.data });
        } catch (e) {
            console.log(e);
        }
    };
}
export function postMensualidad(input) {
    return async function (dispatch) {
      try {
        await axios({
          method: "post",
          url: "/mensualidad",
          data: {
            title: input.title,
            unit_price: input.unit_price,
            quantity: input.quantity,
            clinicaId: input.clinicaId,
            orderId: input.orderId
          },
        });
      } catch (e) {
        console.log(e);
      }
    };
  }

// export function getMercadoPago(orderId) {
//   return async function (dispatch) {
//     try {
//       await axios.get(`/mercadopago/${orderId}`);
//     } catch (e) {
//       console.log(e);
//     }
//   };
// }
export function getMercadoPago(orderId) {
    return async function (dispatch) {
        try {
            const mp = await axios.get(`/mercadopago/${orderId}`);
            return dispatch({
                type: "MP_DATA",
                payload: mp.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getClienteByDni(documento) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/cliente/dni/${documento}`);
            return dispatch({
                type: "GET_CLIENTE_BY_DNI",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getTurnosByDni(documento) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/turno/documento/${documento}`);
            return dispatch({
                type: "GET_TURNOS_DNI",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function filtroTurnoFecha(turnosFiltrados) {
    return async function (dispatch) {
        try {
            return dispatch({
                type: "FILTRO_FECHA_TURNOS_ME",
                payload: turnosFiltrados,
            });
        } catch (err) {
            console.log(err);
        }
    };
}
export function getTurnos() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/turno");
            return dispatch({
                type: "GET_TURNOS",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getTurnoId(id) {
    return async function (dispatch) {
        try {
            const turnoId = await axios.get(`/turno/${id}`);
            return dispatch({
                type: "GET_TURNOS_ID",
                payload: turnoId.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getClinicaId(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/clinica/${id}`);
            return dispatch({
                type: "GET_CLINICA_ID",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getDisponibilidad(fecha, idDoctor) {

    return async function (dispatch) {
        try {
            const json = await axios.get(
                `/turno/disponibilidad/${fecha}/${idDoctor}`
            );
            return dispatch({
                type: "GET_DISPONIBILIDAD",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getEspecialidad() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/especialidad");
            return dispatch({
                type: "GET_ESPECIALIDAD",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getClinicas() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/clinica");
            return dispatch({
                type: "GET_CLINICAS",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getClinicasByEspec(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/especialidad/${id}`);

            return dispatch({
                type: "GET_CLINICAS_BY_ESPE",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getDoctoresByEspec(data) {

    return async function (dispatch) {
        try {
            const json = await axios.get(
                `/doctor/${data.idEspecialidad}/${data.idClinica}`
            );
            return dispatch({
                type: "GET_DOCTORES_BY_ESPEC_ID",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };

}

export function login_validate(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get("/cliente");
            for (let i = 0; i < json.data.length; i++) {
                if (
                    json.data[i].email === payload.email &&
                    json.data[i].password === payload.password
                ) {
                    const data = [
                        {
                            email: json.data[i].email,
                            password: json.data[i].password,
                            nombre: json.data[i].nombre,
                            apellido: json.data[i].apellido,
                            direccion: json.data[i].direccion,
                            id: json.data[i].id,
                            dni: json.data[i].dni,
                            admin: json.data[i].admin,
                            createdAt: json.data[i].createdAt,
                        },
                    ];

                    return dispatch({
                        type: "VALIDATE_USER",
                        payload: data,
                    });
                } else
                    dispatch({
                        type: "VALIDATE_USER_WRONG",
                        payload: [],
                    });
            }
        } catch (e) {
            console.log(e);
        }
    };
}

//POST

export function registrarCliente(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post("/cliente", payload);
            return dispatch({
                type: "CLIENTE_CREADO",
                payload: response.data,
            });
        } catch (e) {
            console.log();
        }
    }
}

export function passworForgot(payload) {
    return async function (dispatch) {
        const response = await axios.post("/cliente/order-mail", payload);
        return response;
    };
}

export function crearTurno(input) {
    return async function (dispatch) {
        try {
            const newTurno = await axios({
                method: "post",
                url: "/turno",
                data: {
                    fecha: input.fecha,
                    idEspecialidad: input.idEspecialidad,
                    idClinica: input.idClinica,
                    idDoctor: input.idDoctor,
                    hora: input.hora,
                    dniCliente: input.dniCliente,
                },
            });
            return dispatch({
                type: "CREAR_TURNO",
                payload: newTurno,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function nuevoHorarioDoc(input) {
  return async function (dispatch) {
    try {
      await axios({
        method: "put",
        url: "/especialidad",
        data: {
          nombre: input.nombre,
          horario: input.horario,
        },
      });
      // return dispatch({
      //     type: "NUEVO_HORARIO_DOC",
      //     payload: horario
      // })
    } catch (e) {
      console.log(e);
    }
  };
}

//Clinica

export function login_clinica(payload) {

    return async function (dispatch) {
        try {
            const json = await axios.get("/clinica");
            for (let i = 0; i < json.data.length; i++) {
                if (
                    json.data[i].mail === payload.mail &&
                    json.data[i].password === payload.password &&
                    json.data[i].baja === false
                ) {
                    const datos = [
                        {
                            id: json.data[i].id,
                            nombre: json.data[i].nombre,
                            direccion: json.data[i].direccion,
                            telefono: json.data[i].telefono,
                            mail: json.data[i].mail,
                            password: json.data[i].password,
                            nombreEn: json.data[i].nombreEn,
                            apellidoEn: json.data[i].apellidoEn,
                            DNIEn: json.data[i].DNIEn,
                            createdAt: json.data[i].createdAt,
                        },
                    ];
                    return dispatch({
                        type: "CLINICA_USER",
                        payload: datos,
                    });
                } else {
                    dispatch({
                        type: "CLINICA_USER",
                        payload: [],
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

}

export function get_clinica(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/clinica");
      const datos = json.data.filter((e) => e.id === payload);
      const esp = datos[0].especialidads.map((e) => {
        return {
          id: e.id,
          nombre: e.nombre,
          horario: e.horario,
        };
      });
      const datosFiltrados = [
        {
          id: datos[0].id,
          nombre: datos[0].nombre,
          direccion: datos[0].direccion,
          telefono: datos[0].telefono,
          mail: datos[0].mail,
          codigo: datos[0].codigo,
          nombreEn: datos[0].nombreEn,
          apellidoEn: datos[0].apellidoEn,
          habilitada: datos[0].hablitada,
          DNIEn: datos[0].DNIEn,
          especialidad: esp,
        },
      ];
      return dispatch({
        type: "CLINICA_USER",
        payload: datosFiltrados,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function registrarClinica(payload) {
    return async function (dispatch) {
        console.log(payload);
        const response = await axios.post("/clinica", payload);
        console.log(response);
        return response;
    };
}

export function getResenia() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/resenia");
            return dispatch({
                type: "GET_RESENIA",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

//Password Reset :)//

export function ResetPassword(id, password) {
    return async function (dispatch) {
        try {
            console.log(password);
            const response = await axios.put(
                `/cliente/${id}/passwordReset`,
                password
            );
            console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    };
}

//Doctor
export function validate_doctor(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get("/doctor/clinica");
            for (let i = 0; i < json.data.length; i++) {
                if (
                    json.data[i].codigo === payload.password &&
                    json.data[i].clinicas[0].id === payload.idClinica
                ) {
                    const datosDoc = [
                        {
                            id: json.data[i].id,
                            codigo: json.data[i].codigo,
                            nombre: json.data[i].nombre,
                            especialidades: json.data[i].especialidads,
                        },
                    ];

                    return dispatch({
                        type: "VALIDATE_DOCTOR",
                        payload: datosDoc,
                    });
                }
            }
            return dispatch({
                type: "VALIDATE_DOCTOR",
                payload: [],
            });
        } catch (e) {
            console.log(e);
        }
    };
}
export function getDoctorById(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/doctor/${id}`);
            return dispatch({
                type: "GET_DOCTOR_ID",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}
export function get_doctor_id(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/doctor");
      for (let i = 0; i < json.data.length; i++) {
        if (json.data[i].codigo === payload) {
          const datosDoc = [
            {
              id: json.data[i].id,
              codigo: json.data[i].codigo,
              nombre: json.data[i].nombre,
              especialidades: json.data[i].especialidads,
            },
          ];
          return dispatch({
            type: "VALIDATE_DOCTOR",
            payload: datosDoc,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
}
export function doctorResetCodigo(id, codigo) {
  return async function (dispatch) {
    try {
      console.log(codigo);
      const response = await axios.put(
        `/doctor/${id}/codigoReset`,
        codigo
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };
}

// Admin Clinica
export function addEspecialidad(payload) {
    return async function (dispatch) {
        try {
            const addEsp = await axios.post("/especialidad", payload);
            return dispatch({ type: "ADD_ESPECIALIDAD", payload: addEsp.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function addDoctor(payload) {
  return async function (dispatch) {
    try {
      const addDoc = await axios.post("/doctor", payload);
      await axios.post(`/clinica/addEspecialidad`, payload);
      const addEmail = await axios.post("/doctor/creation-mail", addDoc.data);
      return dispatch({ type: "ADD_DOCTOR", payload: addDoc.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function get_All_Doctor(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/doctor/clinica`);
            const datoDoc = json.data.filter((doc) => {
                let arrId = doc.clinicas.map((c) => {
                    return c.id;
                });
                if (arrId.includes(payload)) {
                    return doc;
                }
            });
            const filterDoc = datoDoc.map((doc) => {
                return {
                    id: doc.id,
                    nombre: doc.nombre,
                    email: doc.email,
                    especialidad: doc.especialidads,
                };
            });
            return dispatch({ type: "GET_ALL_DOCTOR_CLINICA", payload: filterDoc });
        } catch (err) {
            console.log(err);
        }
    };
}

export function get_Doctores_Esp(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(
                `/doctor/${payload.idEspecialidad}/${payload.idClinica}`
            );
            const filterDoc = json.data.map((doc) => {
                return {
                    id: doc.id,
                    nombre: doc.nombre,
                    email: doc.email,
                    especialidad: doc.especialidads,
                };
            });
            return dispatch({ type: "GET_ALL_DOCTOR_CLINICA", payload: filterDoc });
        } catch (err) {
            console.log(err);
        }
    };
}

export function turno_clinica(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/turno`);
            console.log("json mAlo", json.data);
            const filterTurnos = json.data.filter((t) => t.idClinica === payload);
            console.log("Filtered", filterTurnos);
            let turnos = [];
            filterTurnos.forEach(async (f) => {
                let cliente = await axios.get(`/cliente/${f.idCliente}`);
                let especialidad = await axios.get(`/especialidad/${f.idEspecialidad}`);
                let doctor = await axios.get(`/doctor/${f.idDoctor}`);
                turnos.push({
                    id: f.id,
                    cliente: cliente.data.nombre + " " + cliente.data.apellido,
                    doctor: doctor.data.nombre,
                    especialidad: especialidad.data.nombre,
                    fecha: f.fecha,
                    hora: f.hora,
                    status: f.payment_status,
                    merchant_order_id: f.merchant_order_id,
                });
                console.log("turn turn", turnos);
            });
            console.log("estoy en acction", turnos);
            return dispatch({ type: "GET_TURNO", payload: turnos });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getTurnosClinica(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/turno/clinica/${payload}`);
            return dispatch({ type: "GET_TURNO_CLINICA", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getTurnosDoctor(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/turno/doctor/${payload}`);
      return dispatch({ type: "GET_TURNO_DOCTOR", payload: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function darBajaEmail(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.post(`/clinica/order-mail`, payload);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}

// Diagnostico
export function getDiagnosticoByTurno(payload) {
    return async function (dispatch) {
        try {
            console.log(payload);
            const diagByTurno = await axios.get(`/diagnostico/turno/${payload}`);
            console.log(diagByTurno.data);
            return dispatch({ type: "DIAG_BY_TURNO", payload: diagByTurno.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getDiagnostico(payload) {
    return async function (dispatch) {
        try {
            const diag = await axios.get("diagnostico");
            return dispatch({ type: "GET_DIAG", payload: diag.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function addDiagnostico(payload) {
  return async function (dispatch) {
    try {
      const addDiag = await axios.post("/diagnostico", payload);
      await axios.put(
        `/turno/update/${payload.idTurno}`,
        payload
      );
      const resenia = await axios.post("/resenia", payload)
      return dispatch({ type: "ADD_DIAG", payload: addDiag.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addResenia(payload) {
    return async function (dispatch) {
      try {
        const resenia = await axios.put("/resenia", payload);
        return dispatch({ type: "PASSWORD_RESET", payload: resenia });
      } catch (err) {
        console.log(err);
      }
    };
  }

export function getAllDoctores() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/doctor");
            return dispatch({
                type: "ALL_DOCTORES_IN_DB",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function canTurno(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.put(`/turno/update/${payload.idTurno}`, payload);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}

// turnos filter

export function filter_turnos(payload) {
    return async function (dispatch) {
        return dispatch({ type: "FILTER_TURNOS", payload: payload });
    };
}

//recuperar codigo doctor y clinica /order-mail

export function codigoDoctorEmail(payload) {
    return async function (dispatch) {
        try {
            console.log(payload);
            const json = await axios.post(`/doctor/order-mail`, payload);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function filter_fechas(payload) {
    return async function (dispatch) {
        return dispatch({ type: "FILTER_FECHAS", payload: payload.fecha });
    };
}

export function modifTurno(payload) {
    return async function (dispatch) {
        try {
            const json = axios.put(`/turno/update/date/${payload.idTurno}`, payload);
            return dispatch({
                type: "RESET_PASSWORD",
                payload: json.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function codigoClinicaEmail(payload) {
    return async function (dispatch) {
        try {
            console.log(payload);
            const json = await axios.post(`/clinica/mail-codigo`, payload);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function admin_user_validate(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.post("/2UpZaxFqVvbrwet6M1kXaSunGenIRsPE");

            if (
                json.data[0].username === payload.username &&
                json.data[0].password === payload.password
            ) {
                const data = [
                    {
                        username: json.data[0].email,
                        password: json.data[0].password,
                    },
                ];
                return dispatch({
                    type: "VALIDATE_ADMIN",
                    payload: data,
                });
            } else
                dispatch({
                    type: "VALIDATE_ADMIN_WRONG",
                    payload: [],
                });
        } catch (e) {
            console.log(e);
        }
    };
}

export function validate_clinica(payload) {
    const id = payload;
    return async function (dispatch) {
        try {
            const json = await axios.put(`clinica/validacion/${id}`);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function deshabilitar_clinica(payload) {
    const id = payload;
    return async function (dispatch) {
        try {
            const json = await axios.put(`clinica/desavalidacion/${id}`);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function darBaja_clinica(payload) {
    const id = payload;
    return async function (dispatch) {
        try {
            const json = await axios.put(`clinica/darbaja/${id}`);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function darSubida_clinica(payload) {
    const id = payload;
    return async function (dispatch) {
        try {
            const json = await axios.put(`clinica/darsubida/${id}`);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getClienteByEmail(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/cliente/email/${payload}`);
            return dispatch({
                type: "CLIENTE_BY_DNI",
                payload: json.data
            })
        }
        catch (e) {
            console.log(e)
        }
    }
  };



export function updateGoogleUser(input) {
    return async function () {
        try {
            await axios({
                method: "put",
                url: `cliente/actualizar/${input.email}`,
                data: {
                    direccion: input.direccion,
                    dni: input.dni,
                    datosCompletados: input.datosCompletados
                },
            });
        } catch (e) {
            console.log(e);
        }
    };
}

export function getClientById(id){
    return async function(){
        try{
            const json = axios.get(`/cliente/${id}`)
            return json.data
        }
        catch(e){
            console.log(e)
        }
    }
}

//adminUser  /2UpZaxFqVvbrwet6M1kXaSunGenIRsPE
export function adminUser() {
    return async function (dispatch) {
        try {
            const json = await axios.post(`/2UpZaxFqVvbrwet6M1kXaSunGenIRsPE`);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}

export function habilitacionCodigoMail(payload) {
    return async function (dispatch) {
        try {
        console.log(payload, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            const json = await axios({
                method: "post",
                url: "/2UpZaxFqVvbrwet6M1kXaSunGenIRsPE/mail-habilitar",
                data: {
                    mail: payload.mail,
                    codigo: payload.codigo,
                    nombre: payload.nombre
                },
            });
            
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}
//hola
export function AltaClinica(payload) {
    return async function (dispatch) {
        try {
            console.log(payload);
            const json = await axios.post(`/2UpZaxFqVvbrwet6M1kXaSunGenIRsP/alta-mail`, payload);
            return dispatch({ type: "RESET_PASSWORD", payload: json.data });
        } catch (err) {
            console.log(err);
        }
    };
}
