import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, Container, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL1 } from "../../App";
import { API_IMAGE_URL } from "../../App";

const UpdateService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [statusService, setStatusService] = useState("");
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`${API_URL1}/services/getservicebyid/${id}/${lang}`);
        const service = response.data.service;

        setTitle(service.title);
        setStatusService(service.status_service);
        setLang(service.lang);
        setCurrentImage(service.image);
      } catch (error) {
        console.error("Error fetching service data:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not load service data. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    };

    fetchServiceData();
  }, [id, lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("status_service", statusService);
    formData.append("lang", lang);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${API_URL1}/services/updateService/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Service updated successfully") {
        Swal.fire({
          title: "Service Updated Successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/services");
        });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Update Service</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
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
          <Form.Group as={Col} controlId="formStatusService">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service status"
              value={statusService}
              onChange={(e) => setStatusService(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formImage">
            <Form.Label>Image</Form.Label>
            {currentImage && (
              <div className="mb-3">
                <Image 
                  style={{ width: '250px' }}
                  src={`${API_IMAGE_URL}/${currentImage}`}
                  alt="Current Service"
                  className="img-fluid"
                />
              </div>
            )}
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
        </Row>

        <Button
          type="submit"
          style={{
            backgroundColor: "#6DA6BA", 
            borderColor: "#6DA6BA",
          }}
          className="w-100"
        >
          Update Service
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateService;
