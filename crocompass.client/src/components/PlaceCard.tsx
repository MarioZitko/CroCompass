import React from "react";
import { Card } from "react-bootstrap";

// Define an interface for the component props
interface PlaceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Card
      className="text-white"
      style={{
        width: "18rem",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover", // Ensure the background covers the card
        backgroundPosition: "center", // Center the background image
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end", // Align text to the bottom
          height: "100%", // Take full height of the card
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for text readability
          padding: "1rem", // Padding around the text
          borderRadius: "0.25rem", // Optional: if you want rounded corners
        }}
      >
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <button className="btn btn-primary" style={{ marginTop: "auto" }}>
          Learn more
        </button>
      </Card.Body>
    </Card>
  );
};

export default PlaceCard;
