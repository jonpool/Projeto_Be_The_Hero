import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; 
import{FiArrowLeft} from 'react-icons/fi';

import api from '../../Services/api'

import './style.css';

import logoImage from '../../assets/Logo.png';

export default function NewIncident(){
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[value, setValue ] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();
  async function handleNewIncident(e){
      e.preventDefault();

      const data ={
        title,
        description,
        value,
      };



      try{
          await api.post('incidents',data,{
            headers:{
              Authorization: ongId,
            }
          })
       history.push('/profile');
      }catch{
        alert('Erro ao cadastrar caso, tente novamente')
      }

  }  




  return(
  <div className="new-incident-container">
  <div className="content">
      <section>
      <img src={logoImage} alt="be the hero"/>

      <h1>Register a new Case</h1>
      <p>Sign up, get in to the plarform and help people to find someone in need of something</p>

      <Link className="back-link" to="/profile">
        <FiArrowLeft size={16} color="#E02041"/>
          Back.
      </Link>
      </section>
        <form>
          <input 
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
          />
          <textarea 
              placeholder="Description" 
              value={description}
              onChange={e => setDescription(e.target.value)}
          
          />
          
          <input 
              placeholder="Amount $"
              value={value}
              onChange={e => setValue(e.target.value)}
          />
          

          <button onClick ={handleNewIncident} className="button" type="submit">Register</button>
        </form>
      
  </div>
</div>
);
}
