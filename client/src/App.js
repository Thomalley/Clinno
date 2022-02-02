import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/home/register' element={<Register/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

