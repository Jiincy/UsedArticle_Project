import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Contact.css';

const Contact = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8787/api/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8787/api/questions', { question: newQuestion })
      .then(response => {
        setQuestions([...questions, response.data]);
        setNewQuestion('');
      })
      .catch(error => {
        console.error('Error posting question:', error);
      });
  };

  const handleAnswerSubmit = (questionId, answer) => {
    axios.post(`http://localhost:8787/api/questions/${questionId}/answers`, { answer })
      .then(response => {
        setQuestions(questions.map(q => q.id === questionId ? response.data : q));
        setNewAnswer({ ...newAnswer, [questionId]: '' });
      })
      .catch(error => {
        console.error('Error posting answer:', error);
      });
  };

  return (
    <div className="contact">
      <h1>고객센터 문의</h1>
      <form onSubmit={handleQuestionSubmit}>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="문의 사항을 입력하세요..."
        ></textarea>
        <button type="submit">문의 등록</button>
      </form>
      <div className="questions-list">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <p>{question.question}</p>
            <div className="answers">
              {question.answers.map((answer, index) => (
                <div key={index} className="answer-item">
                  <p>{answer}</p>
                </div>
              ))}
              <textarea
                value={newAnswer[question.id] || ''}
                onChange={(e) => setNewAnswer({ ...newAnswer, [question.id]: e.target.value })}
                placeholder="답변을 입력하세요..."
              ></textarea>
              <button onClick={() => handleAnswerSubmit(question.id, newAnswer[question.id] || '')}>답변 등록</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
