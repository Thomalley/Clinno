import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import DetailClinica from './components/DetailClinica/DetailClinica';
import AboutUs from './components/AboutUs/AboutUs';
import RegisterClinic from './components/Register/RegisterClinic';
import HomeClients from './components/HomeClients/HomeClients';
import LoginClinica from './components/LoginClinica/LoginClinica';
import AdminClinica from './components/AdminClinica/AdminClinica';
import Reviews from './components/Reviews/Reviews'
import ClientCard from './components/ClientCard/ClientCard';
import PasswordReset from './components/ClientCard/PasswordReset';
import AdminDoctor from './components/AdminDoctor/AdminDoctor'
import AddDoctor from './components/AddDoctor/AddDoctor'
import AddEspecialidad from './components/AddEspecialidad/AddEspecialidad'
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Turno from './components/Turno/Turno';
import ClinicaCard from './components/ClinicaCard/ClinicaCard';
import VerDoctores from './components/VerDoctores/VerDoctores';
import MercadoPago from './components/AdminClinica/Cobro/Mercadopago'
import TurnoMe from './components/ClientCard/TurnoMe';
import EstamosTabajando from './components/EstamosTrabajando/EstamosTrabajando'
import ValidarUsuario from './components/AdminClinica/CreaTurnos/ValidarUsuario';
import RegistrarUsuario from './components/AdminClinica/CreaTurnos/RegistrarUsuario';
import TurnoDesdeAdm from './components/AdminClinica/CreaTurnos/Turno/TurnoDesdeAdm'
import CodigoDoctor from './components/AdminDoctor/CodigoDoctor'
import TurnosDelDia from './components/DoctorDiagnosticos/TurnosDelDia.jsx';
import AgregarDiagnostico from './components/DoctorDiagnosticos/AgregarDiagnostico';
import VerDiagnosticoDoctor from './components/DoctorDiagnosticos/VerDiagnostico'
import HistorialTurnosDoc from './components/HistorialTurnosDoc/HistorialTurnos'
import Checkout from './components/AdminClinica/Cobro/Checkout'
import Root from './components/AdminRoot/RootUser';
import Estadistica from './components/Estadisticas/Estadisticas'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/test' element={<Checkout/>}/>
          <Route path='/adminClinica/cobro' element={<MercadoPago/>}/>
          <Route path='/adminClinica/cliente/turno' element={<TurnoDesdeAdm/>}/>
          <Route path='/adminClinica/cliente' element={<ValidarUsuario/>}/>
          <Route path='/adminClinica/cliente/registrar' element={<RegistrarUsuario/>}/>
          <Route path='/TurnoMe' element={<TurnoMe/>}/>
          <Route path='/EstamosTrabajando' element={<EstamosTabajando/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/passwordreset' element={<PasswordReset/>}/>
          <Route path='/me' element={<ClientCard/>}/>
          <Route path='/reviews' element={<Reviews/>}/>
          <Route path='/aboutClinno' element={<LandingPage/>}/>
          <Route path='/' element={<HomeClients/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/registerClinic' element={<RegisterClinic/>}/>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/clinica/:id' element={<DetailClinica/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/loginClinica' element={<LoginClinica/>}/>
          <Route path='/adminClinica' element={<AdminClinica/>}/>
          <Route path='/soyDoctor' element={<AdminDoctor/>}/>
          <Route path='/adminClinica/AddDoctor' element={<AddDoctor/>}/>
          <Route path='/adminClinica/addEspecialidad' element={<AddEspecialidad/>}/>
          <Route path='/turno' element={<Turno/>}/>
          <Route path='/adminClinica/me' element={<ClinicaCard/>}/>
          <Route path='/adminClinica/VerDoctores' element={<VerDoctores/>}/>
          <Route path='/SoyDoctor/forgotpassword' element={<CodigoDoctor/>}/>
          <Route path='/SoyDoctor/turnosDelDia' element={<TurnosDelDia/>}/>
          <Route path='/SoyDoctor/agregarDiagnostico/:idTurno' element={<AgregarDiagnostico/>}/>
          <Route path='/SoyDoctor/verDiagnostico/:idTurno' element={<VerDiagnosticoDoctor/>}/>
          <Route path='/soyDoctor/historialTurnos' element={<HistorialTurnosDoc/>}/>
          <Route path='/admin/m9gap4npJJFlorV7uuej2bVfsL7b8N' element={<Root/>}/>
          <Route path='/adminClinica/estadisticas' element={<Estadistica/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

