import React,{ useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; 
import{FiArrowLeft} from 'react-icons/fi';
import './style.css'
import api from '../../Services/api';


import logoImage from '../../assets/Logo.png';

export default function Register(){

  //coloca as variaves do formulario dentro de um state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(e){
      //evita o reload da page quando vc clica no botao
      e.preventDefault();

      const data ={
        name,
        email,
        whatsapp,
        city,
        uf};

        console.log(data);
        const response = await api.post('ongs',data);
        try {
          alert(`Seu id de acesso: ${response.data.id}`);
          history.push('/'); 
        }catch(err){
          alert('Erro no cadastro, tente novamente');

        }
        

  }


  return (
    <div className="register-container">
      <div className="content">
          <section>
          <img src={logoImage} alt="be the hero"/>

          <h1>Sign Up</h1>
          <p>Sign up, get in to the plarform and help people to find someone in need of something</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
              I`m Already Registered.
          </Link>
          </section>
            <form onSubmit={handleRegister}>
              <input placeholder="ONG Name"
                     value={name}
                     onChange={e => setName(e.target.value)}
              />
              <input type="email" placeholder="E-mail"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
              />
              <input placeholder="whatsApp" 
                       value={whatsapp}
                       onChange={e => setWhatsapp(e.target.value)}
              />
              <div className="input-group">
                  <input placeholder="cidade"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                  />
                  <input placeholder="UF" style={{width:80}}
                         value={uf}
                         onChange={e => setUF(e.target.value)}
                  />
              </div>
              <button className="button" type="submit">Register</button>
            </form>
          
      </div>
    </div>
  );
}