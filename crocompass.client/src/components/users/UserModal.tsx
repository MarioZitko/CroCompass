import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const UserModal: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-danger" className="mx-2 hover-accent" onClick={onHide}>Close</Button>
                <Button variant="btn btn-dark" className="mx-2 hover-accent" onClick={onHide}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;
