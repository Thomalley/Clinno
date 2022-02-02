import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/Home' element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

