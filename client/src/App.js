import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import DetailClinica from './components/DetailClinica/DetailClinica';
import AboutUs from './components/AboutUs/AboutUs';
import RegisterClinic from './components/Register/RegisterClinic';
import HomeClients from './components/HomeClients/HomeClients';



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
          <Route path='/Home' element={<Home/>}/>
          <Route path='/home/clinica/:name' element={<DetailClinica/>}/>
          <Route path='/AboutUs' element={<AboutUs/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

