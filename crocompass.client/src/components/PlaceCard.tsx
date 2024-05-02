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
    // The Card component itself becomes clickable
    <a href="/dubrovnik" style={{ textDecoration: "none", overflow: "hidden" }}>
      <Card
        className="text-white"
        style={{
          width: "30rem", // Set initial size
          height: "18rem",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0.75rem",
          overflow: "hidden", // Prevents the image from overflowing during scale
          transition: "transform 0.3s ease, background 0.3s ease", // Smooth transition for hover effects
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; // Enlarges the card
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Reverts the card size
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
            padding: "1.5rem",
            borderRadius: "0.75rem",
          }}
        >
          <Card.Title style={{ fontSize: "1.2rem" }}>{title}</Card.Title>
          <Card.Text style={{ fontSize: "0.9rem" }}>{description}</Card.Text>
        </Card.Body>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0)", // Initial background color transparent
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.2)")
          } // Darken on hover
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0)")
          } // Revert on mouse out
        />
      </Card>
    </a>
  );
};

export default PlaceCard;
