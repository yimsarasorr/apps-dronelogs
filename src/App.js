import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ViewConfig from './pages/configs';
import TemperatureLogForm from './pages/Templog';
import ViewLogs from './pages/Viewlogs';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <header style={{ 
          backgroundColor: '#2c3e50', 
          padding: '20px 40px' // เพิ่ม padding ให้มากขึ้น
        }}>
          <div className="container d-flex justify-content-between align-items-center">
            <h1 style={{ 
              margin: 0, 
              color: '#ecf0f1', 
              fontSize: '2rem', // เพิ่มขนาดฟอนต์
              fontWeight: 'bold',
              marginRight: '100px' // เพิ่มระยะห่างระหว่างหัวข้อและลิงก์
            }}>
              Drone App
            </h1>
            <nav className="d-flex">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  margin: '0 20px', // เพิ่มระยะห่างระหว่างลิงก์
                  color: isActive ? '#1abc9c' : '#ecf0f1',
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : 'normal',
                  fontSize: '1.2rem' // เพิ่มขนาดฟอนต์ของลิงก์
                })}
              >
                Config
              </NavLink>
              <NavLink
                to="/temperature-log"
                style={({ isActive }) => ({
                  margin: '0 20px', // เพิ่มระยะห่างระหว่างลิงก์
                  color: isActive ? '#1abc9c' : '#ecf0f1',
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : 'normal',
                  fontSize: '1.2rem' // เพิ่มขนาดฟอนต์ของลิงก์
                })}
              >
                Add Temperature
              </NavLink>
              <NavLink
                to="/view-logs"
                style={({ isActive }) => ({
                  margin: '0 20px', // เพิ่มระยะห่างระหว่างลิงก์
                  color: isActive ? '#1abc9c' : '#ecf0f1',
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : 'normal',
                  fontSize: '1.2rem' // เพิ่มขนาดฟอนต์ของลิงก์
                })}
              >
                Logs
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow-1" style={{ 
          backgroundColor: '#ecf0f1', 
          padding: '40px 60px' // เพิ่ม padding ให้มากขึ้น
        }}>
          <Routes>
            <Route path="/" element={<ViewConfig />} />
            <Route path="/temperature-log" element={<TemperatureLogForm />} />
            <Route path="/view-logs" element={<ViewLogs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;