import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Chat.css';

const Chat = () => {
    const { userId: sellerId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const socketRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sellerId) {
            console.error('유효하지 않은 sellerId:', sellerId);
            return;
        }

        axios.get('/api/user')
            .then(response => {
                if (!response.data) {
                    // 로그인 상태가 아니면 메인 화면으로 리디렉션
                    navigate('/');
                } else {
                    setLoggedInUser(response.data);
                }
            })
            .catch(error => {
                console.error('로그인 사용자 정보 가져오기 오류:', error);
                navigate('/');
            });

        axios.get(`/api/chatRooms/${sellerId}/messages`)
            .then(response => setMessages(response.data))
            .catch(error => console.error('메시지 가져오기 오류:', error));

        const connectWebSocket = () => {
            console.log(`WebSocket 연결 시도: ws://localhost:8787/chat/${sellerId}`);
            socketRef.current = new WebSocket(`ws://localhost:8787/chat/${sellerId}`);

            socketRef.current.onopen = () => {
                console.log('WebSocket 연결 성공');
            };

            socketRef.current.onmessage = (event) => {
                console.log('서버로부터 메시지 수신:', event.data);
                try {
                    const receivedMessage = JSON.parse(event.data);
                    setMessages(prevMessages => [...prevMessages, receivedMessage]);
                } catch (error) {
                    console.error('WebSocket 메시지 파싱 오류:', error);
                }
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket 연결 종료');
                setTimeout(connectWebSocket, 5000);
            };

            socketRef.current.onerror = (error) => {
                console.error('WebSocket 오류:', error.message, error);
            };
        };

        connectWebSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [sellerId, navigate]);

    const sendMessage = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && input.trim() && loggedInUser) {
            if (!sellerId) {
                console.error('유효하지 않은 sellerId:', sellerId);
                return;
            }

            const message = {
                chatRoomId: sellerId,
                senderNo: loggedInUser.userNO,
                content: input.trim(),
                sendDate: new Date().toISOString()
            };

            console.log('전송할 메시지:', message);
            try {
                socketRef.current.send(JSON.stringify(message));
                setMessages(prevMessages => [...prevMessages, message]);
                setInput('');
            } catch (error) {
                console.error('메시지 전송 오류:', error.message, error);
            }
        } else {
            console.error('WebSocket이 연결되지 않았거나 입력이 비어있거나 사용자가 로그인되지 않았습니다.');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.senderNo === loggedInUser?.userNO ? 'my-message' : 'other-message'}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
};

export default Chat;
