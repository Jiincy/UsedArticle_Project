import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    userPw: '',
    userEmail: '',
    userTel: '',
    userAddr: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8787/api/signup', formData);
      console.log(response.data);
      // 회원가입 성공 시 alert로 알림
      alert('회원가입에 성공했습니다!');
      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="userPw">Password:</label>
        <input type="password" id="userPw" name="userPw" value={formData.userPw} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="userEmail">Email:</label>
        <input type="email" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="예시) example@example.com" />
      </div>
      <div>
        <label htmlFor="userTel">Phone:</label>
        <input type="text" id="userTel" name="userTel" value={formData.userTel} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="userAddr">Address:</label>
        <input type="text" id="userAddr" name="userAddr" value={formData.userAddr} onChange={handleChange} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
