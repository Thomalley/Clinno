import Cookies from 'universal-cookie';
import swal from 'sweetalert';

export const cerrarSesion=()=>{
    const cookies = new Cookies();


    cookies.remove('clinica_mail');
    cookies.remove('clinica_nombre');
    cookies.remove('clinica_telefono');
    cookies.remove('clinica_direccion');
    cookies.remove('clinica_id');
    cookies.remove('clinica_nombreEn', );
    cookies.remove('clinica_apellidoEn');
    cookies.remove('clinica_DNIEn');
    cookies.remove('clinica_codigo');
    cookies.remove('clinica_createdAt');
    cookies.remove('doctor_nombre');
    cookies.remove('doctor_id');
    cookies.remove('doctor_codigo');
    cookies.remove('doctor_especialidades');

    swal("Has cerrado la sesion con explito!!", "En instantes seras redirigido a Inicio", "success");
    setTimeout(()=> window.location.href='/', 700) ;
}