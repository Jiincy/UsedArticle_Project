// path: src/components/js/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Chat.css';

const Chat = () => {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        console.log(`Attempting WebSocket connection to ws://localhost:8787/chat/${userId}`);

        socketRef.current = new WebSocket(`ws://localhost:8787/chat/${userId}`);

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            console.log('Message received from server:', event.data);
            setMessages(prevMessages => [...prevMessages, event.data]);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error.message, error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [userId]);

    const sendMessage = () => {
        if (socketRef.current && input) {
            const message = {
                buyer: "John", // 예시 값
                seller: "Doe", // 예시 값
                productId: "123", // 예시 값
                content: input,
                type: "Buyer", // 예시 값
                sendDate: new Date().toISOString() // 현재 날짜 및 시간
            };

            socketRef.current.send(JSON.stringify(message));
            setMessages(prevMessages => [...prevMessages, `Me: ${input}`]);
            setInput('');
        } else {
            console.error('WebSocket is not connected or input is empty');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
