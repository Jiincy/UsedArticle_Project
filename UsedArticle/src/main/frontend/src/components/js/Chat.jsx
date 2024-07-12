m stimport React, { useState, useEffect, useRef } from 'react';
import '../css/Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8787/chat');

        socketRef.current.onopen = () => {
            setIsConnected(true);
        };

        socketRef.current.onmessage = (event) => {
            setMessages(prevMessages => [...prevMessages, event.data]);
        };

        socketRef.current.onclose = () => {
            setIsConnected(false);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current && isConnected && input) {
            socketRef.current.send(input);
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
