import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Map from "./components/Map";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import NavigationBar from "./components/shared/NavigationBar";
import UserLogin from "./components/users/UserLogin";
import UserSignup from "./components/users/UserSignup";
import "./App.css";
import { AuthProvider } from "./components/shared/AuthContext";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer"; // Import the Footer component
import PlaceCard from "./components/PlaceCard"; // Import the PlaceCard component
import SearchBar from "./components/SearchBar"; // Import the SearchBar component
import image from "./components/images/island1.jpeg";
const useNavbarHeight = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
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

      <Container>
        <SearchBar />
        <div>
          <PlaceCard
            title="Dubrovnik - Great summer destination for 2024."
            description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
            imageUrl={image} // Ensure you have an image or adjust accordingly
          />
          {/* More place cards can be added here */}
        </div>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;
