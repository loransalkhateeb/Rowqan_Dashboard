import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL1 } from "../../App";

const AddServicePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [statusService, setStatusService] = useState("active");
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status_service", statusService);
    formData.append("lang", lang);
    formData.append("image", image);

    try {
      const response = await axios.post(`${API_URL1}/services/createService`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Service created successfully") {
        Swal.fire({
          title: "Service Created Successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/services"); 
        });
      }
    } catch (error) {
      console.error("Error creating service:", error);
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
      <h2>Add New Service</h2>
      <Form onSubmit={handleSubmit}>
        {/* Title and Language Fields */}
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
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
          <Form.Group as={Col} md={6} controlId="formStatusService">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={statusService}
              onChange={(e) => setStatusService(e.target.value)}
              required
            >
              <option value="Best Rated">Best Rated</option>
              <option value="Most Picked">Most Picked</option>
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
          Create Service
        </Button>
      </Form>
    </Container>
  );
};

export default AddServicePage;
