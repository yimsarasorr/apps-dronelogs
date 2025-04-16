import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Table, 
  Spinner, 
  Alert, 
  Button,
  Card
} from 'react-bootstrap';

const ViewLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const droneId = 65011078;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${apiUrl}/logs/${droneId}`, {
          headers: {
            'Authorization': 'Bearer 20250301efx'
          }
        });

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid data format');
        }

        const filteredLogs = response.data
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .slice(0, 25);

        setLogs(filteredLogs);
      } catch (err) {
        setError(`Error: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [apiUrl, droneId]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('th-TH');
    } catch {
      return dateString;
    }
  };

  return (
    <Container className="py-4 px-3" style={{ 
      backgroundColor: '#ecf0f1',
      minHeight: '100vh',
      maxWidth: '100%'
    }}>
      <Card className="border-0 shadow-sm" style={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '20px' // เพิ่มระยะห่างด้านล่าง
      }}>
        <Card.Header className="py-3 px-4" style={{ 
          backgroundColor: '#1abc9c',
          borderBottom: 'none',
          padding: '20px' // เพิ่ม padding
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0" style={{ 
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              ประวัติการบันทึกของ Drone
            </h2>
            <Button 
              variant="outline-light"
              onClick={() => navigate('/')}
              style={{ 
                borderRadius: '8px',
                padding: '10px 20px', // เพิ่ม padding
                fontWeight: '500'
              }}
            >
              กลับหน้าหลัก
            </Button>
          </div>
        </Card.Header>

        <Card.Body className="p-0">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Spinner animation="border" style={{ 
                color: '#1abc9c',
                width: '3rem',
                height: '3rem'
              }} />
            </div>
          ) : error ? (
            <div className="px-4 py-3">
              <Alert variant="danger" style={{ 
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '15px 20px' // เพิ่ม padding
              }}>
                <p className="mb-0">{error}</p>
              </Alert>
            </div>
          ) : (
            <div className="table-responsive" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <Table hover className="mb-0" style={{ 
                tableLayout: 'fixed',
                marginBottom: '0'
              }}>
                <thead style={{ 
                  backgroundColor: '#1abc9c',
                  color: 'white',
                  position: 'sticky',
                  top: 0
                }}>
                  <tr>
                    <th style={{ width: '25%', padding: '12px 16px' }}>วันที่บันทึก</th>
                    <th style={{ width: '20%', padding: '12px 16px' }}>ประเทศ</th>
                    <th style={{ width: '20%', padding: '12px 16px' }}>Drone ID</th>
                    <th style={{ width: '20%', padding: '12px 16px' }}>ชื่อ Drone</th>
                    <th style={{ width: '15%', padding: '12px 16px' }}>อุณหภูมิ</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={index} style={{ backgroundColor: 'white' }}>
                        <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                          {formatDate(log.created)}
                        </td>
                        <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                          {log.country || '-'}
                        </td>
                        <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                          {log.drone_id || '-'}
                        </td>
                        <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                          {log.drone_name || '-'}
                        </td>
                        <td style={{ padding: '12px 16px', verticalAlign: 'middle' }}>
                          {log.celsius ? `${log.celsius}°C` : '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ 
                        padding: '40px 16px',
                        textAlign: 'center',
                        backgroundColor: 'white'
                      }}>
                        <div style={{ color: '#6c757d', marginBottom: '16px' }}>
                          ไม่พบข้อมูลการทำงาน
                        </div>
                        <Button 
                          variant="outline-primary"
                          onClick={() => window.location.reload()}
                          style={{
                            borderRadius: '8px',
                            padding: '10px 20px', // เพิ่ม padding
                            fontWeight: '500'
                          }}
                        >
                          โหลดใหม่
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewLogs;