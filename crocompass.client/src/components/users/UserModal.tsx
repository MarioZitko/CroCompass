import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const UserModal: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post('/api/users/add', {
                username,
                email,
                password
            });
            console.log('User added successfully:', response.data);
            onHide(); // Close modal after successful addition
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-danger" className="mx-2 hover-accent" onClick={onHide}>Close</Button>
                <Button variant="btn btn-dark" className="mx-2 hover-accent" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;
