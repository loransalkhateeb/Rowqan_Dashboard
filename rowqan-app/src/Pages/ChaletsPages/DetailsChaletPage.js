import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import "../../Styles/ChaletsDetailStyle.css";
import { useParams } from "react-router-dom";
import { API_URL } from "../../App";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

function DetailsChaletPage() {
  const { id } = useParams();
  const [chaletImages, setChaletImages] = useState([]);
  const [chaletDetails, setChaletDetails] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const API_Images = "https://res.cloudinary.com/durjqlivi";

  useEffect(() => {
    const fetchChaletImages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/chaletsimages/chaletgetChaletImage/${id}`
        );
        setChaletImages(response.data.images || []);
      } catch (error) {
        console.error("Error fetching chalet images:", error);
        setError("Failed to fetch chalet images.");
      }
    };
    

    const fetchChaletDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/ReservationsChalets/reservationsByChaletId/${id}/ar`
        );
        setChaletDetails(response.data.reservations || []);
      } catch (error) {
        console.error("Error fetching chalet details:", error);
        setError("Failed to fetch chalet details.");
      }
    };

    const fetchReservationDates = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/ReservationDates/getreservationdatesbychalet/${id}/en`
        );
        setReservationDates(response.data.reservationDates || []);
      } catch (error) {
        console.error("Error fetching reservation dates:", error);
        setError("Failed to fetch reservation dates.");
      }
    };

    fetchChaletImages();
    fetchChaletDetails();
    fetchReservationDates();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDetails = Array.isArray(chaletDetails)
    ? chaletDetails.filter(
        (detail) =>
          detail.Detail_Type &&
          detail.Detail_Type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredReservationDates = Array.isArray(reservationDates)
    ? reservationDates.filter(
        (reservation) =>
          (reservation.RightTimeModel &&
            reservation.RightTimeModel.name &&
            reservation.RightTimeModel.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (reservation.date &&
            reservation.date.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const isReservedDate = (date) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const reservationDate = new Date(date).toISOString().split("T")[0];
    return reservationDate === currentDate;
  };

  const reservedDates = reservationDates.map(
    (reservation) => new Date(reservation.date).toISOString().split("T")[0]
  );

  return (
    <>
      <NavBar />
      <div className="details-page">
        <h4>Details Chalet Page</h4>
        {error && <p className="error">{error}</p>}

        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Details"
            className="search-input"
          />
        </div>

        <div className="chalet-images">
          <h5 style={{ marginTop: "20px" }}>Chalet Images</h5>
          <div className="images-grid">
            {chaletImages.map((image, index) => (
              <img
                style={{
                  width: "220px",
                  marginLeft: "20px",
                  marginBottom: "50px",
                  marginTop: "20px",
                }}
                key={index}
                src={`${API_Images}/${image}`}
                alt={`Chalet ${index + 1}`}
                className="chalet-image"
              />
            ))}
          </div>
        </div>

        <div className="chalet-details">
          <h5>Chalet Details</h5>
          <ul>
            {filteredDetails.map((detail) => (
              <li key={detail.id} className="detail-item">
                {detail.Detail_Type}
              </li>
            ))}
          </ul>

          <h5>Additional Chalet Information</h5>
          {chaletDetails.length > 0 && (
            <>
              <ul>
                <li>
                  <strong>Initial Amount:</strong>{" "}
                  {chaletDetails[0].initial_amount}
                </li>
                <li>
                  <strong>Reserve Price:</strong>{" "}
                  {chaletDetails[0].reserve_price}
                </li>
                <li>
                  <strong>Total Amount:</strong> {chaletDetails[0].total_amount}
                </li>
                <li>
                  <strong>Cashback:</strong> {chaletDetails[0].cashback}
                </li>
                <li>
                  <strong>Number of Days:</strong>{" "}
                  {chaletDetails[0].number_of_days}
                </li>
                <li>
                  <strong>Additional Visitors:</strong>{" "}
                  {chaletDetails[0].additional_visitors}
                </li>
              </ul>
            </>
          )}

          <div className="user-info">
            <h5>User Information</h5>
            <ul>
              {chaletDetails.length > 0 && (
                <>
                  <li>
                    <strong>User Name:</strong> {chaletDetails[0].user.name}
                  </li>
                  <li>
                    <strong>User Email:</strong> {chaletDetails[0].user.email}
                  </li>
                  <li>
                    <strong>User ID:</strong> {chaletDetails[0].user.id}
                  </li>
                </>
              )}
            </ul>
          </div>

          <h5>Right Time</h5>
          {chaletDetails.length > 0 && (
            <>
              <p>
                <strong>Time:</strong> {chaletDetails[0].right_time.time}
              </p>
            </>
          )}
        </div>

        <div className="reservation-dates">
          <h5>Reservation Dates</h5>
          <Calendar
            onChange={() => {}}
            value={new Date()}
            tileClassName={({ date, view }) => {
              if (
                view === "month" &&
                reservedDates.includes(date.toISOString().split("T")[0])
              ) {
                return "reserved-date";
              }
              return null;
            }}
            tileContent={({ date, view }) => {
              if (
                view === "month" &&
                reservedDates.includes(date.toISOString().split("T")[0])
              ) {
                return <div className="reserved-label">Reserved</div>;
              }
              return null;
            }}
          />
        </div>
      </div>
    </>
  );
}

export default DetailsChaletPage;
