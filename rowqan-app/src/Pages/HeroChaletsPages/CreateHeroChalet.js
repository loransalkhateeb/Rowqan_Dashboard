import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL1 } from "../../App"; 

const CreateHeroChalet = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("For Sale");
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("category", category);
    formData.append("lang", lang);
    formData.append("image", image);
  
    console.log("Form Data: ", formData);  
  
    try {
      const response = await axios.post(`${API_URL1}/heroChalets/createherochalets`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.message === "Chalets Hero created successfully") {
        Swal.fire({
          title: "Chalet Hero Created Successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/heroChalets"); 
        });
      }
    } catch (error) {
      console.error("Error creating chalet hero:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  

  return (
    <Container className="mt-5">
      <h2>Create New Chalet Hero</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md={6} controlId="formLang">
            <Form.Label>Language</Form.Label>
            <Form.Control
              as="select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              required
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Form.Group>
        </Row>

        <Button
          type="submit"
          style={{
            backgroundColor: "#6DA6BA", 
            borderColor: "#6DA6BA",
          }}
        >
          Create Chalet Hero
        </Button>
      </Form>
    </Container>
  );
};

export default CreateHeroChalet;
