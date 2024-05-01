import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

interface Point {
    x: number;
    y: number;
}

interface Triangle {
    id: number;
    pointA: Point;
    pointB: Point;
    pointC: Point;
    area: number;
    perimeter: number;
    typeByAngle: number;
    typeByEdge: number;
}

const TriangleTypeLabels = ["Acute", "Right", "Obtuse"];
const TriangleEdgeTypeLabels = ["Equilateral", "Isosceles", "Scalene"];

const TriangleDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [triangle, setTriangle] = useState<Triangle | null>(null);
    const [error, setError] = useState<string>('');
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const [includeOptions, setIncludeOptions] = useState({
        includePoints: true,
        includeArea: true,
        includePerimeter: true,
        includeTypeByAngle: true,
        includeTypeByEdge: true,
        includePicture: false
    });

    useEffect(() => {
        if (id) {
            fetchTriangleDetails();
        }
    }, [id]);

    const fetchTriangleDetails = async () => {
        try {
            const response = await axios.get(`/api/triangles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setTriangle(response.data);
        } catch (error: any) {
            setError('Failed to load triangle details.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/triangles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            navigate('/');
        } catch (error: any) {
            setError('Failed to delete triangle.');
        }
    };

    const handleEdit = async () => {
        if (!triangle) return;
        try {
            await axios.put(`/api/triangles/${id}`, triangle, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setShow(false);
            navigate('/');
        } catch (error: any) {
            setError('Failed to update triangle.');
        }
    };

    const handleClose = () => {
        setShow(false);
        navigate('/');
    };

    const handleDocumentGeneration = () => {
        if (!triangle) return;
        const doc = new jsPDF();
        let yPos = 10;

        if (includeOptions.includePoints) {
            doc.text(`Point A: (${triangle.pointA.x}, ${triangle.pointA.y})`, 10, yPos); yPos += 10;
            doc.text(`Point B: (${triangle.pointB.x}, ${triangle.pointB.y})`, 10, yPos); yPos += 10;
            doc.text(`Point C: (${triangle.pointC.x}, ${triangle.pointC.y})`, 10, yPos); yPos += 20;
        }
        if (includeOptions.includeArea) {
            doc.text(`Area: ${triangle.area}`, 10, yPos); yPos += 10;
        }
        if (includeOptions.includePerimeter) {
            doc.text(`Perimeter: ${triangle.perimeter}`, 10, yPos); yPos += 10;
        }
        if (includeOptions.includeTypeByAngle) {
            doc.text(`Type by Angle: ${TriangleTypeLabels[triangle.typeByAngle]}`, 10, yPos); yPos += 10;
        }
        if (includeOptions.includeTypeByEdge) {
            doc.text(`Type by Edge: ${TriangleEdgeTypeLabels[triangle.typeByEdge]}`, 10, yPos); yPos += 10;
        }

        if (includeOptions.includePicture) {
            const svgElement = document.querySelector("svg");
            if (svgElement) {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 300;
                const ctx = canvas.getContext('2d');

                const img = new Image();
                img.onload = () => {
                    if (ctx)
                    {
                        ctx.drawImage(img, 0, 0);
                    }
                    const imgData = canvas.toDataURL('image/png');
                    doc.addImage(imgData, 'PNG', 10, yPos, 180, 160);
                    doc.save('triangle-details.pdf');
                };
                img.onerror = () => {
                    console.error('Failed to load SVG as image');
                    setError('Failed to load SVG as image');
                    doc.save('triangle-details.pdf');
                };
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
            } else {
                console.error('SVG element not found');
                setError('SVG element not found');
                doc.save('triangle-details.pdf');
            }
        } else {
            doc.save('triangle-details.pdf');
        }
    };


    if (!show) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Triangle Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {triangle ? (
                    <>
                        <Form>
                            {/* Triangle points */}
                            <Row className="mb-3">
                                {['A', 'B', 'C'].map((point) => (
                                    <React.Fragment key={point}>
                                        <Col xs={6} md={3}>
                                            <Form.Group>
                                                <Form.Label>{`Point ${point} X:`}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={triangle[`point${point}`].x}
                                                    onChange={(e) => setTriangle({ ...triangle, [`point${point}`]: { ...triangle[`point${point}`], x: parseFloat(e.target.value) } })}
                                                    size="sm"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6} md={3}>
                                            <Form.Group>
                                                <Form.Label>{`Point ${point} Y:`}</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={triangle[`point${point}`].y}
                                                    onChange={(e) => setTriangle({ ...triangle, [`point${point}`]: { ...triangle[`point${point}`], y: parseFloat(e.target.value) } })}
                                                    size="sm"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </React.Fragment>
                                ))}
                            </Row>
                            {/* Triangle details */}
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Perimeter:</Form.Label>
                                        <Form.Control readOnly value={triangle.perimeter} size="sm" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Area:</Form.Label>
                                        <Form.Control readOnly value={triangle.area} size="sm" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Type by Angle</Form.Label>
                                        <Form.Control readOnly value={TriangleTypeLabels[triangle.typeByAngle]} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Type by Edge</Form.Label>
                                        <Form.Control readOnly value={TriangleEdgeTypeLabels[triangle.typeByEdge]} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <svg width="200" height="200" style={{ border: '1px solid black', marginTop: '20px' }}>
                            <polygon points={`${triangle.pointA.x * 10},${200 - triangle.pointA.y * 10} ${triangle.pointB.x * 10},${200 - triangle.pointB.y * 10} ${triangle.pointC.x * 10},${200 - triangle.pointC.y * 10}`}
                                style={{ fill: 'lime', stroke: 'purple', strokeWidth: 1 }} />
                        </svg>
                        <Row>
                            <Col md={12}>
                                <Form.Check
                                    type="checkbox"
                                    label="Include Points"
                                    checked={includeOptions.includePoints}
                                    onChange={(e) => setIncludeOptions({ ...includeOptions, includePoints: e.target.checked })}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Include Area"
                                    checked={includeOptions.includeArea}
                                    onChange={(e) => setIncludeOptions({ ...includeOptions, includeArea: e.target.checked })}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Include Perimeter"
                                    checked={includeOptions.includePerimeter}
                                    onChange={(e) => setIncludeOptions({ ...includeOptions, includePerimeter: e.target.checked })}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Include Type by Angle"
                                    checked={includeOptions.includeTypeByAngle}
                                    onChange={(e) => setIncludeOptions({ ...includeOptions, includeTypeByAngle: e.target.checked })}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Include Type by Edge"
                                    checked={includeOptions.includeTypeByEdge}
                                    onChange={(e) => setIncludeOptions({ ...includeOptions, includeTypeByEdge: e.target.checked })}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Include Picture"
                                    checked={includeOptions.includePicture}
                                    onChange={(e) => setIncludeOptions({ ...includeOptions, includePicture: e.target.checked })}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Alert variant="info">Loading triangle details...</Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleEdit}>Save Changes</Button>
                <Button variant="danger" onClick={handleDelete}>Delete Triangle</Button>
                <Button onClick={handleDocumentGeneration}>Generate Document</Button>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TriangleDetails;
