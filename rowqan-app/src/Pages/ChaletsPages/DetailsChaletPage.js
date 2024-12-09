import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import "../../Styles/ChaletsDetailStyle.css";
import { useParams } from "react-router-dom";
import { API_URL1 } from "../../App";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function DetailsChaletPage() {
  const { id } = useParams();
  const [chaletImages, setChaletImages] = useState([]);
  const [chaletDetails, setChaletDetails] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);
  const [additionalChaletDetails, setAdditionalChaletDetails] = useState([]);
  const [error, setError] = useState("");

  const API_Images = "https://res.cloudinary.com/durjqlivi";

  useEffect(() => {
    const fetchChaletImages = async () => {
      try {
        const response = await axios.get(
          `${API_URL1}/chaletsimages/chaletgetChaletImage/${id}`
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
          `${API_URL1}/ReservationsChalets/reservationsByChaletId/${id}/ar`
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
          `${API_URL1}/ReservationsChalets/getAllReservationChaletById/${id}/en`
        );

        const dates = response.data.reservation
          ? [
              new Date(response.data.reservation.date).toLocaleDateString(
                "en-CA"
              ),
            ]
          : [];
        setReservationDates(dates);
      } catch (error) {
        console.error("Error fetching reservation dates:", error);
        setError("Failed to fetch reservation dates.");
      }
    };

    const fetchAdditionalChaletDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL1}/chaletsdetails/getChaletDetailsByChaletId/${id}/en`
        );
        setAdditionalChaletDetails(response.data.chaletDetails || []);
      } catch (error) {
        console.error("Error fetching additional chalet details:", error);
        setError("Failed to fetch additional chalet details.");
      }
    };

    fetchChaletImages();
    fetchChaletDetails();
    fetchReservationDates();
    fetchAdditionalChaletDetails();
  }, [id]);

  const reservedDates = reservationDates.map((reservation) =>
    new Date(reservation).toLocaleDateString("en-CA")
  );

  return (
    <>
      <NavBar />
      <div className="details-page">
        <h4>Details Chalet Page</h4>
        {error && <p className="error">{error}</p>}

        <div className="chalet-images">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            style={{ width: "100%", height: "auto" }}
          >
            {chaletImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  style={{
                    width: "80%",
                    height: "700px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  src={`${API_Images}/${image}`}
                  alt={`Chalet ${index + 1}`}
                  className="chalet-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="chalet-details">
          <h5>Chalet Details</h5>
          <div className="details-grid">
            {chaletDetails.length > 0 ? (
              chaletDetails.map((reservation, index) => (
                <div key={index} className="detail-card">
                  <div>
                    <strong>Chalet Title:</strong>{" "}
                    {reservation.chalet?.title || "N/A"}
                  </div>
                  <div>
                    <strong>Initial Amount:</strong>{" "}
                    {reservation.initial_amount || "N/A"}
                  </div>
                  <div>
                    <strong>Reserve Price:</strong>{" "}
                    {reservation.reserve_price || "N/A"}
                  </div>
                  <div>
                    <strong>Total Amount:</strong>{" "}
                    {reservation.total_amount || "N/A"}
                  </div>
                  <div>
                    <strong>Cashback:</strong> {reservation.cashback || "N/A"}
                  </div>
                  <div>
                    <strong>Number of Days:</strong>{" "}
                    {reservation.number_of_days || "N/A"}
                  </div>
                  <div>
                    <strong>Additional Visitors:</strong>{" "}
                    {reservation.additional_visitors || "N/A"}
                  </div>
                  <div>
                    <strong>Right Time:</strong>{" "}
                    {reservation.right_time?.time || "N/A"}
                  </div>
                </div>
              ))
            ) : (
              <p>No details available for chalets.</p>
            )}
          </div>
        </div>

        <div className="additional-details">
          <h5>Additional Chalet Features</h5>
          <div className="details-grid">
            {additionalChaletDetails.length > 0 ? (
              additionalChaletDetails.map((detail, index) => (
                <div key={index} className="detail-card">
                  <strong>{detail.Detail_Type}</strong>
                </div>
              ))
            ) : (
              <p>No additional details available for this chalet.</p>
            )}
          </div>
        </div>

        <div className="reservation-dates">
          <h5>Reservation Dates</h5>
          <Calendar
            onChange={() => {}}
            value={new Date()}
            tileClassName={({ date, view }) => {
              const formattedDate = date.toLocaleDateString("en-CA");
              if (view === "month" && reservedDates.includes(formattedDate)) {
                return "reserved-date";
              }
              return null;
            }}
            tileContent={({ date, view }) => {
              const formattedDate = date.toLocaleDateString("en-CA");
              if (reservedDates.includes(formattedDate)) {
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
