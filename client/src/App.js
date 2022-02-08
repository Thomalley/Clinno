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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

