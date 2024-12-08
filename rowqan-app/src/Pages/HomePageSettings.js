import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Carousel from "react-bootstrap/Carousel";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

import "../Styles/Home.css";
import calendar from "../Images/calendar.png";
import user from "../Images/user.png";
import locations from "../Images/location.png";
import TopPicks from "../Components/TopPicks";
import BestRated from "../Components/BestRated";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";
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

  const getHero = useCallback(async () => {
    try {
      setLoading(true);
      const [heroRes, servRes] = await Promise.all([
        axios.get(`${API_URL}/heroes/getAllHeroes/${lang}`),
        axios.get(`${API_URL}/services/getAllServices/${lang}`),
      ]);
      setHeroes(heroRes.data);
      setServices(servRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    getHero();
  }, [lang]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleAddhero = () => {
    navigate("/addHeroSection");
  };


  const handleupdateHero = (id) => {
    navigate(`/updateHeroSection/${id}`);
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
          await axios.delete(`${API_URL}/heroes/deleteHero/${id}/${lang}`);
          Swal.fire("Deleted!", "The hero section has been deleted.", "success");
          getHero(); 
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the hero section.", "error");
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
                        <FiPlusCircle size={30} onClick={handleAddhero} />
                      </Button>
                    </Col>
                    <Col md={3} className="text-center">
                      <Button
                        variant="dark"
                        className="icon-button"
                        onClick={() =>
                          navigate(`/updateHeroSection/${hero.id}`)
                        } 
                      >
                        <FiEdit size={30} />
                      </Button>
                    </Col>
                    <Col md={3} className="text-center">
                      <Button variant="dark" className="icon-button"    onClick={() => handleDeleteHero(hero.id)}>
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
          <div className="cont_search">
            <Col className="col_cont_search">
              <Button variant="light" className="filter_home">
                <img src={calendar} alt="calendar icon" />
                <span className="btn_text_filter">Check Available</span>
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="light" className="filter_home">
                  <img src={user} alt="user icon" />
                  <span className="btn_text_filter">Person 2</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="light" className="filter_home">
                <img src={locations} alt="location icon" />
                <span className="btn_text_filter">Select Location</span>
              </Button>

              <button className="Login-button search_btn_home">Search</button>
            </Col>
          </div>
        </section>

        <section className="margin_section">
          <Container>
            <Row>
              <Col xl={4}>
                <button className="service_home_overlay services_btn_home">
                  {lang === "ar" ? "الخدمات" : "Services"}
                </button>
              </Col>
            </Row>
          </Container>
          <Container className="text-center mt-5">
            <Row>
              {services.length > 0 ? (
                services.map((service) => (
                  <Col
                    xl={4}
                    md={6}
                    sm={12}
                    className="cont_img_home_serv"
                    key={service.id}
                  >
                    {service.image ? (
                      <img
                        src={`https://res.cloudinary.com/durjqlivi/${service.image}`}
                        alt="service"
                        height={"250px"}
                        width={"420px"}
                        className="img_services_home"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div className="bottom-right">{service.title}</div>
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
          <BestRated />
        </section>

        <section className="margin_section">
          <Container>
            <Row>
              <Col xl={4}>
                <button className="service_home_overlay services_btn_home">
                  {lang === "ar" ? "الأكثر اختيارا" : " Most Picked "}
                </button>
              </Col>
            </Row>
          </Container>
          <TopPicks />
        </section>
      </Container>
    </div>
  );
}

export default Home;
