import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs: React.FC = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2 style={{ color: '#f51441' }}>About CroCompass</h2>
                    <p style={{ fontWeight: 'bold' }}>
                        CroCompass is dedicated to helping you discover the best places and experiences in Croatia.
                        Whether you're looking for the finest restaurants, the most exciting attractions, or hidden gems,
                        CroCompass is your premier guide.
                    </p>
                    <h3 style={{ color: '#f51441' }}>Our Location</h3>
                    <p style={{ fontWeight: 'bold' }}>123 Main Street, Zagreb, Croatia</p>
                    <p style={{ fontWeight: 'bold' }}>Contact us at <a href="mailto:info@crocompass.com" style={{ color: '#f51441' }}>info@crocompass.com</a>.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutUs;
