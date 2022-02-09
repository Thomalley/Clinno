import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from '../../actions/index';
import "../ClientCard/ClientCardModule.css"
import Footer from "../Home/Footer"
import NavBar from '../NavLanding/NavLanding'
import { Link} from "react-router-dom";




const ClientCard = () => {
    const user = JSON.parse(window.localStorage.getItem('login'))
    const dispatch = useDispatch()
    const [password, setPassword] = useState('');
    const orders = useSelector(state => state.orders)
    const cliente = useSelector((state)=> state.cliente);
  
    function handleClick(e) {
      e.preventDefault();
      dispatch(ResetPassword(user.id, password))
      setPassword('')
    }
    const handleChange = (e) => {
        setPassword(e.target.value);
      }
    

      console.log(cliente)

      return (
        <div>
        <NavBar/>
        <div className="container3">
        
        <Link to="/passwordreset"><button>PASSWORD RESET</button></Link>
        </div>
        <Footer/>
        </div>)
  }


  export default ClientCard;

