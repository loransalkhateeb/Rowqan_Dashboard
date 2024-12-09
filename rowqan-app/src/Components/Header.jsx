import { useState, useEffect } from "react";
import "../Styles/HeaderStyle.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import Image from "react-bootstrap/Image";
import { API_URL1 } from "../App";
import Swal from "sweetalert2";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log(location.pathname);
  const lang =
    location.pathname.split("/")[1] === "ar" ||
    location.pathname.split("/")[1] === "en"
      ? location.pathname.split("/")[1]
      : "en";
  console.log("Selected language:", lang);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [logo, setLogo] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${API_URL1}/logos/getalllogos`);
        const data = await response.json();
        if (data && data.length > 0) {
          setLogo(data[0]);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    const fetchHeaders = async () => {
      const url = `http://localhost:5000/header/getAllHeaders/${lang}`;
      console.log("Fetching from URL:", url); 
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data && data.headers) {
          setHeaders(data.headers);
        }
      } catch (error) {
        console.error("Error fetching headers:", error);
      }
    };

    fetchLogo();
    fetchHeaders();
  }, [lang]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelection = (event) => {
    const newLang = event.target.value;
    setSelectedOption(newLang);
    setDropdownVisible(false);
    navigate(`/${newLang}`);
  };

  const handleEditClick = () => {
    if (logo && logo.id) {
      navigate(`/updatelogo/${logo.id}`);
    }
  };

  const handleAddLogo = () => {
    navigate("/createlogo");
  };

  const handleDeleteClick = async () => {
    if (logo && logo.id) {
      try {
        const result = await Swal.fire({
          title: "Are You Sure to Delete This Logo?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Delete it!",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          const response = await fetch(
            `${API_URL1}/logos/deletelogo/${logo.id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            Swal.fire({
              title: "Logo Deleted Successfully!",
              icon: "success",
              confirmButtonText: "Okay",
            });

            setLogo(null);
          } else {
            Swal.fire({
              title: "Error Deleting Logo",
              icon: "error",
              text: "An error occurred while deleting the logo. Please try again.",
            });
          }
        }
      } catch (error) {
        console.error("Error deleting logo:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred while trying to delete the logo.",
        });
      }
    }
  };

  return (
    <nav>
      <div className="logo">
        {logo ? (
          <Image
            src={`https://res.cloudinary.com/durjqlivi/${logo.image}`}
            alt="Logo"
            className="img-fluid"
          />
        ) : (
          <p>Loading...</p>
        )}

        {/* Buttons under the logo */}
        <Row className="justify-content-center mt-3">
          <Col md={3} className="text-center">
            <Button
              variant="dark"
              className="icon-button"
              onClick={handleEditClick}
            >
              <FiEdit size={30} />
            </Button>
          </Col>
          <Col md={3} className="text-center">
            <Button
              variant="dark"
              className="icon-button"
              onClick={handleDeleteClick}
            >
              <FiTrash2 size={30} />
            </Button>
          </Col>
          <Col md={3} className="text-center">
            <Button
              variant="dark"
              className="icon-button"
              onClick={handleAddLogo}
            >
              <FiPlus size={30} />
            </Button>
          </Col>
        </Row>
      </div>

      <div
        className={`hamburger ${isOpen ? "toggle" : ""}`}
        onClick={toggleMenu}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        {headers.length > 0 ? (
          headers.map((header) => (
            <li key={header.id}>
              <Link to={`/${header.header_name.toLowerCase()}/${lang}`}>
                {header.header_name}
              </Link>
            </li>
          ))
        ) : (
          <li>No headers available</li>
        )}

        <li>
          <Link to="/login">
            <button className="Login-button">
              {lang === "ar" ? "تسجيل دخول" : "Login"}
            </button>
          </Link>
        </li>
        <li>
          <div
            className="dropdown-container border-none"
            onClick={toggleDropdown}
          >
            <div className="dropdown-wrapper">
              <select
                className="form-select small-select"
                value={selectedOption}
                onChange={handleSelection}
              >
                <option value="en">en</option>
                <option value="ar">ar</option>
              </select>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
