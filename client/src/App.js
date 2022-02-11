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


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/passwordreset' element={<PasswordReset/>}/>
          <Route path='/me' element={<ClientCard/>}/>
          <Route path='/reviews' element={<Reviews/>}/>
          <Route path='/aboutClinno' element={<LandingPage/>}/>
          <Route path='/' element={<HomeClients/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/registerClinic' element={<RegisterClinic/>}/>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/Home' element={<HomeClients/>}/>
          <Route path='/home/clinica/:name' element={<DetailClinica/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
          <Route path='/loginClinica' element={<LoginClinica/>}/>
          <Route path='/adminClinica' element={<AdminClinica/>}/>
          <Route path='/soyDoctor' element={<AdminDoctor/>}/>
          <Route path='/AddDoctor' element={<AddDoctor/>}/>
          <Route path='/addEspecialidad' element={<AddEspecialidad/>}/>
          <Route path='/test' element={<Turno/>}/>
          <Route path='/adminClinica/me' element={<ClinicaCard/>}/>
          <Route path='/VerDoctores' element={<VerDoctores/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

