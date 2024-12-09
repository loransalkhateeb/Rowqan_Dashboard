import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import { API_URL1 } from "../../App";

function CreateLogo() {
  const [newLogo, setNewLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewLogo(file);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newLogo) {
      alert("Please select a new logo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newLogo);  

    try {
      setLoading(true);
      const response = await fetch(`${API_URL1}/logos/createlogo`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: 'Logo Created Successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
        }).then(() => {
          navigate(`/users`); 
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to create logo: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating logo:", error);
      alert("An error occurred while creating the logo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <div className="text-center">
            <h2>Create Logo</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select New Logo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? "Uploading..." : "Create Logo"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateLogo;
