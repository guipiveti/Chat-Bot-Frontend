import React, {useState} from 'react';
import './styles.css';

import api from '../../services/api';
import logo from '../../assets/bot.jpg'

export default function Login({history}){
    const [username, setUsername] = useState('');

    async function handlesubmit(e){
        e.preventDefault();
        const response = await api.post('/Login', {
            username: username,
        });
        console.log(response.data.login);
        console.log(response.data.avatar_url);
        
        localStorage.setItem('userName', response.data.login);
        localStorage.setItem('avatarUrl', response.data.avatar_url);
        history.push(`/chat`);   
    }

    return(
        <div className="login-container">
            <form onSubmit={handlesubmit}>
                <img src={logo} alt = "Logo Bot"/>
                <input 
                    placeholder = "Digite o nome de usuário do GitHub"
                    value = {username}
                    onChange = {e=>setUsername(e.target.value)}
                />
                <button type = "submit">Enviar</button>
            </form>
        </div>
    );
}