import { useState, useEffect } from 'react';
import { Modal, Button, Table, Container, Row, Col, Form } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import UserModal from '../users/UserModal';
import AdvertisementModal from '../advertisements/AdvertisementModal';

interface User {
    id: string;
    name: string;
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
            const response = await axios.get('/api/users');
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
            <Container className="d-flex justify-content-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Button variant="btn btn-dark" className="mx-2 hover-accent" onClick={() => setShowUserModal(true)}>Add Users</Button>
                <Button variant="btn btn-dark" className="mx-2 hover-accent" onClick={() => setShowAdModal(true)}>Add Advertisements</Button>

                <UserModal show={showUserModal} onHide={() => setShowUserModal(false)} />
            <AdvertisementModal show={showAdModal} onHide={() => setShowAdModal(false)} />
            </Container>
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
                                    <td>{user.name}</td>
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
        </Container>
    );
};

export default AdminDashboard;
