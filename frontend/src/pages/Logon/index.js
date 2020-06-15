import React,{ useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../Services/api';

import './style.css';


import herosImage from '../../assets/cover.png';
import logoImage from '../../assets/Logo.png';

export default function Logon(){
  const [id, setId] = useState(''); 
  const history = useHistory();

  async function handleLogin(e){
    
    e.preventDefault();
    try{
        const response = await api.post('session',{ id });
        localStorage.setItem('ongId',id );
        localStorage.setItem('ongName', response.data.name);
        history.push('profile');

        console.log(response.data.name);
    }catch(err){
      alert('Falha no login, tente novamente.')
    }
  }


  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="be the hero"/>
        <form onSubmit={handleLogin}>
          <h1>Logon</h1>

          <input placeholder="Your Id" 
              value ={id}
              onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit" >Login</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
              Create an Account
          </Link>
        </form>
      </section>
         <img src={herosImage} alt="heros"/>
    </div>
    
  );
}