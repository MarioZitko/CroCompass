import React, { useState, FormEvent } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

interface SignupFormState {
    username: string;
    password: string;
}

interface ErrorMessages {
    [key: string]: string[];
}

const UserSignup: React.FC = () => {
    const [formState, setFormState] = useState<SignupFormState>({ username: '', password: '' });
    const [errors, setErrors] = useState<ErrorMessages>({});
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.post('/api/users/register', formState);
            console.log('Submission successful:', response.data);
            setFormState({ username: '', password: '' });
            setSuccessMessage("User registered successfully! Please log in.");
        } catch (error: any) {
            setSuccessMessage("");
            if (error.response && error.response.data.errors) {
                console.error('Submission failed:', error.response.data.errors);
                setErrors(error.response.data.errors);
            }
            if (error.response && error.response.status === 500) {
                alert('An internal server error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container style={{ width: '300px', marginTop: '100px' }} className="d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {Object.keys(errors).length > 0 && (
                    Object.entries(errors).map(([field, messages]) => (
                        <Alert key={field} variant="danger">
                            {messages.join(' ')} 
                        </Alert>
                    ))
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username && errors.username.join(' ')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password && errors.password.join(' ')}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary">Sign Up</Button>
            </Form>
        </Container>
    );
}

export default UserSignup;
