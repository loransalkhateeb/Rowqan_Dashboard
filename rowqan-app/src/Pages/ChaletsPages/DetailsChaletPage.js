import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import "../../Styles/ChaletsDetailStyle.css";
import { useParams } from "react-router-dom";
import { API_URL } from "../../App";
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

  const reservedDates = reservationDates.map(
    (reservation) => new Date(reservation.date).toISOString().split("T")[0]
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
              <>
                <div className="detail-card">
                  <strong>Initial Amount:</strong> {chaletDetails[0].initial_amount}
                </div>
                <div className="detail-card">
                  <strong>Reserve Price:</strong> {chaletDetails[0].reserve_price}
                </div>
                <div className="detail-card">
                  <strong>Total Amount:</strong> {chaletDetails[0].total_amount}
                </div>
                <div className="detail-card">
                  <strong>Cashback:</strong> {chaletDetails[0].cashback}
                </div>
                <div className="detail-card">
                  <strong>Number of Days:</strong> {chaletDetails[0].number_of_days}
                </div>
                <div className="detail-card">
                  <strong>Additional Visitors:</strong> {chaletDetails[0].additional_visitors}
                </div>
              </>
            ) : (
              <p>No details available for this chalet.</p>
            )}
          </div>

          <h5>User Information</h5>
          <div className="details-grid">
            {chaletDetails.length > 0 ? (
              <>
                <div className="detail-card">
                  <strong>User Name:</strong> {chaletDetails[0].user.name}
                </div>
                <div className="detail-card">
                  <strong>User Email:</strong> {chaletDetails[0].user.email}
                </div>
                <div className="detail-card">
                  <strong>User ID:</strong> {chaletDetails[0].user.id}
                </div>
              </>
            ) : (
              <p>No user information available.</p>
            )}
          </div>

          <h5>Right Time</h5>
          {chaletDetails.length > 0 && (
            <div className="details-grid">
              <div className="detail-card">
                <strong>Time:</strong> {chaletDetails[0].right_time.time}
              </div>
              <div className="detail-card">
                <strong>Name For Time:</strong> {chaletDetails[0].right_time.name}
              </div>
            </div>
          )}
        </div>

        <div className="reservation-dates">
          <h5>Reservation Dates</h5>
          <Calendar
            onChange={() => {}}
            value={new Date()}
            tileClassName={({ date, view }) => {
              const formattedDate = date.toISOString().split("T")[0];
              if (view === "month" && reservedDates.includes(formattedDate)) {
                return "reserved-date"; 
              }
              return null;
            }}
            tileContent={({ date, view }) => {
              const formattedDate = date.toISOString().split("T")[0];
              if (view === "month" && reservedDates.includes(formattedDate)) {
                return (
                  <>
                    <div className="reserved-label">Reserved</div> 
                  </>
                );
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
