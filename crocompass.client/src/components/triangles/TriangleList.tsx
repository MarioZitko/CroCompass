import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { useAuth } from '../shared/AuthContext';

interface Point {
    x: number;
    y: number;
}

interface Triangle {
    triangleId: number;
    pointA: Point;
    pointB: Point;
    pointC: Point;
}

const TriangleList: React.FC = () => {
    const [triangles, setTriangles] = useState<Triangle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTriangles = async () => {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/api/triangles', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setTriangles(response.data);
                setLoading(false);
            } catch (err: any) {
                setError('Failed to fetch triangles.');
                setLoading(false);
                console.log(error)
            }
        };

        fetchTriangles();
    }, [currentUser]);

    if (!currentUser) {
        return (
            <Container className="mt-3">
                <Alert variant="warning">Please login or signup to view triangles.</Alert>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container className="mt-3">
                <Alert variant="info">Loading...</Alert>
            </Container>
        );
    }

    if (triangles.length === 0) {
        return (
            <Container className="mt-3">
                <Alert variant="info">No triangles found. Add a new triangle to get started.</Alert>
                <Link to="/add-triangle" className="btn btn-primary">Add Triangle</Link>
            </Container>
        );
    }

    return (
        <Container className="mt-3">
            <h2>List of Triangles</h2>
            <ListGroup>
                {triangles.map(triangle => (
                    <ListGroup.Item key={triangle.triangleId}>
                        Triangle {triangle.triangleId}: A({triangle.pointA.x}, {triangle.pointA.y}), B({triangle.pointB.x}, {triangle.pointB.y}), C({triangle.pointC.x}, {triangle.pointC.y})
                        <Button variant="outline-primary" size="sm" className="float-right ml-2" onClick={() => navigate(`/triangleDetails/${triangle.triangleId}`)}>Details</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TriangleList;
