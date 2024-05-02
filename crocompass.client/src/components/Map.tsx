import React from 'react';
import { Container } from 'react-bootstrap';

const MapComponent: React.FC = () => {
    return (
        <Container className="mt-5">
            <h2 style={{ color: '#f51441', textAlign: 'center' }}>Find Us Here</h2>
            <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.926301571389!2d15.867452212749676!3d45.83275770865065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d1f37035cc65%3A0xbb64b59e39147a6a!2sMjesni%20odbor%20Gornji%20Stenjevec!5e0!3m2!1sen!2shr!4v1714677197428!5m2!1sen!2shr"
                    width="800"
                    height="600"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </Container>
    );
}

export default MapComponent;
