import React, { useState, useEffect } from 'react';

import './styles.css';
import api from '../../services/api';
import botIcon from '../../assets/bot.jpg'

export default function Chat() {
    const [sessionId, setSessionId] = useState('');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [messagesHtml, setMessagesHtml] = useState(<div></div>);
    const userName = localStorage.getItem('userName');
    const avatarUrl = localStorage.getItem('avatarUrl');

    useEffect(() => {
        api.post('/sessions').then(response => {
            console.log(response.data.session_id);
            setSessionId(response.data.session_id);
            //setSessionId(response.data);
        });
    }, []);

    // useEffect(() => {
    //     setChatMessages(chatMessages);
    // }, [chatMessages]);

    async function handleSendMessage(e) {
        // api.post('/sessions').then(response => {
        //     console.log(response.data.session_id);
        //     setSessionId(response.data.session_id);
        //     //setSessionId(response.data);
        // });
        e.preventDefault();
        console.log(message);
        const mensagem_enviada_atual = await {
            "text": message, "username": userName, "sent": true
        };
        console.log(mensagem_enviada_atual);

        //setChatMessages(chatMessages.concat(mensagem_enviada_atual));
        //console.log(JSON.stringify(chatMessages));

        const response = await api.post('/message', { message }, {
            headers: {
                'sessionId': sessionId,
            }
        });

        const mensagem_recebida_atual = await {
            "text": response.data[0].text, "username": "Bot", "sent": false
        };
        setChatMessages(chatMessages.concat(mensagem_enviada_atual).concat(mensagem_recebida_atual));
        console.log(mensagem_recebida_atual);
        console.log(response.data[0].text);
        setMessage('');

        console.log(chatMessages);
    }

    function constructChat(chatMessages) {

        return chatMessages.map(chatMessage => {
            if (chatMessage.sent) {
                return (< div className="row msg_container base_sent" >
                    <div className="col-md-10 col-xs-10">
                        <div className="messages msg_sent">
                            <p>{chatMessage.text}</p>
                            <time dateTime="2009-11-13T20:00">{chatMessage.username}</time>
                        </div>
                    </div>
                    <div className="col-md-2 col-xs-2 avatar">
                        <img alt="Sender avatar" src={avatarUrl} className=" img-responsive " />
                    </div>
                </div>)
            } else {
                return (
                    <div className="row msg_container base_receive" >
                        <div className="col-md-2 col-xs-2 avatar">
                            <img alt="Receiver avatar" src={botIcon} className=" img-responsive " />
                        </div>
                        <div className="col-md-10 col-xs-10">
                            <div className="messages msg_receive">
                                <p>{chatMessage.text}</p>
                                <time dateTime="2009-11-13T20:00">{chatMessage.username}</time>
                            </div>
                        </div>
                    </div>)

            }
        }

        )
    }

    useEffect(() => {
        setMessagesHtml(constructChat(chatMessages));
    }, [chatMessages]);



    return (
        <div className="chat-container">
            {/* < !--- Cabeçalho-- -> */}
            <div className="chat-header">
                <h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span> Piveti - Assistente Bot</h3>
            </div>
            {/* Cabecalho */}
            
            {/* Mensagens */}
            <div className="msg_container_base">
                {messagesHtml}
            </div>
            {/* Mensagens */}

            {/* < !--- Rodape-- -> */}
            <div className="chat-footer">
                <form>


                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        id="btn-send"
                        type="text"
                        className="chat_input"
                        placeholder="Write your message here..."
                    />
                    <span className="input-group-btn">
                        <button type="submit" onClick={handleSendMessage} className="btn-send" id="btn-chat"><i className="fa fa-send fa-1x" aria-hidden="true"></i>Enviar</button>
                    </span>
                </form>
            </div>
            {/* < !--- Rodapé-- -> */}
        </div >
    );
}