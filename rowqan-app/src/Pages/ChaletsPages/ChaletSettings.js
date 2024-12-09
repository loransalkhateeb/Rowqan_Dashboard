import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import "../../Styles/ChaletStyles.css";
import { Link } from "react-router-dom";
import TopPicks from "../../Components/TopPicks";
import { useCallback, useEffect, useState } from "react";

import { API_URL1 } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import Button from "react-bootstrap/Button";

function Chalets() {
  const navigate = useNavigate();
  const location = useLocation();
  const lang =
    location.pathname.split("/")[1] === "ar" ||
    location.pathname.split("/")[1] === "en"
      ? location.pathname.split("/")[1]
      : "en";

  const [sliderRes, setSliderRes] = useState([]);
  const [chaletsData, setChaletsData] = useState([]);
  const [statusChalets, setStatusChalets] = useState([]);
  const [statusId, setStatusId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [sliderRes, statueRes, chaletRes] = await Promise.all([
        axios.get(`${API_URL1}/heroChalets/getAllHeroChalets/${lang}`),
        axios.get(`${API_URL1}/status/getallstatuses/${lang}`),
        statusId
          ? axios.get(
              `${API_URL1}/chalets/getallchaletsbystatus/${statusId}/${lang}`
            )
          : axios.get(`${API_URL1}/chalets/getchalets/${lang}`),
      ]);
      setSliderRes(sliderRes.data.chaletsHeroes);
      setStatusChalets(statueRes.data.statuses);
      setChaletsData(chaletRes.data.chalets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [lang, statusId]);

  useEffect(() => {
    fetchData();
  }, [lang, statusId]);

  const handleAdd = () => {
    navigate("/createHeroChalet");
  };
  const handleEdit = (id) => {
    navigate(`/updateHeroChalet/${id}`);
  };

  return (
    <>
      <Container>
       
        <Carousel nextLabel="" prevLabel="" indicators={false}>
          {sliderRes.map((slider) => (
            <Carousel.Item key={slider.id}>
              <div className="container_big_img">
                <img
                  src={`https://res.cloudinary.com/durjqlivi/${slider.image}`}
                  loading="lazy"
                  alt="chalet"
                  className="chalet_big_img"
                  style={{ marginTop: "40px" }}
                />
                <div className="centered_big_img_chalets">
                  <h1>{slider.category}</h1>
                  {statusChalets.map((statuses) => (
                    <button
                      key={statuses.id}
                      className="chalets_btn"
                      onClick={() => setStatusId(statuses.id)}
                    >
                      {statuses.status}
                    </button>
                  ))}
                </div>
              </div>
              <Row className="justify-content-center mt-3">
                <Col md={3} className="text-center">
                  <Button
                    variant="dark"
                    className="icon-button"
                    onClick={handleAdd}
                  >
                    <FiPlusCircle size={30} />
                  </Button>
                </Col>
                <Col md={3} className="text-center">
                  <Button
                    variant="dark"
                    className="icon-button"
                    onClick={() => handleEdit(slider.id)}
                  >
                    <FiEdit size={30} />
                  </Button>
                </Col>
                <Col md={3} className="text-center">
                  <Button
                    variant="dark"
                    className="icon-button"
                    // onClick={() => handleDeleteHero(slider.id)} // Fixed: use slider.id here for delete
                  >
                    <FiTrash2 size={30} />
                  </Button>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>

       
        <Row className="margin_section">
          {chaletsData.map((chal) => (
            <Col xl={4} md={6} sm={12} key={chal.id}>
              <Link
                to={`/${lang}/basicdetailschalet/${chal.id}`}
                state={{ price: chal.reserve_price }}
                style={{ textDecoration: "none" }}
              >
                <Card className="cont_card_chalets">
                  <Card.Img
                    variant="top"
                    src={`https://res.cloudinary.com/durjqlivi/${chal.image}`}
                    height={"200px"}
                    className="object-fit-cover"
                  />
                  <Card.Body>
                    <Card.Title className="title_chalets">
                      {chal.title}
                    </Card.Title>
                  </Card.Body>
                  <Card.Body className="d-flex justify-content-evenly">
                    <div>
                      <Card.Text className="text_card_det">
                        {chal.reserve_price} JD
                      </Card.Text>
                      <Card.Text>{chal.Status.status}</Card.Text>
                    </div>
                    <button className="booknow_button_events">View More</button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <h4 style={{ color: "#152C5B", marginTop: "10vh" }}>
          Treasure to Choose
        </h4>
      </Container>

      {/* Top Picks Component */}
      <TopPicks />
    </>
  );
}

export default Chalets;
