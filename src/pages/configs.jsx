import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container,
  Card,
  Spinner,
  Alert,
  ListGroup,
  Badge,
  Row,
  Col
} from 'react-bootstrap';

const ConfigPage = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const droneId = process.env.REACT_APP_DRONE_ID || 65011078;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/configs/${droneId}`
        );
        setConfig(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching drone config");
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ 
      height: '100vh',
      backgroundColor: '#ecf0f1',
      padding: '20px'
    }}>
      <Spinner 
        animation="border" 
        style={{ color: '#1abc9c', width: '3rem', height: '3rem' }}
      />
    </Container>
  );

  if (error) return (
    <Container className="mt-5" style={{ 
      backgroundColor: '#ecf0f1', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Alert variant="danger" className="rounded-pill" style={{ 
            backgroundColor: '#e74c3c', 
            color: 'white',
            padding: '15px 20px'
          }}>
            <Alert.Heading style={{ color: 'white', fontSize: '1.25rem' }}>Error!</Alert.Heading>
            <p style={{ margin: 0 }}>{error}</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );

  if (!config) return (
    <Container className="mt-5" style={{ 
      backgroundColor: '#ecf0f1', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Alert variant="warning" className="rounded-pill" style={{ 
            backgroundColor: '#f39c12', 
            color: 'white',
            padding: '15px 20px'
          }}>
            <p style={{ margin: 0 }}>No configuration found for this drone</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );

  return (
    <Container className="py-5" style={{ 
      backgroundColor: '#ecf0f1', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm" style={{ 
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <Card.Header className="py-3" style={{ 
              backgroundColor: '#1abc9c', 
              borderBottom: 'none',
              padding: '20px'
            }}>
              <h2 className="mb-0" style={{ 
                color: 'white', 
                fontSize: '1.5rem'
              }}>
                Drone Configuration
              </h2>
            </Card.Header>
            
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ 
                  padding: '15px 20px'
                }}>
                  <span className="fw-bold" style={{ color: '#2c3e50' }}>
                    Drone ID
                  </span>
                  <Badge pill style={{ 
                    backgroundColor: '#1abc9c', 
                    color: 'white',
                    fontSize: '1rem',
                    padding: '5px 10px'
                  }}>
                    {config.drone_id}
                  </Badge>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ 
                  padding: '15px 20px'
                }}>
                  <span className="fw-bold" style={{ color: '#2c3e50' }}>
                    Drone Name
                  </span>
                  <Badge pill style={{ 
                    backgroundColor: config.drone_name ? '#3498db' : '#95a5a6',
                    color: 'white',
                    fontSize: '1rem',
                    padding: '5px 10px'
                  }}>
                    {config.drone_name || 'N/A'}
                  </Badge>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ 
                  padding: '15px 20px'
                }}>
                  <span className="fw-bold" style={{ color: '#2c3e50' }}>
                    Light
                  </span>
                  <Badge pill style={{ 
                    backgroundColor: config.light ? '#2ecc71' : '#95a5a6', 
                    color: 'white',
                    padding: '5px 10px'
                  }}>
                    {config.light ? 'ON' : 'OFF'}
                  </Badge>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4" style={{ 
                  padding: '15px 20px'
                }}>
                  <span className="fw-bold" style={{ color: '#2c3e50' }}>
                    Country
                  </span>
                  <Badge pill style={{ 
                    backgroundColor: config.country ? '#9b59b6' : '#95a5a6',
                    color: 'white',
                    fontSize: '1rem',
                    padding: '5px 10px'
                  }}>
                    {config.country || 'N/A'}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            
            <Card.Footer className="py-2 px-4 d-flex align-items-center" style={{ 
              backgroundColor: '#1abc9c', 
              borderTop: 'none',
              padding: '15px 20px'
            }}>
              <small style={{ color: 'white' }}>
                Last updated: {new Date().toLocaleString()}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfigPage;