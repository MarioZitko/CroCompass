import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-between align-items-center bg-light py-3"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #ccc",
        fontSize: "calc(6px + 0.3vw)", // Responsive font size scaling with viewport width
        color: "black", // Ensures all text in the footer is black
      }}
    >
      <div className="text-left" style={{ marginLeft: "5%", flex: 0 }}>
        CroCompass
      </div>
      <div
        className="text-center"
        style={{ marginRight: "-10%", flex: 55, width: "50%" }}
      >
        © 2024 CroCompass. All rights reserved.
      </div>
      <div className="text-right" style={{ marginRight: "-1%", flex: 10 }}>
        <a href="/terms" style={{ marginRight: "15px", color: "black" }}>
          Terms of Use
        </a>
        <a href="/privacy" style={{ marginRight: "15px", color: "black" }}>
          Privacy
        </a>
        <a href="/about" style={{ color: "black" }}>
          About Us
        </a>
      </div>
    </Container>
  );
};

export default Footer;
