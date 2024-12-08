import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, Container, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../App";
import { API_IMAGE_URL } from "../../App";


const UpdateHeroSections = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleBtn, setTitleBtn] = useState("");
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  
  useEffect(() => {
 
    const fetchHeroData = async () => {
      try {
        const response = await axios.get(`${API_URL}/heroes/getHeroById/${id}/${lang}`);
        const hero = response.data.hero;

        setTitle(hero.title);
        setDescription(hero.description);
        setTitleBtn(hero.title_btn);
        setLang(hero.lang);
        setCurrentImage(hero.image); 
      } catch (error) {
        console.error("Error fetching hero data:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not load hero data. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    };

    fetchHeroData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("title_btn", titleBtn);
    formData.append("lang", lang);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${API_URL}/heroes/updateHero/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "Hero updated successfully") {
        Swal.fire({
          title: "Hero Updated Successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          navigate("/heroes");
        });
      }
    } catch (error) {
      console.error("Error updating hero:", error);
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
      <h2>Update Hero Section</h2>
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
            {currentImage && (
              <div className="mb-3">
                <Image 
                style={{ width: '250px' }}
                  src={`${API_IMAGE_URL}/${currentImage}`}
                  alt="Current Hero"
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
          Update Hero
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateHeroSections;
