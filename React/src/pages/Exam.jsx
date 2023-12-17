import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../pages/Exam.css";
import axios from '../axios';
import {useNavigate} from "react-router-dom";

export const TestPage = () => {
    const navigate = useNavigate()

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/learning/tests/11');
            setQuestions(response.data.quiz || []);
        };

        fetchData();
    }, []);

    const handleAnswer = (questionNumber, answer) => {
        setAnswers(prev => ({...prev, [questionNumber]: answer}));
    };

    const handleSubmit = async () => {
        const correctAnswers = questions.reduce((count, question, index) => {
            return count + (answers[index] === question.correctAnswer ? 1 : 0);
        }, 0);

        await axios.patch('/learning/exam/submit', {answers: correctAnswers / questions.length});
        navigate('/me');
    };

    return (
        <div className="container my-5">
            {questions.map((question, index) => (
                <div key={index} className="mb-4">
                    <p className="h5">{question.question}</p>
                    <div>
                        {[...question.incorrectAnswers, question.correctAnswer].map((answer, answerIndex) => (
                            <div className="form-check" key={answerIndex}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    id={`question-${index}-answer-${answerIndex}`}
                                    value={answer}
                                    onChange={() => handleAnswer(index, answer)}
                                    checked={answers[index] === answer}
                                />
                                <label className="form-check-label" htmlFor={`question-${index}-answer-${answerIndex}`}>
                                    {answer}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className="btn btn-primary" onClick={handleSubmit}>Отправить ответы</button>
        </div>
    );
};