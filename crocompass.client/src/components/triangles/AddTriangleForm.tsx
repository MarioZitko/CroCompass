import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

interface Point {
    x: number;
    y: number;
}

interface TriangleFormState {
    pointA: Point;
    pointB: Point;
    pointC: Point;
}

const defaultFormState: TriangleFormState = {
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
    pointC: { x: 0, y: 0 },
};

const AddTriangleForm: React.FC = () => {
    const [formState, setFormState] = useState<TriangleFormState>(defaultFormState);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<any>, point: keyof TriangleFormState, coordinate: 'x' | 'y') => {
        const value = parseFloat(e.target.value);
        setFormState(prevState => ({
            ...prevState,
            [point]: {
                ...prevState[point],
                [coordinate]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/triangles', formState, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            console.log('Triangle added successfully:', response.data);
            setSuccess("Triangle added successfully!");
            setFormState(defaultFormState);
            setError(null);
        } catch (error: any) {
            console.error('Failed to add triangle:', error.response?.data?.message);
            setError(error.response?.data?.message || "Failed to add triangle.");
            setSuccess(null);
        }
    };

    return (
        <Container style={{ padding: '20px', maxWidth: '500px', marginTop: '20px' }}>
            <Form onSubmit={handleSubmit}>
                <h2>Add New Triangle</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                {Object.keys(formState).map((key) => (
                    <Row key={key} className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>{`${key.replace('point', 'Point ')} X`}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formState[key as keyof TriangleFormState].x}
                                    onChange={(e) => handleChange(e, key as keyof TriangleFormState, 'x')}  
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>{`${key.replace('point', 'Point ')} Y`}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formState[key as keyof TriangleFormState].y}
                                    onChange={(e) => handleChange(e, key as keyof TriangleFormState, 'y')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                ))}
                <Button variant="primary" type="submit">Add Triangle</Button>
            </Form>
        </Container>
    );
};

export default AddTriangleForm;
