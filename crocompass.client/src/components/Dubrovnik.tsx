import { Container } from "react-bootstrap";
import dubrovnikImage from "./images/island1.jpeg"; // Ensure the path to the image is correct

const Dubrovnik = () => {
  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Dubrovnik - The Pearl of the Adriatic</h1>
        <hr
          style={{
            border: "2px solid #f51441",
            width: "50%",
            margin: "auto",
            marginBottom: "20px",
          }}
        />
      </header>
      <img
        src={dubrovnikImage}
        alt="Dubrovnik"
        style={{ width: "100%", height: "auto", marginBottom: "20px" }}
      />
      <p
        style={{
          textAlign: "justify",
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#333",
          padding: "0 15px",
        }}
      >
        Dubrovnik, a stunning city located on the Adriatic Sea, is one of the
        most prominent tourist destinations in the Mediterranean. Known for its
        distinctive Old Town, encircled with massive stone walls completed in
        the 16th century, its well-preserved buildings range from baroque St.
        Blaise Church to Renaissance Sponza Palace and Gothic Rector’s Palace,
        now a history museum. Paved with limestone, the pedestrian-only Stradun
        (or Placa) is lined with shops and restaurants.
      </p>
      <div
        style={{
          backgroundColor: "#f51441",
          height: "5px",
          width: "100%",
          margin: "20px 0",
        }}
      ></div>{" "}
      {/* Red line */}
      <p
        style={{
          textAlign: "justify",
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#333",
          padding: "0 15px",
        }}
      >
        Beyond its architectural marvels, Dubrovnik is also a filming location
        for the popular TV series "Game of Thrones," where it was portrayed as
        King's Landing, the capital of the Seven Kingdoms. The city's stunning
        views of the Adriatic and medieval walls make Dubrovnik a popular spot
        for tourists and fans of the series alike.
      </p>
    </Container>
  );
};

export default Dubrovnik;
