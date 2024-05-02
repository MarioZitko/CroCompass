import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer"; // Import the Footer component
import PlaceCard from "./PlaceCard"; // Import the PlaceCard component
import SearchBar from "./SearchBar"; // Import the SearchBar component
import image from "./images/island1.jpeg";
import logo from "./images/logo.png"; // Import the logo image

const Home: React.FC = () => {
  return (
    <Container style={{ paddingBottom: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={logo}
          alt="CroCompass Logo"
          style={{
            maxWidth: "150px",
            height: "auto",
            paddingTop: "80px",
            paddingBottom: "50px",
          }}
        />
      </div>
      <SearchBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px", // Adjust this value for spacing between cards
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "50px", // Additional bottom margin for content above the footer
        }}
      >
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
        <PlaceCard
          title="Dubrovnik - Great summer destination for 2024."
          description="Experience the beauty and history of Dubrovnik this summer. Perfect for tourists interested in ancient cities and Mediterranean culture."
          imageUrl={image}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default Home;
