import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AdvertisementModal: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create Advertisement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-danger" className="mx-2 hover-accent" onClick={onHide}>Close</Button>
                <Button variant="btn btn-dark" className="mx-2 hover-accent" onClick={onHide}>Create Ad</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdvertisementModal;
