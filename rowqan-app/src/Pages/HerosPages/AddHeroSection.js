import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";

const AddHeroSection = () => {
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleBtn, setTitleBtn] = useState("");
  const [lang, setLang] = useState("en"); 
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("title_btn", titleBtn);
    formData.append("lang", lang);
    formData.append("image", image);

    try {
      const response = await axios.post(`${API_URL}/heroes/createHero`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Hero created successfully") {
        Swal.fire({
          title: "Hero Created Successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/heroes"); 
        });
      }
    } catch (error) {
      console.error("Error creating hero:", error);
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
      <h2>Add New Hero</h2>
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
          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTitleBtn">
            <Form.Label>Button Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter button title"
              value={titleBtn}
              onChange={(e) => setTitleBtn(e.target.value)}
              required
            />
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
          Create Hero
        </Button>
      </Form>
    </Container>
  );
};

export default AddHeroSection;
