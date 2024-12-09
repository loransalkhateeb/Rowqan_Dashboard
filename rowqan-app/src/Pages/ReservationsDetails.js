import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import "../Styles/ReservationsDetails.css";
import { API_URL1 } from "../App";
import { useNavigate } from "react-router-dom";

function ReservationsDetails() {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const lang = "en";

  useEffect(() => {
    if (selectedType === "chalets") {
      fetchChaletsReservations();
    } else if (selectedType === "events") {
      fetchEventsReservations();
    } else if (selectedType === "lands") {
      fetchLandsReservations();
    }
  }, [selectedType]);

  const fetchChaletsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL1}/ReservationsChalets/getAllReservationChalet/${lang}`
      );
      setReservationData(response.data.reservations);
      setError(""); 
    } catch (error) {
      console.error("Error fetching chalet reservations:", error);
      setError("Error fetching chalet reservations.");
      setReservationData([]); 
    }
  };

  const fetchEventsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL1}/reservationsEvents/getAllreservationevents/${lang}`
      );
      setReservationData(response.data.reservations);
      setError(""); 
    } catch (error) {
      console.error("Error fetching event reservations:", error);
      setError("Error fetching event reservations.");
      setReservationData([]); 
    }
  };

  const fetchLandsReservations = async () => {
    try {
      const response = await axios.get(
        `${API_URL1}/reservationLands/getreservationslands/${lang}`
      );
      setReservationData(response.data.reservations);
      setError(""); 
    } catch (error) {
      console.error("Error fetching land reservations:", error);
      setError("Error fetching land reservations.");
      setReservationData([]); 
    }
  };

  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  const handleSeeDetails = (reservation) => {
    if (selectedType === "chalets") {
      navigate(`/detailsChaletPage/${reservation.id}`);
    } else if (selectedType === "events") {
      navigate(`/detailsEventsPage/${reservation.Available_Event?.id || reservation.available_event_id}`);
    } else if (selectedType === "lands") {
      navigate(`/landsDetails/${reservation.available_land_id}`);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="all-btn">
            <button
              className="create-btn"
              onClick={() => handleButtonClick("chalets")}
            >
              Chalets Reservations
            </button>
            <button
              className="create-btn"
              onClick={() => handleButtonClick("events")}
            >
              Events Reservations
            </button>
            <button
              className="create-btn"
              onClick={() => handleButtonClick("lands")}
            >
              Lands Reservations
            </button>
          </div>
        </div>

        <div className="reservation-dates-table">
          <h3>
            {selectedType
              ? `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Reservations`
              : "All Reservations"}
          </h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                {selectedType === "events" ? (
                  <>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Event Title</th>
                  </>
                ) : selectedType === "chalets" ? (
                  <>
                    <th>Chalet Title</th>
                    <th>Status</th>
                  </>
                ) : selectedType === "lands" ? (
                  <>
                    <th>Land Name</th>
                    <th>Price</th>
                    <th>Time</th>
                  </>
                ) : null}
                <th>See Details</th>
              </tr>
            </thead>
            <tbody>
              {reservationData.length > 0 ? (
                reservationData.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    {selectedType === "events" ? (
                      <>
                        <td>{reservation.start_time}</td>
                        <td>{reservation.end_time}</td>
                        <td>{reservation.Available_Event?.title || "N/A"}</td>
                      </>
                    ) : selectedType === "chalets" ? (
                      <>
                        <td>{reservation.chalet ? reservation.chalet.title : "N/A"}</td>
                        <td>{reservation.status}</td>
                      </>
                    ) : selectedType === "lands" ? (
                      <>
                        <td>{reservation.CategoriesLand?.title || "N/A"}</td>
                        <td>{reservation.CategoriesLand?.price || "N/A"}</td>
                        <td>{reservation.time || "N/A"}</td> 
                      </>
                    ) : null}
                    <td>
                      <button
                        className="create-btn"
                        onClick={() => handleSeeDetails(reservation)}
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>{error || "No reservation data found"}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReservationsDetails;
