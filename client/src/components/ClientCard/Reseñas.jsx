import "../ClientCard/TurnoMe.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import NavLanding from "../../components/NavLanding/NavLanding";
import Footer from "../Home/Footer";
import { Link } from "react-router-dom";
import { getTurnosDoctor } from "../../actions";

export default function Reseñas() {
  const dispatch = useDispatch();
  const doctores = useSelector((state) => state.doctoresByEspec);
  const cookies = new Cookies();
  let dni = cookies.get("dni");
  let turnos = [];

  let turno = {
    idCliente: "1",
    id: "123",
    fecha: "12-2-2022",
    hora: 14,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: "muy buen servicio",
      calificacionClinica: 4,
      calificacionDoctor: 2,
      calificacionClinno: 5,
      reviewed: true,
    },
    diagnostico: {
      sintomas: "tiene hipo",
      indicaciones: "aguantar la respiracion",
      estudios: "resonancia magnetica",
    },
  };

  let turno2 = {
    idCliente: "1",
    id: "124",
    fecha: "12-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: null,
      calificacionClinica: null,
      calificacionDoctor: null,
      calificacionClinno: null,
      reviewed: false,
    },
    diagnostico: {
      sintomas: "tiene covid",
      indicaciones: "resposo",
      estudios: "pcr",
    },
  };

  let turno3 = {
    idCliente: "1",
    id: "125",
    fecha: "12-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: null,
      calificacionClinica: null,
      calificacionDoctor: null,
      calificacionClinno: null,
      reviewed: false,
    },
    diagnostico: {
      sintomas: "tiene coviiiiiiiichi",
      indicaciones: "resposo",
      estudios: "pcr",
    },
  };

  let turno4 = {
    idCliente: "1",
    id: "126",
    fecha: "12-2-2022",
    hora: 16,
    idClinica: "4ca34fa9-0436-420b-832a-2bc372eb8909",
    idDoctor: "0d96509e-0d6b-4e7c-b768-df7d8f1d6da8",
    idEspecialidad: 1,
    status: "concretado",
    reseña: {
      comentario: "muy buen servicio",
      calificacionClinica: 4,
      calificacionDoctor: 2,
      calificacionClinno: 5,
      reviewed: true,
    },
    diagnostico: {
      sintomas: "esta perfecto",
      indicaciones: "sin indicaciones",
      estudios: "sin estudios",
    },
  };

  turnos.push(turno, turno2, turno3, turno4);

  turnos = turnos.filter((turno) => turno.reseña.reviewed === true);

  return (
    <div>
      <NavLanding />
      <Link class="btn btn-primary mt-3" to="/me">
        Volver a mi perfil
      </Link>
      <h2 class="mt-3">Mis Reseñas</h2>

      <div class="col-4 m-auto mt-5 mb-5">
        <div class="accordion" id="accordionExample">
          {turnos?.map((turno) => (
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapseOne" + turno.id}
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  {"Reseña del turno " + turno.id}
                </button>
              </h2>
              <div
                id={"collapseOne" + turno.id}
                class="accordion-collapse collapse card"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Calificacion de la clinica:{" "}
                      {turno.reseña.calificacionClinica}
                    </li>

                    <li class="list-group-item">
                      Calificacion del medico: {turno.reseña.calificacionDoctor}
                    </li>

                    <li class="list-group-item">
                      Calificacion de la aplicacion Clinno:{" "}
                      {turno.reseña.calificacionClinno}
                    </li>

                    <li class="list-group-item">
                      Comentarios: {turno.reseña.comentario}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div class="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
}
