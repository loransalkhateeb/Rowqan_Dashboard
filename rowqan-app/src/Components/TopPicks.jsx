import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL1 } from "../App";

function TopPicks() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const [topPicks, settopPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  const gettopPicks = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL1}/services/getAllServicesByServiceStatus/Top Picks/${lang}`
      );
      console.log("first response", res.data);
      settopPicks(res.data);
    } catch (error) {
      console.error("Error fetching top rated services:", error);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    gettopPicks();
  }, [lang]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        {topPicks.length > 0 ? (
          topPicks.map((top) => (
            <Col xl={3} md={6} sm={12} key={top.id}>
              <img
                src={`https://res.cloudinary.com/durjqlivi/${top.image}`}
                alt="top picks"
                height={"200px"}
                width={"100%"}
                className="toppicks_home_img"
              />
              <div>
                <h5 className="title_of_toppick">{top.title}</h5>
              </div>
            </Col>
          ))
        ) : (
          <div>No top picks available at the moment</div>
        )}
      </Row>
    </Container>
  );
}

export default TopPicks;
