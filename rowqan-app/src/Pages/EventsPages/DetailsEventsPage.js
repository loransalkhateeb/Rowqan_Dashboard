import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import { useParams } from "react-router-dom";
import { API_URL1 } from "../../App";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function DetailsEventsPage() {
  const { available_event_id } = useParams();
  const [eventImages, setEventImages] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [reservedDates, setReservedDates] = useState([]); 
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const API_Images = "https://res.cloudinary.com/durjqlivi"; 

  useEffect(() => {
    const fetchEventImages = async () => {
      try {
        const response = await axios.get(
          `${API_URL1}/availableimages/getavailableimage/${available_event_id}`
        );
      
        const images = response.data.images.map(image => ({
          ...image,
          image: `${API_Images}/${image.image}`
        }));
        setEventImages(images || []);
      } catch (error) {
        console.error("Error fetching event images:", error);
        setError("Failed to fetch event images.");
      }
    };

    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL1}/reservationsEvents/getAllreservationeventsByAvailableId/${available_event_id}/en`
        );
        setEventDetails(response.data.reservations || []);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to fetch event details.");
      }
    };

    const fetchReservationDates = async () => {
      try {
        const response = await axios.get(
          `${API_URL1}/reservationsEvents/getAllreservationeventsByAvailableId/${available_event_id}/en`
        );
       
        const dates = response.data.reservations.map((reservation) => {
          return new Date(reservation.date).toLocaleDateString("en-CA");
        });
        setReservedDates(dates);
      } catch (error) {
        console.error("Error fetching reservation dates:", error);
        setError("Failed to fetch reservation dates.");
      }
    };

    fetchEventImages();
    fetchEventDetails();
    fetchReservationDates();
  }, [available_event_id]);

  return (
    <>
      <NavBar />
      <div className="details-page">
        <h4>Details Event Page</h4>
        {error && <p className="error">{error}</p>}

        <div className="event-images">
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
            {eventImages.map((image, index) => (
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
                  src={image.image}
                  alt={`Event ${index + 1}`}
                  className="event-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="event-details">
          <h5>Event Details</h5>
          <div className="details-grid">
            {eventDetails.length > 0 ? (
              <>
                <div className="detail-card">
                  <strong>Event Title:</strong> {eventDetails[0]?.Available_Event?.title || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Event Description:</strong> {eventDetails[0]?.Available_Event?.description || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Price:</strong> {eventDetails[0]?.Available_Event?.price || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Rating:</strong> {eventDetails[0]?.Available_Event?.rating || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Location:</strong> {eventDetails[0]?.Available_Event?.location || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Cashback:</strong> {eventDetails[0]?.Available_Event?.cashback || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Time:</strong> {eventDetails[0]?.Available_Event?.time || "N/A"}
                </div>
                <div className="detail-card">
                  <strong>Max Number of People:</strong> {eventDetails[0]?.Available_Event?.no_people || "N/A"}
                </div>
              </>
            ) : (
              <p>No details available for this event.</p>
            )}
          </div>
        </div>

        <div className="reservation-dates">
          <h5>Reservation Dates</h5>
          {error && <p className="error">{error}</p>}
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
                return <div className="reserved-text">Reserved</div>;
              }
              return null;
            }}
          />
        </div>
      </div>
    </>
  );
}

export default DetailsEventsPage;
