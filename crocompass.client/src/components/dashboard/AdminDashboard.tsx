import { useState, useEffect } from 'react';
import { Modal, Button, Table, Container, Row, Col, Form } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

interface User {
    id: string;
    username: string;
    email: string;
}

interface Advertisement {
    id: string;
    title: string;
    category: string;
}

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAdModal, setShowAdModal] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchAds();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const createUser = async (userData) => {
        try {
            const response = await axios.post('/users', userData);
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };


    const fetchAds = async () => {
        const response = await axios.get('/api/ads');
        setAds(response.data);
    };

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const handleAdClick = (ad: Advertisement) => {
        setSelectedAd(ad);
        setShowAdModal(true);
    };

    const closeModal = () => {
        setShowUserModal(false);
        setShowAdModal(false);
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2>Users</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button onClick={() => handleUserClick(user)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <h2>Advertisements</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map(ad => (
                                <tr key={ad.id}>
                                    <td>{ad.title}</td>
                                    <td>{ad.category}</td>
                                    <td>
                                        <Button onClick={() => handleAdClick(ad)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* User Edit Modal */}
            <Modal show={showUserModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedUser?.username}
                                onChange={(e) => setSelectedUser({ ...selectedUser!, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={selectedUser?.email}
                                onChange={(e) => setSelectedUser({ ...selectedUser!, email: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={() => {
                        // Implement user update logic
                        closeModal();
                    }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Advertisement Edit Modal */}
            <Modal show={showAdModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Advertisement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedAd?.title}
                                onChange={(e) => setSelectedAd({ ...selectedAd!, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedAd?.category}
                                onChange={(e) => setSelectedAd({ ...selectedAd!, category: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={() => {
                        // Implement ad update logic
                        closeModal();
                    }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminDashboard;
