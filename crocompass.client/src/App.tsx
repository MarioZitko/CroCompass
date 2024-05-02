import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Map from './components/Map'
import AdminDashboard from './components/dashboard/AdminDashboard';
import NavigationBar from './components/shared/NavigationBar';
import UserLogin from './components/users/UserLogin';
import UserSignup from './components/users/UserSignup';
import './App.css';
import { AuthProvider } from './components/shared/AuthContext';

const useNavbarHeight = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            setNavbarHeight(navbar.clientHeight);
        }
    }, []);

    return navbarHeight;
};

const App: React.FC = () => {
    const navbarHeight = useNavbarHeight();

    return (
        <Router>
            <AuthProvider>
                <NavigationBar />
                <div style={{ paddingTop: `${navbarHeight}px` }}> 
                    <Routes>
                        <Route path="/maps" element={<Map />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/dashboard" element={<AdminDashboard />} />
                        <Route path="/signup" element={<UserSignup />} />
                        <Route path="/login" element={<UserLogin />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
