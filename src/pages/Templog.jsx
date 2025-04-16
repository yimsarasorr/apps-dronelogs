import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
  ListGroup
} from 'react-bootstrap';

const TemperatureLogForm = () => {
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;
  const DRONE_ID = 65011078;
  const DRONE_NAME = "Sorawich";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!temperature || isNaN(temperature)) {
      setError('กรุณากรอกอุณหภูมิที่ถูกต้อง');
      return;
    }

    try {
      const payload = {
        celsius: parseFloat(temperature),
        drone_id: DRONE_ID,
        drone_name: DRONE_NAME,
        country: "Thailand"
      };

      await axios.post(
        `${API_URL}/logs`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setSubmitStatus('บันทึกข้อมูลสำเร็จ!');
      setTemperature('');
      setTimeout(() => {
        navigate('/view-logs');
      }, 1500);
    } catch (err) {
      setError(`เกิดข้อผิดพลาด: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm" style={{ 
            borderRadius: '15px',
            overflow: 'hidden',
            marginBottom: '20px' // เพิ่มระยะห่างด้านล่าง
          }}>
            <Card.Header className="py-3" style={{ 
              backgroundColor: '#1abc9c',
              borderBottom: 'none',
              padding: '20px' // เพิ่ม padding
            }}>
              <h2 className="mb-0" style={{ color: 'white' }}>
                บันทึกอุณหภูมิ
              </h2>
            </Card.Header>
            
            <Card.Body className="p-4" style={{ backgroundColor: '#ecf0f1' }}>
              {error && (
                <Alert variant="danger" className="rounded-pill" style={{ padding: '15px 20px' }}>
                  {error}
                </Alert>
              )}

              {submitStatus && (
                <Alert variant="success" className="rounded-pill" style={{ padding: '15px 20px' }}>
                  {submitStatus}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold" style={{ color: '#2c3e50' }}>
                    อุณหภูมิ (Celsius)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    className="py-2 px-3 border-0 shadow-sm"
                    style={{ borderRadius: '10px' }}
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    required
                  />
                </Form.Group>

                <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3" style={{ padding: '15px 20px' }}>
                      <span className="fw-bold" style={{ color: '#2c3e50' }}>Drone ID</span>
                      <span>{DRONE_ID}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3" style={{ padding: '15px 20px' }}>
                      <span className="fw-bold" style={{ color: '#2c3e50' }}>Drone Name</span>
                      <span>{DRONE_NAME}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3" style={{ padding: '15px 20px' }}>
                      <span className="fw-bold" style={{ color: '#2c3e50' }}>Country</span>
                      <span>Thailand</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>

                <div className="d-grid gap-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="py-2 fw-bold border-0"
                    style={{ 
                      backgroundColor: '#1abc9c',
                      borderRadius: '10px'
                    }}
                  >
                    บันทึกข้อมูล
                  </Button>
                  
                  <Button 
                    variant="outline-primary" 
                    className="py-2 fw-bold"
                    style={{ 
                      color: 'white',
                      borderColor: '#1abc9c',
                      borderRadius: '10px'
                    }}
                    onClick={() => navigate('/')}
                  >
                    กลับหน้าหลัก
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TemperatureLogForm;