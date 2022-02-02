import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route exact path='/home/login' element={<Login />}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

