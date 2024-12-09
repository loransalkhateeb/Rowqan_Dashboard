import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import TopPicks from "../Components/TopPicks";
import BestRated from "../Components/BestRated";

import "../Styles/Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {  API_URL1 } from "../App";
import Header from "../Components/Header";
import Swal from "sweetalert2";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const supportedLanguages = ["en", "ar"];
  const lang = supportedLanguages.includes(location.pathname.split("/")[1])
    ? location.pathname.split("/")[1]
    : "en";

  const [heroes, setHeroes] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topPicks, setTopPicks] = useState([]);
  const [bestRated, setBestRated] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [heroRes, serviceRes] = await Promise.all([
        axios.get(`${API_URL1}/heroes/getAllHeroes/${lang}`),
        axios.get(`${API_URL1}/services/getAllServices/${lang}`),
      ]);
      setHeroes(heroRes.data);
      setServices(serviceRes.data);

    
      setTopPicks(serviceRes.data.filter((service) => service.status === "Top Picks"));
      setBestRated(serviceRes.data.filter((service) => service.status === "Best Rated"));
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchData();
  }, [lang]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleAddHero = () => {
    navigate("/addHeroSection");
  };

  const handleAddService = () => {
    navigate("/addService");
  };

  const handleUpdateHero = (id) => {
    navigate(`/updateHeroSection/${id}`);
  };

  const handleUpdateService = (id) => {
    navigate(`/updateservice/${id}`);
  };

  const handleDeleteHero = async (id) => {
    Swal.fire({
      title: "Are You Sure To Delete This Hero Section?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6DA6BA",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL1}/heroes/deleteHero/${id}/${lang}`);
          Swal.fire(
            "Deleted!",
            "The hero section has been deleted.",
            "success"
          );
          fetchData();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the hero section.", "error");
        }
      }
    });
  };

  const handleDeleteService = async (id) => {
    Swal.fire({
      title: "Are You Sure To Delete This Service?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6DA6BA",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL1}/services/deleteService/${id}/${lang}`);
          Swal.fire("Deleted!", "The service has been deleted.", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the service.", "error");
        }
      }
    });
  };

  return (
    <div className="home-container">
      <Container>
        <Header />

        <Row className="align-items-center justify-content-center">
          {heroes.length > 0 ? (
            <Carousel nextLabel="" prevLabel="" indicators={false}>
              {heroes.map((hero) => (
                <Carousel.Item key={hero.id}>
                  <Row className="align-items-center justify-content-center">
                    <Col md={6}>
                      <h1 className="maintext_home">{hero.title}</h1>
                      <p className="text_home">{hero.description}</p>
                      <button className="create-btn">{hero.title_btn}</button>
                    </Col>
                    <Col md={6}>
                      {hero.image ? (
                        <Image
                          src={`https://res.cloudinary.com/durjqlivi/${hero.image}`}
                          className="mainHome_img img-fluid"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </Col>
                  </Row>
                  <Row className="justify-content-center mt-3">
                    <Col md={3} className="text-center">
                      <Button variant="dark" className="icon-button">
                        <FiPlusCircle size={30} onClick={handleAddHero} />
                      </Button>
                    </Col>
                    <Col md={3} className="text-center">
                      <Button
                        variant="dark"
                        className="icon-button"
                        onClick={() => handleUpdateHero(hero.id)}
                      >
                        <FiEdit size={30} />
                      </Button>
                    </Col>
                    <Col md={3} className="text-center">
                      <Button
                        variant="dark"
                        className="icon-button"
                        onClick={() => handleDeleteHero(hero.id)}
                      >
                        <FiTrash2 size={30} />
                      </Button>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No heroes available</p>
          )}
        </Row>

        <section className="margin_section">
          <Container className="text-center mt-5">
            <button className="create-btn" onClick={handleAddService} style={{marginBottom:'30px'}}>
              Create Service
            </button>
            <Row>
              {services.length > 0 ? (
                services.map((service) => (
                  <Col md={4} key={service.id} className="service-item">
                    <div>
                      {service.image ? (
                        <img
                          src={`https://res.cloudinary.com/durjqlivi/${service.image}`}
                          alt="service"
                          height="250px"
                          width="420px"
                          className="img_services_home"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                      <h5>{service.title}</h5>
                    </div>
                    <Row className="justify-content-center mt-3">
                      <Col md={4} className="text-center">
                        <Button
                          variant="dark"
                          className="icon-button"
                          onClick={() => handleUpdateService(service.id)}
                        >
                          <FiEdit size={30} />
                        </Button>
                      </Col>
                      <Col md={4} className="text-center">
                        <Button
                          variant="dark"
                          className="icon-button"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <FiTrash2 size={30} />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                ))
              ) : (
                <p>No services available</p>
              )}
            </Row>
          </Container>
        </section>

        <section className="margin_section">
          <Container>
            <Row>
              <Col xl={4}>
                <button className="service_home_overlay services_btn_home">
                  {lang === "ar" ? "أفضل تقييم" : "Best Rated"}
                </button>
              </Col>
            </Row>
          </Container>
          <Row>
            {bestRated.length > 0 ? (
              bestRated.map((service) => (
                <Col md={4} key={service.id} className="service-item">
                  <div>
                    {service.image ? (
                      <img
                        src={`https://res.cloudinary.com/durjqlivi/${service.image}`}
                        alt="Best Rated service"
                        height="250px"
                        width="420px"
                        className="img_services_home"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <h5>{service.title}</h5>
                  </div>
                </Col>
              ))
            ) : (
              <p>No Best Rated services available</p>
            )}
          </Row>
        </section>

        <section className="margin_section">
          <Container>
            <Row>
              <Col xl={4}>
                <button className="service_home_overlay services_btn_home">
                  {lang === "ar" ? "الأكثر اختيارا" : "Most Picked"}
                </button>
              </Col>
            </Row>
          </Container>
          <Row>
            {topPicks.length > 0 ? (
              topPicks.map((service) => (
                <Col md={4} key={service.id} className="service-item">
                  <div>
                    {service.image ? (
                      <img
                        src={`https://res.cloudinary.com/durjqlivi/${service.image}`}
                        alt="Top Pick service"
                        height="250px"
                        width="420px"
                        className="img_services_home"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <h5>{service.title}</h5>
                  </div>
                </Col>
              ))
            ) : (
              <p>No Top Picks services available</p>
            )}
          </Row>
        </section>
      </Container>
    </div>
  );
}

export default Home;
