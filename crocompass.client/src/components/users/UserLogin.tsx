﻿import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/AuthContext';

const UserLogin: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { username, password });
            localStorage.setItem('authToken', response.data.token);
            login(username, response.data.role); // Assuming role is returned
            navigate('/');
        } catch (error: any) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setErrors([error.response.data.message || "Failed to log in. Please check your credentials and try again."]);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                setErrors(["No response from server. Check your network connection."]);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setErrors([error.message]);
            }
        }
    };


    return (
        <Container style={{ width: '300px', marginTop: '100px' }} className="d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {errors.length > 0 && (
                    <Alert variant="danger">
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Log in</Button>
            </Form>
        </Container>
    );
};

export default UserLogin;
