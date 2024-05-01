import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/shared/NavigationBar';
import TriangleList from './components/triangles/TriangleList';
import AddTriangleForm from './components/triangles/AddTriangleForm';
import UserLogin from './components/users/UserLogin';
import UserSignup from './components/users/UserSignup';
import './App.css';
import { AuthProvider } from './components/shared/AuthContext';
import TriangleDetails from './components/triangles/triangleDetails';

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
                        <Route path="/" element={<TriangleList />} />
                        <Route path="/add-triangle" element={<AddTriangleForm />} />
                        <Route path="/triangleDetails/:id" element={<TriangleDetails />} />
                        <Route path="/signup" element={<UserSignup />} />
                        <Route path="/login" element={<UserLogin />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
