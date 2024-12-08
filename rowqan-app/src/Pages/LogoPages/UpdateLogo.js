import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { API_URL } from "../../App";
import Swal from "sweetalert2";
function UpdateLogo() {
  const { id } = useParams();
  const [logo, setLogo] = useState(null);
  const [newLogo, setNewLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${API_URL}/logos/getlogobyid/${id}`);
        const data = await response.json();
        setLogo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching logo:", error);
        setLoading(false);
      }
    };
    fetchLogo();
  }, [id]);

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
      console.log("Sending request to update logo...");
      const response = await fetch(`${API_URL}/logos/updatelogo/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Logo Updated Successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate(`/`);
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to update logo: ${errorData.message || "Unknown error"}`);
        console.log("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error updating logo:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the user.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <div className="text-center">
            <h2>Update Logo</h2>
            {loading ? (
              <p>Loading current logo...</p>
            ) : (
              <div>
                <h5>Current Logo:</h5>
                <Image
                  src={`https://res.cloudinary.com/durjqlivi/${logo?.image}`}
                  alt="Current Logo"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
              </div>
            )}

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

              <Button
                variant="primary"
                type="submit"
                className="w-100 "
                style={{
                  backgroundColor: "#6DA6BA",
                  borderColor: "#6DA6BA",
                }}
              >
                Update Logo
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateLogo;
