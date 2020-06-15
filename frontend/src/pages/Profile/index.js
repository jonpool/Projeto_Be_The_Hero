import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';


import api from '../../Services/api';
import './style.css';


import logoImage from '../../assets/Logo.png';
export default function Profile(){

  const [incidents, setIncidents] = useState([]); 

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(()=>{
    api.get('profile', {
      headers:{
        authorization: ongId,
        }
      }).then(response =>{
        setIncidents(response.data);
      })
  },/*todo vez que a id da ond mudar ele refaz o funcion acima*/ [ongId])

  async function handleDeletIncident(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization:ongId
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch (err){
      alert('Erro ao deletar caso, tente novamente.')
    }
    
  }

  function handleLogout(){
    localStorage.clear();

    history.push('/');
  }

  return (
  <div className="profile-container">
    <header>
      <img src={logoImage} alt="Be the Hero"/>
  <span>Welcome, {ongName}</span>

      <Link className="button" to="/Incident/new">Register a new case</Link>
      <button onClick ={handleLogout} type="button">
        <FiPower size={18} color="#e02041"/>
      </button>
    </header>
    
    <h1>Registered Cases</h1>
    <ul>
     {incidents.map(incident=>(
        <li key={incident.id}>
        <strong>CASE:</strong>
     <p>{incident.title}</p>
        
        <strong>DESCRIPTION</strong>
     <p>{incident.Description}</p>
        
        <strong>Amount:</strong>
     <p>{Intl.NumberFormat('en-US',{style:'currency', currency:'USD'} ).format(incident.Value)}</p>
        
        <button onClick={()=>handleDeletIncident(incident.id)} type="button">
          <FiTrash2 size={20} color="#0808b3"></FiTrash2>
        </button>
      </li>
      
     ))}
    </ul>
  </div>
  );
}