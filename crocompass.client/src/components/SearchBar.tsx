import { Form, Button, FormControl } from "react-bootstrap";

const SearchBar = () => {
  return (
    <Form
      className="d-flex justify-content-center align-items-center my-5"
      style={{
        width: "100%", // Ensures the form takes full width of its container
        maxWidth: "600px", // Limits the maximum width
        margin: "20px auto", // Centers the form
        padding: "50px", // Adjust padding as needed
      }}
    >
      <div
        style={{
          position: "absolute", // Relative position for the container
          width: "35%", // Full width to contain both the input and the button
          minWidth: "350px",
          borderRadius: "30px", // Applies rounded corners to the whole search bar
          border: "1px solid #ccc", // Border for the whole search bar
        }}
      >
        <FormControl
          type="search"
          placeholder="Where to?"
          aria-label="Search"
          style={{
            width: "70%",
            height: "50px", // Takes the full width of its parent
            borderRadius: "30px", // Rounded corners for the input
            border: "none", // Removes individual border
            paddingRight: "50px", // Padding to prevent text from hiding behind the button
          }}
        />
        <Button
          style={{
            position: "absolute", // Absolute position to overlay on the parent div
            top: "50%", // Center vertically
            right: "5px", // Distance from the right edge
            transform: "translateY(-50%)", // Align center with the input field
            backgroundColor: "#f51441", // Red color for the button
            borderColor: "#f51441", // Matching border color
            borderRadius: "30px", // Rounded corners to match
            color: "white", // Text color
            padding: "7px 30px", // Padding inside the button
          }}
        >
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
